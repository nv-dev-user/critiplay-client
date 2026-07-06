import { joinURL } from "ufo";
import { getRequestHeaders } from "h3";

// Proxy to fetch from api.critiplay
export default defineEventHandler(async (event) => {
  const authCookie = getCookie(event, "access_token");

  const proxyUrl = useRuntimeConfig().public.apiBaseUrl;
  const path = event.path.replace(/^\/api\//, "");
  const target = joinURL(proxyUrl, path);
  const forwardedHeaders = getRequestHeaders(event);
  const allowedHeaders = { ...forwardedHeaders };
  delete allowedHeaders["connection"]; // Remove `connection` not ok in proxy context
  delete allowedHeaders["host"]; // Remove `host` not ok in proxy context
  if (authCookie) allowedHeaders["Authorization"] = `Bearer ${authCookie}`;

  return await proxyRequest(event, target, {
    headers: allowedHeaders,
  });
});
