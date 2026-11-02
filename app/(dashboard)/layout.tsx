import type { Metadata } from "next";
import { Schibsted_Grotesk } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import DashboardNav from "@/components/dashboard/DashboardNav";

const schibstedGrotesk = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Student Dashboard | EventLoop",
  description: "Manage your campus event passes, tickets, and reviews",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={`${schibstedGrotesk.className} min-h-screen bg-[#07090e] text-foreground antialiased selection:bg-[#59deca]/20 selection:text-[#5dfeca]`}
      >
          <div className="flex min-h-screen flex-col md:flex-row">
            {/* Sidebar + TopBar + BottomBar component */}
            <DashboardNav>{children}</DashboardNav>
          </div>
        
      </body>
    </html>
    </ClerkProvider>
  );
}
