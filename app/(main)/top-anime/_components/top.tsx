/* eslint-disable @next/next/no-img-element */
"use client";

import { Anime } from "@/types";
import { useRouter } from "next/navigation";

interface AnimeTopProps {
  animes: Anime[] | undefined;
  title?: string;
}

export const AnimeTop = ({ animes, title }: AnimeTopProps) => {
  const router = useRouter();

  return (
    <div className="flex flex-col space-y-4">
      <h1 className="text-[25px] uppercase text-red-700">{title}</h1>
      <div className="relative overflow-hidden grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {animes?.map((item, index) => (
          <div
            className="relative mt-4"
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
                <span>{item.views} lượt xem</span>
              </div>
            </div>
            <div className="absolute top-2 left-2 p-1 flex flex-col space-y-2 text-white w-[95%]">
              <p className="font-medium text-4xl text-red-500">{index + 1}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
