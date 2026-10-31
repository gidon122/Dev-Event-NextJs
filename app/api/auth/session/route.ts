import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIE_NAME, encodeSession, AuthUser } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { user } = (await request.json()) as { user: AuthUser };
    if (!user || !user.email) {
      return NextResponse.json({ error: "Invalid user data" }, { status: 400 });
    }

    const token = encodeSession(user);
    const response = NextResponse.json({ success: true, user });

    response.cookies.set({
      name: AUTH_COOKIE_NAME,
      value: token,
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: "lax",
      httpOnly: false, // accessible to client scripts as well
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Failed to create session" }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set({
    name: AUTH_COOKIE_NAME,
    value: "",
    path: "/",
    maxAge: 0,
    sameSite: "lax",
  });
  return response;
}
