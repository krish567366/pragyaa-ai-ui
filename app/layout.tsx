import type { ReactNode } from "react";
import { Inter, Fira_Code } from "next/font/google";
import localFont from "next/font/local";
import { sharedOpenGraphMetadata } from "./lib/constants";
import Providers from "./components/Providers";
import Script from "next/script";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "fallback",
});
const fira = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira",
  display: "fallback",
});
const favorit = localFont({
  src: "./fonts/ABCFavorit-Bold.woff2",
  weight: "700",
  variable: "--font-favorit",
  display: "fallback",
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_PATH || "http://localhost:3000"),
  title: "VoiceAgent",
  description: "Meet our Voice Agent API",
  openGraph: sharedOpenGraphMetadata,
  twitter: {
    card: "summary_large_image",
    site: "@DeepgramAI",
    creator: "@DeepgramAI",
  },
};

const fonts = [inter, fira, favorit].map((font) => font.variable).join(" ");

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${fonts} font-inter`}>
      <head>
        <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
      </head>
      <body>
        <Providers>{children}</Providers>
        <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
