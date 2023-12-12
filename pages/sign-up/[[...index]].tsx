import { Header } from "@/components";
import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";

export default function Page() {
  return (
    <div className="flex items-center justify-center flex-col min-h-screen">
      <Header>
        <Link
          href={"/"}
          className="inline-flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity"
        >
          <BiArrowBack />
          Volver
        </Link>
      </Header>
      <SignUp
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
        afterSignUpUrl={"/app"}
      />
      <style jsx global>{`
        .cl-internal-nl02h8 {
          display: none;
        }
      `}</style>
    </div>
  );
}
