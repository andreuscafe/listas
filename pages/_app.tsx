import "@/styles/globals.css";
import { AnimatePresence } from "framer-motion";
import type { AppProps } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";

import { Inter } from "next/font/google";
import Head from "next/head";
import { esES } from "@clerk/localizations";

// import { SpeedInsights } from "@vercel/speed-insights/next";
// import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400"],
  style: "normal"
});

export const defaultTitle = "Listas cafe";
export const defaultDescription =
  "Creá listas para organizar tus tareas o recordatorios diarios.";
const defaultDomain = "listas.cafe";
const defaultUrl = `https://${defaultDomain}`;
const defaultOgPath = "/img/og.png";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider localization={esES} {...pageProps}>
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />

        {/* <!-- Primary Meta Tags --> */}
        <title>{defaultTitle}</title>
        <meta name="title" content={defaultTitle} />
        <meta name="author" content="@andreuscafe" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="Spanish" />
        <meta name="keywords" content="listas, cafe, listas.cafe" />
        <meta name="apple-mobile-web-app-title" content={defaultTitle} />
        <meta name="application-name" content={defaultTitle} />
        <meta name="description" content={defaultDescription} />

        {/* <!-- Open Graph / Facebook --/> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={defaultUrl} />
        <meta property="og:title" content={defaultTitle} />
        <meta property="og:description" content={defaultDescription} />
        <meta property="og:image" content={defaultUrl + defaultOgPath} />

        <meta name="color-scheme" content="dark light" />
        <meta
          name="theme-color"
          content="#fff"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#18181b"
          media="(prefers-color-scheme: dark)"
        />
        <meta name="msapplication-TileColor" content="#18181b" />

        {/* Facebook Meta Tags */}
        <meta property="og:url" content={defaultUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={defaultTitle} />
        <meta property="og:description" content={defaultDescription} />
        <meta property="og:image" content={defaultUrl + defaultOgPath} />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content={defaultDomain} />
        <meta property="twitter:url" content={defaultUrl} />
        <meta name="twitter:title" content={defaultTitle} />
        <meta name="twitter:description" content={defaultDescription} />
        <meta name="twitter:image" content={defaultUrl + defaultOgPath} />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <style jsx global>{`
        :root {
          --font-inter: ${inter.style.fontFamily};
        }
      `}</style>

      {/* <SpeedInsights />
      <Analytics /> */}

      <AnimatePresence mode="wait">
        <Component {...pageProps} />
      </AnimatePresence>
    </ClerkProvider>
  );
}
