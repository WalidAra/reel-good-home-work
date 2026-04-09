import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useSidebar } from "@/components/ui/sidebar"
import { AudioWaveform, PanelLeftIcon } from "lucide-react"
import { SearchForm } from "./search-form"
import AuthDialog from "../../../auth/components/auth-dialog"
import { AuthSwitch } from "@/components/hoc/guards/auth-switch"
import UserMenu from "./site header/user-menu"


export function SiteHeader() {
  const { toggleSidebar } = useSidebar()

  return (
    <header className="sticky top-0 z-50 flex w-full items-center border-b bg-background">
      <div className="flex h-(--header-height) w-full items-center justify-between gap-2 px-4">
        <div className="flex items-center gap-2">
          <Button
            className="h-8 w-8"
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
          >
            <PanelLeftIcon />
          </Button>
          <Separator
            orientation="vertical"
            className="me-2 data-vertical:h-4 data-vertical:self-auto"
          />
          <div className="flex items-center gap-2">
            <AudioWaveform className="h-8 text-rose-500" />
            <h1 className="hidden text-lg font-semibold sm:block">ReelGood</h1>
          </div>
        </div>

        <SearchForm />

        <div className="flex items-center gap-2">
          <AuthSwitch
            authenticated={UserMenu}
            unauthenticated={() => (
              <AuthDialog>
                <Button className="rounded-full">Sign In</Button>
              </AuthDialog>
            )}
          />
        </div>
      </div>
    </header>
  )
}
