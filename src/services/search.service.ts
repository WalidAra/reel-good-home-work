import { tmdbFetch } from "@/lib/fetch"

export type MultiSearchResult = {
  id: number
  media_type: "movie" | "tv" | "person"
  adult: boolean
  popularity: number
  poster_path: string | null
  backdrop_path: string | null
  genre_ids: number[]
  original_language: string
  overview: string
  vote_average: number
  vote_count: number
  title?: string
  original_title?: string
  release_date?: string
  video?: boolean
  name?: string
  original_name?: string
  first_air_date?: string
  origin_country?: string[]
}

export interface MultiSearchResponse {
  page: number
  results: MultiSearchResult[]
  total_pages: number
  total_results: number
}

export async function searchMulti(
  query: string,
  page: number = 1
): Promise<MultiSearchResponse> {
  return tmdbFetch<MultiSearchResponse>("/search/multi", {
    params: {
      query,
      include_adult: "false",
      language: "en-US",
      page: String(page),
    },
  })
}
