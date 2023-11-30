"use client";

import { navigator } from "@/constant";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export const Navigation = () => {
  const router = useRouter();
  return (
    <div className="grid grid-cols-12 gap-2">
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
  );
};
