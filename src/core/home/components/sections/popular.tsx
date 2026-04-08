import { Suspense } from "react"
import Section from "@/components/section"
import { ErrorBoundary } from "@/components/error-boundary"
import { ErrorFallback } from "@/components/error-fallback"
import { PopularMoviesSkeleton } from "./popular/popular-movies-skeleton"
import { PopularContainer } from "./popular/popular.container"
import { TAB_CONFIG, type TabType } from "./popular/popular.types"

const PopularMoviesErrorBoundary = ({
  children,
}: {
  children: React.ReactNode
}) => (
  <ErrorBoundary fallback={<ErrorFallback error={null} />}>
    {children}
  </ErrorBoundary>
)

const PopularMoviesContent = () => (
  <PopularMoviesErrorBoundary>
    <Suspense fallback={<PopularMoviesSkeleton />}>
      <PopularContainer />
    </Suspense>
  </PopularMoviesErrorBoundary>
)

const PopularMovies = () => {
  return (
    <Section title="Popular">
      <PopularMoviesContent />
    </Section>
  )
}

export default PopularMovies
export { TAB_CONFIG, type TabType }
