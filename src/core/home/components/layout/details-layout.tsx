import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Star } from "lucide-react"
import type { SimilarCardProps } from "../similar-card"
import SimilarCard from "../similar-card"
import { Badge } from "@/components/ui/badge"
import BackdropCarousel from "@/components/backdrop-carousel"
import type { BackdropImage } from "@/types"
import { Separator } from "@/components/ui/separator"
import { CardHeader, CardTitle } from "@/components/ui/card"
import UserActionButtons from "../user-action-buttons"

type Props = {
  isMovie: boolean
  mediaId: number
  mediaType: "movie" | "tv"
  isLiked: boolean
  isAddedToWatchLater: boolean
  recommendations: SimilarCardProps[]
  similar: SimilarCardProps[]
  video: {
    thumbnail: string
    url: string
  }
  title: string
  tagline: string | null
  overview: string
  posterPath: string | null
  genres: { id: number; name: string }[]
  voteAverage: number
  voteCount: number
  status: string
  meta: string
  extraBadges: string[]
  cast: {
    id: number
    name: string
    character: string
    profilePath: string | null
  }[]
  watchProviders: {
    provider_id: number
    provider_name: string
    logo_path: string
  }[]
  backdrops: BackdropImage[]
}

const getStatusColor = (status: string) => {
  if (status === "Released" || status === "Returning Series")
    return "bg-green-500/20 text-green-400"
  if (status === "Ended") return "bg-gray-500/20 text-gray-400"
  return "bg-blue-500/20 text-blue-400"
}

