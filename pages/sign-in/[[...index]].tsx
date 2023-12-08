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
        className="inline-flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity mb-4"
      >
        <BiArrowBack />
        Volver
      </Link>
      <SignIn
        appearance={{
          baseTheme: dark,
          variables: {
            colorPrimary: "#a64242"
          },
          elements: {
            card: {
              backgroundColor: "#1c1c1f",
              boxShadow: "none"
            }
          }
        }}
        afterSignInUrl={"/app"}
      />
      <style jsx global>{`
        .cl-internal-nl02h8 {
          display: none;
        }
      `}</style>
    </div>
  );
}
