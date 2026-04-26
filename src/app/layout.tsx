import type { Metadata } from "next";
import { Jost, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThemeProvider from "@/components/ThemeProvider";

const jost = Jost({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jost",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-instrument",
});

export const metadata: Metadata = {
  title: "Zeplin Media | Dijital Ajans",
  description: "Zeplin Media - Kreatif dijital ajans hizmetleri",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://use.typekit.net" />
        <link rel="preconnect" href="https://p.typekit.net" crossOrigin="" />
        <link
          rel="preload"
          as="image"
          href="/images/hero-crt-forest-optimized.webp"
          fetchPriority="high"
        />
        <link rel="stylesheet" href="https://use.typekit.net/ryi5mzw.css" />
        <link rel="stylesheet" href="https://use.typekit.net/fad1vyk.css" />
        <link rel="stylesheet" href="https://use.typekit.net/psq5rwo.css" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");var d=t==="light"?!1:!0;document.documentElement.classList.toggle("dark",d);document.documentElement.dataset.theme=d?"dark":"light"}catch(e){document.documentElement.classList.add("dark");document.documentElement.dataset.theme="dark"}})()`,
          }}
        />
      </head>
      <body className={`${jost.variable} ${instrumentSerif.variable} font-sans antialiased`}>
        <ThemeProvider>
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
