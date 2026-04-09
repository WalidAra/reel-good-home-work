import { Env } from "@/config/env"

const TMDB_BASE_URL = Env.VITE_TMDB_API_KEY

export const tmdbClient = {
  baseUrl: TMDB_BASE_URL,
  apiKey: Env.VITE_TMDB_API_KEY,
  imageBaseUrl: "https://image.tmdb.org/t/p",
}
