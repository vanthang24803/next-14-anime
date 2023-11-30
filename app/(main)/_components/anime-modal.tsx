/* eslint-disable @next/next/no-img-element */
"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Anime } from "@/types";
import { useRouter } from "next/navigation";

interface AnimeModalProps {
  animes: Anime[] | undefined;
  title : string;
}

export const AnimeModal = ({ animes, title }: AnimeModalProps) => {
  const router = useRouter();
  return (
    <div className="flex flex-col space-y-4">
      <h1 className="text-[25px] uppercase text-red-700">{title}</h1>
      {animes?.length !== 0 ? (
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
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full">
          <div className="md:grid lg:grid-cols-6 md:grid-cols-3 hidden gap-4">
            {Array(6)
              .fill(0)
              .map((i) => (
                <div className="flex flex-col" key={i}>
                  <Skeleton className="h-[35vh] md:h-[30vh] lg:h-[35vh] bg-slate-200" />
                </div>
              ))}
          </div>
          <Skeleton className="h-[30vh] bg-slate-200 block md:hidden" />
        </div>
      )}
    </div>
  );
};
