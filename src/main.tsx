import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./index.css"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import App from "./app"
import { BrowserRouter } from "react-router-dom"
import { QueryProvider } from "./providers/tan-stack-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import { authStore } from "@/store/auth/slice"

declare global {
  interface Window {
    __authStore: typeof authStore
  }
}

if (import.meta.env.DEV) {
  window.__authStore = authStore
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <QueryProvider>
          <TooltipProvider>
            <App />
          </TooltipProvider>
        </QueryProvider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
)
