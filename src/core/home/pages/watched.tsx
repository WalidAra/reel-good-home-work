/* eslint-disable react-refresh/only-export-components */
import { AuthGuard } from "@/components/hoc/guards/auth-guard"
import WatchedContainer from "@/containers/WatchedContainer"

const Watched = () => {
  return <WatchedContainer />
}

export default () => <AuthGuard>{<Watched />}</AuthGuard>
