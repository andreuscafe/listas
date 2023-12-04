import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import {
  BiLeftArrowAlt,
  BiLoader,
  BiLoaderAlt,
  BiLoaderCircle,
  BiRightArrowAlt
} from "react-icons/bi";

export const Header = () => {
  // console.log("header", isSignedIn, isLoaded);
  const { isLoaded, isSignedIn } = useUser();

  const now = new Date().toLocaleDateString("es-ES", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });

  return (
    <header
      className={"w-full fixed z-20 top-0 left-0 border-b border-b-neutral-700"}
    >
      <div
        className={
          "max-w-screen-sm mx-auto h-16 px-6 flex items-center justify-between relative bg-background"
        }
      >
        <div className="flex gap-1">
          {/* <BiLeftArrowAlt size={24} className="opacity-40" /> */}
          <span className="text-neutral-500">{now}</span>
          {/* <BiRightArrowAlt size={24} className="opacity-40" /> */}
        </div>
        {isSignedIn ? (
          <UserButton afterSignOutUrl="/" />
        ) : isLoaded ? (
          <Link
            href={"/app"}
            className="text-white opacity-80 hover:opacity-100 transition-opacity"
          >
            Ir a la app
          </Link>
        ) : (
          <BiLoaderAlt size={32} className="animate-spin" />
        )}
      </div>
    </header>
  );
};
