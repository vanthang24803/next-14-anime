/* eslint-disable @next/next/no-img-element */
"use client";

import axios from "axios";
import { useState } from "react";
import { Anime, Chapter } from "@/types";
import { Clapperboard } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tool } from "./tool";
import { Comment } from "./comment";

interface ContentProps {
  chapters: Chapter[] | undefined;
  anime: Anime | undefined;
}

export const Content = ({ chapters, anime }: ContentProps) => {
  const [src, setSrc] = useState("");
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [title, setTilte] = useState("");
  const [timer, setTimer] = useState<null | NodeJS.Timeout>(null);
  const [open, setOpen] = useState(true);

  const handlerSrc = (
    url: string,
    index: number,
    id: string,
    animeId: string | undefined,
    title: string
  ) => {
    setSrc(url);
    setSelectedIdx(index);
    setTilte(title);

    if (timer) {
      clearTimeout(timer);
    }

    const updateView = async (url: string, id: string, animeId: string) => {
      try {
        const response = await axios.put(`/api/anime/${animeId}/chapter/${id}`);
        if (response.status == 200) {
          console.log("success");
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (animeId) {
      const newTimer = setTimeout(() => {
        updateView(url, id, animeId);
      }, 60000);
      setTimer(newTimer);
    }
  };

  return (
    <>
      <div className="flex lg:flex-row flex-col lg:space-y-0 space-y-6">
        <div className="lg:w-3/4 w-full ">
          {src ? (
            <video
              src={src}
              autoPlay
              controls
              preload="auto"
              className="w-full lg:h-[550px] h-full object-cover rounded"
              style={{ aspectRatio: "4/3" }}
            />
          ) : (
            <div className="w-full lg:h-[550px] h-[300px]  rounded-md bg-slate-200 flex flex-col space-y-4 items-center justify-center">
              <Clapperboard className="w-24 h-24" />
              <span>Chọn tập phim bạn muốn xem !</span>
            </div>
          )}
          <div className="mt-6 flex flex-col space-y-2">
            <span className="uppercase">
              {anime?.name} {title}
            </span>
            <span className="text-[12px]">
              {Number(anime?.views).toLocaleString("en-US")} lượt xem
            </span>
            <Tool anime={anime} />
          </div>
        </div>
        {open ? (
          <ScrollArea className="h-[550px] w-full lg:w-1/4 border border-gray-300 lg:mx-4 rounded">
            <div className="flex flex-col">
              <div className="flex items-center justify-between">
                <div className="flex flex-col justify-center px-4 pt-4 pb-3 hover:cursor-pointer">
                  <p className="uppercase text-neutral-600 text-sm">
                    Danh Sách Tập
                  </p>
                  <div className="bg-red-500 h-[2px] w-[120px]"></div>
                </div>
                <div className="flex flex-col justify-center px-4 pt-4 pb-3 hover:cursor-pointer">
                  <p
                    className="uppercase text-neutral-600 text-sm"
                    onClick={() => setOpen(false)}
                  >
                    Bình luận
                  </p>
                  <div className="bg-transparent h-[2px] w-[75px]"></div>
                </div>
              </div>
              <Separator />
              <div className="flex flex-col space-y-4 px-2 py-4">
                {chapters?.map((item, index) => (
                  <div
                    className="relative overflow-hidden  flex items-center hover:cursor-pointer space-x-2 group"
                    key={index}
                    onClick={() =>
                      handlerSrc(item.url, index, item.id, anime?.id, item.name)
                    }
                  >
                    <img src={item.thumbnail} alt="img" className="w-1/3" />
                    <div
                      className={`flex flex-col space-y-1 group-hover:text-red-600 group-hover:font-medium ${
                        selectedIdx === index && "text-red-600 font-medium"
                      }`}
                    >
                      <p className="text-[14px]">
                        {item.name} - {item.title}
                      </p>
                      <p className="text-[11px] text-gray-600">
                        {item.views} views
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollArea>
        ) : (
         <div className="h-[550px] w-full lg:w-1/4 border border-gray-300 lg:mx-4 rounded">
           <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <div className="flex flex-col justify-center px-4 pt-4 pb-3 hover:cursor-pointer">
                <p
                  className="uppercase text-neutral-600 text-sm"
                  onClick={() => setOpen(true)}
                >
                  Danh Sách Tập
                </p>
                <div className="bg-transparent h-[2px] w-[120px]"></div>
              </div>
              <div className="flex flex-col justify-center px-4 pt-4 pb-3 hover:cursor-pointer">
                <p className="uppercase text-neutral-600 text-sm">Bình luận</p>
                <div className="bg-red-500 h-[2px] w-[75px]"></div>
              </div>
            </div>
            <Separator />
            <Comment anime={anime} />
          </div>
         </div>
        )}
      </div>
    </>
  );
};
