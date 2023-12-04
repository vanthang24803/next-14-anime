import { Chapter } from "@/types";

const getChapter = async (
  animeId: string,
  chapterId: string
): Promise<Chapter> => {
  const URL = `${process.env.BASE_URL}/api/anime/${animeId}/chapter/${chapterId}`;
  const respone = await fetch(URL, { cache: "no-cache" });

  return respone.json();
};

export default getChapter;
