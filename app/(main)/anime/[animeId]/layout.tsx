import { db } from "@/lib/db";

export async function generateMetadata({ 
    params
   }: {
    params: { animeId: string; };
   }) {
  const anime = await db.anime.findUnique({
    where: {
      id: params.animeId,
    },
  });

  return {
    title: anime?.name || "Anime",
  };
}

const AnimeIdLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default AnimeIdLayout;
