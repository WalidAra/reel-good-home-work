import { useParams } from "react-router-dom"
import DetailsLayout from "../components/layout/details-layout"

const MovieDetail = () => {
  const { id } = useParams()

  return (
    <DetailsLayout isMovie recommendations={[]} similar={[]}>
      {id}
    </DetailsLayout>
  )
}

export default MovieDetail
