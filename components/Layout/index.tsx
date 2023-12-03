import { Header } from "@/components";
import { useUser } from "@clerk/nextjs";

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <main
        className={`w-full max-w-screen-sm mx-auto px-5 min-h-screen pb-20 pt-28 font-inter flex flex-col justify-start`}
      >
        <Header />
        {children}
      </main>
    </>
  );
};
