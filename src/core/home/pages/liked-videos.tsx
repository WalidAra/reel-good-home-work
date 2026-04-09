/* eslint-disable react-refresh/only-export-components */
import { AuthGuard } from "@/components/hoc/guards/auth-guard"
import FavoritesContainer from "@/containers/FavoritesContainer"

const LikedVideos = () => {
  return <FavoritesContainer />
}

export default () => <AuthGuard>{<LikedVideos />}</AuthGuard>
