import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import { BiColumns, BiListUl, BiLoaderAlt } from "react-icons/bi";
import { dark } from "@clerk/themes";
import { usePathname } from "next/navigation";

export const Header = ({ children }: { children?: React.ReactNode }) => {
  const { isLoaded, isSignedIn } = useUser();
  const pathname = usePathname();

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
          "max-w-screen-md mx-auto h-16 px-6 flex items-center justify-between relative bg-background"
        }
      >
        {children ? (
          children
        ) : (
          <>
            <div className="flex gap-1">
              {/* <BiLeftArrowAlt size={24} className="opacity-40" /> */}
              <span className="text-neutral-500">{now}</span>
              {/* <BiRightArrowAlt size={24} className="opacity-40" /> */}
            </div>

            {isSignedIn ? (
              <div className="flex justify-between items-center gap-4">
                <div className="flex gap-2">
                  <Link
                    href={"/app"}
                    className={
                      "text-white opacity-60 hover:opacity-80 transition-opacity" +
                      (pathname === "/app" ? " opacity-80" : "")
                    }
                  >
                    Listas
                  </Link>{" "}
                  <Link
                    href={"/app/boards"}
                    className={
                      "text-white opacity-60 hover:opacity-80 transition-opacity" +
                      (pathname === "/app/boards" ? " opacity-80" : "")
                    }
                  >
                    Tableros
                  </Link>
                </div>
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
              </div>
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
