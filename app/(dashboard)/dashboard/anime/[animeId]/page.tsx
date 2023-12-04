import getDetailAnime from "@/actions/get-detail-anime";
import { Detail } from "./_components/detail";
import { Chapters } from "./_components/chapter";

interface AnimeIdPageProps {
  params: {
    animeId: string;
  };
}

export default async function AnimeIdPage({ params }: AnimeIdPageProps) {
  const anime = await getDetailAnime(params.animeId);

  return (
    <div className="flex flex-col space-y-6 mb-10">
      <h1 className="text-[25px] uppercase text-red-700">Anime Detail</h1>
      <Detail anime={anime} />
      <h1 className="text-[25px] uppercase text-red-700">Chapters</h1>
      <Chapters anime={anime} />
    </div>
  );
}
