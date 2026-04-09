import { tmdbFetch } from "@/lib/fetch"
import type {
  TVShowDetails,
  CreditsResponse,
  VideosResponse,
  TVShowsResponse,
  WatchProvidersResponse,
  ImagesResponse,
} from "@/types"

export async function fetchTVShowDetails(id: number): Promise<TVShowDetails> {
  return tmdbFetch<TVShowDetails>(`/tv/${id}`, {
    params: { language: "en-US" },
  })
}

export async function fetchTVCredits(id: number): Promise<CreditsResponse> {
  return tmdbFetch<CreditsResponse>(`/tv/${id}/credits`)
}

export async function fetchTVVideos(id: number): Promise<VideosResponse> {
  return tmdbFetch<VideosResponse>(`/tv/${id}/videos`, {
    params: { language: "en-US" },
  })
}

export async function fetchTVImages(id: number): Promise<ImagesResponse> {
  return tmdbFetch<ImagesResponse>(`/tv/${id}/images`)
}

export async function fetchTVSimilar(id: number): Promise<TVShowsResponse> {
  return tmdbFetch<TVShowsResponse>(`/tv/${id}/similar`, {
    params: { language: "en-US" },
  })
}

export async function fetchTVRecommendations(
  id: number
): Promise<TVShowsResponse> {
  return tmdbFetch<TVShowsResponse>(`/tv/${id}/recommendations`, {
    params: { language: "en-US" },
  })
}

export async function fetchTVWatchProviders(
  id: number
): Promise<WatchProvidersResponse> {
  return tmdbFetch<WatchProvidersResponse>(`/tv/${id}/watch/providers`)
}

export async function fetchTVShowDetail(id: number) {
  const [
    details,
    credits,
    videos,
    similar,
    recommendations,
    watchProviders,
    images,
  ] = await Promise.all([
    fetchTVShowDetails(id),
    fetchTVCredits(id),
    fetchTVVideos(id),
    fetchTVSimilar(id),
    fetchTVRecommendations(id),
    fetchTVWatchProviders(id),
    fetchTVImages(id),
  ])

  return {
    details,
    credits,
    videos,
    similar,
    recommendations,
    watchProviders,
    images,
  }
}
