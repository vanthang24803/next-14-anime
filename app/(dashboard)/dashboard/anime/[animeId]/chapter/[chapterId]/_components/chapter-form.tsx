/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { Chapter } from "@/types";
import { PencilLine } from "lucide-react";
import { UpdateForm } from "./update-form";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";

interface ChapterFormProps {
  chapter: Chapter | undefined;
}

export const ChapterForm = ({ chapter }: ChapterFormProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <div className="w-[1000px] border border-neutral-200 rounded-md p-8">
      <div className="flex items-start space-x-8">
        <img
          src={chapter?.thumbnail}
          className="hidden lg:flex md:w-[200px] w-full rounded md:h-[300px] h-[400px] object-cover"
          alt="thumbnail"
        />
        <div className="flex flex-col space-y-2">
          {open == false && (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <h2 className="text-base font-bold">Name:</h2>
                <span className="text-[14px]">{chapter?.name}</span>
              </div>
              <Button size="icon" variant="primary" onClick={handleOpen}>
                <PencilLine />
              </Button>
            </div>
          )}
          {open ? (
            <UpdateForm chapter={chapter} hanldeOpen={handleOpen} />
          ) : (
            <div className="flex flex-wrap items-start space-y-4 w-[700px] overflow-x-scroll">
              <div className="flex items-start space-x-2">
                <h2 className="text-base font-bold">Title:</h2>
                <span className="text-[14px]">{chapter?.title}</span>
              </div>
              <div className="flex items-start space-x-2">
                <h2 className="text-base font-bold">Thumbnail:</h2>
                <span className="text-[14px]">{chapter?.thumbnail}</span>
              </div>

              <div className="flex items-center space-x-2">
                <h2 className="text-base font-bold">Views:</h2>
                <span className="text-[14px]">{chapter?.views}</span>
              </div>
              <div className="flex items-start space-x-2">
                <h2 className="text-base font-bold">Url:</h2>
                <span className="text-[14px]">{chapter?.url}</span>
              </div>

              <div className="flex items-center space-x-2">
                <h2 className="text-base font-bold">Create at:</h2>
                <span className="text-[14px]">
                  {chapter?.createdAt && (
                    <>
                      {formatDistanceToNow(new Date(chapter.createdAt), {
                        addSuffix: true,
                      })}
                    </>
                  )}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
