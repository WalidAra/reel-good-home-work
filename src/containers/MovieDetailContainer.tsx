import { useParams } from "react-router-dom"
import { useSuspenseQuery } from "@tanstack/react-query"
import { ErrorBoundary } from "@/components/error-boundary"
import DetailsLayout from "@/core/home/components/layout/details-layout"
import { fetchMovieDetail } from "@/api/movies/movie.service"
import { extractTrailerKey } from "@/lib/trailer"
import type { SimilarCardProps } from "@/types"

const MovieDetailContainer = () => {
  const { id } = useParams<{ id: string }>()

  const { data } = useSuspenseQuery({
    queryKey: ["movie", id],
    queryFn: () => {
      if (!id) throw new Error("Movie ID is required")
      return fetchMovieDetail(Number(id))
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
    .map((movie) => ({
      id: movie.id,
      mediaType: "movie" as const,
      posterPath: movie.poster_path,
      title: movie.title,
      releaseYear: movie.release_date
        ? new Date(movie.release_date).getFullYear().toString()
        : "N/A",
      voteAverage: movie.vote_average,
      overview: movie.overview,
    }))

  const recommendationItems: SimilarCardProps[] = recommendations.results
    .slice(0, 10)
    .map((movie) => ({
      id: movie.id,
      mediaType: "movie" as const,
      posterPath: movie.poster_path,
      title: movie.title,
      releaseYear: movie.release_date
        ? new Date(movie.release_date).getFullYear().toString()
        : "N/A",
      voteAverage: movie.vote_average,
      overview: movie.overview,
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
        isMovie
        recommendations={recommendationItems}
        similar={similarItems}
        video={video}
      />
    </ErrorBoundary>
  )
}

export default MovieDetailContainer
