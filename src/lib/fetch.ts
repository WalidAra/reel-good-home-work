import { tmdbClient } from "@/lib/tmdb-client"

const headers = {
  accept: "application/json",
  Authorization: `Bearer ${tmdbClient.apiKey}`,
}

export async function tmdbFetch<T>(endpoint: string): Promise<T> {
  const url = `${tmdbClient.baseUrl}${endpoint}`

  const response = await fetch(url, {
    method: "GET",
    headers,
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch ${endpoint}: ${response.statusText}`)
  }

  return response.json()
}
