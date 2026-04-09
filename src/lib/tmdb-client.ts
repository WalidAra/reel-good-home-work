import { Env } from "@/config/env"

const TMDB_BASE_URL = "https://api.themoviedb.org/3"

export const tmdbClient = {
  baseUrl: TMDB_BASE_URL,
  apiKey: Env.VITE_TMDB_API_KEY,
  imageBaseUrl: "https://image.tmdb.org/t/p",
}
