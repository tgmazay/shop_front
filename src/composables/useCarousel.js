import { ref, computed, reactive } from 'vue'

export function useCarousel(images, clonesCount = 3) {
  const CLONES = clonesCount
  const GAP = 24

  const imagesRef = ref(Array.isArray(images) ? images : [])
  const currentIndex = ref(CLONES)
  const isAnimating = ref(false)
  const disableTransition = ref(false)
  const dragOffset = ref(0)

  const displayImages = computed(() => {
    if (imagesRef.value.length === 0) return []
    const firstClones = imagesRef.value.slice(0, CLONES)
    const lastClones = imagesRef.value.slice(-CLONES)
    return [...lastClones, ...imagesRef.value, ...firstClones]
  })

  function goToSlide(index) {
    if (isAnimating.value && !disableTransition.value) return
    isAnimating.value = true
    disableTransition.value = false
    currentIndex.value = index
  }

  function nextSlide() {
    goToSlide(currentIndex.value + 1)
  }

  function prevSlide() {
    goToSlide(currentIndex.value - 1)
  }

  function handleTransitionEnd() {
    isAnimating.value = false
    if (currentIndex.value >= imagesRef.value.length + CLONES) {
      disableTransition.value = true
      currentIndex.value = CLONES
    } else if (currentIndex.value < CLONES) {
      disableTransition.value = true
      currentIndex.value = imagesRef.value.length + CLONES - 1
    }
  }

  const activeDot = computed(() => {
    if (imagesRef.value.length === 0) return 0
    const idx = (currentIndex.value - CLONES) % imagesRef.value.length
    return idx < 0 ? idx + imagesRef.value.length : idx
  })

  // ---------- СВАЙПЫ (мобильные) ----------
  let touchStartX = 0
  let touchStartY = 0
  let isDragging = false
  let horizontalLock = null

  function onTouchStart(e) {
    if (isAnimating.value) return
    isDragging = true
    horizontalLock = null
    touchStartX = e.touches[0].clientX
    touchStartY = e.touches[0].clientY
    dragOffset.value = 0
    disableTransition.value = true // дорожка идёт за пальцем без анимации
  }

  function onTouchMove(e) {
    if (!isDragging) return
    const dx = e.touches[0].clientX - touchStartX
    const dy = e.touches[0].clientY - touchStartY

    if (horizontalLock === null) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return
      horizontalLock = Math.abs(dx) > Math.abs(dy)
      if (!horizontalLock) {
        // палец едет вертикально — не мешаем скроллить страницу
        isDragging = false
        dragOffset.value = 0
        disableTransition.value = false
        return
      }
    }

    dragOffset.value = dx
  }

  function onTouchEnd() {
    if (!isDragging) return
    isDragging = false
    const dx = dragOffset.value
    dragOffset.value = 0
    disableTransition.value = false

    const SWIPE_THRESHOLD = 5 // default 50 px
    if (dx <= -SWIPE_THRESHOLD) nextSlide()
    else if (dx >= SWIPE_THRESHOLD) prevSlide()
    // иначе слайд сам плавно вернётся на место
  }

  function onTouchCancel() {
    isDragging = false
    dragOffset.value = 0
    disableTransition.value = false
  }

  return reactive({
    currentIndex,
    displayImages,
    disableTransition,
    activeDot,
    dragOffset,
    CLONES,
    GAP,
    goToSlide,
    nextSlide,
    prevSlide,
    handleTransitionEnd,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    onTouchCancel
  })
}