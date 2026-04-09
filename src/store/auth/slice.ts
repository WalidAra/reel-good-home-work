import { createStore } from "zustand/vanilla"
import { useStore } from "zustand"

export type TmdbAccount = {
  id: number
  name: string
  username: string
  avatar: {
    tmdb: { avatar_path: string | null }
  }
}

export type AuthStoreState = {
  sessionId: string | null
  accountId: number | null
  account: TmdbAccount | null
  isReady: boolean

  setSession: (sessionId: string | null) => void
  setAccountId: (accountId: number | null) => void
  setAccount: (account: TmdbAccount | null) => void
  setIsReady: (ready: boolean) => void
  logout: () => void
}

export const authStore = createStore<AuthStoreState>((set) => ({
  sessionId: null,
  accountId: null,
  account: null,
  isReady: false,

  setSession: (sessionId) => set({ sessionId }),
  setAccountId: (accountId) => set({ accountId }),
  setAccount: (account) => set({ account }),
  setIsReady: (ready) => set({ isReady: ready }),
  logout: () => set({ sessionId: null, accountId: null, account: null }),
}))

export const useAuthStore = <T>(selector: (s: AuthStoreState) => T) =>
  useStore(authStore, selector)
