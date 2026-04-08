import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

export interface Genre {
  id: number
  name: string
}

export interface HeroProps {
  title: string
  overview: string
  backdropPath: string
  genres: Genre[]
  trailerKey: string | null
  voteAverage: number
  mediaType: "movie" | "tv"
  onAddToLibrary: () => void
}

function TrailerModal({
  isOpen,
  trailerKey,
  onClose,
}: {
  isOpen: boolean
  trailerKey: string | null
  onClose: () => void
}) {
  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleEscape)
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = ""
    }
  }, [isOpen, onClose])

  if (!isOpen || !trailerKey) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <div
        className="relative aspect-video w-full max-w-4xl overflow-hidden rounded-lg bg-black"
        onClick={(e) => e.stopPropagation()}
      >
        <iframe
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
          title="Trailer"
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  )
}

export function Hero({
  title,
  overview,
  backdropPath,
  genres,
  trailerKey,
  voteAverage,
  mediaType,
  onAddToLibrary,
}: HeroProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div className="relative h-[85vh] min-h-150 w-full overflow-hidden bg-black text-white">
        <div className="absolute inset-0 h-full w-full">
          <img
            alt={title}
            draggable="false"
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover object-center md:object-top"
            sizes="(max-width: 768px) 100vw, (max-width: 1536px) 100vw, 1536px"
            src={`https://image.tmdb.org/t/p/original${backdropPath}`}
          />
          <div className="pointer-events-none absolute inset-0 bg-white/5 mix-blend-overlay" />
        </div>
        <div className="absolute inset-0 z-10 max-md:bg-black/40 md:bg-linear-to-r md:from-black md:via-black/50 md:to-transparent" />
        <div className="absolute inset-0 z-10 bg-linear-to-t from-black via-transparent to-transparent" />

        <div className="absolute inset-0 z-20 flex flex-col justify-end px-6 pb-12 md:px-16 md:pb-16 lg:px-24">
          <div className="flex w-full max-w-4xl items-end justify-between gap-8">
            <div className="flex-1 space-y-4">
              <div className="flex flex-wrap items-center gap-3 text-sm font-medium tracking-wide text-gray-300">
                <span className="rounded border border-white/30 bg-black/30 px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase backdrop-blur-md">
                  {mediaType === "movie" ? "Movie" : "TV Show"}
                </span>
                <span className="text-xs font-bold tracking-widest text-[#F6A290] uppercase">
                  🔥 Trending #1
                </span>
                <span className="hidden text-gray-500 sm:inline">•</span>
                <div className="flex flex-wrap gap-2">
                  {genres.slice(0, 3).map((genre) => (
                    <span
                      key={genre.id}
                      className="rounded-full bg-[#252525] px-3 py-1 text-xs font-medium text-gray-200"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>

              <h1 className="text-4xl leading-[1.1] font-black tracking-tight drop-shadow-2xl sm:text-5xl md:text-7xl md:leading-[0.95] lg:text-8xl">
                {title}
              </h1>

              <p className="line-clamp-3 max-w-[500px] text-base leading-relaxed text-gray-300 drop-shadow-lg sm:text-lg md:text-xl">
                {overview}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Button
                  onClick={() => setIsModalOpen(true)}
                  disabled={!trailerKey}
                  className="group flex gap-3 rounded-xl bg-white px-6 py-3.5 font-bold text-black shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 md:px-8 md:py-4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5 transition-colors group-hover:text-[#8141F8] md:h-6 md:w-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Watch Trailer</span>
                </Button>

                <Button
                  onClick={onAddToLibrary}
                  variant="outline"
                  className="group flex gap-3 rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 font-bold text-white backdrop-blur-md hover:bg-white/20 md:px-8 md:py-4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5 text-gray-300 group-hover:text-white md:h-6 md:w-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Add to Library</span>
                </Button>
              </div>
            </div>

            <div className="hidden shrink-0 md:block">
              <div className="flex items-center gap-2 rounded-lg bg-black/40 px-3 py-2 backdrop-blur-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#F6A290"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-lg font-bold">
                  {voteAverage.toFixed(1)}
                </span>
                <span className="text-sm text-gray-400">/ 10</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <TrailerModal
        isOpen={isModalOpen}
        trailerKey={trailerKey}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}

export function HeroSkeleton() {
  return (
    <div className="relative h-[85vh] min-h-150 w-full overflow-hidden bg-black">
      <Skeleton className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 z-10 bg-black/40" />
      <div className="absolute inset-0 z-20 flex flex-col justify-end px-6 pb-12 md:px-16 md:pb-16 lg:px-24">
        <div className="max-w-3xl space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <Skeleton className="h-5 w-16 rounded" />
            <Skeleton className="h-5 w-20 rounded" />
            <Skeleton className="h-5 w-16 rounded" />
          </div>
          <Skeleton className="h-16 w-3/4 rounded" />
          <Skeleton className="h-8 w-full rounded" />
          <Skeleton className="h-8 w-5/6 rounded" />
          <Skeleton className="h-8 w-4/6 rounded" />
          <div className="flex gap-4 pt-4">
            <Skeleton className="h-12 w-40 rounded-xl" />
            <Skeleton className="h-12 w-40 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  )
}
