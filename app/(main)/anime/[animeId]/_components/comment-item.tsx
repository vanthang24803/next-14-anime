import { Comments } from "@/types";

interface CommentItemProps {
  value: Comments | undefined;
}

export const CommentItem = ({ value }: CommentItemProps) => {
  return <span className="text-[14px]">{value?.content}</span>;
};
