const getListAlimes = async (page: any = 1) => {
  const URL = `${process.env.BASE_URL}/api/animes?page=${page}`;
  const respone = await fetch(URL, { cache: "no-cache" });

  return respone.json();
};

export default getListAlimes;
