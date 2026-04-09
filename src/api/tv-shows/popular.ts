import { tmdbFetch } from "@/lib/fetch"
import { type TVShowsResponse } from "@/types"

export async function fetchPopularTVShows(
  page: number = 1
): Promise<TVShowsResponse> {
  const safePage = Math.max(1, Math.min(500, Number(page) || 1))
  return tmdbFetch<TVShowsResponse>("/tv/popular", {
    params: { language: "en-US", page: String(safePage) },
  })
}
