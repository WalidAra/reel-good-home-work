import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { SimilarCardProps } from "../similar-card"
import SimilarCard from "../similar-card"
import { AspectRatio } from "@/components/ui/aspect-ratio"

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
}: Props) => {
  return (
    <div className="relative w-full min-w-0 flex-1 overscroll-contain scroll-smooth bg-background">
      <div className="w-full">
        <main className="flex flex-col gap-3 sm:px-6 sm:pt-6 lg:flex-row">
          <div className="flex w-full flex-col gap-6">
            <AspectRatio
              ratio={16 / 9}
              className="group relative w-full overflow-hidden bg-background shadow-xl sm:rounded-2xl"
            >
              <div className="absolute inset-0 z-10 cursor-pointer opacity-100 transition-opacity duration-500">
                <img
                  alt="Law & Order: Special Victims Unit"
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
                  src="https://image.tmdb.org/t/p/w1280/obtdxPgmfykYwVnvuYXC5f2xKlQ.jpg"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    className="cursor-pointer rounded-full border border-white/50 bg-white/20 p-5 shadow-xl backdrop-blur-md transition-all duration-300 group-hover:scale-110"
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
          <div className="flex flex-col">
            <Tabs
              defaultValue={isMovie ? "similar-movies" : "similar-tv-shows"}
            >
              <TabsList>
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
                  <SimilarCard item={item} />
                ))}
              </TabsContent>
              <TabsContent
                value="recommendations"
                className="flex flex-col gap-4"
              >
                {recommendations.map((item) => (
                  <SimilarCard item={item} />
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}

export default DetailsLayout
