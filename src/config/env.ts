import { z } from "zod"

const envSchema = z.object({
  VITE_TMDB_API_KEY: z.string().min(1, "TMDB_API_KEY is required"),
  VITE_APP_URL: z.string().url().optional().default("http://localhost:5173"),
})

const envParseResult = envSchema.safeParse(import.meta.env)

if (!envParseResult.success) {
  const errors = envParseResult.error.issues
    .map((issue) => `${issue.path}: ${issue.message}`)
    .join("\n")
  throw new Error(`Missing or invalid environment variables:\n${errors}`)
}

export const Env = envParseResult.data as z.infer<typeof envSchema>
