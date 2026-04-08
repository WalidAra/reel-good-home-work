"use client"

import { Label } from "@/components/ui/label"
import { SidebarInput } from "@/components/ui/sidebar"
import { SearchIcon } from "lucide-react"

export function SearchForm({ ...props }: React.ComponentProps<"form">) {
  return (
    <form {...props}>
      <div className="relative">
        <Label htmlFor="search" className="sr-only">
          Search
        </Label>
        <SidebarInput
          id="search"
          placeholder="Type to search..."
          className="h-9 ps-7 max-w-96 rounded-full"
        />
        <SearchIcon className="pointer-events-none absolute top-1/2 inset-s-2 size-4 -translate-y-1/2 opacity-50 select-none" />
      </div>
    </form>
  )
}
