import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import ToasterProvider from "@/components/ToasterProvider";
import "leaflet/dist/leaflet.css";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "YR - Your Ride",
  description: "Your Ride & Delivery Portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <ToasterProvider />
        {children}
        <WhatsAppWidget />
      </body>
    </html>
  );
}
