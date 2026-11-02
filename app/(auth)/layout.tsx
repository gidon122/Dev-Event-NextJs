import type { Metadata } from "next";
import { Schibsted_Grotesk } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const schibstedGrotesk = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Authentication | EventLoop",
  description: "Sign in or register for your campus developer event pass",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
    <html lang="en">

    
      <body
        className={`${schibstedGrotesk.className} min-h-screen bg-[#020303] text-foreground antialiased selection:bg-[#59deca]/20 selection:text-[#5dfeca]`}
      >
          <div className="relative flex min-h-screen flex-col justify-between overflow-hidden">
            {/* Ambient Background Lights */}
            <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-gradient-to-b from-[#59deca]/15 via-indigo-600/10 to-transparent blur-3xl" />
            <div className="pointer-events-none absolute -bottom-40 -left-40 h-[450px] w-[450px] rounded-full bg-violet-600/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-40 -right-40 h-[450px] w-[450px] rounded-full bg-cyan-600/10 blur-3xl" />

            {/* Subtle grid pattern */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
                backgroundSize: "28px 28px",
              }}
            />

            {/* Top Navigation / Brand */}
            <header className="relative z-10 flex w-full items-center justify-between px-6 py-6 sm:px-12">
              <Link
                href="/"
                className="group flex items-center gap-2.5 transition-transform hover:scale-105"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 backdrop-blur-md transition-colors group-hover:border-[#59deca]/40">
                  <Image
                    src="/icons/logo.png"
                    alt="EventLoop Logo"
                    width={20}
                    height={20}
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-bold tracking-tight text-white">
                    Event<span className="text-[#59deca]">Loop</span>
                  </span>
                  <span className="text-[10px] tracking-wider text-slate-400 uppercase">
                    Campus Developer Network
                  </span>
                </div>
              </Link>

              <Link
                href="/"
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300 backdrop-blur-sm transition-colors hover:border-white/20 hover:text-white"
              >
                ← Back to Home
              </Link>
            </header>

            {/* Main Auth Content */}
            <main className="relative z-10 mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-4 py-8 sm:px-6">
              {children}
            </main>

            {/* Minimal Sleek Footer */}
            <footer className="relative z-10 flex flex-col items-center justify-between gap-3 px-6 py-6 text-center text-xs text-slate-500 sm:flex-row sm:px-12">
              <p>© 2026 EventLoop. Designed for Campus Innovators.</p>
              <div className="flex items-center gap-4 text-slate-400">
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#59deca] animate-pulse" />
                  Encrypted Session
                </span>
                <span>•</span>
                <Link href="/" className="hover:text-slate-200 transition-colors">
                  Security
                </Link>
              </div>
            </footer>
          </div>
      </body>
  
    </html>
    </ClerkProvider>
  );
}
