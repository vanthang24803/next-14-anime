import { Navigation } from "../_components/navigation";

const NavigatorAnimeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col space-y-4">
      <Navigation />
      <>{children}</>
    </div>
  );
};

export default NavigatorAnimeLayout;
