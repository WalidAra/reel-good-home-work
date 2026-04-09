import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { HomeIcon, Film, Tv, LibraryBig } from "lucide-react"
import { Link } from "react-router-dom"
import { Separator } from "@/components/ui/separator"
import { NavMain } from "./nav-main"
import SubAuth from "./sidebar/sub-auth"

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

        <SubAuth isOpen={isOpen} setIsOpen={setIsOpen} />
        <NavMain items={data.navMain} />
      </SidebarContent>
    </Sidebar>
  )
}
