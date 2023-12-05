/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { Anime } from "@/types";
import { PencilLine, Plus } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { UpdateForm } from "./update-form";
import { useRouter } from "next/navigation";

interface DetailProps {
  anime: Anime | undefined;
}

export const Detail = ({ anime }: DetailProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const router = useRouter();

  return (
    <div className="w-[1000px] border border-neutral-200 rounded-md p-8">
      <div className="flex items-start space-x-8">
        <img
          src={anime?.thumbnail}
          className="hidden lg:flex md:w-[200px] w-full rounded md:h-[300px] h-[400px] object-fill"
          alt="thumbnail"
        />

        <div className="flex flex-col space-y-2">
          {open == false && (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <h2 className="text-base font-bold">Name:</h2>
                <span className="text-[14px]">{anime?.name}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Button size="icon" variant="outline" onClick={handleOpen}>
                  <PencilLine />
                </Button>
                <Button
                  size="icon"
                  variant="primary"
                  onClick={() =>
                    router.push(`/dashboard/anime/${anime?.id}/chapter`)
                  }
                >
                  <Plus />
                </Button>
              </div>
            </div>
          )}
          {open ? (
            <UpdateForm anime={anime} hanldeOpen={handleOpen} />
          ) : (
            <>
              <div className="flex items-center space-x-2">
                <h2 className="text-base font-bold">Type:</h2>
                <span className="text-[14px]">{anime?.type}</span>
              </div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base font-bold">Category:</h2>
                {anime?.categories?.map((item, index) => (
                  <span className="text-[14px]" key={index}>
                    {item}
                  </span>
                ))}
              </div>
              <div className="flex items-start space-x-2">
                <h2 className="text-base font-bold">Description:</h2>
                <span className="text-[14px]">{anime?.description}</span>
              </div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base font-bold">Views:</h2>
                <span className="text-[14px]">{anime?.views}</span>
              </div>

              <div className="flex items-center space-x-2">
                <h2 className="text-base font-bold">Chapters:</h2>
                <span className="text-[14px]">{anime?.chapters?.length}</span>
              </div>

              <div className="flex items-center space-x-2">
                <h2 className="text-base font-bold">Create at:</h2>
                <span className="text-[14px]">
                  {anime?.creatAt && (
                    <>
                      {formatDistanceToNow(new Date(anime.creatAt), {
                        addSuffix: true,
                      })}
                    </>
                  )}
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
