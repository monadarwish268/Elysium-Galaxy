import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { SpaceBackground } from "@/app/components/SpaceBack";
import Navbar from "@/app/components/Navbar";
import QueryProvider from "@/lib/QueryProvider"; 

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
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative bg-black text-white">
        <SpaceBackground />
        <Navbar />
        <main className="flex-1 relative z-10 pt-4"><QueryProvider>{children}</QueryProvider></main>//kl l children sar fo eendom acess aa function l query provider
      </body>
    </html>
    
  );
}