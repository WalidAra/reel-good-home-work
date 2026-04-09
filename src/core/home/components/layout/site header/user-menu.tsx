import { ChevronDownIcon, LogOutIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/hooks/use-auth"

export default function UserMenu() {
  const { signOut, account } = useAuth()

  const initials = account?.name
    ? account.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "?"

  const avatarUrl = account?.avatar?.tmdb?.avatar_path
    ? `https://image.tmdb.org/t/p/w200${account.avatar.tmdb.avatar_path}`
    : `https://api.dicebear.com/9.x/initials/svg?seed=${account?.name ?? "user"}`

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="h-auto p-0 hover:bg-transparent" variant="ghost">
          <Avatar>
            <AvatarImage alt={account?.name ?? "User"} src={avatarUrl} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <ChevronDownIcon
            aria-hidden="true"
            className="opacity-60"
            size={16}
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="max-w-64">
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="truncate text-sm font-medium text-foreground">
            {account?.name ?? "TMDB User"}
          </span>
          <span className="truncate text-xs font-normal text-muted-foreground">
            @{account?.username ?? "unknown"}
          </span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={signOut}>
          <LogOutIcon aria-hidden="true" className="opacity-60" size={16} />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
