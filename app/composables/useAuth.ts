import type { User } from '~/types/user'

export const useAuth = () => {
  const nuxtApp = useNuxtApp()
  const user = useState<User | null>('auth-user', () => null)
  const requestFetch = useRequestFetch()

  const fetchMe = async () => {
    const { user: u } = await requestFetch<{ user: User }>('/api/auth/me')
    user.value = u
  }

  // Un seul refresh en vol : les appels concurrents attendent le même.
  const refreshOnce = () => {
    nuxtApp._authRefresh ??= requestFetch('/api/auth/refresh', {
      method: 'POST'
    })
      .then(() => {})
      .finally(() => {
        nuxtApp._authRefresh = null
      })
    return nuxtApp._authRefresh
  }

  // Résolution d'auth idempotente, exécutée une seule fois par contexte :
  // le plugin (bootstrap) et le middleware (garde) partagent le même résultat
  // → plus de double waterfall fetchMe → refresh → fetchMe.
  const ensureAuth = () => {
    nuxtApp._authReady ??= (async () => {
      if (user.value) return // déjà résolu (ex. hydraté depuis le SSR)
      try {
        await fetchMe()
      } catch {
        // Le refresh ne peut aboutir qu'au client : c'est le navigateur qui
        // applique le Set-Cookie renvoyé par /auth/refresh. En SSR on laisse
        // simplement `user` à null, le client s'en chargera.
        if (import.meta.server) return
        try {
          await refreshOnce()
          await fetchMe()
        } catch {
          user.value = null
        }
      }
    })()
    return nuxtApp._authReady
  }

  const logout = async () => {
    await requestFetch('/api/auth/logout', { method: 'POST' })
    user.value = null
    await navigateTo('/')
  }

  return { user, fetchMe, refreshOnce, ensureAuth, logout }
}

declare module '#app' {
  interface NuxtApp {
    _authReady?: Promise<void>
    _authRefresh?: Promise<void> | null
  }
}
