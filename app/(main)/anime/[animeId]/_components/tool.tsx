"use client";

import axios from "axios";
import { Anime } from "@/types";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Bookmark, Heart, Share2 } from "lucide-react";

interface ToolProps {
  anime: Anime | undefined;
}

export const Tool = ({ anime }: ToolProps) => {
  const [origin, setOrigin] = useState("");

  const handleWishList = async (animeId: String | undefined) => {
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

  useEffect(() => {
    setOrigin(window.location.href);
  }, []);

  const onCopy = () => {
    navigator.clipboard.writeText(origin);
    toast.success("The url has been copied successfully");
  };

  const onSave = () => {
    toast.success("Anime saved successfully");
  };

  const { isSignedIn } = useUser();
  const router = useRouter();

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        {isSignedIn ? (
          <>
            <Button
              variant="destructive"
              size="icon"
              onClick={() => handleWishList(anime?.id)}
            >
              <Heart />
            </Button>
            <Button size="icon" variant="primary" onClick={onSave}>
              <Bookmark />
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="destructive"
              size="icon"
              onClick={() => router.push("/sign-in")}
            >
              <Heart />
            </Button>
            <Button
              size="icon"
              variant="primary"
              onClick={() => router.push("/sign-in")}
            >
              <Bookmark />
            </Button>
          </>
        )}
      </div>
      <Button variant="ghost" size="icon" onClick={onCopy}>
        <Share2 />
      </Button>
    </div>
  );
};
