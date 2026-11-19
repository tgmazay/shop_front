<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { API, CAPTCHA_PURPOSE, resolvePiiConsentUrl } from '@/constants/api'

const props = defineProps({
  disabled: { type: Boolean, default: false },
})

const emit = defineEmits(['session', 'error'])

const MIN_WIDTH = 3.2
const MAX_WIDTH = 10.5
const BASE_BLUR = 4.5

const canvasRef = ref(null)
const boxRef = ref(null)
const hasInk = ref(false)
const statusText = ref('')
const statusType = ref('')
const isLoadingSession = ref(false)
const sessionError = ref('')
const sessionData = ref({
  captchaSessionId: '',
  piiConsentId: null,
  piiConsentVersion: '',
  piiConsentUrl: '',
})

let ctx = null
let isDrawing = false
let points = []
let recentTrail = []
let strokeStartTime = 0
let lastPoint = null
let lastWidth = MAX_WIDTH * 0.75
let inertiaAnimId = null

const isDisabled = computed(
  () => props.disabled || isLoadingSession.value || Boolean(sessionError.value),
)

function extractErrorMessage(data, fallback) {
  if (!data) return fallback
  if (typeof data === 'string') return data
  return data.message || data.error?.message || data.error || fallback
}

function emitSession() {
  emit('session', { ...sessionData.value })
}

async function loadSession() {
  // Новая серверная сессия — старые точки к ней не относятся.
  clearCanvas()
  isLoadingSession.value = true
  sessionError.value = ''
  statusText.value = ''
  statusType.value = ''

  try {
    const response = await fetch(API.auth.captchaSession, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ purpose: CAPTCHA_PURPOSE }),
    })

    const data = await response.json().catch(() => ({}))

    if (!response.ok) {
      throw new Error(extractErrorMessage(data, 'Не удалось получить сессию капчи'))
    }

    const sessionId = data.captcha_session_id ?? data.session_id ?? data.id ?? ''

    if (!sessionId) {
      throw new Error('Сервер не вернул идентификатор капчи')
    }

    const piiConsentId = Number.isInteger(data.pii_consent_id) ? data.pii_consent_id : null

    sessionData.value = {
      captchaSessionId: String(sessionId),
      piiConsentId,
      piiConsentVersion: data.pii_consent_version ? String(data.pii_consent_version) : '',
      piiConsentUrl: resolvePiiConsentUrl({ id: piiConsentId, url: data.pii_consent_url }),
    }

    emitSession()
  } catch (err) {
    sessionError.value = err?.message || 'Не удалось загрузить капчу'
    emit('error', sessionError.value)
  } finally {
    isLoadingSession.value = false
  }
}

function resizeCanvas() {
  const canvas = canvasRef.value
  const box = boxRef.value

  if (!canvas || !box) return

  const rect = box.getBoundingClientRect()
  const dpr = window.devicePixelRatio || 1

  canvas.width = rect.width * dpr
  canvas.height = rect.height * dpr

  ctx = canvas.getContext('2d')
  if (ctx) ctx.scale(dpr, dpr)

  clearCanvas()
}

function clearCanvas() {
  if (inertiaAnimId) {
    cancelAnimationFrame(inertiaAnimId)
    inertiaAnimId = null
  }

  if (ctx) {
    ctx.save()
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.clearRect(0, 0, canvasRef.value?.width ?? 0, canvasRef.value?.height ?? 0)
    ctx.restore()
  }

  points = []
  recentTrail = []
  lastPoint = null
  lastWidth = MAX_WIDTH * 0.75
  hasInk.value = false
  statusText.value = ''
  statusType.value = ''
}

function drawBrushSegment(p1, p2, w1, w2, blur1, blur2, alpha1, alpha2) {
  if (!ctx) return

  const dx = p2.x - p1.x
  const dy = p2.y - p1.y
  const dist = Math.hypot(dx, dy)
  const steps = Math.max(1, Math.ceil(dist / 1.2))

  ctx.save()

  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    const x = p1.x + dx * t
    const y = p1.y + dy * t
    const w = w1 + (w2 - w1) * t
    const blur = blur1 + (blur2 - blur1) * t
    const alpha = alpha1 + (alpha2 - alpha1) * t

    ctx.shadowColor = `rgba(16, 185, 129, ${(alpha * 0.55).toFixed(3)})`
    ctx.shadowBlur = blur
    ctx.fillStyle = `rgba(16, 185, 129, ${alpha.toFixed(3)})`
    ctx.beginPath()
    ctx.arc(x, y, Math.max(0.2, w / 2), 0, Math.PI * 2)
    ctx.fill()
  }

  ctx.restore()
}

