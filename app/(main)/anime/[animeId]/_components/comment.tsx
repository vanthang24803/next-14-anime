"use client";

import { Anime, Comments } from "@/types";
import { CommentForm } from "./comment-from";
import { CommentList } from "./comment-list";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { on } from "events";

interface CommnetProps {
  anime: Anime | undefined;
}

export const Comment = ({ anime }: CommnetProps) => {
  const [comments, setComments] = useState<Comments[]>([]);

  const loadComments = useCallback(async () => {
    try {
      const response = await axios.get(`/api/anime/${anime?.id}/comment`);
      setComments(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [anime?.id]);

  useEffect(() => {
    if (anime?.id) {
      loadComments();
    }
  }, [anime?.id, loadComments]);

  return (
    <div className="flex flex-col space-y-4 p-4">
      <CommentForm animeId={anime?.id} onAddComment={loadComments} />
      <CommentList comments={comments} onLoadComment={loadComments} />
    </div>
  );
};
