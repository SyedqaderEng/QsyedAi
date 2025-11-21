import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Syed.AI Visual Builder - AI-Powered Website Builder",
  description: "Build stunning websites with AI-powered visual editor featuring glassmorphism design",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
