import { tmdbClient } from "@/lib/tmdb-client"
import type {
  MovieDetails,
  CreditsResponse,
  VideosResponse,
  MoviesResponse,
  WatchProvidersResponse,
} from "@/types"

const headers = {
  accept: "application/json",
  Authorization: `Bearer ${tmdbClient.apiKey}`,
}

async function tmdbFetch<T>(endpoint: string): Promise<T> {
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

export async function fetchMovieDetails(id: number): Promise<MovieDetails> {
  return tmdbFetch<MovieDetails>(`/movie/${id}?language=en-US`)
}

export async function fetchMovieCredits(id: number): Promise<CreditsResponse> {
  return tmdbFetch<CreditsResponse>(`/movie/${id}/credits`)
}

export async function fetchMovieVideos(id: number): Promise<VideosResponse> {
  return tmdbFetch<VideosResponse>(`/movie/${id}/videos?language=en-US`)
}

export async function fetchMovieSimilar(id: number): Promise<MoviesResponse> {
  return tmdbFetch<MoviesResponse>(`/movie/${id}/similar?language=en-US`)
}

export async function fetchMovieRecommendations(
  id: number
): Promise<MoviesResponse> {
  return tmdbFetch<MoviesResponse>(
    `/movie/${id}/recommendations?language=en-US`
  )
}

export async function fetchMovieWatchProviders(
  id: number
): Promise<WatchProvidersResponse> {
  return tmdbFetch<WatchProvidersResponse>(`/movie/${id}/watch/providers`)
}

export async function fetchMovieDetail(id: number) {
  const [details, credits, videos, similar, recommendations, watchProviders] =
    await Promise.all([
      fetchMovieDetails(id),
      fetchMovieCredits(id),
      fetchMovieVideos(id),
      fetchMovieSimilar(id),
      fetchMovieRecommendations(id),
      fetchMovieWatchProviders(id),
    ])

  return { details, credits, videos, similar, recommendations, watchProviders }
}
