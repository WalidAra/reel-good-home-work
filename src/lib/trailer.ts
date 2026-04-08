import type { VideosResponse } from "@/types"

export function extractTrailerKey(videos: VideosResponse): string | null {
  const trailers = videos.results.filter(
    (v) => v.type === "Trailer" && v.site === "YouTube"
  )
  const official = trailers.find((v) => v.official)
  return (official ?? trailers[0])?.key ?? null
}
