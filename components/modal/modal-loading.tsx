"use client";

import { Skeleton } from "@/components/ui/skeleton";

export const ModalLoading = () => {
  return (
    <div className="w-full">
      <div className="md:grid lg:grid-cols-6 md:grid-cols-3 hidden gap-4">
        {Array(6)
          .fill(0)
          .map((i) => (
            <div className="flex flex-col" key={i}>
              <Skeleton className="h-[35vh] md:h-[30vh] lg:h-[35vh] bg-slate-200" />
            </div>
          ))}
      </div>
      <Skeleton className="h-[30vh] bg-slate-200 block md:hidden" />
    </div>
  );
};
