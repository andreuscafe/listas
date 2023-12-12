import { Header } from "@/components";
import Image from "next/image";
import Link from "next/link";
import mobileCover from "@/public/img/phone-cover.png";
import { motion } from "framer-motion";
import { basicRevealAnimation } from "@/lib/animations";

export default function Home() {
  return (
    <main className={`min-h-screen font-inter pb-16`}>
      {/* <Header /> */}
      <section className="max-w-screen-lg mx-auto py-24 px-8 flex flex-col items-center justify-center gap-12">
        <div className="flex flex-col items-center">
          <motion.h1
            {...basicRevealAnimation()}
            className="text-4xl font-bold text-center text-neutral-100"
          >
            Listas para organizarme.
          </motion.h1>
          <motion.p
            {...basicRevealAnimation({ delay: 0.15 })}
            className="text-center text-neutral-500 mt-4"
          >
            Así el día a día deja de ser un bolonqui.
          </motion.p>
        </div>
        <Link href={"/app"}>
          <motion.span
            {...basicRevealAnimation({ delay: 0.3 })}
            className="block px-8 py-4 rounded-lg bg-foreground text-black hover:bg-neutral-100 transition-colors duration-200"
          >
            Ir a la app
          </motion.span>
        </Link>
      </section>
      <motion.section
        {...basicRevealAnimation({ delay: 0.6, distance: 100 })}
        className="px-8"
      >
        <Image
          alt="Cover"
          src={mobileCover}
          width={437}
          height={882}
          className="block md:hidden w-full max-w-[600px] lg:max-w-[1000px] 2xl:max-w-[1200px] mx-auto"
          quality={100}
        />
        <video
          src="/video/demo.mov"
          className="hidden md:block w-full max-w-[600px] lg:max-w-[1000px] 2xl:max-w-[1200px] mx-auto border border-neutral-700 rounded-2xl cursor-pointer"
          autoPlay
          muted
          loop
          controls
        />
      </motion.section>
      <footer className="text-center pt-24">
        <span className="text-neutral-500">
          Hecho por{" "}
          <Link
            href="https://twitter.com/andreuscafe"
            target="_blank"
            className="text-primary"
          >
            @andreuscafe
          </Link>
        </span>

        <br />
        <br />

        <Link href={"/privacidad"} className="text-primary">
          Política de privacidad
        </Link>
      </footer>
    </main>
  );
}
