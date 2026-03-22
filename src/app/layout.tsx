import type { Metadata } from "next";
import {
  Playfair_Display,
  Libre_Baskerville,
  Great_Vibes,
  Cinzel,
  Tangerine,
} from "next/font/google";
import "./globals.css";

// Didot-style high-contrast serif for hero titles
const playfair = Playfair_Display({
  variable: "--font-title",
  subsets: ["latin"],
  display: "swap",
});

// Transitional serif for body/details text
const baskerville = Libre_Baskerville({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

// Calligraphy script for monograms/initials
const greatVibes = Great_Vibes({
  variable: "--font-script",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

// Elegant script for initials
const tangerine = Tangerine({
  variable: "--font-tangerine",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

// Roman capitals for formal headings
const cinzel = Cinzel({
  variable: "--font-caps",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ana Isabel & José Andrés — Reserva la Fecha",
  description:
    "¡Nos casamos! Reserva la fecha para nuestra celebración.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${baskerville.variable} ${greatVibes.variable} ${cinzel.variable} ${tangerine.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
