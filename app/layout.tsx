import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 1. Load your custom BebasNote-Bold font here
const bebasNoteBold = localFont({
  src: "./fonts/BebasNote-Bold.ttf",
  variable: "--font-BebasNote-Bold",
});

export const metadata: Metadata = {
  title: "Mountain's Choice Radio",
  description: "My interactive radio app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      // 2. Add the bebasNoteBold variable to your app's HTML wrapper
      className={`${geistSans.variable} ${geistMono.variable} ${bebasNoteBold.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}