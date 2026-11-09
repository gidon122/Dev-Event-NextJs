"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useUser, useClerk } from "@clerk/nextjs";
import { LogOut, LayoutDashboard } from "lucide-react";

const Navbar = () => {
  const { user, isSignedIn, isLoaded } = useUser();
  const { signOut } = useClerk();

  const displayName = user
    ? user.fullName ||
      [user.firstName, user.lastName].filter(Boolean).join(" ") ||
      user.username ||
      "Profile"
    : "Profile";

  const initials = user
    ? (user.firstName ? user.firstName[0] : "") +
        (user.lastName ? user.lastName[0] : "") ||
      (user.primaryEmailAddress?.emailAddress
        ? user.primaryEmailAddress.emailAddress[0].toUpperCase()
        : "U")
    : "U";

  return (
    <header>
      <nav className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 px-2 py-1 text-foreground hover:opacity-90">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-line bg-surface-raised">
            <Image src="/icons/logo.png"
              alt="EventLoop"
              width={18}
              height={18}
              className="object-contain" />
          </div>
          <span className="text-base font-bold tracking-tight text-foreground">
            Event<span className="text-primary">Loop</span>
          </span>
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

          {isLoaded && isSignedIn ? (
            <>
              <li>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-1.5 font-medium text-primary transition-colors hover:text-foreground"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li className="flex items-center gap-3 pl-2">
                <Link
                  href="/profile"
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary ring-1 ring-primary/30 transition-transform hover:scale-105"
                  title={displayName}
                >
                  {initials}
                </Link>
                <button
                  type="button"
                  onClick={() => signOut({ redirectUrl: "/" })}
                  className="text-muted-foreground transition-colors hover:text-destructive"
                  title="Sign out"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </li>
            </>
          ) : isLoaded ? (
            <li>
              <Link
                href="/login"
                className="rounded-full border border-line bg-surface-raised px-4 py-1.5 text-xs font-medium text-foreground transition hover:border-primary/50 hover:bg-primary hover:text-primary-foreground"
              >
                Sign In
              </Link>
            </li>
          ) : null}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
