import type { Metadata } from "next";
import { Schibsted_Grotesk } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const schibstedGrotesk = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-schibsted-grotesk",
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
        className={`${schibstedGrotesk.className} min-h-screen bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary`}
      >
          <div className="relative flex min-h-screen flex-col justify-between overflow-hidden">
            {/* Ambient Background Lights */}
            <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-gradient-to-b from-primary/15 via-primary/5 to-transparent blur-3xl" />
            <div className="pointer-events-none absolute -bottom-40 -left-40 h-[450px] w-[450px] rounded-full bg-primary/5 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-40 -right-40 h-[450px] w-[450px] rounded-full bg-primary/5 blur-3xl" />

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
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-surface/70 backdrop-blur-md transition-colors group-hover:border-primary/40">
                  <Image
                    src="/icons/logo.png"
                    alt="EventLoop Logo"
                    width={20}
                    height={20}
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-bold tracking-tight text-foreground">
                    Event<span className="text-primary">Loop</span>
                  </span>
                  <span className="text-[10px] tracking-wider text-muted-foreground uppercase">
                    Campus Developer Network
                  </span>
                </div>
              </Link>

              <Link
                href="/"
                className="rounded-lg border border-line bg-surface/70 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-sm transition-colors hover:border-line-strong hover:text-foreground"
              >
                ← Back to Home
              </Link>
            </header>

            {/* Main Auth Content */}
            <main className="relative z-10 mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-4 py-8 sm:px-6">
              {children}
            </main>

            {/* Minimal Sleek Footer */}
            <footer className="relative z-10 flex flex-col items-center justify-between gap-3 px-6 py-6 text-center text-xs text-subtle sm:flex-row sm:px-12">
              <p>© 2026 EventLoop. Designed for Campus Innovators.</p>
              <div className="flex items-center gap-4 text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                  Encrypted Session
                </span>
                <span>•</span>
                <Link href="/" className="hover:text-foreground transition-colors">
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
