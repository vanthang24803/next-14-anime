import { Anime } from "@/types";

const URL = `${process.env.BASE_URL}/api/anime`;

const getAnime = async (): Promise<Anime[]> => {
  const respone = await fetch(URL);

  return respone.json();
};

export default getAnime;
