import { tmdbFetch } from "@/lib/fetch"
import type {
  MovieDetails,
  CreditsResponse,
  VideosResponse,
  MoviesResponse,
  WatchProvidersResponse,
} from "@/types"

export interface MovieDetailResponse {
  details: MovieDetails
  credits: CreditsResponse
  videos: VideosResponse
  similar: MoviesResponse
  recommendations: MoviesResponse
  watchProviders: WatchProvidersResponse
}

export async function fetchMovieDetail(
  id: string
): Promise<MovieDetailResponse> {
  const [details, credits, videos, similar, recommendations, watchProviders] =
    await Promise.all([
      tmdbFetch<MovieDetails>(`/movie/${id}?language=en-US`),
      tmdbFetch<CreditsResponse>(`/movie/${id}/credits`),
      tmdbFetch<VideosResponse>(`/movie/${id}/videos`),
      tmdbFetch<MoviesResponse>(`/movie/${id}/similar`),
      tmdbFetch<MoviesResponse>(`/movie/${id}/recommendations`),
      tmdbFetch<WatchProvidersResponse>(`/movie/${id}/watch/providers`),
    ])

  return { details, credits, videos, similar, recommendations, watchProviders }
}
