import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_COOKIE_NAME = "eventloop_session";

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const sessionToken = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  const isAuthenticated = Boolean(sessionToken);

  // Redirect legacy /BrowseEvent route to /browse-events
  if (pathname === "/BrowseEvent" || pathname.startsWith("/BrowseEvent/")) {
    return NextResponse.redirect(new URL("/browse-events", request.url));
  }

  // Check if accessing event details (/event/[id])
  // Note: /event is public list, /event/[id] requires authentication
  const isEventDetails =
    pathname.startsWith("/event/") &&
    pathname !== "/event" &&
    pathname !== "/event/";

  // Protected attendee / dashboard routes
  const isDashboardRoute =
    pathname === "/dashboard" ||
    pathname.startsWith("/dashboard/") ||
    pathname === "/tickets" ||
    pathname.startsWith("/tickets/") ||
    pathname === "/reviews" ||
    pathname.startsWith("/reviews/") ||
    pathname === "/profile" ||
    pathname.startsWith("/profile/") ||
    pathname === "/browse-events" ||
    pathname.startsWith("/browse-events/") ||
    pathname === "/BrowseEvent" ||
    pathname.startsWith("/BrowseEvent/");

  const isAuthRoute = pathname === "/login" || pathname === "/register";

  // 1. Require authentication for event details & dashboard
  if ((isEventDetails || isDashboardRoute) && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    const destination = pathname + (request.nextUrl.search || "");
    loginUrl.searchParams.set("redirect", destination);
    return NextResponse.redirect(loginUrl);
  }

  // 2. Redirect already authenticated users away from /login & /register
  if (isAuthRoute && isAuthenticated) {
    const rawTarget = searchParams.get("redirect") || "/dashboard";
    const target = rawTarget.startsWith("/") ? rawTarget : `/${rawTarget}`;
    return NextResponse.redirect(new URL(target, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/event/:path*",
    "/dashboard",
    "/dashboard/:path*",
    "/tickets",
    "/tickets/:path*",
    "/reviews",
    "/reviews/:path*",
    "/profile",
    "/profile/:path*",
    "/browse-events",
    "/browse-events/:path*",
    "/BrowseEvent",
    "/BrowseEvent/:path*",
    "/login",
    "/register",
  ],
};
