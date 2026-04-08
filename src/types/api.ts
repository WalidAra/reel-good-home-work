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
