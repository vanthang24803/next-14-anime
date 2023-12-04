import getChapter from "@/actions/get-chapter-detail";
import { ChapterForm } from "./_components/chapter-form";
import Link from "next/link";
import { Arrow } from "@radix-ui/react-dropdown-menu";
import { ArrowLeft } from "lucide-react";

interface ChapterProps {
  params: {
    animeId: string;
    chapterId: string;
  };
}

export default async function Chapter({ params }: ChapterProps) {
  const chapter = await getChapter(params.animeId, params.chapterId);
  return (
    <div className="flex flex-col space-y-6 mb-10">
      <div className="flex items-center space-x-4 text-neutral-600">
        <Link href={`/dashboard/anime/${params.animeId}`}
            className="hover:-translate-x-2 transition-all duration-100"
        >
          <ArrowLeft />
        </Link>
        <h1 className="text-[25px] uppercase text-red-700">Chapter Detail</h1>
      </div>
      <ChapterForm chapter={chapter} />
    </div>
  );
}
