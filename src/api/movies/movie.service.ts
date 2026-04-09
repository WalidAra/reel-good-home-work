import { tmdbFetch } from "@/lib/fetch"
import type {
  MovieDetails,
  CreditsResponse,
  VideosResponse,
  MoviesResponse,
  WatchProvidersResponse,
  ImagesResponse,
} from "@/types"

export async function fetchMovieDetails(id: number): Promise<MovieDetails> {
  return tmdbFetch<MovieDetails>(`/movie/${id}`, {
    params: { language: "en-US" },
  })
}

export async function fetchMovieCredits(id: number): Promise<CreditsResponse> {
  return tmdbFetch<CreditsResponse>(`/movie/${id}/credits`)
}

export async function fetchMovieVideos(id: number): Promise<VideosResponse> {
  return tmdbFetch<VideosResponse>(`/movie/${id}/videos`, {
    params: { language: "en-US" },
  })
}

export async function fetchMovieImages(id: number): Promise<ImagesResponse> {
  return tmdbFetch<ImagesResponse>(`/movie/${id}/images`)
}

export async function fetchMovieSimilar(id: number): Promise<MoviesResponse> {
  return tmdbFetch<MoviesResponse>(`/movie/${id}/similar`, {
    params: { language: "en-US" },
  })
}

export async function fetchMovieRecommendations(
  id: number
): Promise<MoviesResponse> {
  return tmdbFetch<MoviesResponse>(`/movie/${id}/recommendations`, {
    params: { language: "en-US" },
  })
}

export async function fetchMovieWatchProviders(
  id: number
): Promise<WatchProvidersResponse> {
  return tmdbFetch<WatchProvidersResponse>(`/movie/${id}/watch/providers`)
}

export async function fetchMovieDetail(id: number) {
  const [
    details,
    credits,
    videos,
    similar,
    recommendations,
    watchProviders,
    images,
  ] = await Promise.all([
    fetchMovieDetails(id),
    fetchMovieCredits(id),
    fetchMovieVideos(id),
    fetchMovieSimilar(id),
    fetchMovieRecommendations(id),
    fetchMovieWatchProviders(id),
    fetchMovieImages(id),
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
