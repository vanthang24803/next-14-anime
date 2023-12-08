import { Banner } from "@/types";

const URL = `${process.env.BASE_URL}/api/banner`;

const getBanner = async (): Promise<Banner[]> => {
  const respone = await fetch(URL, { cache: "no-cache" });

  return respone.json();
};

export default getBanner;
