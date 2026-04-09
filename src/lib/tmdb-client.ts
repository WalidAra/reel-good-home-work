import { Env } from "@/config/env"


export const tmdbClient = {
  baseUrl: Env.VITE_TMDB_BASE_URL,
  apiKey: Env.VITE_TMDB_API_KEY,
  imageBaseUrl: "https://image.tmdb.org/t/p",
}
