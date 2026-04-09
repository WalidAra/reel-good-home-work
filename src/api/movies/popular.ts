import { tmdbFetch } from "@/lib/fetch"
import { type MoviesResponse } from "@/types"

export async function fetchPopularMovies(
  page: number = 1
): Promise<MoviesResponse> {
  const safePage = Math.max(1, Math.min(500, Number(page) || 1))
  return tmdbFetch<MoviesResponse>("/movie/popular", {
    params: { language: "en-US", page: String(safePage) },
  })
}
