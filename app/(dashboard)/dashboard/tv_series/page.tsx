/* eslint-disable @next/next/no-img-element */
import { Plus, Settings } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";

export default async function Series() {
  const series = await db.anime.findMany({
    where: {
      type: "TV_SERIES",
    },
    orderBy: {
      creatAt: "desc",
    },
    take: 16,
  });

  return (
    <div className="flex flex-col space-y-8">
      <div className="flex items-center justify-between w-[1000px]">
        <span className="text-2xl font-medium uppercase">Anime Series</span>
        <Link href="/dashboard/anime/create">
          <Button size="icon" variant="primary">
            <Plus />
          </Button>
        </Link>
      </div>

      <div className="w-[1000px] border border-neutral-200 rounded-md p-8">
        <div className="grid grid-cols-4 gap-4 ">
          {series.map((item, index) => (
            <Link
              href={`/dashboard/anime/${item.id}`}
              key={index}
              className="relative overflow-hidden "
            >
              <img
                src={item.thumbnail || ""}
                alt="thumbnail"
                className="h-[300px] w-[200px] object-cover cursor-pointer duration-300 transition-transform transform origin-top hover:scale-105 hover:filter brightness-90 hover:brightness-75 rounded"
              />
              <div className="absolute right-6 top-2 p-2 text-neutral-100">
                <Settings />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
