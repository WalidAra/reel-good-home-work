import { useQuery } from "@tanstack/react-query"
import { fetchPopularPeople } from "@/api/people"

export function usePopularPeople() {
  return useQuery({
    queryKey: ["people", "popular"],
    queryFn: fetchPopularPeople,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 2,
  })
}
