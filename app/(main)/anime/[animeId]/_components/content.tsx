/* eslint-disable @next/next/no-img-element */
"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Chapter } from "@/types";
import { Clapperboard } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface ContentProps {
  animeId: string | undefined;
  chapters: Chapter[] | undefined;
}

export const Content = ({ chapters, animeId }: ContentProps) => {
  const [src, setSrc] = useState("");
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const [timer, setTimer] = useState<null | NodeJS.Timeout>(null);

  const handlerSrc = (
    url: string,
    index: number,
    id: string,
    animeId: string | undefined
  ) => {
    setSrc(url);
    setSelectedIdx(index);

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
      <div className="flex items-center lg:flex-row flex-col lg:space-y-0 space-y-6">
        <div className="lg:w-3/4 w-full ">
          {src ? (
            <video
              src={src}
              autoPlay
              controls
              className="w-full lg:h-[500px] h-full object-cover rounded"
              style={{ aspectRatio: "16/9" }}
            />
          ) : (
            <div className="w-full lg:h-[500px] h-[300px]  rounded-md bg-slate-200 flex flex-col space-y-4 items-center justify-center">
              <Clapperboard className="w-24 h-24" />
              <span>Chọn tập phim bạn muốn xem !</span>
            </div>
          )}
        </div>

        <ScrollArea className="h-[500px] w-full lg:w-1/4 border border-gray-300 md:mx-4 rounded">
          <div className="flex flex-col">
            <div className="flex flex-col justify-center px-4 pt-4 pb-3 ">
              <p className="uppercase text-neutral-600 text-sm">
                Danh Sách Tập
              </p>
              <div className="bg-red-500 h-[2px] w-[120px]"></div>
            </div>
            <Separator />
            <div className="flex flex-col space-y-4 px-2 py-4">
              {chapters?.map((item, index) => (
                <div
                  className="relative overflow-hidden  flex items-center hover:cursor-pointer space-x-2 group"
                  key={index}
                  onClick={() => handlerSrc(item.url, index, item.id, animeId)}
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
      </div>
    </>
  );
};