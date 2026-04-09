"use client"

import { useState, useMemo, useEffect, useCallback } from "react"
import { Link } from "react-router-dom"
import { MediaCard } from "@/components/media-card"
import {
  useInfiniteFavoriteMovies,
  useInfiniteFavoriteTVShows,
} from "@/hooks/use-account-media"
import { GridSkeleton } from "@/core/home/components/skeltons/grid-skelton"
import { EmptyState } from "@/components/empty-state"
import { Loader2 } from "lucide-react"
import type { Movie } from "@/types"
import type { TVShow } from "@/types"

const PAGE_TITLE = "Liked Videos"

type MediaItem = Movie | TVShow

export default function FavoritesContainer() {
  const [filter, setFilter] = useState<"all" | "movie" | "tv">("all")

  const moviesQuery = useInfiniteFavoriteMovies()
  const tvShowsQuery = useInfiniteFavoriteTVShows()

  const allItems = useMemo<MediaItem[]>(() => {
    const items: MediaItem[] = []
    moviesQuery.data?.pages.forEach((p) => items.push(...p.results))
    tvShowsQuery.data?.pages.forEach((p) => items.push(...p.results))
    return items
  }, [moviesQuery.data, tvShowsQuery.data])

  const filtered = useMemo(() => {
    return allItems.filter((item) => {
      if (filter === "all") return true
      return ("title" in item ? "movie" : "tv") === filter
    })
  }, [allItems, filter])

  const isLoading = moviesQuery.isLoading || tvShowsQuery.isLoading
  const isFetchingNextPage =
    moviesQuery.isFetchingNextPage || tvShowsQuery.isFetchingNextPage
  const isEmpty = filtered.length === 0 && !isLoading

  const hasNextPage = useMemo(() => {
    if (filter === "all")
      return (moviesQuery.hasNextPage || tvShowsQuery.hasNextPage) ?? false
    if (filter === "movie") return moviesQuery.hasNextPage ?? false
    return tvShowsQuery.hasNextPage ?? false
  }, [filter, moviesQuery.hasNextPage, tvShowsQuery.hasNextPage])

  const loadMore = useCallback(() => {
    if (filter === "all") {
      moviesQuery.fetchNextPage()
      tvShowsQuery.fetchNextPage()
    } else if (filter === "movie") {
      moviesQuery.fetchNextPage()
    } else {
      tvShowsQuery.fetchNextPage()
    }
  }, [filter, moviesQuery, tvShowsQuery])

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 200
      ) {
        if (hasNextPage && !isFetchingNextPage) {
          loadMore()
        }
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [hasNextPage, isFetchingNextPage, loadMore])

  if (isLoading) {
    return (
      <div className="px-4 py-6 sm:px-6">
        <div className="pb-4">
          <h1 className="text-xl font-bold text-white">{PAGE_TITLE}</h1>
        </div>
        <GridSkeleton />
      </div>
    )
  }

  if (isEmpty) {
    return (
      <div className="px-4 py-6 sm:px-6">
        <div className="pb-4">
          <h1 className="text-xl font-bold text-white">{PAGE_TITLE}</h1>
        </div>
        <EmptyState type="favorites" />
      </div>
    )
  }

  return (
    <div className="px-4 py-6 sm:px-6">
      <div className="pb-4">
        <h1 className="text-xl font-bold text-white">{PAGE_TITLE}</h1>
        <p className="text-sm text-muted-foreground">{filtered.length} items</p>
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
        {filtered.map((item) => {
          const isMovie = "title" in item
          const id = item.id
          const title = isMovie ? item.title : item.name
          const posterPath = item.poster_path
          const releaseDate = isMovie ? item.release_date : item.first_air_date
          const voteAverage = item.vote_average

          return (
            <Link
              key={`${isMovie ? "movie" : "tv"}-${id}`}
              to={isMovie ? `/movies/${id}` : `/tv-shows/${id}`}
            >
              <MediaCard
                id={id}
                title={title}
                posterPath={posterPath}
                releaseDate={releaseDate}
                voteAverage={voteAverage}
                mediaType={isMovie ? "movie" : "tv"}
              />
            </Link>
          )
        })}
      </div>

      {isFetchingNextPage && (
        <div className="flex justify-center py-4">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </div>
      )}
    </div>
  )
}
