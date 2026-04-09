import { Star } from "lucide-react"
import { IoIosPlayCircle } from "react-icons/io"
import { Link } from "react-router-dom"

export interface MovieCardProps {
  id: number
  poster_path: string | null
  title: string
  release_date: string
  vote_average: number
  vote_count: number
  genre_ids: number[]
  overview: string
  adult: boolean
  backdrop_path: string | null
  original_language: string
  original_title: string
  popularity: number
  video: boolean
}

export interface TVShowCardProps {
  id: number
  poster_path: string | null
  name: string
  first_air_date: string
  vote_average: number
  vote_count: number
  genre_ids: number[]
  overview: string
  adult: boolean
  backdrop_path: string | null
  original_language: string
  original_name: string
  popularity: number
  origin_country: string[]
}

type ShowCardProps = MovieCardProps | TVShowCardProps

const isMovie = (props: ShowCardProps): props is MovieCardProps => {
  return "title" in props
}

const GENRE_MAP: Record<number, string> = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Sci-Fi",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
}

export function ShowCard(props: ShowCardProps) {
  const title = isMovie(props) ? props.title : props.name
  const date = isMovie(props) ? props.release_date : props.first_air_date
  const linkPrefix = isMovie(props) ? "/movies" : "/tv-shows"
  const { id, poster_path, vote_average, genre_ids } = props

  const releaseYear = new Date(date).getFullYear()
  const genre = GENRE_MAP[genre_ids?.[0]] || "Unknown"

  return (
    <Link to={`${linkPrefix}/${id}`} className="group flex flex-col gap-3">
      {/* Poster */}
      <div className="relative aspect-2/3 overflow-hidden rounded-xl bg-[#252525] shadow-lg ring-1 ring-white/10">
        {poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w780${poster_path}`}
            alt={title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-500">
            No image
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <IoIosPlayCircle className="h-12 w-12 scale-90 transform text-white drop-shadow-lg transition-transform duration-300 group-hover:scale-100" />
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1">
        {/* Title + Rating */}
        <div className="flex items-start justify-between gap-2">
          <h4 className="line-clamp-1 text-sm font-bold text-white transition-colors group-hover:text-[#F6A290] sm:text-base">
            {title}
          </h4>

          <div className="flex shrink-0 items-center gap-1 rounded bg-[#252525] px-1.5 py-0.5 text-[10px] font-bold">
            <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
            <span className="text-gray-200">{vote_average.toFixed(1)}</span>
          </div>
        </div>

        {/* Year + Genre */}
        <div className="flex items-center gap-2 text-xs font-medium text-gray-400">
          <span>{releaseYear}</span>
          <span className="text-gray-600">•</span>
          <span className="line-clamp-1">{genre}</span>
        </div>
      </div>
    </Link>
  )
}