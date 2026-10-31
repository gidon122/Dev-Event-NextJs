"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles, Loader2, ShieldCheck } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get("redirect") || "/dashboard";

  const { login, loginAsDemo } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDemoSubmitting, setIsDemoSubmitting] = useState(false);

  const isEventRedirect = redirectTarget.startsWith("/event/");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your campus email.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setIsSubmitting(true);
    const result = await login(email, password);
    setIsSubmitting(false);

    if (result.success) {
      router.push(redirectTarget);
      router.refresh();
    } else {
      setError(result.error || "Invalid campus credentials.");
    }
  };

  const handleDemoLogin = async () => {
    setError("");
    setIsDemoSubmitting(true);
    await loginAsDemo();
    setIsDemoSubmitting(false);
    router.push(redirectTarget);
    router.refresh();
  };

  return (
    <div className="w-full">
      {/* Auth Card */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0d161a]/85 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
        {/* Subtle top glow line */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#59deca]/60 to-transparent" />

        {/* Header */}
        <div className="mb-6 text-center">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-[#59deca]/30 bg-[#59deca]/10 px-3 py-1 text-xs font-medium text-[#5dfeca]">
            <Sparkles className="h-3.5 w-3.5" />
            Student & Attendee Access
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Welcome Back
          </h1>
          <p className="mt-2 text-xs text-slate-400 sm:text-sm">
            Sign in to manage your campus event tickets and schedule
          </p>
        </div>

        {/* Event Redirection Notice */}
        {isEventRedirect && (
          <div className="mb-5 flex items-start gap-2.5 rounded-xl border border-[#59deca]/30 bg-[#59deca]/5 p-3 text-xs text-[#5dfeca]">
            <ShieldCheck className="h-4 w-4 shrink-0 mt-0.5 text-[#59deca]" />
            <span>
              Authentication required to view event details. Sign in to proceed directly to your requested event.
            </span>
          </div>
        )}

        {/* Error Notification */}
        {error && (
          <div className="mb-5 rounded-xl border border-red-500/30 bg-red-950/40 p-3.5 text-xs text-red-200">
            {error}
          </div>
        )}

        {/* One-Click Quick Demo Sign In */}
        <button
          type="button"
          onClick={handleDemoLogin}
          disabled={isDemoSubmitting || isSubmitting}
          className="mb-5 flex w-full items-center justify-between rounded-xl border border-dashed border-[#59deca]/40 bg-[#182830]/50 px-4 py-2.5 text-xs font-medium text-slate-300 transition-colors hover:border-[#59deca] hover:bg-[#182830] hover:text-white"
        >
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#59deca]/20 text-[10px] font-bold text-[#5dfeca]">
              AO
            </span>
            <span>Quick Demo: Sign in as Amina (Student)</span>
          </div>
          {isDemoSubmitting ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin text-[#5dfeca]" />
          ) : (
            <span className="text-[11px] text-[#59deca]">Instant Fill →</span>
          )}
        </button>

        <div className="relative mb-5 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/5" />
          </div>
          <span className="relative bg-[#0d161a] px-3 text-[11px] uppercase tracking-wider text-slate-500">
            or with campus credentials
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-300">
              Campus Email
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                <Mail className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@campus.edu.ng"
                autoComplete="email"
                required
                className="w-full rounded-xl border border-[#182830] bg-[#070b0e] py-2.5 pl-10 pr-4 text-xs sm:text-sm text-white placeholder-slate-500 transition-colors focus:border-[#59deca] focus:outline-none focus:ring-1 focus:ring-[#59deca]"
              />
            </div>
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label className="text-xs font-medium text-slate-300">
                Password
              </label>
              <button
                type="button"
                tabIndex={-1}
                className="text-[11px] text-slate-400 hover:text-[#5dfeca] transition-colors"
                onClick={() => alert("For this demo, any password will sign in with your email!")}
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                <Lock className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                required
                className="w-full rounded-xl border border-[#182830] bg-[#070b0e] py-2.5 pl-10 pr-10 text-xs sm:text-sm text-white placeholder-slate-500 transition-colors focus:border-[#59deca] focus:outline-none focus:ring-1 focus:ring-[#59deca]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-white"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || isDemoSubmitting}
            className="group relative mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#59deca] py-3 text-xs sm:text-sm font-semibold text-black transition-all hover:bg-[#5dfeca] hover:shadow-[0_0_25px_rgba(93,254,202,0.35)] disabled:opacity-50"
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </>
            )}
          </button>
        </form>

        {/* Footer Switcher */}
        <div className="mt-6 border-t border-white/5 pt-4 text-center">
          <p className="text-xs text-slate-400">
            Don&apos;t have a student pass yet?{" "}
            <Link
              href={redirectTarget ? `/register?redirect=${encodeURIComponent(redirectTarget)}` : "/register"}
              className="font-medium text-[#5dfeca] hover:underline"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-16 text-slate-400">
          <Loader2 className="h-6 w-6 animate-spin text-[#59deca]" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
