import { Anime } from "@/types";
import { CommentForm } from "./comment-from";
import { CommentList } from "./comment-list";

interface ContentProps {
  anime: Anime | undefined;
}

export const Comment = ({ anime }: ContentProps) => {
  return (
    <div className="flex flex-col space-y-4 p-4">
      <CommentForm animeId={anime?.id} />
      <CommentList animeId={anime?.id} />
    </div>
  );
};
