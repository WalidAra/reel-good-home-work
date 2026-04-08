import { HeroContainer } from "../components/sections/hero/HeroContainer"
import PopularMovies from "../components/sections/popular"

const Root = () => {
  const handleAddToLibrary = () => {
    console.log("Add to library clicked")
  }

  return (
    <div className="flex flex-1 flex-col gap-4">
      <HeroContainer onAddToLibrary={handleAddToLibrary} />

      <div className="p-4">
        <PopularMovies />
      </div>
    </div>
  )
}

export default Root
