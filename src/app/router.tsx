import { authRoutes } from "@/core/auth/router"
import { homeRoutes } from "@/core/home/router"
import { useRoutes } from "react-router-dom"

const AppRouter = () => {
  return useRoutes([...homeRoutes, ...authRoutes])
}

export default AppRouter
