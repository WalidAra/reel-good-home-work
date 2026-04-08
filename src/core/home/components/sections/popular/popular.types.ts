export type TabType = "movies" | "tv" | "people"

export const TAB_CONFIG = {
  movies: { label: "Movies" },
  tv: { label: "TV Shows" },
  people: { label: "People" },
} as const
