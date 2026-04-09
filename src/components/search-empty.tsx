import { Search, AlertCircle } from "lucide-react"

type Props = {
  state: "idle" | "no-results" | "error"
  query?: string
  message?: string
}

const SearchEmpty = ({ state, query, message }: Props) => {
  return (
    <div className="flex h-[60vh] flex-col items-center justify-center gap-4 text-center">
      {state === "idle" && (
        <>
          <Search className="h-16 w-16 text-muted-foreground/50" />
          <p className="text-lg font-medium text-muted-foreground">
            Search for movies and TV shows
          </p>
          <p className="text-sm text-muted-foreground/70">
            Type in the search bar above to find what you're looking for
          </p>
        </>
      )}

      {state === "no-results" && (
        <>
          <Search className="h-16 w-16 text-muted-foreground/50" />
          <p className="text-lg font-medium text-white">
            No results for <span className="text-[#F6A290]">"{query}"</span>
          </p>
          <p className="text-sm text-muted-foreground">
            Try searching with different keywords
          </p>
        </>
      )}

      {state === "error" && (
        <>
          <AlertCircle className="h-16 w-16 text-red-500/50" />
          <p className="text-lg font-medium text-white">Something went wrong</p>
          <p className="text-sm text-muted-foreground">{message}</p>
        </>
      )}
    </div>
  )
}

export default SearchEmpty