const DetailsLayout = ({
  isMovie = false,
  mediaId,
  mediaType,
  isLiked,
  isAddedToWatchLater,
  recommendations,
  similar,
  video,
  title,
  tagline,
  overview,
  posterPath,
  genres,
  voteAverage,
  voteCount,
  status,
  meta,
  extraBadges,
  cast,
  watchProviders,
  backdrops,
}: Props) => {
  const [showTrailer, setShowTrailer] = useState(false)

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowTrailer(false)
    }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [])

  return (
    <div className="relative w-full min-w-0 flex-1 overscroll-contain scroll-smooth bg-background">
      <div className="w-full">
        <main className="grid grid-cols-1 gap-3 px-4 sm:px-6 lg:grid-cols-4">
          <div className="flex w-full flex-col gap-6 py-4 lg:col-span-3">
            <AspectRatio
              ratio={16 / 9}
              className="group relative w-full overflow-hidden bg-background shadow-xl sm:rounded-2xl"
            >
              <div className="absolute inset-0 z-10 cursor-pointer opacity-100 transition-opacity duration-500">
                {video.thumbnail ? (
                  <img
                    alt="Video thumbnail"
                    decoding="async"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{
                      position: "absolute",
                      height: "100%",
                      width: "100%",
                      left: 0,
                      top: 0,
                      right: 0,
                      bottom: 0,
                      color: "transparent",
                    }}
                    src={video.thumbnail}
                  />
                ) : (
                  <div className="absolute inset-0 bg-[#1a1a1a]" />
                )}
                <div className="absolute inset-0 flex items-center justify-center">
                  {video.url ? (
                    <button
                      onClick={() => setShowTrailer(true)}
                      className="cursor-pointer rounded-full border border-white/50 bg-white/20 p-5 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-110"
                      aria-label="Play Trailer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                        data-slot="icon"
                        className="size-8 fill-current text-white sm:size-12"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  ) : (
                    <span className="rounded-full bg-black/50 px-4 py-2 text-sm text-white/60 backdrop-blur-sm">
                      No trailer available
                    </span>
                  )}
                </div>
              </div>
            </AspectRatio>

            {/* {Carousel pics goes here} */}
            <BackdropCarousel backdrops={backdrops} />

            <Separator />

            {/* Poster + Title */}
            <div className="flex flex-col gap-3 pb-4 md:flex-row">
              {posterPath && (
                <img
                  src={`https://image.tmdb.org/t/p/w185${posterPath}`}
                  alt={title}
                  className="hidden w-auto shrink-0 rounded-xl object-cover shadow-lg md:block md:w-40"
                />
              )}
              <div className="flex flex-col gap-1.5 pt-1 w-full">
                <CardHeader className="w-full flex flex-col lg:flex-row items-start justify-between gap-4 p-0">
                  <CardTitle className="text-3xl">{title}</CardTitle>

                  <UserActionButtons
                    mediaType={mediaType}
                    mediaId={mediaId}
                    isLiked={isLiked}
                    isAddedToWatchLater={isAddedToWatchLater}
                  />
                </CardHeader>

                <div className="flex flex-wrap gap-1.5">
                  <Badge className="h-7 rounded-full bg-muted text-foreground">
                    {meta}
                  </Badge>
                  {extraBadges.map((badge) => (
                    <Badge
                      key={badge}
                      className="h-7 rounded-full bg-muted text-foreground"
                    >
                      {badge}
                    </Badge>
                  ))}
                </div>
                {tagline && (
                  <p className="text-base text-muted-foreground italic">
                    "{tagline}"
                  </p>
                )}

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
                  <span className="font-bold text-white">
                    {voteAverage.toFixed(1)}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    ({voteCount.toLocaleString()} ratings)
                  </span>
                </div>
                <Badge
                  className={`h-7 w-fit rounded-full px-3 font-medium ${getStatusColor(status)}`}
                >
                  {status}
                </Badge>

                {/* Genres */}
                <div className="flex max-w-xs flex-wrap gap-1.5">
                  {genres.map((g) => (
                    <Badge
                      key={g.id}
                      className="text h-8 rounded-full border-0 bg-secondary px-3 font-medium text-foreground"
                    >
                      {g.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Overview */}
            <p className="line-clamp-4 text-xl leading-relaxed text-foreground">
              {overview}
            </p>

            {/* Cast */}
            {cast.length > 0 && (
              <div className="">
                <p className="pb-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                  Cast
                </p>
                <div className="flex gap-3 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden">
                  {cast.slice(0, 15).map((member) => (
                    <div
                      key={member.id}
                      className="flex w-14 shrink-0 flex-col items-center gap-1"
                    >
                      {member.profilePath ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w185${member.profilePath}`}
                          alt={member.name}
                          className="h-12 w-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#252525] text-[10px] text-muted-foreground">
                          ?
                        </div>
                      )}
                      <p className="line-clamp-2 text-center text-[10px] leading-tight text-muted-foreground">
                        {member.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Watch Providers */}
            {watchProviders.length > 0 && (
              <div className="pb-4">
                <p className="pb-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                  Where to Watch
                </p>
                <div className="flex flex-wrap gap-2">
                  {watchProviders.map((p) => (
                    <img
                      key={p.provider_id}
                      src={`https://image.tmdb.org/t/p/w92${p.logo_path}`}
                      alt={p.provider_name}
                      title={p.provider_name}
                      className="h-8 w-8 rounded-lg object-cover"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="col-span-1 p-4 lg:border-l">
            <div className="flex flex-col">
              {/* Tabs */}
              <Tabs
                className="w-full"
                defaultValue={isMovie ? "similar-movies" : "similar-tv-shows"}
              >
                <TabsList className="w-full">
                  <TabsTrigger
                    value={isMovie ? "similar-movies" : "similar-tv-shows"}
                  >
                    Similar {isMovie ? "Movies" : "TV Shows"}
                  </TabsTrigger>
                  <TabsTrigger value="recommendations">
                    Recommendations
                  </TabsTrigger>
                </TabsList>
                <TabsContent
                  value={isMovie ? "similar-movies" : "similar-tv-shows"}
                  className="flex flex-col gap-4"
                >
                  {similar.length > 0 ? (
                    similar.map((item) => (
                      <SimilarCard key={item.id} item={item} />
                    ))
                  ) : (
                    <p className="py-6 text-center text-xs text-muted-foreground">
                      No similar {isMovie ? "movies" : "TV shows"} found
                    </p>
                  )}
                </TabsContent>
                <TabsContent
                  value="recommendations"
                  className="flex flex-col gap-4"
                >
                  {recommendations.length > 0 ? (
                    recommendations.map((item) => (
                      <SimilarCard key={item.id} item={item} />
                    ))
                  ) : (
                    <p className="py-6 text-center text-xs text-muted-foreground">
                      No recommendations found
                    </p>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>

      {/* Trailer Modal */}
      {showTrailer && video.url && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setShowTrailer(false)}
        >
          <div
            className="relative w-full max-w-4xl px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute -top-10 right-4 rounded-full p-2 text-white hover:bg-white/20"
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
            <AspectRatio
              ratio={16 / 9}
              className="w-full overflow-hidden rounded-2xl"
            >
              <iframe
                src={`${video.url}?autoplay=1`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </AspectRatio>
          </div>
        </div>
      )}
    </div>
  )
}

export default DetailsLayout
