/* eslint-disable @next/next/no-img-element */
"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { Anime } from "@/types";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

interface AnimeModalSlideProps {
  animes: Anime[] | undefined;
  title: string;
}

export const AnimeModalSlide = ({ animes, title }: AnimeModalSlideProps) => {
  
  const router = useRouter();
  const { isSignedIn } = useUser();

  const handleWishList = async (animeId: String) => {
    try {
      toast.loading("Waiting!");

      if (!animeId) {
        toast.error("Invalid userId or animeId");
        return;
      }

      const response = await axios.post("/api/animes/wishlists", {
        animeId,
      });

      console.log(response);

      if (response.status === 200) {
        toast.dismiss();
        toast.success("Anime added to wishlist 🎉");
      } else {
        toast.dismiss();
        toast.error("Failed to add anime to wishlist");
      }
    } catch (error) {
      toast.dismiss();
      console.error("Error during wishlist request:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <h1 className="text-[25px] uppercase text-red-700">{title}</h1>
      <div className="relative overflow-hidden grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {animes?.map((item, index) => (
          <div className="relative mt-4" key={index}>
            <img
              src={item.thumbnail}
              alt={item.name?.toString()}
              className="w-full lg:h-[300px] md:h-[250px] h-[220px] object-cover cursor-pointer duration-300 transition-transform transform origin-top hover:scale-105 hover:filter brightness-90 hover:brightness-75"
              onClick={() => router.push(`/anime/${item.id}`)}
            />
            <div
              className="absolute bottom-2 left-2 p-1 flex flex-col space-y-2 text-white w-[95%]"
              onClick={() => router.push(`/anime/${item.id}`)}
            >
              <p className=" font-bold">{item.name}</p>
              <div className="flex justify-between items-center text-sm font-medium">
                <span>Tập {item.episode}</span>
                <span>{item.views} lượt xem</span>
              </div>
            </div>
            {isSignedIn && (
              <div className="absolute top-2 right-2 p-1  text-white z-20">
                <Heart
                  className="hover:text-red-400 cursor-pointer"
                  onClick={() => handleWishList(item.id)}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
