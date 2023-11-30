import getBXHAnime from "@/actions/get-bxh-anime";
import { AnimeTop } from "./_components/top";
import { ModalLoading } from "@/components/modal/modal-loading";

const TopAnime = async () => {
  const bxh = await getBXHAnime();
  return (
    <div className="py-20">
      {bxh ? <AnimeTop animes={bxh} title="BẢNG XẾP HẠNG" /> : <ModalLoading />}
    </div>
  );
};
export default TopAnime;
