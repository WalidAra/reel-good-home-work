export interface Person {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  known_for: import("./known-for").KnownFor[]
  name: string
  popularity: number
  profile_path: string | null
}

export interface PeopleResponse {
  page: number
  results: Person[]
  total_pages: number
  total_results: number
}
