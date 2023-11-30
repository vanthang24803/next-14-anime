/* eslint-disable @next/next/no-img-element */
"use client";

import { Anime } from "@/types";
import { useRouter } from "next/navigation";

interface AnimeRandomProps {
  animes: Anime[] | undefined;
}

export const AnimeRandom = ({ animes }: AnimeRandomProps) => {
  const router = useRouter();
  return (
    <div className="flex flex-col space-y-4">
      <h1 className="text-[25px] uppercase text-red-700">HÔM NAY XEM GÌ</h1>
      <div className="md:flex hidden items-center justify-between relative overflow-hidden space-x-2">
        {animes?.map((item, index) => (
          <div
            className="relative"
            key={index}
            onClick={() => router.push(`/anime/${item.id}`)}
          >
            <img
              src={item.thumbnail}
              alt={item.name?.toString()}
              className="w-full lg:h-[300px] md:h-[250px] h-[220px] object-cover cursor-pointer duration-300 transition-transform transform origin-top hover:scale-105 hover:filter brightness-90 hover:brightness-75"
            />
            <div className="absolute bottom-2 left-2 p-1 flex flex-col space-y-2 text-white w-[95%]">
              <p className=" font-bold">{item.name}</p>
              <div className="flex justify-between items-center text-sm font-medium">
                <span>Tập {item.episode}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full flex md:hidden space-x-3 overflow-x-auto">
        {animes?.map((item, index) => (
          <div key={index} className="relative flex-shrink-0 group">
            <img
              src={item.thumbnail}
              alt={item.name?.toString()}
              className="w-full h-[220px] object-cover cursor-pointer duration-300 transition-transform transform origin-top hover:scale-105 hover:filter brightness-90 hover:brightness-75"
            />
            <div className="absolute bottom-2 left-2 p-1 flex flex-col space-y-2 text-white w-[95%]">
              <p className=" font-bold capitalize">{item.name}</p>
              <div className="flex justify-between items-center text-sm font-medium">
                <span>Tập {item.episode}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
