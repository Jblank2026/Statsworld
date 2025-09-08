import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Navigation from "./components/Navigation";
import { Analytics } from "@vercel/analytics/react";
import NetIdPrompt from "./components/NetIdPrompt";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "JakesWorld | Supplemental Regression Modeling Tool",
  description: "Your go-to supplemental learning tool for excelling in regression analysis at UTK.",
};

function Footer() {
  return (
    <footer className="bg-[#58595b] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center">
          <div className="text-2xl font-bold text-[#ff8200] mb-4">JakesWorld</div>
          <div className="flex space-x-6 mb-8">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#ff8200] transition-colors"
            >
              LinkedIn
            </a>
          </div>
          <div className="text-sm text-gray-300">
            © {new Date().getFullYear()} JakesWorld. All rights reserved.
          </div>
          <div className="text-sm text-gray-300 mt-2">
            Proudly affiliated with the University of Tennessee, Knoxville
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} font-sans min-h-screen flex flex-col bg-gray-50`}>
        <Navigation />
        <main className="flex-grow pt-16">
          {children}
        </main>
        <Footer />
        <NetIdPrompt />
        <Analytics />
      </body>
    </html>
  );
}
