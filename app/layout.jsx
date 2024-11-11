import localFont from "next/font/local";
import "./globals.css";
import { Suspense } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Star Wars Characters",
  description: "Star Wars Characters using SWAPI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-main-bg flex items-center flex-col`}
      >
        <div className="stars"></div>
        <div className="twinkling"></div>
        <Suspense fallback={<div className="loading">Loading...</div>}>
          {children}
        </Suspense>
      </body>
    </html>
  );
}
