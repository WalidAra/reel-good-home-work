import { AuthContext } from "@/providers/auth"
import { useAuthStore } from "@/store/auth/slice"
import { useContext } from "react"

export const useAuth = () => {
  const ctx = useContext(AuthContext)

  const sessionId = useAuthStore((s) => s.sessionId)
  const accountId = useAuthStore((s) => s.accountId)
  const account = useAuthStore((s) => s.account)
  const isReady = useAuthStore((s) => s.isReady)
  const isAuthenticated = useAuthStore((s) => Boolean(s.sessionId))

  if (!ctx) throw new Error("useAuth must be used within an AuthProvider")

  return { ...ctx, sessionId, accountId, account, isReady, isAuthenticated }
}
