import { tmdbFetch } from "@/lib/fetch"
import type {
  AccountListResponse,
  AccountMediaResponse,
  AccountTVListResponse,
  MediaRating,
  MediaType,
} from "@/types/api"

const ACCOUNT_ENDPOINT = (accountId: number) => `/account/${accountId}`

export const account = {
  async getFavoriteMovies(
    accountId: number,
    page: number = 1,
    language: string = "en-US"
  ): Promise<AccountListResponse> {
    const safePage = Math.max(1, Math.min(500, Number(page) || 1))
    return tmdbFetch<AccountListResponse>(
      `${ACCOUNT_ENDPOINT(accountId)}/favorite/movies`,
      {
        params: { language, page: String(safePage) },
      }
    )
  },

  async getFavoriteTVShows(
    accountId: number,
    page: number = 1,
    language: string = "en-US"
  ): Promise<AccountTVListResponse> {
    const safePage = Math.max(1, Math.min(500, Number(page) || 1))
    return tmdbFetch<AccountTVListResponse>(
      `${ACCOUNT_ENDPOINT(accountId)}/favorite/tv`,
      {
        params: { language, page: String(safePage) },
      }
    )
  },

  async addFavorite(
    accountId: number,
    mediaType: MediaType,
    mediaId: number,
    isFavorite: boolean
  ): Promise<AccountMediaResponse> {
    return tmdbFetch<AccountMediaResponse>(
      `${ACCOUNT_ENDPOINT(accountId)}/favorite`,
      {
        method: "POST",
        body: {
          media_type: mediaType,
          media_id: mediaId,
          favorite: isFavorite,
        },
      }
    )
  },

  async getWatchlistMovies(
    accountId: number,
    page: number = 1,
    language: string = "en-US"
  ): Promise<AccountListResponse> {
    const safePage = Math.max(1, Math.min(500, Number(page) || 1))
    return tmdbFetch<AccountListResponse>(
      `${ACCOUNT_ENDPOINT(accountId)}/watchlist/movies`,
      {
        params: { language, page: String(safePage) },
      }
    )
  },

  async getWatchlistTVShows(
    accountId: number,
    page: number = 1,
    language: string = "en-US"
  ): Promise<AccountTVListResponse> {
    const safePage = Math.max(1, Math.min(500, Number(page) || 1))
    return tmdbFetch<AccountTVListResponse>(
      `${ACCOUNT_ENDPOINT(accountId)}/watchlist/tv`,
      {
        params: { language, page: String(safePage) },
      }
    )
  },

  async addToWatchlist(
    accountId: number,
    mediaType: MediaType,
    mediaId: number,
    inWatchlist: boolean
  ): Promise<AccountMediaResponse> {
    return tmdbFetch<AccountMediaResponse>(
      `${ACCOUNT_ENDPOINT(accountId)}/watchlist`,
      {
        method: "POST",
        body: {
          media_type: mediaType,
          media_id: mediaId,
          watchlist: inWatchlist,
        },
      }
    )
  },

  async getRatedMovies(
    accountId: number,
    page: number = 1,
    language: string = "en-US"
  ): Promise<AccountListResponse> {
    const safePage = Math.max(1, Math.min(500, Number(page) || 1))
    return tmdbFetch<AccountListResponse>(
      `${ACCOUNT_ENDPOINT(accountId)}/rated/movies`,
      {
        params: { language, page: String(safePage) },
      }
    )
  },

  async getRatedTVShows(
    accountId: number,
    page: number = 1,
    language: string = "en-US"
  ): Promise<AccountTVListResponse> {
    const safePage = Math.max(1, Math.min(500, Number(page) || 1))
    return tmdbFetch<AccountTVListResponse>(
      `${ACCOUNT_ENDPOINT(accountId)}/rated/tv`,
      {
        params: { language, page: String(safePage) },
      }
    )
  },

  async rateMedia(
    mediaType: MediaType,
    mediaId: number,
    rating: MediaRating
  ): Promise<AccountMediaResponse> {
    return tmdbFetch<AccountMediaResponse>(`/${mediaType}/${mediaId}/rating`, {
      method: "POST",
      body: { value: rating },
    })
  },

  async deleteMediaRating(
    mediaType: MediaType,
    mediaId: number
  ): Promise<AccountMediaResponse> {
    return tmdbFetch<AccountMediaResponse>(`/${mediaType}/${mediaId}/rating`, {
      method: "DELETE",
    })
  },
}
