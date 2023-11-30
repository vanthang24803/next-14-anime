import getAnime from "@/actions/get-anime";
import getRandomAnime from "@/actions/get-random-anime";

import { Slide } from "@/components/silde";

import { Album } from "./_components/album";
import { AnimeNew } from "./_components/anime-new";
import { AnimeRandom } from "./_components/anime-random";

export default async function Home() {
  const randomAnime = await getRandomAnime();
  const newAnime = await getAnime();
  return (
    <div className="flex flex-col space-y-4 md:space-y-6 lg:space-y-8">
      <Slide />
      <AnimeNew animes={newAnime} />
      <Album />
      <AnimeRandom animes={randomAnime} />
    </div>
  );
}
