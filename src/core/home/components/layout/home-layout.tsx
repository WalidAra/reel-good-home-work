import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "./app-sidebar"
import { Outlet } from "react-router-dom"
import { SiteHeader } from "./site-header"
import { Footer7 } from "@/components/ui/footer-7"

const HomeLayout = () => {
  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset className="p-0">
            <Outlet />

            <Footer7 />
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
}

export default HomeLayout
