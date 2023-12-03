"use client";

import { Bookmark, Package, Paperclip } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const Sidebar = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const router = useRouter();

  const handleItemClick = (index: number) => {
    setSelectedIndex(index);

    switch (index) {
      case 0:
        router.push("/dashboard");
        break;
      case 1:
        router.push("/dashboard/tv_series");
        break;
      case 2:
        router.push("/dashboard/movie");
        break;
      default:
        router.push("/dashboard");
        break;
    }
  };

  return (
    <div className="flex flex-col w-1/6 space-y-3">
      <div
        onClick={() => handleItemClick(0)}
        className={`flex items-center space-x-4 h-10 px-4 rounded-md cursor-pointer ${
          selectedIndex === 0 ? "bg-neutral-100 dark:bg-neutral-500" : ""
        }`}
      >
        <Package size={18} />
        <span className="text-[14px]">Home</span>
      </div>
      <div
        onClick={() => handleItemClick(2)}
        className={`flex items-center space-x-4 h-10 px-4 rounded-md cursor-pointer ${
          selectedIndex === 2 ? "bg-neutral-100 dark:bg-neutral-500" : ""
        }`}
      >
        <Bookmark size={18} />
        <span className="text-[14px]">Movie</span>
      </div>
      <div
        onClick={() => handleItemClick(1)}
        className={`flex items-center space-x-4 h-10 px-4 rounded-md cursor-pointer ${
          selectedIndex === 1 ? "bg-neutral-100 dark:bg-neutral-500" : ""
        }`}
      >
        <Paperclip size={18} />
        <span className="text-[14px]">TV Series</span>
      </div>
    </div>
  );
};
