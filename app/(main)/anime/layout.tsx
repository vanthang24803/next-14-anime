import { Navigation } from "./_components/navigation";

const AnimeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="py-20 flex flex-col space-y-4">
      <Navigation />
      <>{children}</>
    </div>
  );
};

export default AnimeLayout;
