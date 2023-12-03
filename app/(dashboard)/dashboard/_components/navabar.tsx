import { Logo } from "@/components/logo";
import { UserButton } from "@clerk/nextjs";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full h-16 px-4 border-b shadow-sm dark:bg-slate-700 bg-white flex items-center z-50">
      <div className="flex items-center justify-between w-full mx-10">
        <Logo />
        <UserButton />
      </div>
    </nav>
  );
};
