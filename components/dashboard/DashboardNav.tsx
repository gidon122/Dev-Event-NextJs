"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Compass,
  Ticket,
  MessageSquareText,
  User,
  LogOut,
} from "lucide-react";
import { useClerk } from "@clerk/nextjs";

interface DashboardNavProps {
  children: React.ReactNode;
}

export default function DashboardNav({ children }: DashboardNavProps) {
  const pathname = usePathname();
  const { signOut } = useClerk();

  const navItems = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      active: pathname === "/dashboard",
    },
    {
      label: "Browse events",
      href: "/browse-events",
      icon: Compass,
      active: pathname === "/browse-events" || pathname === "/BrowseEvent",
    },
    {
      label: "My tickets",
      href: "/tickets",
      icon: Ticket,
      badge: 3,
      active: pathname === "/tickets",
    },
    {
      label: "My reviews",
      href: "/reviews",
      icon: MessageSquareText,
      badge: 1,
      active: pathname === "/reviews",
    },
    {
      label: "Profile",
      href: "/profile",
      icon: User,
      active: pathname === "/profile",
    },
  ];

  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      {/* Desktop Fixed Left Sidebar (220px) */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-56 flex-col justify-between border-r border-sidebar-border bg-sidebar p-4 md:flex">
        <div className="space-y-6">
          {/* Brand */}
          <Link
            href="/"
            className="flex items-center gap-2.5 px-2 py-1 text-foreground hover:opacity-90"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-line bg-surface-raised">
              <Image
                src="/icons/logo.png"
                alt="EventLoop"
                width={18}
                height={18}
                className="object-contain"
              />
            </div>
            <span className="text-base font-bold tracking-tight text-foreground">
              Event<span className="text-primary">Loop</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-medium transition-all ${
                    item.active
                      ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold"
                      : "text-sidebar-foreground hover:bg-surface-hover hover:text-foreground"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`h-4 w-4 ${item.active ? "text-primary" : "text-muted-foreground"}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                        item.active
                          ? "bg-primary/15 text-primary"
                          : "bg-surface-hover text-muted-foreground"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="space-y-3 border-t border-sidebar-border pt-4">
          <button
            type="button"
            onClick={() => signOut({ redirectUrl: "/login" })}
            className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col md:ml-56">
        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-20 md:pb-10 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Tab Bar (matching pics/image.png) */}
      <div className="fixed inset-x-0 bottom-0 z-30 flex h-14 items-center justify-around border-t border-sidebar-border bg-sidebar px-2 md:hidden">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 text-[10px] font-medium transition-colors ${
                item.active                 ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label === "Browse events" ? "Events" : item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
