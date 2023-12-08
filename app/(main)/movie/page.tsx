import { AnimeModal } from "@/components/modal/anime-modal";
import { Banner } from "./_components/banner";
import getMovieAnime from "@/actions/get-movie-anime";
import { ModalLoading } from "@/components/modal/modal-loading";

const Movies = async () => {
  const movies = await getMovieAnime();
  return (
    <div className="flex flex-col">
      <Banner />
      {movies.length !== 0 ? <AnimeModal animes={movies} /> : <ModalLoading />}
    </div>
  );
};

export default Movies;
