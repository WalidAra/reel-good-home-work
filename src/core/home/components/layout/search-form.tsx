"use client"

import { useRef } from "react"
import { useNavigate, useSearchParams, useLocation } from "react-router-dom"
import { Search } from "lucide-react"

export function SearchForm() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const inputRef = useRef<HTMLInputElement>(null)

  const value = searchParams.get("q") ?? ""

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value.trim()) {
      navigate(
        `/search?q=${encodeURIComponent(e.currentTarget.value.trim())}`,
        {
          replace: location.pathname === "/search",
        }
      )
      inputRef.current?.blur()
    }
  }

  return (
    <div className="relative flex h-9 w-56 items-center">
      <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
      <input
        ref={inputRef}
        defaultValue={value}
        key={value}
        onKeyDown={handleKeyDown}
        placeholder="Search movies, TV shows..."
        className="h-full w-full rounded-full bg-[#252525] pr-4 pl-9 text-sm text-white outline-none placeholder:text-muted-foreground"
      />
    </div>
  )
}
