import { Anime } from "@/types";

const getDetailAnime = async (animeId: string): Promise<Anime> => {
  const URL = `${process.env.BASE_URL}/api/anime/${animeId}`;
  const respone = await fetch(URL, { cache: "no-cache" });

  return respone.json();
};

export default getDetailAnime;
