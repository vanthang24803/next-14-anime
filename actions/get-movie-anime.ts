import { Anime } from "@/types";

const URL = `${process.env.BASE_URL}/api/animes/movie`;

const getMovieAnime = async (): Promise<Anime[]> => {
  const respone = await fetch(URL);

  return respone.json();
};

export default getMovieAnime;
