import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./index.css"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import App from "./app"
import { BrowserRouter } from "react-router-dom"
import { QueryProvider } from "./providers/tan-stack-provider"
import { TooltipProvider } from "./components/ui/tooltip"

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
