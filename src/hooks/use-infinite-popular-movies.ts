import { useInfiniteQuery } from "@tanstack/react-query"
import { type MoviesResponse } from "@/types"
import { fetchPopularMovies } from "@/api/movies"

export function useInfinitePopularMovies() {
  return useInfiniteQuery<MoviesResponse, Error, MoviesResponse>({
    queryKey: ["movies", "popular"],
    queryFn: async ({ pageParam }) => {
      return fetchPopularMovies((pageParam as number) ?? 1)
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.page >= lastPage.total_pages) return undefined
      return lastPage.page + 1
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 2,
  })
}
