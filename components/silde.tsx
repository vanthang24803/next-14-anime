"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { slides } from "@/constant";
import { ArrowLeft, ArrowRight, Dot } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

export const Slide = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  const router = useRouter();
  return (
    <div className="lg:max-w-[1500px] max-w-[1200px] lg:h-[560px] md:h-[380px] h-[300px] w-full m-auto py-16  relative group z-10">
      <div
        style={{ backgroundImage: `url(${slides[currentIndex].imageUrl})` }}
        className="w-full h-full rounded-2xl bg-center bg-cover duration-500 hover:cursor-pointer"
        onClick={() => router.push(`${slides[currentIndex].href}`)}
      ></div>
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-4 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer hover:bg-black hover:text-white">
        <ArrowLeft onClick={prevSlide} />
      </div>
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-4 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer hover:bg-black hover:text-white">
        <ArrowRight onClick={nextSlide} />
      </div>
      <div className="flex top-4 justify-center  py-1">
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`text-2xl cursor-pointer ${
              slideIndex === currentIndex ? "text-red-500" : "text-gray-500"
            }`}
          >
            <Dot className="md:w-8 w-6 md:h-8 h-6" />
          </div>
        ))}
      </div>
    </div>
  );
};

Slide.Skeleton = function SlideSkeleton() {
  return (
    <div className="lg:max-w-[1500px] max-w-[1200px] lg:h-[560px] md:h-[380px] h-[300px] w-full m-auto py-16  relative group z-10">
      <Skeleton className="w-full h-full rounded-2xl bg-neutral-100" />
    </div>
  );
};
