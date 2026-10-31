export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: "student" | "attendee" | "organizer" | "admin";
  department?: string;
  level?: string;
  avatarInitials: string;
}

export const AUTH_COOKIE_NAME = "eventloop_session";

export const DEMO_USER: AuthUser = {
  id: "student-amina-01",
  name: "Amina Okafor",
  email: "amina.o@campus.edu.ng",
  role: "student",
  department: "Computer Engineering",
  level: "400 level",
  avatarInitials: "AO",
};

export function getInitials(name: string): string {
  if (!name) return "U";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function encodeSession(user: AuthUser): string {
  try {
    const json = JSON.stringify(user);
    if (typeof window !== "undefined") {
      return btoa(unescape(encodeURIComponent(json)));
    }
    return Buffer.from(json, "utf-8").toString("base64");
  } catch {
    return "";
  }
}

export function decodeSession(token?: string | null): AuthUser | null {
  if (!token) return null;
  try {
    let json = "";
    if (typeof window !== "undefined") {
      json = decodeURIComponent(escape(atob(token)));
    } else {
      json = Buffer.from(token, "base64").toString("utf-8");
    }
    const parsed = JSON.parse(json);
    if (parsed && parsed.email) {
      return parsed as AuthUser;
    }
    return null;
  } catch {
    return null;
  }
}

export function getClientSession(): AuthUser | null {
  if (typeof window === "undefined") return null;

  // Check cookie first
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${AUTH_COOKIE_NAME}=`));
  if (match) {
    const value = match.split("=")[1];
    const decoded = decodeSession(value);
    if (decoded) return decoded;
  }

  // Fallback to localStorage
  try {
    const stored = localStorage.getItem(AUTH_COOKIE_NAME);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // Ignore storage errors
  }

  return null;
}

export function setClientSession(user: AuthUser): void {
  if (typeof window === "undefined") return;

  const encoded = encodeSession(user);
  const maxAge = 60 * 60 * 24 * 7; // 7 days
  document.cookie = `${AUTH_COOKIE_NAME}=${encoded}; path=/; max-age=${maxAge}; SameSite=Lax`;

  try {
    localStorage.setItem(AUTH_COOKIE_NAME, JSON.stringify(user));
  } catch {
    // Ignore storage errors
  }
}

export function clearClientSession(): void {
  if (typeof window === "undefined") return;

  document.cookie = `${AUTH_COOKIE_NAME}=; path=/; max-age=0; SameSite=Lax`;

  try {
    localStorage.removeItem(AUTH_COOKIE_NAME);
  } catch {
    // Ignore storage errors
  }
}
