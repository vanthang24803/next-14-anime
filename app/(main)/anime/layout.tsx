const AnimeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="md:py-20 py-16">
      <>{children}</>
    </div>
  );
};

export default AnimeLayout;
