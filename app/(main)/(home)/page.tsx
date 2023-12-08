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
import getSeason from "@/actions/get-season";

export default async function Home() {
  const album = await getSeason();
  const newAnime = await getAnime();
  const banner = await getBanner();
  const movieAlime = await getMovieAnime();
  const listAlime = await getListAlimes();
  const randomAnime = await getRandomAnime();
  return (
    <div className="flex flex-col space-y-6 lg:space-y-8">
      {banner.length > 0 && <Slide banner={banner} />}
      {newAnime.length !== 0 ? (
        <AnimeModal animes={newAnime} title="Tập Mới Nhất" />
      ) : (
        <ModalLoading />
      )}
      {album.length > 0 && <Album album={album} />}
      {movieAlime.length !== 0 ? (
        <AnimeModalSlide animes={movieAlime} title="ANIME MOVIE" />
      ) : (
        <ModalLoading />
      )}
      {randomAnime.length !== 0 ? (
        <AnimeModalSlide animes={randomAnime} title="HÔM NAY XEM GÌ" />
      ) : (
        <ModalLoading />
      )}
      {listAlime.length !== 0 ? (
        <AnimeModal animes={listAlime.items} title="TẤT CẢ ANIME" />
      ) : (
        <ModalLoading />
      )}
    </div>
  );
}
