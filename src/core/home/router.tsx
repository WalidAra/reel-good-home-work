/* eslint-disable react-refresh/only-export-components */
import { Suspense } from "react"
import type { RouteObject } from "react-router-dom"
import { ErrorBoundary } from "@/components/error-boundary"
import HomeLayout from "./components/layout/home-layout"
import {
  Movies,
  Root,
  TVShows,
  MovieDetail,
  TVShowDetail,
  Search,
  LikedVideos,
  Watched,
  WatchLater,
} from "./pages"
import { GridSkeleton } from "./components/skeltons/grid-skelton"
import { DetailSkeleton } from "@/components/detail-skeleton"
import { ErrorFallback } from "@/components/error-fallback"

function ErrorFallbackWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary fallback={<ErrorFallback error={null} />}>
      {children}
    </ErrorBoundary>
  )
}

export const homeRoutes: RouteObject[] = [
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        path: "watch-later",
        element: (
          <ErrorFallbackWrapper>
            <Suspense fallback={<GridSkeleton />}>
              <WatchLater />
            </Suspense>
          </ErrorFallbackWrapper>
        ),
      },
      {
        path: "liked-videos",
        element: (
          <ErrorFallbackWrapper>
            <Suspense fallback={<GridSkeleton />}>
              <LikedVideos />
            </Suspense>
          </ErrorFallbackWrapper>
        ),
      },

      {
        path: "watched",
        element: (
          <ErrorFallbackWrapper>
            <Suspense fallback={<GridSkeleton />}>
              <Watched />
            </Suspense>
          </ErrorFallbackWrapper>
        ),
      },

      {
        path: "*",
        element: <h1>404 Not Found</h1>,
      },
      {
        index: true,
        element: <Root />,
      },
      {
        path: "movies",
        element: (
          <Suspense fallback={<GridSkeleton />}>
            <Movies />
          </Suspense>
        ),
      },
      {
        path: "movies/:id",
        element: (
          <Suspense fallback={<DetailSkeleton />}>
            <MovieDetail />
          </Suspense>
        ),
      },
      {
        path: "tv-shows",
        element: (
          <Suspense fallback={<GridSkeleton />}>
            <TVShows />
          </Suspense>
        ),
      },
      {
        path: "tv-shows/:id",
        element: (
          <Suspense fallback={<DetailSkeleton />}>
            <TVShowDetail />
          </Suspense>
        ),
      },
      {
        path: "search",
        element: (
          <Suspense fallback={<GridSkeleton />}>
            <Search />
          </Suspense>
        ),
      },
    ],
  },
]
