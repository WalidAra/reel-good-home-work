"use client"

import { useAuth } from "@/hooks/use-auth"
import { useAccountStates } from "@/hooks/use-account-states"
import {
  useAddFavorite,
  useAddToWatchlist,
  useRateMedia,
  useDeleteMediaRating,
} from "@/hooks/use-account-media"
import { cn } from "@/lib/utils"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Badge } from "@/components/ui/badge"
import AuthDialog from "@/core/auth/components/auth-dialog"
import { Star, Bookmark, Check, Loader2 } from "lucide-react"
import { useState } from "react"

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500"

export type MediaCardProps = {
  id: number
  title: string
  posterPath: string | null
  releaseDate?: string
  voteAverage?: number
  mediaType: "movie" | "tv"
}

function getYear(date?: string) {
  if (!date) return null
  return new Date(date).getFullYear()
}

function ActionButton({
  icon: Icon,
  filled,
  onClick,
  isPending,
  label,
  useAuthDialog = false,
}: {
  icon: typeof Star
  filled: boolean
  onClick: () => void
  isPending: boolean
  label: string
  useAuthDialog?: boolean
}) {
  const button = (
    <button
      type="button"
      data-testid={
        label === "Favorite"
          ? "btn-favorite"
          : label === "Watch Later"
            ? "btn-watchlist"
            : "btn-watched"
      }
      onClick={onClick}
      disabled={isPending}
      className={cn(
        "relative flex size-8 items-center justify-center rounded-md transition-colors",
        filled
          ? "text-yellow-500 hover:text-yellow-600"
          : "text-muted-foreground hover:text-foreground"
      )}
      aria-label={label}
    >
      {isPending ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <Icon className={cn("size-4", filled && "fill-current")} />
      )}
    </button>
  )

  if (useAuthDialog) {
    return <AuthDialog>{button}</AuthDialog>
  }

  return button
}

function MediaCardContent({
  id,
  title,
  posterPath,
  releaseDate,
  voteAverage,
  mediaType,
  accountState: initialAccountState,
}: MediaCardProps & {
  accountState?: {
    favorite: boolean
    watchlist: boolean
    rated: { value: number } | false
  }
}) {
  const { isAuthenticated } = useAuth()

  type AccountState = {
    favorite: boolean
    watchlist: boolean
    rated: { value: number } | false
  }

  const defaultState: AccountState = {
    favorite: false,
    watchlist: false,
    rated: false,
  }

  const [localAccountState, setLocalAccountState] =
    useState<AccountState>(defaultState)
  const accountState = initialAccountState ?? localAccountState

  const { data: fetchedAccountState } = useAccountStates(mediaType, id)

  const state = fetchedAccountState ?? accountState ?? defaultState

  const addFavorite = useAddFavorite()
  const addToWatchlist = useAddToWatchlist()
  const rateMedia = useRateMedia()
  const deleteMediaRating = useDeleteMediaRating()

  const favoritePending = addFavorite.isPending
  const watchlistPending = addToWatchlist.isPending
  const ratedPending = rateMedia.isPending || deleteMediaRating.isPending

  const handleToggleFavorite = () => {
    const isFavorite = !state.favorite
    setLocalAccountState((s) => (s ? { ...s, favorite: isFavorite } : s))
    addFavorite.mutate(
      {
        mediaType,
        mediaId: id,
        isFavorite,
      },
      {
        onError: () => {
          setLocalAccountState((s) => (s ? { ...s, favorite: !isFavorite } : s))
        },
      }
    )
  }

  const handleToggleWatchlist = () => {
    const inWatchlist = !state.watchlist
    setLocalAccountState((s) => (s ? { ...s, watchlist: inWatchlist } : s))
    addToWatchlist.mutate(
      {
        mediaType,
        mediaId: id,
        inWatchlist,
      },
      {
        onError: () => {
          setLocalAccountState((s) =>
            s ? { ...s, watchlist: !inWatchlist } : s
          )
        },
      }
    )
  }

  const handleToggleWatched = () => {
    const hasRating = state.rated !== false
    const newValue = hasRating ? false : { value: 10 }
    setLocalAccountState((s) => (s ? { ...s, rated: newValue } : s))

    if (hasRating) {
      deleteMediaRating.mutate(
        { mediaType, mediaId: id },
        {
          onError: () => {
            setLocalAccountState((s) => (s ? { ...s, rated: state.rated } : s))
          },
        }
      )
    } else {
      rateMedia.mutate(
        { mediaType, mediaId: id, rating: 10 },
        {
          onError: () => {
            setLocalAccountState((s) => (s ? { ...s, rated: false } : s))
          },
        }
      )
    }
  }

  return (
    <div
      data-testid="media-card"
      className="group/card relative flex flex-col overflow-hidden rounded-xl bg-card text-card-foreground shadow-xs ring-1 ring-foreground/10"
    >
      <AspectRatio ratio={2 / 3}>
        {posterPath ? (
          <img
            src={`${TMDB_IMAGE_BASE}${posterPath}`}
            alt={title}
            className="size-full object-cover"
          />
        ) : (
          <div className="flex size-full items-center justify-center bg-muted">
            <span className="text-muted-foreground">No poster</span>
          </div>
        )}
      </AspectRatio>

      <div className="flex flex-1 flex-col gap-2 p-3">
        <div className="flex-1">
          <h3 className="line-clamp-2 text-sm leading-tight font-medium">
            {title}
          </h3>
          {(releaseDate || voteAverage) && (
            <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
              {releaseDate && <span>{getYear(releaseDate)}</span>}
              {voteAverage && voteAverage > 0 && (
                <Badge variant="secondary" className="gap-1">
                  <Star className="size-2.5 fill-current" />
                  {voteAverage.toFixed(1)}
                </Badge>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          {isAuthenticated ? (
            <>
              <ActionButton
                icon={Star}
                filled={state.favorite}
                onClick={handleToggleFavorite}
                isPending={favoritePending}
                label="Favorite"
              />
              <ActionButton
                icon={Bookmark}
                filled={state.watchlist}
                onClick={handleToggleWatchlist}
                isPending={watchlistPending}
                label="Watch Later"
              />
              <ActionButton
                icon={Check}
                filled={state.rated !== false}
                onClick={handleToggleWatched}
                isPending={ratedPending}
                label="Watched"
              />
            </>
          ) : (
            <>
              <ActionButton
                icon={Star}
                filled={false}
                onClick={() => {}}
                isPending={false}
                label="Favorite"
                useAuthDialog
              />
              <ActionButton
                icon={Bookmark}
                filled={false}
                onClick={() => {}}
                isPending={false}
                label="Watch Later"
                useAuthDialog
              />
              <ActionButton
                icon={Check}
                filled={false}
                onClick={() => {}}
                isPending={false}
                label="Watched"
                useAuthDialog
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export function MediaCard(props: MediaCardProps) {
  return <MediaCardContent {...props} />
}
