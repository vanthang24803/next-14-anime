import getDetailAnime from "@/actions/get-detail-anime";

interface AnimeIdPageProps {
  params: {
    animeId: string;
  };
}

const AnimeIdPage = async ({ params }: AnimeIdPageProps) => {
  const anime = await getDetailAnime(params.animeId);
  return <div>{anime.name}</div>;
};

export default AnimeIdPage;
