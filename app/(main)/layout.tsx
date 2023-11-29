import { Navbar } from "@/components/navbar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="h-full bg-slate-100 lg:px-10 px-4">{children}</div>
    </>
  );
};

export default MainLayout;
