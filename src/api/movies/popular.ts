import { tmdbClient } from "@/lib/tmdb-client"
import { type MoviesResponse } from "@/types"

export async function fetchPopularMovies(
  page: number = 1
): Promise<MoviesResponse> {
  const safePage = Math.max(1, Math.min(500, Number(page) || 1))
  const url = `${tmdbClient.baseUrl}/movie/popular?language=en-US&page=${safePage}`

  const response = await fetch(url, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${tmdbClient.apiKey}`,
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch popular movies: ${response.statusText}`)
  }

  return response.json()
}
