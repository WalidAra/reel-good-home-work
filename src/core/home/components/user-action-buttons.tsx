import { Button } from "@/components/ui/button"
import { CardAction } from "@/components/ui/card"
import { useAddFavorite, useAddToWatchlist } from "@/hooks/use-account-media"
import { useAuth } from "@/hooks/use-auth"
import AuthDialog from "@/core/auth/components/auth-dialog"
import { Heart, Timer, Loader2 } from "lucide-react"

type Props = {
  mediaType: "movie" | "tv"
  mediaId: number
  isLiked: boolean
  isAddedToWatchLater: boolean
  className?: string
}

export default function UserActionButtons({
  mediaType,
  mediaId,
  isLiked,
  isAddedToWatchLater,
}: Props) {
  const { isAuthenticated } = useAuth()
  const addFavorite = useAddFavorite()
  const addToWatchlist = useAddToWatchlist()

  const favoritePending = addFavorite.isPending
  const watchlistPending = addToWatchlist.isPending
  const isPending = favoritePending || watchlistPending

  const handleToggleFavorite = () => {
    if (!isAuthenticated) return
    addFavorite.mutate({ mediaType, mediaId, isFavorite: !isLiked })
  }

  const handleToggleWatchlist = () => {
    if (!isAuthenticated) return
    addToWatchlist.mutate({
      mediaType,
      mediaId,
      inWatchlist: !isAddedToWatchLater,
    })
  }

  const buttons = (
    <>
      <Button
        variant={isLiked ? "default" : "outline"}
        size="icon"
        onClick={handleToggleFavorite}
        disabled={isPending}
      >
        {favoritePending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Heart className={`size-4 ${isLiked ? "fill-current" : ""}`} />
        )}
      </Button>

      <Button
        variant={isAddedToWatchLater ? "default" : "outline"}
        onClick={handleToggleWatchlist}
        disabled={isPending}
      >
        {watchlistPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <>
            <Timer className="size-4" />
            Watch later
          </>
        )}
      </Button>
    </>
  )

  if (!isAuthenticated) {
    return (
      <AuthDialog>
        <div className="flex items-center gap-2">{buttons}</div>
      </AuthDialog>
    )
  }

  return (
    <CardAction className="flex flex-row items-center gap-2">
      {buttons}
    </CardAction>
  )
}
