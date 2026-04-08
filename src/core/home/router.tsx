/* eslint-disable react-refresh/only-export-components */
import { Suspense } from "react"
import type { RouteObject } from "react-router-dom"
import HomeLayout from "./components/layout/home-layout"
import { Movies, Root, TVShows, MovieDetail, TVShowDetail } from "./pages"
import { Skeleton } from "@/components/ui/skeleton"

function GridSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4 md:gap-6 md:p-6 lg:grid-cols-5 xl:grid-cols-6">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="flex flex-col gap-3">
          <Skeleton className="aspect-2/3 overflow-hidden rounded-xl bg-[#252525]" />
          <div className="flex flex-col gap-1">
            <Skeleton className="h-5 w-3/4 rounded" />
            <Skeleton className="h-4 w-1/2 rounded" />
          </div>
        </div>
      ))}
    </div>
  )
}

function DetailSkeleton() {
  return (
    <div className="animate-pulse">
      <Skeleton className="h-[50vh] w-full" />
      <div className="flex gap-6 p-6">
        <Skeleton className="aspect-2/3 w-48 shrink-0 rounded-xl" />
        <div className="flex w-full flex-col gap-3">
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-24 w-full" />
          <div className="flex gap-2">
            <Skeleton className="h-10 w-32 rounded-lg" />
            <Skeleton className="h-10 w-32 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  )
}

export const homeRoutes: RouteObject[] = [
  {
    path: "/",
    element: <HomeLayout />,
    children: [
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
    ],
  },
]
