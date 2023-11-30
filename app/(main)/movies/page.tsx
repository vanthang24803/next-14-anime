import { AnimeModal } from "@/components/modal/anime-modal";
import { Banner } from "./_components/banner";
import getMovieAnime from "@/actions/get-movie-anime";

const Movies = async () => {
  const movies = await getMovieAnime();
  return (
    <div className="flex flex-col">
      <Banner />
      <AnimeModal animes={movies} />
    </div>
  );
};

export default Movies;
