import { PersonCard } from "@/core/home/components/person-card"
import type { Person } from "@/types"

interface PopularPeopleGridProps {
  people: Person[]
}

export function PopularPeopleGrid({ people }: PopularPeopleGridProps) {
  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {people.map((person) => (
        <PersonCard key={person.id} person={person} />
      ))}
    </div>
  )
}
