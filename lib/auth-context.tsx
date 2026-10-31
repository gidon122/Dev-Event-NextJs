"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  AuthUser,
  DEMO_USER,
  getClientSession,
  setClientSession,
  clearClientSession,
  getInitials,
} from "./auth";

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  loginAsDemo: () => Promise<void>;
  register: (data: {
    name: string;
    email: string;
    password?: string;
    department?: string;
  }) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const session = getClientSession();
    setUser(session);
    setIsLoading(false);
  }, []);

  const login = async (email: string, _password?: string) => {
    setIsLoading(true);
    try {
      // Simulate network request or API call
      await new Promise((resolve) => setTimeout(resolve, 400));

      if (!email.trim()) {
        setIsLoading(false);
        return { success: false, error: "Please enter your campus email." };
      }

      // If logging in with demo email or any campus student email
      const isDemo = email.toLowerCase().includes("amina") || email.toLowerCase().includes("demo");
      const loggedUser: AuthUser = isDemo
        ? DEMO_USER
        : {
            id: `user-${Date.now()}`,
            name: email.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
            email: email.trim(),
            role: "student",
            department: "Computer Engineering",
            level: "400 level",
            avatarInitials: getInitials(email.split("@")[0]),
          };

      setClientSession(loggedUser);
      setUser(loggedUser);
      setIsLoading(false);

      // Also call server endpoint to set cookie in HTTP header
      try {
        await fetch("/api/auth/session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user: loggedUser }),
        });
      } catch {
        // Fallback already written to document.cookie
      }

      return { success: true };
    } catch {
      setIsLoading(false);
      return { success: false, error: "Failed to sign in. Please try again." };
    }
  };

  const loginAsDemo = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    setClientSession(DEMO_USER);
    setUser(DEMO_USER);
    setIsLoading(false);

    try {
      await fetch("/api/auth/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: DEMO_USER }),
      });
    } catch {
      // Handled
    }
  };

  const register = async (data: {
    name: string;
    email: string;
    password?: string;
    department?: string;
  }) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 400));

      if (!data.name.trim() || !data.email.trim()) {
        setIsLoading(false);
        return { success: false, error: "Please provide your name and email." };
      }

      const newUser: AuthUser = {
        id: `user-${Date.now()}`,
        name: data.name.trim(),
        email: data.email.trim(),
        role: "student",
        department: data.department || "Engineering",
        level: "100 level",
        avatarInitials: getInitials(data.name),
      };

      setClientSession(newUser);
      setUser(newUser);
      setIsLoading(false);

      try {
        await fetch("/api/auth/session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user: newUser }),
        });
      } catch {
        // Handled
      }

      return { success: true };
    } catch {
      setIsLoading(false);
      return { success: false, error: "Registration failed. Please try again." };
    }
  };

  const logout = async () => {
    setIsLoading(true);
    clearClientSession();
    setUser(null);

    try {
      await fetch("/api/auth/session", {
        method: "DELETE",
      });
    } catch {
      // Handled
    }

    setIsLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        loginAsDemo,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
