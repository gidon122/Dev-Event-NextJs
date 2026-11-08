import type { Metadata } from "next";
import { Schibsted_Grotesk } from "next/font/google";
import "../globals.css";
import LightRays from "@/components/ui/LightRays";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { ClerkProvider } from "@clerk/nextjs";

const schibstedGrotesk = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-schibsted-grotesk",
});

export const metadata: Metadata = {
  title: "EventLoop",
  description: "The Hub for Every Dev Event You Mustn't Miss",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={`public ${schibstedGrotesk.className} min-h-screen antialiased`}
      >
          <Navbar />
          <div className="absolute inset-0 top-0 z-[-1] min-h-screen">
            <LightRays
              raysOrigin="top-center-offset"
              raysColor="#59deca"
              raysSpeed={1.5}
              lightSpread={0.9}
              rayLength={1.4}
              followMouse={true}
              mouseInfluence={0.02}
              noiseAmount={0.1}
              distortion={0.01}
              className="custom-rays"
            />
          </div>
          <main>{children}</main>
          <Footer />
      </body>
    </html>
    </ClerkProvider>
  );
}