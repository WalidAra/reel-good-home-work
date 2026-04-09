"use client"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useAuth } from "@/hooks/use-auth"
import { Loader } from "lucide-react"
import { useState } from "react"

export default function AuthDialog({
  children,
}: {
  children: React.ReactNode
}) {
  const { requestAuth } = useAuth()
  const [isPending, setIsPending] = useState<boolean>(false)

  const handleRequestAuth = async () => {
    setIsPending(true)
    try {
      await requestAuth()
    } catch {
      setIsPending(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="gap-0 p-0 [&>button:last-child]:text-white">
        <div className="p-2">
          <AspectRatio ratio={16 / 9}>
            <img
              alt="Movies"
              className="w-full rounded-md object-cover"
              src="https://i.pinimg.com/736x/b1/3d/13/b13d13a238268f924817649106ac6595.jpg"
            />
          </AspectRatio>
        </div>

        <div className="space-y-6 px-6 pt-3 pb-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Track Your Favorite Movies 🎬
            </DialogTitle>

            <DialogDescription className="text-sm text-muted-foreground">
              Sign in with your TMDB account to save favorites, build your
              watchlist, and keep track of what you've watched.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              className="w-full"
              onClick={handleRequestAuth}
              disabled={isPending}
            >
              {isPending && (
                <span className="animate-spin">
                  <Loader />
                </span>
              )}
              {isPending ? "Redirecting to TMDB…" : "Sign in with TMDB"}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}
