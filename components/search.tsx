"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

export const SearchPage = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (open && ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [open]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="relative md:block hidden dark:border-white group" ref={ref}>
      <Input
        className="lg:w-[400px] h-8"
        onClick={() => setOpen(true)}
        onChange={handleInputChange}
      />
      <Search className="w-4 h-4 absolute top-2 right-2 hover:cursor-pointer
      group-hover:text-red-400" />
      {open && (
        <div className="w-[400px] h-[15vh] rounded-md bg-neutral-100/90 p-4 absolute top-10">
          {search != "" ? (
            <ScrollArea className="w-full h-[12vh]">{search}</ScrollArea>
          ) : (
            <div className="flex items-center justify-center h-full">
              <span>Nhập anime để tìm kiếm </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
