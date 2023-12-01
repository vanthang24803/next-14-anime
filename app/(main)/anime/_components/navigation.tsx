"use client";

import { navigator } from "@/constant";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export const Navigation = () => {
  const router = useRouter();

  return (
    <>
      <div className="lg:grid grid-cols-12 hidden gap-2">
        {navigator.map((item, index) => (
          <Button
            key={index}
            variant="primary"
            onClick={() => router.push(item.href)}
          >
            {item.name}
          </Button>
        ))}
      </div>
      <div className="flex items-center lg:hidden justify-between overflow-x-auto space-x-4">
        {navigator.map((item, index) => (
          <Button
            key={index}
            variant="primary"
            onClick={() => router.push(item.href)}
            className="whitespace-nowrap"
          >
            {item.name}
          </Button>
        ))}
      </div>
    </>
  );
};
