import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { HomeIcon, Film, Tv, LibraryBig } from "lucide-react"
import { Link } from "react-router-dom"
import { Separator } from "@/components/ui/separator"
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { NavMain } from "./nav-main"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "My Library",
      url: "#",
      icon: LibraryBig,
      isActive: true,
      items: [
        {
          title: "History",
          url: "/history",
        },
        {
          title: "Watch later",
          url: "/watch-later",
        },
        {
          title: "liked videos",
          url: "/liked-videos",
        },
      ],
    },
  ],
}

const myData = {
  nav: [
    { name: "Home", icon: HomeIcon, href: "/" },
    { name: "Movies", icon: Film, href: "/movies" },
    { name: "TV Shows", icon: Tv, href: "/tv-shows" },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [isOpen, setIsOpen] = React.useState(true)

  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      {...props}
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {myData.nav.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    size={"lg"}
                    asChild
                    isActive={item.name === "Messages & media"}
                  >
                    <Link to={item.href}>
                      <item.icon className="size-5!" />
                      <span className="text-base">{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <Separator />

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
                <Button
                  variant="outline"
                  size="sm"
                  className="flex w-full items-center justify-center gap-2 border-[#333] text-xs font-bold text-gray-300 transition-all hover:border-[#8141F8] hover:bg-[#8141F8]/10 hover:text-[#8141F8]"
                  asChild
                >
                  <Link to="/auth/login">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                    Sign In
                  </Link>
                </Button>
              </div>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>

        <NavMain items={data.navMain} />
      </SidebarContent>
    </Sidebar>
  )
}
