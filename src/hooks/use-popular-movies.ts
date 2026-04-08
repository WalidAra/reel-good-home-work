import { useQuery } from "@tanstack/react-query"
import { fetchPopularMovies } from "@/api/movies"

export function usePopularMovies() {
  return useQuery({
    queryKey: ["popular", "movies"],
    queryFn: () => fetchPopularMovies(1),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 2,
  })
}
