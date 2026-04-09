import { useParams } from "react-router-dom"
import { useSuspenseQuery } from "@tanstack/react-query"
import { ErrorBoundary } from "@/components/error-boundary"
import DetailsLayout from "@/core/home/components/layout/details-layout"
import { fetchMovieDetail } from "@/api/movies/movie.service"
import { extractTrailerKey } from "@/lib/trailer"
import { useAccountStates } from "@/hooks/use-account-states"
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

  const {
    details,
    credits,
    videos,
    watchProviders,
    similar,
    recommendations,
    images,
  } = data
  const trailerKey = extractTrailerKey(videos)

  const { data: accountState } = useAccountStates("movie", Number(id))

  const video = trailerKey
    ? {
        thumbnail: `https://img.youtube.com/vi/${trailerKey}/maxresdefault.jpg`,
        url: `https://www.youtube.com/embed/${trailerKey}`,
      }
    : { thumbnail: "", url: "" }

  const meta = `${details.runtime} min`

  const extraBadges = [
    details.original_language.toUpperCase(),
    ...(details.belongs_to_collection
      ? [`Part of ${details.belongs_to_collection.name}`]
      : []),
  ]

  const cast = credits.cast.slice(0, 15).map((c) => ({
    id: c.id,
    name: c.name,
    character: c.character,
    profilePath: c.profile_path,
  }))

  const providers = watchProviders.results?.US?.flatrate ?? []
  const watchProvidersList = providers.map((p) => ({
    provider_id: p.provider_id,
    provider_name: p.provider_name,
    logo_path: p.logo_path,
  }))

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
        mediaId={Number(id)}
        mediaType="movie"
        isLiked={accountState?.favorite ?? false}
        isAddedToWatchLater={accountState?.watchlist ?? false}
        title={details.title}
        tagline={details.tagline || null}
        overview={details.overview}
        posterPath={details.poster_path}
        genres={details.genres}
        voteAverage={details.vote_average}
        voteCount={details.vote_count}
        status={details.status}
        meta={meta}
        extraBadges={extraBadges}
        cast={cast}
        watchProviders={watchProvidersList}
        recommendations={recommendationItems}
        similar={similarItems}
        video={video}
        backdrops={images.backdrops}
      />
    </ErrorBoundary>
  )
}

export default MovieDetailContainer
