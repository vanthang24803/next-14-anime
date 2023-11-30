"use client";

import { banner } from "@/constant";

export const Banner = () => {
  return (
    <div className="lg:max-w-[1500px] max-w-[1200px] lg:h-[560px] md:h-[380px] h-[300px] w-full m-auto pt-16 pb-8  relative group z-10">
      <div
        style={{ backgroundImage: `url(${banner})` }}
        className="w-full h-full rounded-2xl bg-center bg-cover duration-500"
      ></div>
    </div>
  );
};
