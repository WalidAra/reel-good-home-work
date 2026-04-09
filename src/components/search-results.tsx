import { useState } from "react"
import { Link } from "react-router-dom"
import { ShowCard } from "@/core/home/components/show-card"
import type { MultiSearchResult } from "@/services/search.service"

type Props = {
  results: MultiSearchResult[]
  query: string
}

const SearchResults = ({ results, query }: Props) => {
  const [filter, setFilter] = useState<"all" | "movie" | "tv">("all")

  const filtered = results.filter((r) => {
    if (r.media_type === "person") return false
    if (filter === "all") return true
    return r.media_type === filter
  })

  return (
    <div className="px-4 py-6 sm:px-6">
      <div className="pb-4">
        <h1 className="text-xl font-bold text-white">
          Results for <span className="text-[#F6A290]">"{query}"</span>
        </h1>
        <p className="text-sm text-muted-foreground">
          {filtered.length} results
        </p>
      </div>

      <div className="flex gap-2 pb-4">
        {(["all", "movie", "tv"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              filter === f
                ? "bg-[#F6A290] text-black"
                : "bg-[#252525] text-muted-foreground hover:text-white"
            }`}
          >
            {f === "all" ? "All" : f === "movie" ? "Movies" : "TV Shows"}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {filtered.map((item) => (
          <Link
            key={item.id}
            to={
              item.media_type === "movie"
                ? `/movies/${item.id}`
                : `/tv-shows/${item.id}`
            }
          >
            <ShowCard
              id={item.id}
              poster_path={item.poster_path}
              title={item.title || item.name || ""}
              name={item.name || item.title || ""}
              release_date={item.release_date || ""}
              first_air_date={item.first_air_date || ""}
              vote_average={item.vote_average}
              vote_count={item.vote_count}
              genre_ids={item.genre_ids}
              overview={item.overview}
              adult={item.adult}
              backdrop_path={item.backdrop_path}
              original_language={item.original_language}
              original_title={item.original_title || ""}
              original_name={item.original_name || ""}
              popularity={item.popularity}
              video={item.video || false}
              origin_country={item.origin_country || []}
            />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SearchResults
