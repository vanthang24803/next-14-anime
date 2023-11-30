const URL = `${process.env.BASE_URL}/api/animes`;

const getListAlimes = async () => {
  const respone = await fetch(URL);

  return respone.json();
};

export default getListAlimes;
