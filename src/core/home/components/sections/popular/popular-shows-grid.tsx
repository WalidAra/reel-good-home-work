import {
  ShowCard,
  type MovieCardProps,
  type TVShowCardProps,
} from "@/core/home/components/show-card"

interface PopularShowsGridProps {
  movies: (MovieCardProps | TVShowCardProps)[]
}

export function PopularShowsGrid({ movies }: PopularShowsGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {movies.map((movie) => (
        <ShowCard key={movie.id} {...movie} />
      ))}
    </div>
  )
}
