import { tmdbClient } from "@/lib/tmdb-client"
import { type TVShowsResponse } from "@/types"

export async function fetchPopularTVShows(
  page: number = 1
): Promise<TVShowsResponse> {
  const safePage = Math.max(1, Math.min(500, Number(page) || 1))
  const url = `${tmdbClient.baseUrl}/tv/popular?language=en-US&page=${safePage}`

  const response = await fetch(url, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${tmdbClient.apiKey}`,
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch popular TV shows: ${response.statusText}`)
  }

  return response.json()
}
