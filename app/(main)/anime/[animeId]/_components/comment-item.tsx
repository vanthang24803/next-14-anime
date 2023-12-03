"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { Comments } from "@/types";
import { useUser } from "@clerk/nextjs";
import { formatDistanceToNow } from "date-fns";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Settings, Trash } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface CommentItemProps {
  value: Comments | undefined;
  onLoadComment: () => void;
}

export const CommentItem = ({ value, onLoadComment }: CommentItemProps) => {
  const { user } = useUser();

  const onRemove = async (
    animeId: string | undefined,
    id: string | undefined
  ) => {
    try {
      const respone = await axios.delete(`/api/anime/${animeId}/comment/${id}`);

      if (respone.status == 200) {
        toast.success("Comment delete successflly!");
        onLoadComment();
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex items-start space-x-4 w-full">
        <Avatar>
          <AvatarImage src={value?.avatar} className="w-10 h-10 rounded-full" />
          <AvatarFallback>{value?.authorName}</AvatarFallback>
        </Avatar>
        {user?.id == value?.author ? (
          <div className="flex items-start justify-between w-full">
            <div className="flex flex-col">
              {value?.authorName !== null ? (
                <p className="text-[14px] font-semibold">{value?.authorName}</p>
              ) : (
                <p className="text-[14px] font-semibold">another</p>
              )}

              <span className="text-[13px]">{value?.content}</span>

              <span className="text-[11px] text-neutral-500 mt-1">
                {value?.createdAt && (
                  <>
                    {formatDistanceToNow(new Date(value.createdAt), {
                      addSuffix: true,
                    })}
                  </>
                )}
              </span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button size="icon" variant="ghost">
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem className="flex items-center justify-between hover:cursor-pointer">
                  <span>Update</span>
                  <Settings className="w-4 h-4" />
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center justify-between hover:cursor-pointer"
                  onClick={() => onRemove(value?.animeId, value?.id)}
                >
                  <span>Remove</span>
                  <Trash className="w-4 h-4" />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="flex flex-col">
            {value?.authorName !== null ? (
              <p className="text-[14px] font-semibold">{value?.authorName}</p>
            ) : (
              <p className="text-[14px] font-semibold">another</p>
            )}

            <span className="text-[13px]">{value?.content}</span>

            <span className="text-[11px] text-neutral-500 mt-1">
              {value?.createdAt && (
                <>
                  {formatDistanceToNow(new Date(value.createdAt), {
                    addSuffix: true,
                  })}
                </>
              )}
            </span>
          </div>
        )}
      </div>
      <Separator className="text-neutral-500 h-[0.5px]" />
    </>
  );
};
