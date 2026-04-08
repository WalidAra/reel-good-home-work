const TMDB_API_KEY =
  import.meta.env.VITE_TMDB_API_KEY ||
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYzc1YmU2MjdkMDdlMmRkOWI2MjllYzNhMjgzYzNlNCIsIm5iZiI6MTc3NTQ2ODQ2MS4yMzksInN1YiI6IjY5ZDM3ZmFkYzkyMmE1YmEwYTYzOTdkOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lE41KtamTeeZYtBZ_hIlBL4GLfaOKfOW7P18UYCjWkQ"
const TMDB_BASE_URL = "https://api.themoviedb.org/3"

export const tmdbClient = {
  baseUrl: TMDB_BASE_URL,
  apiKey: TMDB_API_KEY,
  imageBaseUrl: "https://image.tmdb.org/t/p",
}
