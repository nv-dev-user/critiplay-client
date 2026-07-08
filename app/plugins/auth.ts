export default defineNuxtPlugin(async () => {
  const { fetchMe } = useAuth()

  // Tries to fetch the user on app start, if it fails, it means the user is not connected
  try {
    await fetchMe()
  } catch {
    // Not connected, do nothing
  }
})
