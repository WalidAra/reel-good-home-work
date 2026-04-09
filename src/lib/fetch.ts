import { tmdbClient } from "@/lib/tmdb-client"
import { authStore } from "@/store/auth/slice"

type FetchOptions = {
  method?: "GET" | "POST" | "DELETE"
  body?: Record<string, unknown>
  params?: Record<string, string>
}

export async function tmdbFetch<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { method = "GET", body, params } = options

  // Auto-inject session_id if available
  const sessionId = authStore.getState().sessionId
  const searchParams = new URLSearchParams({
    ...(sessionId ? { session_id: sessionId } : {}),
    ...params,
  })

  const url = `${tmdbClient.baseUrl}${endpoint}?${searchParams}`

  const response = await fetch(url, {
    method,
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: `Bearer ${tmdbClient.apiKey}`,
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  })

  if (!response.ok) {
    throw new Error(`TMDB [${method} ${endpoint}]: ${response.statusText}`)
  }

  return response.json()
}
