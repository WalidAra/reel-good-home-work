import { Link } from "react-router-dom"
import type { Person } from "@/types"

interface PersonCardProps {
  person: Person
}

export function PersonCard({ person }: PersonCardProps) {
  const { id, name, profile_path, known_for_department, known_for } = person

  const knownForTitle = known_for[0]?.title || known_for[0]?.name || "Unknown"

  return (
    <Link
      to={`/people/${id}`}
      className="group flex flex-col items-center gap-3"
    >
      {/* Profile Image */}
      <div className="relative aspect-square w-full overflow-hidden rounded-full bg-[#252525] ring-1 ring-white/10">
        {profile_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w185${profile_path}`}
            alt={name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-2xl font-bold text-gray-500">
            {name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col items-center gap-1 text-center">
        <h4 className="line-clamp-1 text-sm font-bold text-white transition-colors group-hover:text-[#F6A290] sm:text-base">
          {name}
        </h4>
        <p className="line-clamp-1 text-xs text-gray-400">
          {known_for_department}
        </p>
        <p className="line-clamp-1 text-xs text-gray-500">{knownForTitle}</p>
      </div>
    </Link>
  )
}
