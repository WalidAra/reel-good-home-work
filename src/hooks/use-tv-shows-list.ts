import { useInfiniteQuery } from "@tanstack/react-query"
import { type TVShowsResponse } from "@/types"
import { fetchPopularTVShows } from "@/api/tv-shows"

export function useTVShowsList() {
  return useInfiniteQuery<TVShowsResponse>({
    queryKey: ["tv-shows", "list"],
    queryFn: async ({ pageParam }) => {
      return fetchPopularTVShows((pageParam as number) ?? 1)
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
