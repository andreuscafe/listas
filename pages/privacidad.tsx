import { Header } from "@/components";
import Link from "next/link";
import React from "react";
import { BiArrowBack } from "react-icons/bi";

const Privacidad: React.FC = () => {
  return (
    <>
      <Header>
        <Link
          href={"/"}
          className="inline-flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity"
        >
          <BiArrowBack />
          Volver
        </Link>
      </Header>
      <section className="max-w-screen-sm mx-auto py-24 px-8 gap-12 text-neutral-500 privacidad">
        <h1 className="text-3xl text-foreground mb-8">
          Política de Privacidad
        </h1>
        <p>
          En nuestra aplicación, recopilamos información personal como nombre,
          email y cualquier otro dato que generen los usuarios a través del uso
          de la aplicación, como listas, tareas, estados y prioridades, además
          de cualquier otro dato que se genere ahora o en un futuro a través de
          la interacción con la aplicación.
        </p>
        <p>
          Esta información se utiliza para mejorar la experiencia del usuario y
          brindar un servicio personalizado.
        </p>
        <p>
          Garantizamos que toda la información recopilada se manejará de acuerdo
          con las leyes de protección de datos vigentes en Argentina. En
          adición, utilizamos servicios de terceros para autenticación de
          usuarios y hosting de la aplicación, como Clerk y Vercel, cuyo manejo
          de datos se rige por sus propias políticas de privacidad y pueden
          leerse en los siguientes enlaces:
        </p>
        <ul className="mb-4 list-disc">
          <li className="ml-4">
            <Link href="https://vercel.com/legal/privacy-policy">
              Vercel (Hosting y Analytics)
            </Link>
          </li>
          <li className="ml-4">
            <Link href="https://clerk.com/data-processing-agreement">
              Clerk (Auth)
            </Link>
          </li>
        </ul>
        <p>
          No compartiremos ni venderemos su información personal a terceros sin
          su consentimiento.
        </p>
        <p>
          Si tiene alguna pregunta o inquietud sobre nuestra política de
          privacidad, puede comunicarse con nosotros a través de{" "}
          <Link
            href="https://twitter.com/andreuscafe"
            className="underline text-primary"
            target="_blank"
          >
            Twitter
          </Link>
          .
        </p>
      </section>
    </>
  );
};

export default Privacidad;
