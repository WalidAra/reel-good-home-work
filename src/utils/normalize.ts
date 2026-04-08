import type { SimilarCardProps } from "@/core/home/components/similar-card"
import type { Movie, TVShow } from "@/types"

export function normalizeMovie(movie: Movie): SimilarCardProps {
  return {
    id: movie.id,
    mediaType: "movie",
    posterPath: movie.poster_path,
    title: movie.title,
    releaseYear: movie.release_date
      ? new Date(movie.release_date).getFullYear().toString()
      : "N/A",
    voteAverage: movie.vote_average,
    overview: movie.overview,
  }
}

export function normalizeTVShow(show: TVShow): SimilarCardProps {
  return {
    id: show.id,
    mediaType: "tv",
    posterPath: show.poster_path,
    title: show.name,
    releaseYear: show.first_air_date
      ? new Date(show.first_air_date).getFullYear().toString()
      : "N/A",
    voteAverage: show.vote_average,
    overview: show.overview,
  }
}
