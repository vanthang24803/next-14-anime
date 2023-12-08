/* eslint-disable @next/next/no-img-element */
"use client";

import { Season } from "@/types";
import { useRouter } from "next/navigation";

interface AlbumProps {
  album: Season[] | undefined;
}

export const Album = ({ album }: AlbumProps) => {
  const [firstAlbum, ...restOfAlbum] = album || [];
  const router = useRouter();
  return (
    <div className="flex flex-col">
      <h1 className="text-[25px] uppercase text-red-700">Bộ Sưu Tập</h1>
      <div className="md:flex hidden items-center justify-between pt-3 space-x-4">
        <div className="relative overflow-hidden w-1/3 group">
          <img
            src={firstAlbum.thumbnail}
            alt="album"
            loading="lazy"
            className="w-full object-cover cursor-pointer group-hover:scale-105 duration-300 transition-transform transform origin-top"
            onClick={() => router.push(firstAlbum.href || "")}
          />
          <div className="overlay"></div>
        </div>
        <div className="relative overflow-hidden w-2/3 grid grid-cols-4 gap-4">
          {restOfAlbum.map((item, count) => (
            <div key={count} className="overflow-hidden">
              <img
                src={item.thumbnail}
                alt="album"
                onClick={() => router.push(item.href || "")}
                loading="lazy"
                className="w-full object-cover cursor-pointer hover:scale-105 duration-300 transition-transform transform origin-top"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex md:hidden mt-2 space-x-2 overflow-x-auto">
        {album?.map((item, index) => (
          <img
            src={item.thumbnail}
            alt="album"
            key={index}
            className="w-1/2 h-auto"
            onClick={() => router.push(item.href || "")}
          />
        ))}
      </div>
    </div>
  );
};
