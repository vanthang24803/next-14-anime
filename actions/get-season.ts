import { Season } from "@/types";

const URL = `${process.env.BASE_URL}/api/season`;

const getSeason = async (): Promise<Season[]> => {
  const respone = await fetch(URL, { cache: "no-cache" });

  return respone.json();
};

export default getSeason;
