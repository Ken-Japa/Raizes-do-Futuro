import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";

import { Outfit, Playfair_Display } from "next/font/google"; // Outfit for UI/Body, Playfair for Headings

const fontSans = Outfit({ subsets: ["latin"], variable: "--font-sans" });
const fontHeading = Playfair_Display({ subsets: ["latin"], variable: "--font-heading" });

export const metadata: Metadata = {
  title: "Raízes do Futuro",
  description: "Plataforma de Gestão e Apresentação do Projeto Raízes do Futuro",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${fontSans.variable} ${fontHeading.variable} font-sans antialiased min-h-screen bg-background text-foreground`}>
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 pl-0 md:pl-64 transition-all duration-300">
            {/* Main Content Area */}
            <div className="container mx-auto p-4 md:p-8 max-w-7xl">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
