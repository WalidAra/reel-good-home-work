import { useQuery } from "@tanstack/react-query"
import { tmdbClient } from "@/lib/tmdb-client"
import { useHomeMovies } from "@/hooks/use-home-movies"
import { Hero as HeroComponent, HeroSkeleton } from "./Hero"

interface MediaDetail {
  id: number
  title?: string
  name?: string
  overview: string
  backdrop_path: string | null
  vote_average: number
  genres: { id: number; name: string }[]
  tagline?: string
}

interface Video {
  id: string
  key: string
  type: string
  site: string
}

async function fetchMediaDetail(
  mediaType: "movie" | "tv",
  id: number
): Promise<MediaDetail> {
  const response = await fetch(
    `${tmdbClient.baseUrl}/${mediaType}/${id}?language=en-US`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${tmdbClient.apiKey}`,
      },
    }
  )
  if (!response.ok) {
    throw new Error("Failed to fetch media detail")
  }
  return response.json()
}

async function fetchVideos(
  mediaType: "movie" | "tv",
  id: number
): Promise<Video[]> {
  const response = await fetch(
    `${tmdbClient.baseUrl}/${mediaType}/${id}/videos?language=en-US`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${tmdbClient.apiKey}`,
      },
    }
  )
  if (!response.ok) {
    throw new Error("Failed to fetch videos")
  }
  const data = await response.json()
  return data.results
}

interface HeroContainerProps {
  onAddToLibrary: () => void
}

export function HeroContainer({ onAddToLibrary }: HeroContainerProps) {
  const {
    data: moviesData,
    isLoading: moviesLoading,
    error: moviesError,
  } = useHomeMovies()

  const movie = moviesData?.results?.[0]
  const mediaType: "movie" | "tv" = "movie"
  const mediaId = movie?.id ?? 0

  const { data: mediaDetail, isLoading: detailLoading } = useQuery({
    queryKey: ["media", mediaType, mediaId],
    queryFn: () => fetchMediaDetail(mediaType, mediaId),
    enabled: !!movie,
    staleTime: 10 * 60 * 1000,
  })

  const { data: videos, isLoading: videosLoading } = useQuery({
    queryKey: ["videos", mediaType, mediaId],
    queryFn: () => fetchVideos(mediaType, mediaId),
    enabled: !!movie,
    staleTime: 10 * 60 * 1000,
  })

  const isLoading = moviesLoading || detailLoading || videosLoading
  const error = moviesError

  if (isLoading) {
    return <HeroSkeleton />
  }

  if (error || !movie || !mediaDetail) {
    return (
      <div className="flex h-[85vh] items-center justify-center text-white">
        <p>Failed to load hero content</p>
      </div>
    )
  }

  const trailerKey =
    videos?.find((v) => v.type === "Trailer" && v.site === "YouTube")?.key ??
    null

  const title = mediaDetail.title ?? mediaDetail.name ?? movie.title ?? ""
  const overview = mediaDetail.overview ?? movie.overview ?? ""

  return (
    <HeroComponent
      title={title}
      overview={overview}
      backdropPath={mediaDetail.backdrop_path ?? movie.backdrop_path ?? ""}
      genres={mediaDetail.genres ?? []}
      trailerKey={trailerKey}
      voteAverage={mediaDetail.vote_average ?? movie.vote_average ?? 0}
      mediaType={mediaType}
      onAddToLibrary={onAddToLibrary}
    />
  )
}
