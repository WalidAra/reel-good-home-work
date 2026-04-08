import { tmdbClient } from "@/lib/tmdb-client"
import type { MoviesResponse } from "@/types"

export const fetchPopularMovies = async (): Promise<MoviesResponse> => {
  const url = `${tmdbClient.baseUrl}/movie/popular?language=en-US&page=${1}`

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
