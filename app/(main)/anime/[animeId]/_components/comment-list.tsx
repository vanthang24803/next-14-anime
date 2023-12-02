"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Comments } from "@/types";
import { CommentItem } from "./comment-item";

interface CommentListProps {
  animeId: string | undefined;
}

export const CommentList = ({ animeId }: CommentListProps) => {
  const [comment, setComments] = useState<Comments[]>([]);

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const respone = await axios.get(`/api/anime/${animeId}/comment`);
        setComments(respone.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (animeId) {
      fetchComment();
    }
  }, [animeId]);

  return (
    <div className="flex flex-col space-y-4">
      <Separator />
      <div className="flex flex-col space-y-4">
        {comment.map((value, index) => (
          <CommentItem value={value} key={index} />
        ))}
      </div>
    </div>
  );
};
