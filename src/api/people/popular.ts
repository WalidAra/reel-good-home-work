import { tmdbFetch } from "@/lib/fetch"
import { type PeopleResponse } from "@/types"

export async function fetchPopularPeople(): Promise<PeopleResponse> {
  return tmdbFetch<PeopleResponse>("/person/popular", {
    params: { language: "en-US", page: "1" },
  })
}
