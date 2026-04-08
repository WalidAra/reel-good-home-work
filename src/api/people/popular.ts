import { tmdbClient } from "@/lib/tmdb-client"
import { type PeopleResponse } from "@/types"

export async function fetchPopularPeople(): Promise<PeopleResponse> {
  const url = `${tmdbClient.baseUrl}/person/popular?language=en-US&page=1`

  const response = await fetch(url, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${tmdbClient.apiKey}`,
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch popular people: ${response.statusText}`)
  }

  return response.json()
}
