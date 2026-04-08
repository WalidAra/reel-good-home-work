import { useParams } from "react-router-dom"
import { useSuspenseQuery } from "@tanstack/react-query"
import { ErrorBoundary } from "@/components/error-boundary"
import DetailsLayout from "@/core/home/components/layout/details-layout"
import { fetchTVShowDetail } from "@/api/tv-shows/tv.service"
import { extractTrailerKey } from "@/lib/trailer"
import type { SimilarCardProps } from "@/types"

const TVShowDetailContainer = () => {
  const { id } = useParams<{ id: string }>()

  const { data } = useSuspenseQuery({
    queryKey: ["tvshow", id],
    queryFn: () => {
      if (!id) throw new Error("TV Show ID is required")
      return fetchTVShowDetail(Number(id))
    },
  })

  const { videos, similar, recommendations } = data
  const trailerKey = extractTrailerKey(videos)

  const video = {
    thumbnail: trailerKey
      ? `https://img.youtube.com/vi/${trailerKey}/maxresdefault.jpg`
      : "",
    url: trailerKey ? `https://www.youtube.com/embed/${trailerKey}` : "",
  }

  const similarItems: SimilarCardProps[] = similar.results
    .slice(0, 10)
    .map((show) => ({
      id: show.id,
      mediaType: "tv" as const,
      posterPath: show.poster_path,
      title: show.name,
      releaseYear: show.first_air_date
        ? new Date(show.first_air_date).getFullYear().toString()
        : "N/A",
      voteAverage: show.vote_average,
      overview: show.overview,
    }))

  const recommendationItems: SimilarCardProps[] = recommendations.results
    .slice(0, 10)
    .map((show) => ({
      id: show.id,
      mediaType: "tv" as const,
      posterPath: show.poster_path,
      title: show.name,
      releaseYear: show.first_air_date
        ? new Date(show.first_air_date).getFullYear().toString()
        : "N/A",
      voteAverage: show.vote_average,
      overview: show.overview,
    }))

  return (
    <ErrorBoundary
      fallback={
        <div className="flex h-[60vh] flex-col items-center justify-center gap-4 text-center">
          <p className="text-lg font-semibold text-white">
            Something went wrong
          </p>
          <button
            onClick={() => window.location.reload()}
            className="rounded-lg bg-[#F6A290] px-4 py-2 text-sm font-medium text-black"
          >
            Try Again
          </button>
        </div>
      }
    >
      <DetailsLayout
        isMovie={false}
        recommendations={recommendationItems}
        similar={similarItems}
        video={video}
      />
    </ErrorBoundary>
  )
}

export default TVShowDetailContainer
