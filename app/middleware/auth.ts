export default defineNuxtRouteMiddleware(async () => {
  const { user, ensureAuth } = useAuth()
  await ensureAuth() // attend l'état d'auth définitif (partagé avec le plugin, sans re-fetch)
  if (!user.value) return navigateTo('/auth/login')
})