function computeExtrapolationParams() {
  const len = recentTrail.length
  if (len < 2) return null

  let weightedVx = 0
  let weightedVy = 0
  let totalWeight = 0

  for (let i = 1; i < len; i++) {
    const a = recentTrail[i - 1]
    const b = recentTrail[i]
    const dt = Math.max(1, b.t - a.t)
    const weight = i

    weightedVx += ((b.x - a.x) / dt) * weight
    weightedVy += ((b.y - a.y) / dt) * weight
    totalWeight += weight
  }

  const vx = weightedVx / totalWeight
  const vy = weightedVy / totalWeight
  const speedMag = Math.hypot(vx, vy)

  if (speedMag < 0.15) return null

  let angularVel = 0

  if (len >= 3) {
    let angleDiffSum = 0
    let angleCount = 0

    for (let i = 2; i < len; i++) {
      const p0 = recentTrail[i - 2]
      const p1 = recentTrail[i - 1]
      const p2 = recentTrail[i]
      const ang1 = Math.atan2(p1.y - p0.y, p1.x - p0.x)
      const ang2 = Math.atan2(p2.y - p1.y, p2.x - p1.x)
      let diff = ang2 - ang1

      while (diff > Math.PI) diff -= Math.PI * 2
      while (diff < -Math.PI) diff += Math.PI * 2

      angleDiffSum += diff
      angleCount++
    }

    const rawAngVel = angleDiffSum / angleCount
    angularVel = Math.max(-0.09, Math.min(0.09, rawAngVel))
  }

  return {
    angle: Math.atan2(vy, vx),
    speedPerFrame: Math.min(9.5, speedMag * 7),
    angularVel,
  }
}

function runExtrapolatedTail() {
  if (!lastPoint) return

  const params = computeExtrapolationParams()
  if (!params) return

  const power = Math.max(0, Math.min(1, (params.speedPerFrame - 1.05) / 7.5))
  let currX = lastPoint.x
  let currY = lastPoint.y
  let currAngle = params.angle
  let currSpeed = params.speedPerFrame
  let currAngVel = params.angularVel
  const startW = lastWidth
  const minEndWidth = 1.6 * (1 - power) + 0.1 * power
  const maxEndBlur = BASE_BLUR + 0.8 + power * 2.2
  const totalDurationMs = 75 + power * 95
  const speedDecayPerFrame = 0.66
  let prevW = startW
  let prevBlur = BASE_BLUR
  let prevAlpha = 0.92
  const animStart = performance.now()
  let lastFrameTime = animStart

  function step(now) {
    const elapsed = now - animStart
    const timeScale = Math.min(2, (now - lastFrameTime) / 16.67)
    lastFrameTime = now

    if (elapsed >= totalDurationMs || prevAlpha <= 0.04 || currSpeed * timeScale < 0.35) {
      inertiaAnimId = null
      return
    }

    const progress = Math.min(1, elapsed / totalDurationMs)
    const taperCurve = 1 - Math.pow(progress, 1.75)
    const nextW = minEndWidth + (startW - minEndWidth) * taperCurve
    const blurCurve = Math.pow(progress, 1.4)
    const nextBlur = BASE_BLUR + (maxEndBlur - BASE_BLUR) * blurCurve
    const nextAlpha = 0.92 * (1 - Math.pow(progress, 1.35))

    currAngle += currAngVel * timeScale
    const nextX = currX + Math.cos(currAngle) * currSpeed * timeScale
    const nextY = currY + Math.sin(currAngle) * currSpeed * timeScale
    currSpeed *= Math.pow(speedDecayPerFrame, timeScale)
    currAngVel *= Math.pow(0.85, timeScale)

    drawBrushSegment(
      { x: currX, y: currY },
      { x: nextX, y: nextY },
      prevW,
      nextW,
      prevBlur,
      nextBlur,
      prevAlpha,
      nextAlpha,
    )

    currX = nextX
    currY = nextY
    prevW = nextW
    prevBlur = nextBlur
    prevAlpha = nextAlpha
    inertiaAnimId = requestAnimationFrame(step)
  }

  inertiaAnimId = requestAnimationFrame(step)
}

function getPointFromEvent(event) {
  const canvas = canvasRef.value
  if (!canvas) return null

  const rect = canvas.getBoundingClientRect()

  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  }
}

function onPointerDown(event) {
  if (isDisabled.value || !ctx) return

  const pos = getPointFromEvent(event)
  if (!pos) return

  if (points.length > 0) clearCanvas()

  isDrawing = true
  strokeStartTime = Date.now()
  hasInk.value = true
  statusText.value = 'Галочка поставлена. Можно отправлять форму.'
  statusType.value = 'success'

  const currentPoint = { x: pos.x, y: pos.y, t: 0 }

  points.push({ x: Math.round(pos.x), y: Math.round(pos.y), t: 0 })
  recentTrail.push(currentPoint)
  lastPoint = currentPoint
  lastWidth = MAX_WIDTH * 0.75
  drawBrushSegment(currentPoint, currentPoint, lastWidth, lastWidth, BASE_BLUR, BASE_BLUR, 1, 1)

  event.preventDefault?.()
}

