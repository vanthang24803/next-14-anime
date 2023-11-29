const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex items-center justify-center bg-no-repeat bg-center bg-cover ">
      {children}
    </div>
  );
};

export default AuthLayout;
