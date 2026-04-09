import { useSearchParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { searchMulti } from "@/services/search.service"
import SearchResults from "@/components/search-results"
import SearchEmpty from "@/components/search-empty"

const SearchContainer = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get("q") ?? ""

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["search", query],
    queryFn: () => searchMulti(query),
    enabled: query.trim().length > 0,
    staleTime: 1000 * 60 * 5,
  })

  if (!query.trim()) return <SearchEmpty state="idle" />
  if (isLoading) return <SearchEmpty state="idle" />
  if (isError)
    return <SearchEmpty state="error" message={(error as Error).message} />
  if (!data?.results.length)
    return <SearchEmpty state="no-results" query={query} />

  return <SearchResults results={data.results} query={query} />
}

export default SearchContainer
