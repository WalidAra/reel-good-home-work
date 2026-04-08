import { homeRoutes } from "@/core/home/router"
import { useRoutes } from "react-router-dom"

const AppRouter = () => {
  return useRoutes([...homeRoutes])
}

export default AppRouter
