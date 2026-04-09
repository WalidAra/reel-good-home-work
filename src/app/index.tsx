import AuthProvider from "@/providers/auth"
import AppRouter from "./router"

const App = () => {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  )
}

export default App
