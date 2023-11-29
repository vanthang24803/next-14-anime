import { Slide } from "@/components/silde";
import { Album } from "./_components/album";
import getAnime from "@/actions/get-alimes";

export default async function Home() {
  const animeLists = await getAnime();
  return (
    <>
      <Slide />
      <Album />
      <div className="">
        {animeLists.map((item, index) => (
          <div key={index}>
           {item.name}
          </div>
        ))}
      </div>
    </>
  );
}
