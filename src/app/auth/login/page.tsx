// app/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FiGithub, FiMail, FiLock, FiEye, FiEyeOff, FiAlertCircle, FiZap } from "react-icons/fi";
import { authClient } from "@/lib/auth-client"; // adjust path to match your project

const DEMO_EMAIL = "careerpilot@gmail.com";
const DEMO_PASSWORD = "Careerpilot@1234";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<"google" | "github" | null>(null);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const signInWithCredentials = async (loginEmail: string, loginPassword: string) => {
    const { error } = await authClient.signIn.email({
      email: loginEmail.trim(),
      password: loginPassword,
      rememberMe,
      callbackURL: "/dashboard",
    });
    if (error) {
      setServerError(error.message || "Invalid email or password.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");
    if (!validate()) return;
    setLoading(true);
    try {
      const success = await signInWithCredentials(email, password);
      if (success) router.push("/dashboard");
    } catch (err) {
      setServerError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setServerError("");
    setErrors({});
    setEmail(DEMO_EMAIL);
    setPassword(DEMO_PASSWORD);
    setDemoLoading(true);
    try {
      const success = await signInWithCredentials(DEMO_EMAIL, DEMO_PASSWORD);
      if (success) router.push("/dashboard");
    } catch (err) {
      setServerError("Demo login failed. Please try again.");
    } finally {
      setDemoLoading(false);
    }
  };

  const handleSocialLogin = async (provider: "google" | "github") => {
    setServerError("");
    setSocialLoading(provider);
    try {
      await authClient.signIn.social({ provider, callbackURL: "/dashboard" });
    } catch (err) {
      setServerError("Social login failed. Please try again.");
      setSocialLoading(null);
    }
  };

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-gray-50 px-4 py-8 sm:px-6 sm:py-12">
      <div className="w-full max-w-[420px] rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:max-w-md sm:p-8 sm:shadow-md">
        {/* Logo */}
        <Link href="/" className="mb-5 flex items-center justify-center gap-2 sm:mb-6">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-xs font-bold text-white sm:h-8 sm:w-8 sm:text-sm">
            C
          </span>
          <span className="text-base font-bold text-gray-900 sm:text-lg">
            CareerPilot <span className="text-blue-600">AI</span>
          </span>
        </Link>

        <div className="mb-5 text-center sm:mb-6">
          <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">Welcome Back!</h1>
          <p className="mt-1 text-sm text-gray-500">Login to continue your journey.</p>
        </div>

        {serverError && (
          <div className="mb-4 flex items-start gap-2 rounded-lg bg-red-50 px-3 py-2.5 text-xs text-red-600 sm:text-sm">
            <FiAlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{serverError}</span>
          </div>
        )}

        {/* Demo login */}
        <button
          type="button"
          onClick={handleDemoLogin}
          disabled={demoLoading || loading}
          className="mb-4 flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg border border-blue-200 bg-blue-50 py-2.5 text-sm font-semibold text-blue-700 transition-colors active:bg-blue-100 disabled:opacity-60 sm:hover:bg-blue-100"
        >
          <FiZap className="h-4 w-4 shrink-0" />
          <span className="truncate">
            {demoLoading ? "Logging in with demo account..." : "Try Demo Login"}
          </span>
        </button>

        {/* Social login */}
        <div className="flex flex-col gap-2.5 sm:gap-3">
          <button
            type="button"
            onClick={() => handleSocialLogin("google")}
            disabled={socialLoading !== null}
            className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg border border-gray-200 py-2.5 text-sm font-semibold text-gray-800 transition-colors active:bg-gray-50 disabled:opacity-60 sm:hover:bg-gray-50"
          >
            <FcGoogle className="h-5 w-5 shrink-0" />
            <span className="truncate">
              {socialLoading === "google" ? "Connecting..." : "Continue with Google"}
            </span>
          </button>
          {/* <button
            type="button"
            onClick={() => handleSocialLogin("github")}
            disabled={socialLoading !== null}
            className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg border border-gray-200 py-2.5 text-sm font-semibold text-gray-800 transition-colors active:bg-gray-50 disabled:opacity-60 sm:hover:bg-gray-50"
          >
            <FiGithub className="h-5 w-5 shrink-0" />
            <span className="truncate">
              {socialLoading === "github" ? "Connecting..." : "Continue with GitHub"}
            </span>
          </button> */}
        </div>

        {/* Divider */}
        <div className="my-5 flex items-center gap-3 sm:my-6">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-xs font-medium text-gray-400">or</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          {/* Email */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-gray-800">Email</label>
            <div className="relative">
              <FiMail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <input
                type="email"
                inputMode="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com"
                className={`min-h-[44px] w-full rounded-lg border py-2.5 pl-10 pr-3 text-sm font-medium text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${
                  errors.email ? "border-red-400 bg-red-50/30" : "border-gray-200 bg-white"
                }`}
              />
            </div>
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <div className="mb-1.5 flex flex-wrap items-center justify-between gap-1">
              <label className="text-sm font-semibold text-gray-800">Password</label>
              <Link href="/forgot-password" className="text-xs font-semibold text-blue-600 hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <FiLock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <input
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`min-h-[44px] w-full rounded-lg border py-2.5 pl-10 pr-10 text-sm font-medium text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${
                  errors.password ? "border-red-400 bg-red-50/30" : "border-gray-200 bg-white"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center text-gray-500 hover:text-gray-700"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
          </div>

          {/* Remember me */}
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 shrink-0 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            Remember me
          </label>

          <button
            type="submit"
            disabled={loading || demoLoading}
            className="mt-1 min-h-[46px] w-full rounded-lg bg-blue-600 text-sm font-semibold text-white transition-colors active:bg-blue-700 disabled:opacity-60 sm:hover:bg-blue-700"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-gray-500 sm:mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="font-semibold text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}