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

// 1. Load all your custom fonts here
const bebasNoteBold = localFont({
  src: "./fonts/BebasNote-Bold.ttf",
  variable: "--font-BebasNote-Bold",
});

const amsterdamFont = localFont({
  src: "./fonts/amsterdam.ttf",
  variable: "--font-amsterdam",
});

const pacificoFont = localFont({
  src: "./fonts/Pacifico.ttf",
  variable: "--font-pacifico",
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
      // 2. Add ALL font variables to your app's HTML wrapper
      className={`${geistSans.variable} ${geistMono.variable} ${bebasNoteBold.variable} ${amsterdamFont.variable} ${pacificoFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}