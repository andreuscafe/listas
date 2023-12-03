import { Header } from "@/components";
import Link from "next/link";

export default function Home() {
  return (
    <main className={`min-h-screen font-inter`}>
      <section className="max-w-screen-lg mx-auto py-64 flex flex-col items-center justify-center gap-12">
        <div className="flex flex-col items-center">
          <Header />
          <h1 className="text-4xl font-bold text-center">
            Acá va a ir una landing page
          </h1>
          <p className="text-center text-neutral-500 mt-4">
            Por ahora sólo iniciá sesión para ir a la app.
          </p>
        </div>
      </section>
    </main>
  );
}
