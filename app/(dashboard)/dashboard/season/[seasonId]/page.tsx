/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { PencilLine, Plus, Settings } from "lucide-react";
import Link from "next/link";

interface SeasonIdProps {
  params: {
    seasonId: string;
  };
}

const SeasonId = async ({ params }: SeasonIdProps) => {
  const season = await db.season.findUnique({
    where: {
      id: params.seasonId,
    },
    include: {
      Anime: true,
    },
  });

  return (
    <div className="flex flex-col space-y-6 mb-10">
      <h1 className="text-[25px] uppercase text-red-700">Anime Season</h1>
      <div className="border border-neutral-200 rounded-md p-8 flex space-x-8 w-[1000px]">
        <img
          src={season?.thumbnail}
          alt="img"
          loading="lazy"
          className="border border-neutral-200/90 rounded-md"
        />
        <div className="flex justify-between w-full">
          <div className="flex flex-col space-y-2">
            <span>Name: {season?.name}</span>
            <Link href={`${season?.href}`}>Params : {season?.href}</Link>
          </div>
          <Button size="icon" variant="primary">
            <PencilLine />
          </Button>
        </div>
      </div>

      <div className="border border-neutral-200 rounded-md p-8 flex space-x-8 w-[1000px]">
        <div className="grid grid-cols-4 gap-6 ">
          {season?.Anime.map((item, index) => (
            <div key={index} className="block relative overflow-hidden">
              <Link
                href={`/dashboard/anime/${item.id}`}
                key={index}
                className="relative overflow-hidden "
              >
                <img
                  src={item.thumbnail || ""}
                  alt="thumbnail"
                  className="h-[300px] w-[200px] object-cover cursor-pointer duration-300 transition-transform transform origin-top hover:scale-105 hover:filter brightness-90 hover:brightness-75 rounded"
                />
                <div className="absolute right-6 top-2 p-2 text-neutral-100">
                  <Settings />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeasonId;
