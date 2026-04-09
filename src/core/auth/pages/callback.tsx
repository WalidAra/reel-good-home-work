import { useAuth } from "@/hooks/use-auth"
import { useEffect, useRef } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"

const Callback = () => {
  const [searchParams] = useSearchParams()
  const { finalizeAuth } = useAuth()
  const called = useRef(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (called.current) return
    called.current = true

    const requestToken = searchParams.get("request_token")
    const approved = searchParams.get("approved")

    if (!requestToken || approved !== "true") {
      navigate("/")
      return
    }

    finalizeAuth(requestToken).catch(() => {
      navigate("/")
    })
  }, [])

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <p className="animate-pulse text-sm text-muted-foreground">
        Signing you in…
      </p>
    </div>
  )
}

export default Callback
