import { useQuery } from "@tanstack/react-query"
import { fetchPopularTVShows } from "@/api/tv-shows"

export function usePopularTVShows() {
  return useQuery({
    queryKey: ["tv", "popular"],
    queryFn: () => fetchPopularTVShows(1),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 2,
  })
}
