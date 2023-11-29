import Link from "next/link";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { MenuBar } from "@/components/menu-bar";
import { MobileMenu } from "@/components/mobile-menu";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center z-50">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <div className="flex items-center space-x-8">
          <div className="md:flex hidden">
            <Logo />
          </div>
          <MenuBar />
        </div>
        <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
          <div className="md:hidden block">
            <Logo />
          </div>
          <div className="flex items-center space-x-2">
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <Button size="sm" variant="default" asChild>
                <Link href="/sign-in">Login</Link>
              </Button>
            </SignedOut>
            <div className="md:hidden block">
              <MobileMenu />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
