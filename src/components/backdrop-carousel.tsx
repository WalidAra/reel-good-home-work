import { AspectRatio } from "@/components/ui/aspect-ratio"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import type { BackdropImage } from "@/types"

type Props = {
  backdrops: BackdropImage[]
}

const BackdropCarousel = ({ backdrops }: Props) => {
  if (!backdrops || backdrops.length === 0) return null

  const sorted = [...backdrops]
    .sort((a, b) => b.vote_average - a.vote_average)
    .slice(0, 10)

  return (
    <div className="w-full">
      <Carousel className="w-full" opts={{ align: "start", loop: true }}>
        <CarouselContent className="-ml-4">
          {sorted.map((backdrop) => (
            <CarouselItem
              key={backdrop.file_path}
              className="basis-4/5 pl-4 sm:basis-1/5"
            >
              <AspectRatio
                ratio={16 / 9}
                className="overflow-hidden rounded-xl bg-[#1a1a1a]"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w780${backdrop.file_path}`}
                  alt="backdrop"
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </AspectRatio>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
    </div>
  )
}

export default BackdropCarousel
