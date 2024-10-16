import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import { BiLoaderAlt } from "react-icons/bi";
import { dark } from "@clerk/themes";
import { useAppStore } from "@/store/useAppStore";

export const Header = ({ children }: { children?: React.ReactNode }) => {
  const { isLoaded, isSignedIn } = useUser();

  const now = new Date().toLocaleDateString("es-ES", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });

  const { setIsClockViewOpen } = useAppStore();

  return (
    <header
      className={
        "w-full fixed z-20 top-0 left-0 border-b-2 border-b-neutral-700"
      }
    >
      <div
        className={
          "max-w-screen-md mx-auto h-16 px-6 flex items-center justify-between relative bg-background"
        }
      >
        {children ? (
          children
        ) : (
          <>
            <div className="flex gap-1">
              <span
                className="text-neutral-500 cursor-pointer hover:text-neutral-100 transition-colors"
                onClick={() => setIsClockViewOpen(true)}
              >
                {now}
              </span>
            </div>

            {isSignedIn ? (
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  baseTheme: dark,
                  variables: {
                    colorBackground: "#18181b"
                  }
                }}
                userProfileProps={{
                  appearance: {
                    baseTheme: dark,
                    variables: {
                      colorBackground: "#18181b",
                      colorPrimary: "#a64242"
                    }
                  }
                }}
              />
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
          </>
        )}
      </div>
    </header>
  );
};
