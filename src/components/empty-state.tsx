import { Bookmark, Heart, Eye } from "lucide-react"

type EmptyStateProps = {
  type: "favorites" | "watchlist" | "watched"
}

const config = {
  favorites: {
    icon: Heart,
    title: "No liked videos yet",
    description: "Videos you like will appear here.",
  },
  watchlist: {
    icon: Bookmark,
    title: "Your watchlist is empty",
    description: "Add videos to watch later.",
  },
  watched: {
    icon: Eye,
    title: "No watched videos yet",
    description: "Videos you've watched will appear here.",
  },
}

export function EmptyState({ type }: EmptyStateProps) {
  const { icon: Icon, title, description } = config[type]

  return (
    <div
      data-testid="empty-state"
      className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed p-12 text-center"
    >
      <Icon className="size-12 text-muted-foreground" />
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}
