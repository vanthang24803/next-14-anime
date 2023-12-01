/* eslint-disable @next/next/no-img-element */
"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Chapter } from "@/types";
import { useState } from "react";

interface ContentProps {
  chapters: Chapter[] | undefined;
}

export const Content = ({ chapters }: ContentProps) => {
  const [src, setSrc] = useState("");

  const handlerSrc = (url: string) => {
    setSrc(url);
  };

  return (
    <>
      <div className="flex items-center lg:flex-row flex-col lg:space-y-0 space-y-6">
        <div className="lg:w-3/4 w-full ">
          <video
            src={src}
            autoPlay
            controls
            className="w-full lg:h-[500px] h-full object-cover rounded"
            style={{ aspectRatio: "16/9" }}
          />
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
                  onClick={() => handlerSrc(item.url)}
                >
                  <img src={item.thumbnail} alt="img" className="w-1/3" />
                  <div
                    className={`flex flex-col space-y-1 group-hover:text-red-600 group-hover:font-medium ${
                      src && "text-red-600 font-medium"
                    }`}
                  >
                    <p className="text-[14px]">
                      {item.name} {item.title}
                    </p>
                    <p className="text-[11px] text-gray-600">0 views</p>
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
