export default defineNuxtPlugin(async () => {
  // Peuple `user` pour toute l'app (nav, pages publiques…) via la résolution
  // partagée. Le middleware `auth` réutilise ce même résultat.
  await useAuth().ensureAuth()
})
