import React from "react";
import { Button } from "./ui/button";
import { nav } from "@/constant";
import Link from "next/link";

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
