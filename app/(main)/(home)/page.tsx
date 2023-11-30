import getAnime from "@/actions/get-anime";
import getRandomAnime from "@/actions/get-random-anime";
import getMovieAnime from "@/actions/get-movie-anime";
import getListAlimes from "@/actions/get-all-animes";

import { Slide } from "@/components/silde";
import { AnimeModal } from "@/components/modal/anime-modal";
import { AnimeModalSlide } from "@/components/modal/anime-silde-modal";

import { Album } from "./_components/album";

export default async function Home() {
  const randomAnime = await getRandomAnime();
  const newAnime = await getAnime();
  const movieAlime = await getMovieAnime();
  const listAlime = await getListAlimes();
  return (
    <div className="flex flex-col space-y-6 lg:space-y-8">
      <Slide />
      <AnimeModal animes={newAnime} title="Tập Mới Nhất" />
      <Album />
      <AnimeModalSlide animes={movieAlime} title="ANIME MOVIE" />
      <AnimeModalSlide animes={randomAnime} title="HÔM NAY XEM GÌ" />
      <AnimeModal animes={listAlime.items} title="TẤT CẢ ANIME" />
    </div>
  );
}
