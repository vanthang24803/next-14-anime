/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
"use client";

import { Anime } from "@/types";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface DetailProps {
  anime: Anime | undefined;
}

export const Detail = ({ anime }: DetailProps) => {
  const router = useRouter();
  return (
    <div className="flex flex-col md:flex-row lg:w-3/4 w-full md:space-x-4 md:space-y-0 space-y-6 md:pr-6">
      <img
        src={anime?.thumbnail}
        className="hidden lg:flex md:w-[200px] w-full rounded md:h-[300px] h-[400px] object-fill"
        alt="thumbnail"
      />
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span>Số tập:</span>
            <Button size="icon" variant="ghost">
              {anime?.episode}
            </Button>
          </div>
          <Button
            size="default"
            variant="primary"
            onClick={() =>
              router.push(`/${anime?.type?.toString().toLowerCase()}`)
            }
          >
            {anime?.type}
          </Button>
        </div>
        <div className="flex items-center space-x-4 overflow-x-auto">
          <span className="whitespace-nowrap">Thể loại:</span>
          <div className="flex items-center space-x-2">
            {anime?.categories?.map((item, index) => (
              <Button
                key={index}
                size="inline"
                variant="link"
                onClick={() =>
                  router.push(`/anime/${item.toString().toLowerCase()}`)
                }
              >
                {item}
              </Button>
            ))}
          </div>
        </div>

        <span>{anime?.description}</span>
      </div>
    </div>
  );
};
