import { useState } from "react"
import { usePopularMovies } from "@/hooks/use-popular-movies"
import { usePopularTVShows } from "@/hooks/use-popular-tv-shows"
import { usePopularPeople } from "@/hooks/use-popular-people"
import { PopularShowsGrid } from "./popular-shows-grid"
import { PopularPeopleGrid } from "./popular-people-grid"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TAB_CONFIG, type TabType } from "./popular.types"

interface PopularContainerProps {
  limit?: number
  onTabChange?: (tab: TabType) => void
}

export function PopularContainer({
  limit = 10,
  onTabChange,
}: PopularContainerProps) {
  const [activeTab, setActiveTab] = useState<TabType>("movies")

  const handleTabChange = (value: string) => {
    const tab = value as TabType
    setActiveTab(tab)
    onTabChange?.(tab)
  }

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
      <TabsList className="mb-6">
        <TabsTrigger value="movies">{TAB_CONFIG.movies.label}</TabsTrigger>
        <TabsTrigger value="tv">{TAB_CONFIG.tv.label}</TabsTrigger>
        <TabsTrigger value="people">{TAB_CONFIG.people.label}</TabsTrigger>
      </TabsList>

      <TabsContent value="movies" className="mt-0">
        <MoviesContent limit={limit} />
      </TabsContent>

      <TabsContent value="tv" className="mt-0">
        <TVShowsContent limit={limit} />
      </TabsContent>

      <TabsContent value="people" className="mt-0">
        <PeopleContent limit={limit} />
      </TabsContent>
    </Tabs>
  )
}

function MoviesContent({ limit }: { limit: number }) {
  const { data } = usePopularMovies()
  return <PopularShowsGrid movies={data?.results.slice(0, limit) ?? []} />
}

function TVShowsContent({ limit }: { limit: number }) {
  const { data } = usePopularTVShows()
  return <PopularShowsGrid movies={data?.results.slice(0, limit) ?? []} />
}

function PeopleContent({ limit }: { limit: number }) {
  const { data } = usePopularPeople()
  return <PopularPeopleGrid people={data?.results.slice(0, limit) ?? []} />
}
