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
    // <Link to={to}>
    //   <Card className="flex-row">
    //     <AspectRatio
    //       ratio={2 / 3}
    //       className="relative w-20 shrink-0 overflow-hidden rounded-lg bg-[#1a1a1a] shadow-md"
    //     >
    //       {imageUrl ? (
    //         <img
    //           draggable={false}
    //           alt={title + "-poster"}
    //           loading="lazy"
    //           height={120}
    //           width={'auto'}
    //           decoding="async"
    //           className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
    //           style={{ color: "transparent" }}
    //           src={imageUrl}
    //         />
    //       ) : (
    //         <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
    //           No image
    //         </div>
    //       )}
    //     </AspectRatio>

    //     <div className="">
    //       <h4 className="truncate pr-2 font-medium leading-snug text-white transition-colors group-hover:text-[#F6A290]">
    //         {title}
    //       </h4>
    //       <div className="flex items-center gap-3 text-xs text-[#9CA3AF]">
    //         <span>{releaseYear}</span>
    //         <div className="flex items-center gap-1">
    //           <Star className="h-3 w-3 text-[#F6A290]" />
    //           <span className="text-white">{voteAverage.toFixed(1)}</span>
    //         </div>
    //       </div>
    //       <p className="mt-0.5 line-clamp-2 text-[11px] leading-relaxed text-muted-foreground">
    //         {overview}
    //       </p>
    //     </div>
    //   </Card>
    // </Link>

    <Link
      className="group flex w-full gap-4 rounded-xl p-2 transition-colors duration-200 hover:bg-[#252525]"
      to={to}
    >
      <div className="relative aspect-2/3 w-20 shrink-0 overflow-hidden rounded-lg bg-[#1a1a1a] shadow-md">
        {imageUrl ? (
          <img
            draggable="false"
            alt={title + "-poster"}
            loading="lazy"
            width={80}
            height={120}
            decoding="async"
            data-nimg={1}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            style={{ color: "transparent" }}
            src={imageUrl}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-[#555]">
            No image
          </div>
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-1.5 overflow-hidden py-1">
        <h4 className="truncate pr-2 leading-snug font-medium text-white transition-colors group-hover:text-[#F6A290]">
          {title}
        </h4>
        <div className="flex items-center gap-3 text-xs text-[#9CA3AF]">
          <div className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              data-slot="icon"
              className="size-3.5 text-[#555]"
            >
              <path
                fillRule="evenodd"
                d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
                clipRule="evenodd"
              />
            </svg>
            <span>{releaseYear}</span>
          </div>
          <div className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              data-slot="icon"
              className="size-3.5 text-[#FDC943]"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-white">{voteAverage.toFixed(1)}</span>
          </div>
        </div>
        <p className="mt-0.5 line-clamp-2 text-[11px] leading-relaxed text-[#555]">
          {overview}
        </p>
      </div>
    </Link>
  )
}

export default SimilarCard
