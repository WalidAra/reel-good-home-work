/* eslint-disable react-refresh/only-export-components */

import React, { createContext, useCallback, useEffect, useMemo } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { authStore, type TmdbAccount } from "@/store/auth/slice"
import { tmdbFetch } from "@/lib/fetch"

export type AuthContextType = {
  requestAuth: () => Promise<void>
  finalizeAuth: (requestToken: string) => Promise<void>
  signOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | null>(null)

const LOG = (...args: unknown[]) => {
  console.log("[AuthProvider]", ...args)
}

export default function AuthProvider({ children }: React.PropsWithChildren) {
  LOG("render")

  const navigate = useNavigate()
  const queryClient = useQueryClient()

  useEffect(() => {
    LOG("ready")
    authStore.getState().setIsReady(true)
  }, [])

  const requestAuth = useCallback(async () => {
    LOG("requestAuth")

    const { request_token } = await tmdbFetch<{ request_token: string }>(
      "/authentication/token/new"
    )

    const callbackUrl = `${window.location.origin}/auth/callback`
    window.location.href =
      `https://www.themoviedb.org/authenticate/${request_token}` +
      `?redirect_to=${encodeURIComponent(callbackUrl)}`
  }, [])

  const finalizeAuth = useCallback(
    async (requestToken: string) => {
      LOG("finalizeAuth", requestToken)

      const { session_id } = await tmdbFetch<{ session_id: string }>(
        "/authentication/session/new",
        {
          method: "POST",
          body: { request_token: requestToken },
        }
      )

      authStore.getState().setSession(session_id)

      const account = await tmdbFetch<TmdbAccount>("/account")
      authStore.getState().setAccountId(account.id)
      authStore.getState().setAccount(account)

      LOG("session", session_id, "account", account)

      navigate("/", { replace: true })
    },
    [navigate]
  )

  const signOut = useCallback(async () => {
    LOG("signOut")

    const sessionId = authStore.getState().sessionId

    if (sessionId) {
      await tmdbFetch("/authentication/session", {
        method: "DELETE",
        body: { session_id: sessionId },
      }).catch(() => {})
    }

    authStore.getState().logout()
    queryClient.clear()

    navigate("/", { replace: true })
  }, [navigate, queryClient])

  const contextValue = useMemo(
    () => ({ requestAuth, finalizeAuth, signOut }),
    [requestAuth, finalizeAuth, signOut]
  )

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}
