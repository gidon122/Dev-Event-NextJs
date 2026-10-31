"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  GraduationCap,
  ArrowRight,
  Sparkles,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get("redirect") || "/dashboard";

  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("Computer Engineering");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid campus email.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    const result = await register({
      name,
      email,
      department,
      password,
    });
    setIsSubmitting(false);

    if (result.success) {
      router.push(redirectTarget);
      router.refresh();
    } else {
      setError(result.error || "Registration failed.");
    }
  };

  return (
    <div className="w-full">
      {/* Auth Card */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0d161a]/85 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
        {/* Top glow line */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#59deca]/60 to-transparent" />

        {/* Header */}
        <div className="mb-6 text-center">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-[#59deca]/30 bg-[#59deca]/10 px-3 py-1 text-xs font-medium text-[#5dfeca]">
            <Sparkles className="h-3.5 w-3.5" />
            New Student Pass
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Create an Account
          </h1>
          <p className="mt-2 text-xs text-slate-400 sm:text-sm">
            Join EventLoop to explore and register for campus events
          </p>
        </div>

        {/* Error notification */}
        {error && (
          <div className="mb-5 rounded-xl border border-red-500/30 bg-red-950/40 p-3.5 text-xs text-red-200">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-3.5">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-300">
              Full Name
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                <User className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Amina Okafor"
                required
                className="w-full rounded-xl border border-[#182830] bg-[#070b0e] py-2.5 pl-10 pr-4 text-xs sm:text-sm text-white placeholder-slate-500 transition-colors focus:border-[#59deca] focus:outline-none focus:ring-1 focus:ring-[#59deca]"
              />
            </div>
          </div>

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
                placeholder="amina.o@campus.edu.ng"
                required
                className="w-full rounded-xl border border-[#182830] bg-[#070b0e] py-2.5 pl-10 pr-4 text-xs sm:text-sm text-white placeholder-slate-500 transition-colors focus:border-[#59deca] focus:outline-none focus:ring-1 focus:ring-[#59deca]"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-300">
              Department / Major
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                <GraduationCap className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="Computer Engineering"
                className="w-full rounded-xl border border-[#182830] bg-[#070b0e] py-2.5 pl-10 pr-4 text-xs sm:text-sm text-white placeholder-slate-500 transition-colors focus:border-[#59deca] focus:outline-none focus:ring-1 focus:ring-[#59deca]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-300">
                Password
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-3.5 w-3.5 text-slate-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full rounded-xl border border-[#182830] bg-[#070b0e] py-2.5 pl-9 pr-8 text-xs sm:text-sm text-white placeholder-slate-500 transition-colors focus:border-[#59deca] focus:outline-none focus:ring-1 focus:ring-[#59deca]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-2.5 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-300">
                Confirm
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <ShieldCheck className="h-3.5 w-3.5 text-slate-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full rounded-xl border border-[#182830] bg-[#070b0e] py-2.5 pl-9 pr-3 text-xs sm:text-sm text-white placeholder-slate-500 transition-colors focus:border-[#59deca] focus:outline-none focus:ring-1 focus:ring-[#59deca]"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="group relative mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#59deca] py-3 text-xs sm:text-sm font-semibold text-black transition-all hover:bg-[#5dfeca] hover:shadow-[0_0_25px_rgba(93,254,202,0.35)] disabled:opacity-50"
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <span>Create Student Account</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </>
            )}
          </button>
        </form>

        {/* Footer Switcher */}
        <div className="mt-6 border-t border-white/5 pt-4 text-center">
          <p className="text-xs text-slate-400">
            Already registered on EventLoop?{" "}
            <Link
              href={redirectTarget ? `/login?redirect=${encodeURIComponent(redirectTarget)}` : "/login"}
              className="font-medium text-[#5dfeca] hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-16 text-slate-400">
          <Loader2 className="h-6 w-6 animate-spin text-[#59deca]" />
        </div>
      }
    >
      <RegisterForm />
    </Suspense>
  );
}
