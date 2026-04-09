/* eslint-disable react-refresh/only-export-components */
import { AuthGuard } from "@/components/hoc/guards/auth-guard"
import WatchlistContainer from "@/containers/WatchlistContainer"

const WatchLater = () => {
  return <WatchlistContainer />
}

export default () => (
  <AuthGuard>
    <WatchLater />
  </AuthGuard>
)
