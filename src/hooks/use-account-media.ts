import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query"
import { account } from "@/api/account"
import { useAuth } from "@/hooks/use-auth"
import type {
  MediaType,
  MediaRating,
  AccountListResponse,
  AccountTVListResponse,
  AccountMoviesPagesResponse,
  AccountTVShowsPagesResponse,
} from "@/types/api"

export const useFavoriteMovies = (page?: number) => {
  const { accountId } = useAuth()
  return useQuery({
    queryKey: ["account", "favorite", "movies", accountId, page],
    queryFn: () => account.getFavoriteMovies(accountId!, page!),
    enabled: !!accountId,
  })
}

export const useInfiniteFavoriteMovies = () => {
  const { accountId } = useAuth()
  return useInfiniteQuery<
    AccountListResponse,
    Error,
    AccountMoviesPagesResponse
  >({
    queryKey: ["account", "favorite", "movies", accountId],
    queryFn: async ({ pageParam = 1 }) =>
      account.getFavoriteMovies(accountId!, pageParam as number),
    getNextPageParam: (lastPage) => {
      if (lastPage.page >= lastPage.total_pages) return undefined
      return lastPage.page + 1
    },
    initialPageParam: 1,
    enabled: !!accountId,
  })
}

export const useFavoriteTVShows = (page?: number) => {
  const { accountId } = useAuth()
  return useQuery({
    queryKey: ["account", "favorite", "tv", accountId, page],
    queryFn: () => account.getFavoriteTVShows(accountId!, page!),
    enabled: !!accountId,
  })
}

export const useInfiniteFavoriteTVShows = () => {
  const { accountId } = useAuth()
  return useInfiniteQuery<
    AccountTVListResponse,
    Error,
    AccountTVShowsPagesResponse
  >({
    queryKey: ["account", "favorite", "tv", accountId],
    queryFn: async ({ pageParam = 1 }) =>
      account.getFavoriteTVShows(accountId!, pageParam as number),
    getNextPageParam: (lastPage) => {
      if (lastPage.page >= lastPage.total_pages) return undefined
      return lastPage.page + 1
    },
    initialPageParam: 1,
    enabled: !!accountId,
  })
}

export const useAddFavorite = () => {
  const { accountId } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      mediaType,
      mediaId,
      isFavorite,
    }: {
      mediaType: MediaType
      mediaId: number
      isFavorite: boolean
    }) => account.addFavorite(accountId!, mediaType, mediaId, isFavorite),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["account", "favorite"] })
    },
  })
}

export const useWatchlistMovies = (page?: number) => {
  const { accountId } = useAuth()
  return useQuery({
    queryKey: ["account", "watchlist", "movies", accountId, page],
    queryFn: () => account.getWatchlistMovies(accountId!, page!),
    enabled: !!accountId,
  })
}

export const useInfiniteWatchlistMovies = () => {
  const { accountId } = useAuth()
  return useInfiniteQuery<
    AccountListResponse,
    Error,
    AccountMoviesPagesResponse
  >({
    queryKey: ["account", "watchlist", "movies", accountId],
    queryFn: async ({ pageParam = 1 }) =>
      account.getWatchlistMovies(accountId!, pageParam as number),
    getNextPageParam: (lastPage) => {
      if (lastPage.page >= lastPage.total_pages) return undefined
      return lastPage.page + 1
    },
    initialPageParam: 1,
    enabled: !!accountId,
  })
}

export const useWatchlistTVShows = (page?: number) => {
  const { accountId } = useAuth()
  return useQuery({
    queryKey: ["account", "watchlist", "tv", accountId, page],
    queryFn: () => account.getWatchlistTVShows(accountId!, page!),
    enabled: !!accountId,
  })
}

export const useInfiniteWatchlistTVShows = () => {
  const { accountId } = useAuth()
  return useInfiniteQuery<
    AccountTVListResponse,
    Error,
    AccountTVShowsPagesResponse
  >({
    queryKey: ["account", "watchlist", "tv", accountId],
    queryFn: async ({ pageParam = 1 }) =>
      account.getWatchlistTVShows(accountId!, pageParam as number),
    getNextPageParam: (lastPage) => {
      if (lastPage.page >= lastPage.total_pages) return undefined
      return lastPage.page + 1
    },
    initialPageParam: 1,
    enabled: !!accountId,
  })
}

export const useAddToWatchlist = () => {
  const { accountId } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      mediaType,
      mediaId,
      inWatchlist,
    }: {
      mediaType: MediaType
      mediaId: number
      inWatchlist: boolean
    }) => account.addToWatchlist(accountId!, mediaType, mediaId, inWatchlist),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["account", "watchlist"] })
    },
  })
}

export const useRatedMovies = (page?: number) => {
  const { accountId } = useAuth()
  return useQuery({
    queryKey: ["account", "rated", "movies", accountId, page],
    queryFn: () => account.getRatedMovies(accountId!, page!),
    enabled: !!accountId,
  })
}

export const useInfiniteRatedMovies = () => {
  const { accountId } = useAuth()
  return useInfiniteQuery<
    AccountListResponse,
    Error,
    AccountMoviesPagesResponse
  >({
    queryKey: ["account", "rated", "movies", accountId],
    queryFn: async ({ pageParam = 1 }) =>
      account.getRatedMovies(accountId!, pageParam as number),
    getNextPageParam: (lastPage) => {
      if (lastPage.page >= lastPage.total_pages) return undefined
      return lastPage.page + 1
    },
    initialPageParam: 1,
    enabled: !!accountId,
  })
}

export const useRatedTVShows = (page?: number) => {
  const { accountId } = useAuth()
  return useQuery({
    queryKey: ["account", "rated", "tv", accountId, page],
    queryFn: () => account.getRatedTVShows(accountId!, page!),
    enabled: !!accountId,
  })
}

export const useInfiniteRatedTVShows = () => {
  const { accountId } = useAuth()
  return useInfiniteQuery<
    AccountTVListResponse,
    Error,
    AccountTVShowsPagesResponse
  >({
    queryKey: ["account", "rated", "tv", accountId],
    queryFn: async ({ pageParam = 1 }) =>
      account.getRatedTVShows(accountId!, pageParam as number),
    getNextPageParam: (lastPage) => {
      if (lastPage.page >= lastPage.total_pages) return undefined
      return lastPage.page + 1
    },
    initialPageParam: 1,
    enabled: !!accountId,
  })
}

export const useRateMedia = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      mediaType,
      mediaId,
      rating,
    }: {
      mediaType: MediaType
      mediaId: number
      rating: MediaRating
    }) => account.rateMedia(mediaType, mediaId, rating),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["account", "rated"] })
    },
  })
}

export const useDeleteMediaRating = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      mediaType,
      mediaId,
    }: {
      mediaType: MediaType
      mediaId: number
    }) => account.deleteMediaRating(mediaType, mediaId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["account", "rated"] })
    },
  })
}
