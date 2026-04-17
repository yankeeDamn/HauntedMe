import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Tarapith Haunted Travel Experience | Mystical Tours of Tarapith",
    template: "%s | Tarapith Travel"
  },
  description: "Experience the mystical side of Tarapith with our guided tours. Visit the sacred Kali Mandir, explore folklore, and enjoy respectful cultural night walks. Book your spiritual journey today.",
  keywords: ["Tarapith", "Tarapith tours", "Kali Mandir", "haunted tours India", "spiritual tourism", "Bengal pilgrimage", "Tarapith travel packages"],
  authors: [{ name: "Tarapith Travel Experience" }],
  openGraph: {
    title: "Tarapith Haunted Travel Experience",
    description: "Discover the mystical side of Tarapith with guided folklore tours and temple visits.",
    type: "website",
    locale: "en_IN",
    siteName: "Tarapith Travel",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
