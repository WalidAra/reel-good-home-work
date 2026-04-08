import { tmdbFetch } from "@/lib/fetch"
import type {
  TVShowDetails,
  CreditsResponse,
  VideosResponse,
  TVShowsResponse,
  WatchProvidersResponse,
} from "@/types"

export interface TVShowDetailResponse {
  details: TVShowDetails
  credits: CreditsResponse
  videos: VideosResponse
  similar: TVShowsResponse
  recommendations: TVShowsResponse
  watchProviders: WatchProvidersResponse
}

export async function fetchTVShowDetail(
  id: string
): Promise<TVShowDetailResponse> {
  const [details, credits, videos, similar, recommendations, watchProviders] =
    await Promise.all([
      tmdbFetch<TVShowDetails>(`/tv/${id}?language=en-US`),
      tmdbFetch<CreditsResponse>(`/tv/${id}/credits`),
      tmdbFetch<VideosResponse>(`/tv/${id}/videos`),
      tmdbFetch<TVShowsResponse>(`/tv/${id}/similar`),
      tmdbFetch<TVShowsResponse>(`/tv/${id}/recommendations`),
      tmdbFetch<WatchProvidersResponse>(`/tv/${id}/watch/providers`),
    ])

  return { details, credits, videos, similar, recommendations, watchProviders }
}