function onPointerMove(event) {
  if (!isDrawing || !lastPoint || !ctx) return

  const rect = canvasRef.value?.getBoundingClientRect()
  if (!rect) return

  const pos = getPointFromEvent(event)
  if (!pos) return

  if (pos.x < 0 || pos.x > rect.width || pos.y < 0 || pos.y > rect.height) {
    stopDrawing()
    return
  }

  const now = Date.now() - strokeStartTime
  const currentPoint = { x: pos.x, y: pos.y, t: now }
  const dt = Math.max(1, currentPoint.t - lastPoint.t)
  const dist = Math.hypot(currentPoint.x - lastPoint.x, currentPoint.y - lastPoint.y)

  if (dist < 0.5) return

  const speed = dist / dt
  const normalizedSpeed = Math.min(1, speed / 1.4)
  const targetWidth = MAX_WIDTH - normalizedSpeed * (MAX_WIDTH - MIN_WIDTH)
  const smoothedWidth = lastWidth * 0.7 + targetWidth * 0.3

  drawBrushSegment(lastPoint, currentPoint, lastWidth, smoothedWidth, BASE_BLUR, BASE_BLUR, 1, 1)
  points.push({ x: Math.round(pos.x), y: Math.round(pos.y), t: now })
  recentTrail.push(currentPoint)

  if (recentTrail.length > 4) recentTrail.shift()

  lastPoint = currentPoint
  lastWidth = smoothedWidth

  event.preventDefault?.()
}

function stopDrawing() {
  if (!isDrawing) return

  isDrawing = false

  const timeSinceLastMove = Date.now() - strokeStartTime - (lastPoint ? lastPoint.t : 0)
  if (timeSinceLastMove < 80) runExtrapolatedTail()
}

function onPointerUp(event) {
  stopDrawing()
  event.preventDefault?.()
}

function onPointerLeave() {
  stopDrawing()
}

function onPointerCancel() {
  stopDrawing()
}

function getPoints() {
  return points.map((point) => ({ x: point.x, y: point.y, t: point.t }))
}

function reset(refreshSession = false) {
  clearCanvas()
  if (refreshSession) loadSession()
}

defineExpose({ getPoints, reset })

onMounted(() => {
  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)
  loadSession()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeCanvas)

  if (inertiaAnimId) {
    cancelAnimationFrame(inertiaAnimId)
    inertiaAnimId = null
  }
})
</script>

<template>
  <div class="space-y-3">
    <div class="flex items-center justify-between gap-3">
      <span class="text-xs font-bold text-slate-600 uppercase tracking-wider">
        Проверка, что вы человек
      </span>
      <span v-if="isLoadingSession" class="text-[11px] font-medium text-slate-400"
        >Загрузка...</span
      >
    </div>

    <p class="text-xs leading-relaxed text-slate-500">
      Нарисуйте зелёную галочку ✓ одним штрихом. Проверку выполнит сервер.
    </p>

    <div ref="boxRef" class="captcha-box" :class="{ 'has-ink': hasInk, 'is-disabled': isDisabled }">
      <div class="ghost-check" aria-hidden="true">
        <svg width="96" height="96" viewBox="0 0 100 100" fill="none">
          <path
            d="M 22 52 L 42 74 L 80 26"
            stroke="#10b981"
            stroke-width="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <canvas
        ref="canvasRef"
        aria-label="Поле для рисования галочки"
        @pointerdown="onPointerDown"
        @pointermove="onPointerMove"
        @pointerup="onPointerUp"
        @pointercancel="onPointerCancel"
        @pointerleave="onPointerLeave"
      ></canvas>
    </div>

    <div class="flex items-center gap-3">
      <button
        type="button"
        class="px-4 py-2 rounded-lg bg-slate-100 text-slate-600 text-xs font-bold hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="!hasInk"
        @click="clearCanvas"
      >
        ↻ Стереть
      </button>
      <span
        v-if="statusText"
        class="text-xs font-semibold"
        :class="statusType === 'error' ? 'text-red-600' : 'text-emerald-600'"
      >
        {{ statusText }}
      </span>
    </div>

    <div
      v-if="sessionError"
      class="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-xs flex items-start justify-between gap-3"
    >
      <span>{{ sessionError }}</span>
      <button type="button" class="font-bold underline shrink-0" @click="loadSession">
        Повторить
      </button>
    </div>
  </div>
</template>

<style scoped>
.captcha-box {
  position: relative;
  width: 100%;
  height: 145px;
  border-radius: 14px;
  background: #f8fafc;
  border: 2px dashed #cbd5e1;
  overflow: hidden;
  transition:
    border-color 0.2s,
    background 0.2s;
  touch-action: none;
}

.captcha-box.is-disabled {
  opacity: 0.6;
}

.captcha-box.has-ink {
  border-color: #435368;
  background: #ffffff;
}

.ghost-check {
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  opacity: 0.14;
  transition: opacity 0.2s;
}

.captcha-box.has-ink .ghost-check {
  opacity: 0;
}

canvas {
  display: block;
  width: 100%;
  height: 100%;
  cursor: crosshair;
}
</style>
