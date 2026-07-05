import type { Metadata } from "next";
import { Bodoni_Moda, Cormorant_Garamond, Pinyon_Script } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RevealObserver from "@/components/RevealObserver";

// Display headings + italic accents
const bodoni = Bodoni_Moda({
  variable: "--display",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Body text AND the hero names (italic 500)
const cormorant = Cormorant_Garamond({
  variable: "--serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

// Script accents: A&J monogram, "the", "Cartagena, Colombia"
const pinyon = Pinyon_Script({
  variable: "--script",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ana Isabel & José Andrés — Reserva la Fecha",
  description:
    "¡Nos casamos! Reserva la fecha para nuestra celebración. 8 de mayo de 2027, Cartagena, Colombia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${bodoni.variable} ${cormorant.variable} ${pinyon.variable}`}
    >
      <body>
        <Navigation />
        {children}
        <Footer />
        <RevealObserver />
      </body>
    </html>
  );
}
