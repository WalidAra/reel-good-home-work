import { ShowCard, type MovieCardProps } from "@/core/home/components/show-card"

interface PopularMoviesGridProps {
  movies: MovieCardProps[]
}

export function PopularMoviesGrid({ movies }: PopularMoviesGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {movies.map((movie) => (
        <ShowCard key={movie.id} {...movie} />
      ))}
    </div>
  )
}
