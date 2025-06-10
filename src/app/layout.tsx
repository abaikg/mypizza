import type { Metadata } from "next";
import Header from "@/components/Header/Header";
import "./globals.css";
import Footer from "@/components/Footer";


export const metadata: Metadata = {
  title: "Menu",
  description: "menu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
        <Header  />
        {children}
        <Footer />
      </body>
    </html>
  );
}
