import getBXHAnime from "@/actions/get-bxh-anime";
import { AnimeTop } from "./_components/top";

const TopAnime = async () => {
  const bxh = await getBXHAnime();
  return (
    <div className="py-20">
      <AnimeTop animes={bxh} title="BẢNG XẾP HẠNG" />
    </div>
  );
};
export default TopAnime;
