import { useAuth } from "@/hooks/use-auth"
import { Navigate } from "react-router-dom"

type AuthGuardProps = {
  children: React.ReactNode
  fallback?: string // redirect path, defaults to "/"
}

export function AuthGuard({ children, fallback = "/" }: AuthGuardProps) {
  const { isAuthenticated, isReady } = useAuth()

  if (!isReady) return null // or a spinner

  if (!isAuthenticated) return <Navigate to={fallback} replace />

  return <>{children}</>
}
