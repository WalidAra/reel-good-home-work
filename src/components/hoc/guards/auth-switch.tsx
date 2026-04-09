import { useAuth } from "@/hooks/use-auth"

type AuthSwitchProps<T extends object> = {
  authenticated: React.ComponentType<T>
  unauthenticated: React.ComponentType<T>
  props?: T
}

export function AuthSwitch<T extends object>({
  authenticated: Authenticated,
  unauthenticated: Unauthenticated,
  props = {} as T,
}: AuthSwitchProps<T>) {
  const { isAuthenticated, isReady } = useAuth()

  if (!isReady) return null

  return isAuthenticated ? (
    <Authenticated {...props} />
  ) : (
    <Unauthenticated {...props} />
  )
}
