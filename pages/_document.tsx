import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="bg-background">
      <Head />
      <body className="bg-background text-foreground" onClick={() => {}}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
