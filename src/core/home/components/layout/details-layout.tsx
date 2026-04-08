import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import type { SimilarCardProps } from "../similar-card"
import SimilarCard from "../similar-card"

type Props = {
  isMovie: boolean
  recommendations: SimilarCardProps[]
  similar: SimilarCardProps[]
  video: {
    thumbnail: string
    url: string
  }
}

const DetailsLayout = ({
  isMovie = false,
  recommendations,
  similar,
  video,
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
        <main className="grid grid-cols-1 gap-3 sm:px-6 lg:grid-cols-4">
          {/* right side content */}

          <div className="flex w-full flex-col gap-6 lg:col-span-3">
            <AspectRatio
              ratio={16 / 9}
              className="group relative w-full overflow-hidden bg-background shadow-xl sm:rounded-2xl"
            >
              <div className="absolute inset-0 z-10 cursor-pointer opacity-100 transition-opacity duration-500">
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
                <div className="absolute inset-0 flex items-center justify-center">
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
                </div>
              </div>
            </AspectRatio>
          </div>

          {/* left side content */}
          <div className="col-span-1 p-4 lg:border-l">
            <div className="flex flex-col">
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
                  {similar.map((item) => (
                    <SimilarCard key={item.id} item={item} />
                  ))}
                </TabsContent>
                <TabsContent
                  value="recommendations"
                  className="flex flex-col gap-4"
                >
                  {recommendations.map((item) => (
                    <SimilarCard key={item.id} item={item} />
                  ))}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
      {/* 
      {showTrailer && (
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
      )} */}
    </div>
  )
}

export default DetailsLayout
