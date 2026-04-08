// similar-card.tsx
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Card } from "@/components/ui/card"
import { Star } from "lucide-react"
import { Link } from "react-router-dom"

export type SimilarCardProps = {
  id: number
  mediaType: "movie" | "tv"
  posterPath: string | null
  title: string
  releaseYear: string
  voteAverage: number
  overview: string
}

type Props = {
  item: SimilarCardProps
}

const SimilarCard = ({ item }: Props) => {
  const {
    id,
    mediaType,
    posterPath,
    title,
    releaseYear,
    voteAverage,
    overview,
  } = item
  const to = mediaType === "movie" ? `/movies/${id}` : `/tv-shows/${id}`
  const imageUrl = posterPath
    ? `https://image.tmdb.org/t/p/w185${posterPath}`
    : null

  return (
    <Link to={to}>
      <Card className="group flex w-full gap-4 rounded-xl p-2 transition-colors duration-200 hover:bg-[#252525]">
        <AspectRatio
          ratio={2 / 3}
          className="relative w-20 shrink-0 overflow-hidden rounded-lg bg-[#1a1a1a] shadow-md"
        >
          {imageUrl ? (
            <img
              draggable={false}
              alt={title + "-poster"}
              loading="lazy"
              width={80}
              height={120}
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              style={{ color: "transparent" }}
              src={imageUrl}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
              No image
            </div>
          )}
        </AspectRatio>

        <div className="flex min-w-0 flex-1 flex-col justify-center gap-1.5 overflow-hidden py-1">
          <h4 className="truncate pr-2 leading-snug font-medium text-white transition-colors group-hover:text-[#F6A290]">
            {title}
          </h4>
          <div className="flex items-center gap-3 text-xs text-[#9CA3AF]">
            <span>{releaseYear}</span>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 text-[#F6A290]" />
              <span className="text-white">{voteAverage.toFixed(1)}</span>
            </div>
          </div>
          <p className="mt-0.5 line-clamp-2 text-[11px] leading-relaxed text-muted-foreground">
            {overview}
          </p>
        </div>
      </Card>
    </Link>
  )
}

export default SimilarCard
