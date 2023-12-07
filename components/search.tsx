"use client";

import axios from "axios";
import qs from "query-string";
import { Anime } from "@/types";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

export const SearchPage = () => {

  const router = useRouter();
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const ref = useRef<HTMLDivElement | null>(null);

  const search = searchParams.get("anime");

  const [content, setContent] = useState(search || "");

  const [anime, setAnime] = useState<Anime[]>([]);

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
    setContent(e.target.value);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`/api/anime/search?anime=${content}`);
        setAnime(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, [content]);


  useEffect(() => {
    const query = {
      anime: content,
    };

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url);
  }, [router, content]);

  return (
    <div className="relative md:block hidden dark:border-white group" ref={ref}>
      <Input
        className="lg:w-[400px] h-8"
        onClick={() => setOpen(true)}
        onChange={handleInputChange}
      />
      <Search
        className="w-4 h-4 absolute top-2 right-2 hover:cursor-pointer
      group-hover:text-red-400"
      />
      {open && (
        <div className="w-[400px] h-[15vh] rounded-md bg-neutral-100/90 dark:bg-neutral-700/90  p-4 absolute top-10">
          {content != "" ? (
            <ScrollArea className="w-full h-[12vh]">{content}</ScrollArea>
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
