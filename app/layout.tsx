import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { SpaceBackground } from "@/app/components/SpaceBack";
import Navbar from "@/app/components/Navbar";
import Providers from './providers';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Elysium Galaxy",
  description: "Explore Your Emotional Universe",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col relative bg-black text-white">
        <Providers>
          <SpaceBackground />
          <Navbar />
          <main className="flex-1 relative z-10 pt-4">{children}</main>
        </Providers>
      </body>
    </html>
  );
}