import { useEffect, useRef } from "react"
import { type Movie } from "@/types"
import { useMoviesList } from "@/hooks/use-movies-list"
import { ShowCard, type MovieCardProps } from "@/core/home/components/show-card"
import { MoviesSkeleton } from "@/core/home/components/movies/movies.skeleton"

export default function MoviesPage() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useMoviesList()

  const loadMoreRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      { threshold: 0.1 }
    )

    const currentRef = loadMoreRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage])

  if (isError) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-red-500">Error: {error?.message}</p>
      </div>
    )
  }

  const allMovies: Movie[] = data?.pages.flatMap((page) => page.results) ?? []
  const totalResults = data?.pages[0]?.total_results ?? 0

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white md:text-3xl">Movies</h1>
        <span className="text-sm text-gray-400">
          {totalResults.toLocaleString()} movies
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-6 lg:grid-cols-5 xl:grid-cols-6">
        {allMovies.map((movie: Movie) => (
          <ShowCard key={movie.id} {...(movie as unknown as MovieCardProps)} />
        ))}

        {(isLoading || isFetchingNextPage) &&
          Array.from({ length: 6 }).map((_, i) => (
            <MoviesSkeleton key={`skeleton-${i}`} />
          ))}
      </div>

      <div
        ref={loadMoreRef}
        className="flex h-10 w-full items-center justify-center"
      >
        {isFetchingNextPage && (
          <div className="flex items-center gap-2 text-gray-400">
            <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Loading more...</span>
          </div>
        )}
      </div>
    </div>
  )
}
