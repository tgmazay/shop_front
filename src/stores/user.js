import { computed, reactive, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'

// Фасад над auth-стором: профиль живёт в одном месте,
// а UI-компоненты получают привычную структуру { social, email, phone }.
const PROVIDER_LABELS = {
  yandex: 'Яндекс ID',
  vk: 'ВКонтакте',
  telegram: 'Telegram',
  email: 'Email и пароль',
}

const state = reactive({
  social: {
    name: '',
    avatar: '',
    provider: '',
  },
  email: '',
  phone: '',
})

let synced = false

function resolveProvider(profile) {
  if (!profile) return ''
  if (profile.provider) return String(profile.provider)

  const identities = Array.isArray(profile.identities) ? profile.identities : []
  const identity = identities.find((item) =>
    typeof item === 'string' ? item : item?.provider_id || item?.provider,
  )

  if (identity) {
    return typeof identity === 'string'
      ? identity
      : String(identity.provider_id || identity.provider)
  }

  return profile.email ? 'email' : ''
}

function resolveName(profile) {
  if (!profile) return ''

  const fullName = [profile.first_name, profile.last_name].filter(Boolean).join(' ').trim()

  return profile.name || fullName || profile.email || ''
}

export function useUser() {
  const auth = useAuthStore()

  if (!synced) {
    watch(
      () => auth.user,
      (profile) => {
        state.social.name = resolveName(profile)
        state.social.avatar = profile?.avatar || profile?.avatar_url || ''
        state.social.provider = resolveProvider(profile)
        state.email = profile?.email ?? ''
        state.phone = profile?.phone ?? ''
      },
      { immediate: true },
    )

    synced = true
  }

  const providerLabel = computed(() => PROVIDER_LABELS[state.social.provider] ?? 'Аккаунт')
  const initials = computed(() => (state.social.name || state.email || 'А').charAt(0).toUpperCase())
  const hasProfile = computed(() => Boolean(state.social.name || state.email))

  function updateContacts({ email, phone }) {
    state.email = (email ?? '').trim()
    state.phone = (phone ?? '').trim()
    auth.updateProfile({ email: state.email, phone: state.phone })
  }

  return { state, providerLabel, initials, hasProfile, updateContacts }
}
