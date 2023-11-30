import { Anime } from "@/types";

const URL = `${process.env.BASE_URL}/api/anime`;

const getAnime = async (): Promise<Anime[]> => {
  const respone = await fetch(URL, { cache: "no-cache" });

  return respone.json();
};

export default getAnime;
