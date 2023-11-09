import Link from "next/link";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";

export const Header = () => {
  const now = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });

  return (
    <header className="w-full max-w-screen-sm mx-auto px-5 fixed top-4 left-1/2 -translate-x-1/2">
      <div className="h-20 px-6 rounded-2xl border border-neutral-700 backdrop-blur-xl flex items-center justify-between">
        <div className="flex gap-1">
          <BiLeftArrowAlt size={24} />
          <Link href={"/"}>Today</Link>
          <BiRightArrowAlt size={24} className="opacity-40" />
        </div>
        <span className="text-white text-opacity-60">
          <u>Login</u> to save your lists
        </span>
      </div>
    </header>
  );
};
