"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import AuthDialog from "@/core/auth/components/auth-dialog"
import { useAuth } from "@/hooks/use-auth"
import { Link } from "react-router-dom"

type SubNavItem = { title: string; url: string }
type NavItem = {
  title: string
  url: string
  icon: LucideIcon
  isActive?: boolean
  items?: SubNavItem[]
}

function SubNavMain({ url, title }: SubNavItem) {
  const { isAuthenticated } = useAuth()

  const button = (
    <SidebarMenuSubButton size="md" asChild>
      <Link to={isAuthenticated ? url : "/"}>
        <span className="text-base">{title}</span>
      </Link>
    </SidebarMenuSubButton>
  )

  if (!isAuthenticated) {
    return <AuthDialog>{button}</AuthDialog>
  }

  return button
}

function NavMenuButton({ url, icon: Icon, title }: Omit<NavItem, "items">) {
  const { isAuthenticated } = useAuth()

  const button = (
    <SidebarMenuButton size="lg" asChild tooltip={title}>
      <a href={isAuthenticated ? url : undefined}>
        <Icon className="size-5!" />
        <span className="text-base">{title}</span>
      </a>
    </SidebarMenuButton>
  )

  if (!isAuthenticated) {
    return <AuthDialog>{button}</AuthDialog>
  }

  return button
}

export function NavMain({ items }: { items: NavItem[] }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
            <SidebarMenuItem>
              <NavMenuButton
                url={item.url}
                icon={item.icon}
                title={item.title}
              />

              {(item.items?.length ?? 0) ? (
                <>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuAction className="data-[state=open]:rotate-90">
                      <ChevronRight />
                      <span className="sr-only">Toggle</span>
                    </SidebarMenuAction>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SubNavMain url={subItem.url} title={subItem.title} />
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </>
              ) : null}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
