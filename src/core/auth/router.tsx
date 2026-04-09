import type { RouteObject } from "react-router-dom"
import { Callback } from "./pages"

export const authRoutes: RouteObject[] = [
  {
    path: "/auth/callback",
    element: <Callback />,
  },
]
