import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { SidebarGroup, SidebarGroupLabel } from "@/components/ui/sidebar"
import AuthDialog from "@/core/auth/components/auth-dialog"
import { useAuth } from "@/hooks/use-auth"
import { UserCircle } from "lucide-react"
import React from "react"

type Props = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const SubAuth = ({ isOpen, setIsOpen }: Props) => {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return null
  }
  return (
    <Collapsible open={isOpen} defaultOpen onOpenChange={setIsOpen}>
      <SidebarGroup>
        <SidebarGroupLabel>
          <CollapsibleTrigger asChild>
            <button className="flex items-center gap-1 text-xs font-medium text-gray-400 transition-colors hover:text-gray-200">
              SUBSCRIPTIONS
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`h-3 w-3 transition-transform ${isOpen ? "rotate-90" : ""}`}
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <div className="px-4 pt-4 pb-2">
            <p className="mb-1 text-sm font-medium text-gray-200">
              Don't miss out
            </p>
            <p className="mb-4 text-xs leading-relaxed text-gray-400">
              Sign in to see updates from your favorite channels.
            </p>
            <AuthDialog>
              <Button variant="outline" size="sm" className="w-full">
                <UserCircle />
                Sign In
              </Button>
            </AuthDialog>
          </div>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  )
}

export default SubAuth
