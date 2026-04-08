import { tmdbClient } from "@/lib/tmdb-client"
import type {
  TVShowDetails,
  CreditsResponse,
  VideosResponse,
  TVShowsResponse,
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

export async function fetchTVShowDetails(id: number): Promise<TVShowDetails> {
  return tmdbFetch<TVShowDetails>(`/tv/${id}?language=en-US`)
}

export async function fetchTVCredits(id: number): Promise<CreditsResponse> {
  return tmdbFetch<CreditsResponse>(`/tv/${id}/credits`)
}

export async function fetchTVVideos(id: number): Promise<VideosResponse> {
  return tmdbFetch<VideosResponse>(`/tv/${id}/videos?language=en-US`)
}

export async function fetchTVSimilar(id: number): Promise<TVShowsResponse> {
  return tmdbFetch<TVShowsResponse>(`/tv/${id}/similar?language=en-US`)
}

export async function fetchTVRecommendations(
  id: number
): Promise<TVShowsResponse> {
  return tmdbFetch<TVShowsResponse>(`/tv/${id}/recommendations?language=en-US`)
}

export async function fetchTVWatchProviders(
  id: number
): Promise<WatchProvidersResponse> {
  return tmdbFetch<WatchProvidersResponse>(`/tv/${id}/watch/providers`)
}

export async function fetchTVShowDetail(id: number) {
  const [details, credits, videos, similar, recommendations, watchProviders] =
    await Promise.all([
      fetchTVShowDetails(id),
      fetchTVCredits(id),
      fetchTVVideos(id),
      fetchTVSimilar(id),
      fetchTVRecommendations(id),
      fetchTVWatchProviders(id),
    ])

  return { details, credits, videos, similar, recommendations, watchProviders }
}
