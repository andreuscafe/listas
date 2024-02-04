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
      />
      <style jsx global>{`
        .cl-internal-nl02h8 {
          display: none;
        }
      `}</style>

      <p className="mt-8 text-center">
        Si es tu primera vez acá, tenes que registrarte primero. <br />
        Si tenes problemas para ingresar, mandame un DM a{" "}
        <a
          href="https://twitter.com/AndreusCafe"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary brightness-100 hover:brightness-150 transition-all"
        >
          @andreuscafe
        </a>
        . <br />
        <span className="text-sm text-foreground opacity-40 mt-2 block">
          A veces anda medio para el culo.
        </span>
      </p>
    </div>
  );
}
