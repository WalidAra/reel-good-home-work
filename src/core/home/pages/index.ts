import React from "react"

export const Root = React.lazy(() => import("./root"))
export const Movies = React.lazy(() => import("./movies"))
export const TVShows = React.lazy(() => import("./tv-shows"))
export const MovieDetail = React.lazy(() => import("./movie-detail"))
export const TVShowDetail = React.lazy(() => import("./tv-show-detail"))
export const Search = React.lazy(() => import("./search"))
export const WatchLater = React.lazy(() => import("./watch-later"))
export const LikedVideos = React.lazy(() => import("./liked-videos"))
export const Watched = React.lazy(() => import("./watched"))
