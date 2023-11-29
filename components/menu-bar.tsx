import React from "react";
import Link from "next/link";
import { nav } from "@/constant";
import { Button } from "@/components/ui/button";

export const MenuBar = () => {
  return (
    <div className="md:flex items-center lg:space-x-4 space-x-2 hidden">
      {nav.map((item) => (
        <Button key={item.label} variant="ghost">
          <Link href={item.href || ""}>{item.label}</Link>
        </Button>
      ))}
    </div>
  );
};
