import Link from "next/link";
import { Menu } from "lucide-react";
import { nav } from "@/constant";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export const MobileMenu = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost">
          <Menu className="w-4 h-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div className="flex flex-col space-y-6 mt-8">
          {nav.map((item) => (
            <Button key={item.label} variant="ghost">
              <Link href={item.href || ""}>{item.label}</Link>
            </Button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};
