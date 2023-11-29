import { Navbar } from "@/components/navbar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="bg-slate-100 lg:px-10 px-4 pb-10">{children}</div>
    </>
  );
};

export default MainLayout;
