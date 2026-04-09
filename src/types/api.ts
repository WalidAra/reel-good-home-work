import type { Movie } from "./movie"
import type { TVShow } from "./tv-show"

export interface CastMember {
  id: number
  known_for_department: string
  name: string
  original_name: string
  gender: number
  profile_path: string | null
  character: string
  order: number
}

export interface CreditsResponse {
  id: number
  cast: CastMember[]
  crew: {
    id: number
    known_for_department: string
    name: string
    original_name: string
    gender: number
    profile_path: string | null
    department: string
    job: string
  }[]
}

export interface Video {
  id: string
  iso_639_1: string
  iso_3166_1: string
  key: string
  name: string
  site: string
  size: number
  type: string
  official: boolean
  published_at: string
}

export interface VideosResponse {
  id: number
  results: Video[]
}

export interface WatchProvider {
  display_priority: number
  logo_path: string
  provider_id: number
  provider_name: string
}

export interface WatchProvidersResponse {
  id: number
  results: {
    [countryCode: string]: {
      link: string
      flatrate?: WatchProvider[]
      rent?: WatchProvider[]
      buy?: WatchProvider[]
    }
  }
}

export interface BackdropImage {
  aspect_ratio: number
  height: number
  iso_639_1: string | null
  file_path: string
  vote_average: number
  vote_count: number
  width: number
}

export interface ImagesResponse {
  id: number
  backdrops: BackdropImage[]
  logos: BackdropImage[]
  posters: BackdropImage[]
}

export type MediaType = "movie" | "tv" | "person"

export interface AccountListResponse {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

export interface AccountTVListResponse {
  page: number
  results: TVShow[]
  total_pages: number
  total_results: number
}

export interface AccountMoviesPagesResponse {
  pages: AccountListResponse[]
  pageParams: number[]
}

export interface AccountTVShowsPagesResponse {
  pages: AccountTVListResponse[]
  pageParams: number[]
}

export type AccountMediaState = "1" | "2" | "3" | "4" | "5"
export type MediaRating =
  | 0.5
  | 1
  | 1.5
  | 2
  | 2.5
  | 3
  | 3.5
  | 4
  | 4.5
  | 5
  | 5.5
  | 6
  | 6.5
  | 7
  | 7.5
  | 8
  | 8.5
  | 9
  | 9.5
  | 10

export interface AccountMediaResponse {
  success: boolean
  status_code: number
  status_message: string
}

export interface AccountStatesResponse {
  id: number
  favorite: boolean
  watchlist: boolean
  rated: { value: number } | false
}
