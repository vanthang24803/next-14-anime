import { Navbar } from "@/components/navbar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="h-full bg-slate-100">{children}</div>
    </>
  );
};

export default MainLayout;
