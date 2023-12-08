import getAnime from "@/actions/get-anime";
import getBanner from "@/actions/get-banner";
import getRandomAnime from "@/actions/get-random-anime";
import getMovieAnime from "@/actions/get-movie-anime";
import getListAlimes from "@/actions/get-all-animes";

import { Slide } from "@/components/silde";
import { AnimeModal } from "@/components/modal/anime-modal";
import { AnimeModalSlide } from "@/components/modal/anime-silde-modal";

import { Album } from "./_components/album";
import { ModalLoading } from "@/components/modal/modal-loading";

export default async function Home() {
  const newAnime = await getAnime();
  const banner = await getBanner();
  const randomAnime = await getRandomAnime();
  const movieAlime = await getMovieAnime();
  const listAlime = await getListAlimes();
  return (
    <div className="flex flex-col space-y-6 lg:space-y-8">
      <Slide banner={banner} />
      {newAnime ? (
        <AnimeModal animes={newAnime} title="Tập Mới Nhất" />
      ) : (
        <ModalLoading />
      )}
      <Album />
      {movieAlime ? (
        <AnimeModalSlide animes={movieAlime} title="ANIME MOVIE" />
      ) : (
        <ModalLoading />
      )}
      {randomAnime ? (
        <AnimeModalSlide animes={randomAnime} title="HÔM NAY XEM GÌ" />
      ) : (
        <ModalLoading />
      )}
      {listAlime ? (
        <AnimeModal animes={listAlime.items} title="TẤT CẢ ANIME" />
      ) : (
        <ModalLoading />
      )}
    </div>
  );
}
