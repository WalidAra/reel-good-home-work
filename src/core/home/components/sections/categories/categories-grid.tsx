import { ShowCard, type MovieCardProps, type TVShowCardProps } from "@/core/home/components/show-card"

type CategoryType = "movies" | "tv-shows"

interface CategoriesGridProps {
  items: MovieCardProps[] | TVShowCardProps[]
  type: CategoryType
}

export function CategoriesGrid({ items }: CategoriesGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {items.map((item) => (
        <ShowCard key={item.id} {...item} />
      ))}
    </div>
  )
}