import { Anime } from "@/types";

const URL = `${process.env.BASE_URL}/api/anime`;

const getAnime = async (): Promise<Anime[]> => {
  const result = await fetch(URL);

  return result.json();
};

export default getAnime;
