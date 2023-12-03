import Link from "next/link";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import { Clapperboard, Film, Info } from "lucide-react";

const Dashboard = async () => {
  const user = await currentUser();

  const totalAnime = await db.anime.count();

  const totalMovieAnime = await db.anime.count({
    where: {
      type: "MOVIE",
    },
  });

  const totoalSeriesAnime = await db.anime.count({
    where: {
      type: "TV_SERIES",
    },
  });

  return (
    <div className="flex items-start flex-col space-y-4 w-full">
      <span className="text-end font-bold mb-4">
        🎉 Welcome, {user?.firstName} {user?.lastName}
      </span>

      <div className="flex items-center justify-between space-x-4 w-full hover:cursor-pointer">
        <Link
          href="/dashboard/movie"
          className="flex flex-col items-center w-[500px] rounded-md border border-neutral-200 dark:hover:bg-neutral-500  justify-center space-y-2 h-[150px] hover:bg-neutral-100"
        >
          <Clapperboard className="w-16 h-16" />
          <span className="font-medium text-sm">Setting Anime Movie</span>
        </Link>
        <Link
          href="/dashboard/tv_series"
          className="flex flex-col items-center w-[500px] rounded-md border border-neutral-200 dark:hover:bg-neutral-500  justify-center space-y-2 h-[150px] hover:bg-neutral-100"
        >
          <Film className="w-16 h-16" />
          <span className="font-medium text-sm">Setting TV Series Movie</span>
        </Link>
      </div>

      <div className="pt-4 flex items-center justify-between w-full space-x-4">
        <div className="flex flex-col p-8 w-[300px] rounded-md border border-neutral-200  space-y-6 h-[150px] hover:bg-neutral-100 dark:hover:bg-neutral-500">
          <div className="flex items-center space-x-2">
            <span className="font-medium">Total Animes</span>
            <Info className="w-3 h-3" />
          </div>

          <span className="text-2xl font-bold">{totalAnime}</span>
        </div>
        <div className="flex flex-col p-8 w-[300px] rounded-md border border-neutral-200  space-y-6 h-[150px] hover:bg-neutral-100 dark:hover:bg-neutral-500">
          <div className="flex items-center space-x-2">
            <span className="font-medium">Total Movie Anime</span>
            <Info className="w-3 h-3" />
          </div>

          <span className="text-2xl font-bold">{totalMovieAnime}</span>
        </div>
        <div className="flex flex-col p-8 w-[300px] rounded-md border border-neutral-200  space-y-6 h-[150px] hover:bg-neutral-100 dark:hover:bg-neutral-500">
          <div className="flex items-center space-x-2">
            <span className="font-medium">Total Series Anime</span>
            <Info className="w-3 h-3" />
          </div>

          <span className="text-2xl font-bold">{totoalSeriesAnime}</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
