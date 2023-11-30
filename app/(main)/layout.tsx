import { Navbar } from "@/components/navbar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="lg:px-10 px-4 pb-10">{children}</div>
    </>
  );
};

export default MainLayout;
