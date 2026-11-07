import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/browse-events(.*)",
  "/tickets(.*)",
  "/reviews(.*)",
  "/profile(.*)",
  "/event/(.+)",
]);

const isAuthRoute = createRouteMatcher([
  "/login(.*)",
  "/register(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  const { pathname } = req.nextUrl;

  // Redirect legacy /BrowseEvent route to /browse-events
  if (pathname === "/BrowseEvent" || pathname.startsWith("/BrowseEvent/")) {
    return NextResponse.redirect(new URL("/browse-events", req.url));
  }

  const { userId } = await auth();

  // Redirect signed-in users away from auth pages
  if (userId && isAuthRoute(req)) {
    const rawTarget = req.nextUrl.searchParams.get("redirect") || "/dashboard";
    const target = rawTarget.startsWith("/") ? rawTarget : `/${rawTarget}`;
    return NextResponse.redirect(new URL(target, req.url));
  }

  // Enforce authentication on protected routes
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
