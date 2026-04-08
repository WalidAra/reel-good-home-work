import React from "react"

export const Root = React.lazy(() => import("./root"))
export const Movies = React.lazy(() => import("./movies"))
export const TVShows = React.lazy(() => import("./tv-shows"))
export const MovieDetail = React.lazy(() => import("./movie-detail"))
export const TVShowDetail = React.lazy(() => import("./tv-show-detail"))
