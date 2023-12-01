import getDetailAnime from "@/actions/get-detail-anime";
import { Detail } from "./_components/detail";
import getRandomAnime from "@/actions/get-random-anime";
import { AnimeModalSlide } from "@/components/modal/anime-silde-modal";
import { ModalLoading } from "@/components/modal/modal-loading";
import { Content } from "./_components/content";

interface AnimeIdPageProps {
  params: {
    animeId: string;
  };
}

const AnimeIdPage = async ({ params }: AnimeIdPageProps) => {
  const anime = await getDetailAnime(params.animeId);
  const randomAnime = await getRandomAnime();
  return (
    <div className="flex flex-col space-y-6 md:space-y-10">
      <Content chapters={anime.chapters} />
      <Detail anime={anime} />
      {randomAnime ? (
        <AnimeModalSlide animes={randomAnime} title="HÔM NAY XEM GÌ" />
      ) : (
        <ModalLoading />
      )}
    </div>
  );
};

export default AnimeIdPage;
