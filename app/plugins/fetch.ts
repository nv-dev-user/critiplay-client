/**
 * Custom $fetch to automatically include the Authorization header with the token from cookies.
 */
export default defineNuxtPlugin(() => {
  if (import.meta.server) return

  const { refreshOnce } = useAuth()
  const fetch = globalThis.$fetch

  const customFetch = (async (request: any, options: any = {}) => {
    try {
      return await fetch(request, options);
    } catch (err: any) {
      const is401 = err?.response?.status === 401;
      if (!is401 || String(request).includes('/auth/refresh')) throw err;
      if ((options as any)._retried) throw err;

      try {
        await refreshOnce();
        return await fetch(request, { ...options, _retried: true });
      } catch {
        await navigateTo('/auth/login')
        throw err;
      }
    }
  }) as typeof fetch

  globalThis.$fetch = Object.assign(customFetch, fetch)
})
