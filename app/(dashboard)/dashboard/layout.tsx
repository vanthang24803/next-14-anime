import { Navbar } from "./_components/navabar";
import { Sidebar } from "./_components/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div className="m-20 flex">
        <Sidebar />
        <div className="pl-8">{children}</div>
      </div>
    </>
  );
}
