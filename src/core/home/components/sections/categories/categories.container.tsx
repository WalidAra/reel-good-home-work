import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { usePopularMovies } from "@/hooks/use-popular-movies"
import { usePopularTVShows } from "@/hooks/use-popular-tv-shows"
import { usePopularPeople } from "@/hooks/use-popular-people"
import { CategoriesGrid } from "./categories-grid"
import { PersonCard } from "@/core/home/components/person-card"
import type { Movie, TVShow, Person } from "@/types"

type CategoryTab = "movies" | "tv-shows" | "people"

const VIEW_ALL_LINKS: Record<CategoryTab, string> = {
  movies: "/popular/movies",
  "tv-shows": "/popular/tv",
  people: "/popular/people",
}

interface CategoriesContainerProps {
  limit?: number
  onViewAllChange?: (link: string) => void
}

export function CategoriesContainer({
  limit = 10,
  onViewAllChange,
}: CategoriesContainerProps) {
  const [activeTab, setActiveTab] = useState<CategoryTab>("movies")

  const { data: moviesData, isLoading: moviesLoading } = usePopularMovies()
  const { data: tvShowsData, isLoading: tvShowsLoading } = usePopularTVShows()
  const { data: peopleData, isLoading: peopleLoading } = usePopularPeople()

  const handleTabChange = (value: string) => {
    const tab = value as CategoryTab
    setActiveTab(tab)
    onViewAllChange?.(VIEW_ALL_LINKS[tab])
  }

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange}>
      <TabsList>
        <TabsTrigger value="movies">Movies</TabsTrigger>
        <TabsTrigger value="tv-shows">TV Shows</TabsTrigger>
        <TabsTrigger value="people">People</TabsTrigger>
      </TabsList>

      <TabsContent value="movies">
        {moviesLoading ? (
          <div className="text-gray-400">Loading...</div>
        ) : (
          <CategoriesGrid
            items={(moviesData?.results.slice(0, limit) ?? []) as Movie[]}
            type="movies"
          />
        )}
      </TabsContent>

      <TabsContent value="tv-shows">
        {tvShowsLoading ? (
          <div className="text-gray-400">Loading...</div>
        ) : (
          <CategoriesGrid
            items={(tvShowsData?.results.slice(0, limit) ?? []) as TVShow[]}
            type="tv-shows"
          />
        )}
      </TabsContent>

      <TabsContent value="people">
        {peopleLoading ? (
          <div className="text-gray-400">Loading...</div>
        ) : (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {(peopleData?.results.slice(0, limit) ?? []).map(
              (person: Person) => (
                <PersonCard key={person.id} person={person} />
              )
            )}
          </div>
        )}
      </TabsContent>
    </Tabs>
  )
}
