import { useQuery } from "@tanstack/react-query"
import { useAuth } from "@/hooks/use-auth"
import { tmdbFetch } from "@/lib/fetch"
import type { AccountStatesResponse, MediaType } from "@/types/api"

export function useAccountStates(mediaType: MediaType, mediaId: number) {
  const { isAuthenticated } = useAuth()

  return useQuery({
    queryKey: ["account-states", mediaType, mediaId],
    queryFn: () =>
      tmdbFetch<AccountStatesResponse>(
        `/${mediaType}/${mediaId}/account_states`
      ),
    enabled: isAuthenticated && !!mediaId,
  })
}
