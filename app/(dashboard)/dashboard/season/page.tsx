/* eslint-disable @next/next/no-img-element */
import { db } from "@/lib/db";
import Link from "next/link";
import { Plus, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function Season() {
  const season = await db.season.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });

  return (
    <div className="flex flex-col space-y-8">
      <div className="flex items-center justify-between">
        <span className="text-2xl font-medium uppercase">Anime Season</span>
        <Link href="/dashboard/anime/season">
          <Button size="icon" variant="primary">
            <Plus />
          </Button>
        </Link>
      </div>

      <div className="border border-neutral-200 rounded-md p-8">
        <div className="grid grid-cols-3 gap-8 ">
          {season.map((item, index) => (
            <Link
              href={`/dashboard/season/${item.id}`}
              key={index}
              className="relative overflow-hidden "
            >
              <img
                src={item.thumbnail || ""}
                alt="thumbnail"
                className="object-cover cursor-pointer duration-300 transition-transform transform origin-top hover:scale-105 hover:filter brightness-90 hover:brightness-75 rounded"
              />
              <div className="absolute right-3 top-1 p-2 text-neutral-100">
                <Settings />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
