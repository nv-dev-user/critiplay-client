import type { User } from '~/types/user'

export const useAuth = () => {
  const user = useState<User | null>('auth-user', () => null)
  const refreshing = useState<Promise<void> | null>(
    'auth-refreshing',
    () => null
  )

  const refreshOnce = () => {
    if (!refreshing.value) {
      refreshing.value = $fetch('/api/auth/refresh', { method: 'POST' })
        .then(() => {})
        .finally(() => {
          refreshing.value = null
        })
    }

    return refreshing.value
  }

  const fetchMe = async () => {
    const { user: u } = await $fetch<{ user: User }>('/api/auth/me')
    user.value = u
  }

  const logout = async () => {
    await $fetch('/api/auth/logout', { method: 'POST' })
    user.value = null
    await navigateTo('/')
  }

  return { user, refreshOnce, fetchMe, logout }
}
