import { Header } from "@/components";

type LayoutProps = {
  children: React.ReactNode;
  className?: string;
};

export const Layout = ({ children, className }: LayoutProps) => {
  return (
    <>
      <main
        className={`w-full max-w-screen-md mx-auto px-5 min-h-screen pb-20 pt-28 font-inter flex flex-col justify-start ${className}`}
      >
        <Header />
        {children}
      </main>
    </>
  );
};
