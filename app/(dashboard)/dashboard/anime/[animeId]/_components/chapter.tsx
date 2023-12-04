"use client";

import { Anime } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";

interface ChaptersProps {
  anime: Anime | undefined;
}

export const Chapters = ({ anime }: ChaptersProps) => {
  const router = useRouter();
  return (
    <div className="w-[1000px] border border-neutral-200 rounded-md p-8">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Views</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {anime?.chapters?.map((item, index) => (
            <TableRow
              key={index}
              onClick={() =>
                router.push(`/dashboard/anime/${anime.id}/chapter/${item.id}`)
              }
              className="hover:cursor-pointer"
            >
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell className="text-right">{item.views}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total Views Anime:</TableCell>
            <TableCell className="text-right font-bold">
              {anime?.views}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};
