import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import AiChatbox from "@/components/AiChatbox";
import ThemeInitializer from "@/components/ThemeInitializer";
import Sidebar from "@/components/Sidebar";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ilm — Daily Knowledge Operating System",
  description: "Learn one new thing, track tasks, check weather, read curated AI/global news, and build smart habits in just 5 minutes a day.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground antialiased selection:bg-primary/10 selection:text-primary">
        <ThemeInitializer />
        <div className="lg:flex lg:h-screen lg:overflow-hidden w-full">
          <Sidebar />
          <div className="lg:flex-1 lg:h-screen lg:overflow-y-auto flex flex-col">
            {children}
          </div>
        </div>
        <Navigation />
        <AiChatbox />
      </body>
    </html>
  );
}
