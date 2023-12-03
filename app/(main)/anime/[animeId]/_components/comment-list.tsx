"use client";

import { Comments } from "@/types";
import { Separator } from "@/components/ui/separator";
import { CommentItem } from "./comment-item";

interface CommentListProps {
  comments: Comments[] | undefined;
  onLoadComment: () => void;
}

export const CommentList = ({ comments, onLoadComment }: CommentListProps) => {
  return (
    <div className="flex flex-col space-y-4">
      <Separator />
      <div className="flex flex-col space-y-4">
        {comments?.map((value, index) => (
          <CommentItem
            value={value}
            key={index}
            onLoadComment={onLoadComment}
          />
        ))}
      </div>
    </div>
  );
};
