"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { LogOut, LayoutDashboard } from "lucide-react";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header>
      <nav className="flex items-center justify-between">
        <Link className="logo flex items-center gap-2" href="/">
          <Image src="/icons/logo.png" alt="logo" width={24} height={24} />
          <p className="font-bold text-lg">DevEvent</p>
        </Link>

        <ul className="flex list-none items-center gap-6 text-sm">
          <li>
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link href="/event" className="hover:text-primary transition-colors">
              Events
            </Link>
          </li>

          {isAuthenticated ? (
            <>
              <li>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-1.5 text-primary hover:text-white transition-colors font-medium"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li className="flex items-center gap-3 pl-2">
                <Link
                  href="/profile"
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0d2a4a] text-xs font-bold text-[#93c5fa] ring-1 ring-[#1e3a5f] hover:scale-105 transition-transform"
                  title={user?.name || "Profile"}
                >
                  {user?.avatarInitials || "AO"}
                </Link>
                <button
                  type="button"
                  onClick={() => logout()}
                  className="text-slate-400 hover:text-red-400 transition-colors"
                  title="Sign out"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link
                href="/login"
                className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-white transition hover:border-primary/50 hover:bg-primary hover:text-black"
              >
                Sign In
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
