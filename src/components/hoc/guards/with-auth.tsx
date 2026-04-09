import AuthDialog from "@/core/auth/components/auth-dialog"
import { useAuth } from "@/hooks/use-auth"

export function withAuth<T extends object>(Component: React.ComponentType<T>) {
  return function WithAuth(props: T) {
    const { isAuthenticated } = useAuth()

    if (!isAuthenticated) {
      return (
        <AuthDialog>
          <Component {...props} />
        </AuthDialog>
      )
    }

    return <Component {...props} />
  }
}
