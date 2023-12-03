import { Layout } from "@/components/Layout";
import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";

export default function Page() {
  return (
    <div className="flex items-center justify-center flex-col min-h-screen">
      <Link
        href={"/"}
        className="inline-flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity"
      >
        <BiArrowBack />
        Volver
      </Link>
      <SignIn
        appearance={{
          baseTheme: dark,
          variables: {
            colorPrimary: "#333333"
          },
          elements: {
            card: {
              backgroundColor: "transparent",
              boxShadow: "none"
            }
          }
        }}
        afterSignInUrl={"/app"}
      />
      <style jsx global>{`
        .cl-internal-bu19t8 {
          display: none;
        }
      `}</style>
    </div>
  );
}
