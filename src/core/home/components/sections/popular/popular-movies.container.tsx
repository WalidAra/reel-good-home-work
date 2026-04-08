import { useHomeMovies } from "@/hooks/use-home-movies"
import { PopularMoviesGrid } from "./popular-movies-grid"

interface PopularMoviesContainerProps {
  limit?: number
}

export function PopularMoviesContainer({
  limit = 10,
}: PopularMoviesContainerProps) {
  const { data } = useHomeMovies()

  return <PopularMoviesGrid movies={data?.results.slice(0, limit) ?? []} />
}
