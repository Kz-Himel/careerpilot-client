"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FiMail, FiLock, FiEye, FiEyeOff, FiAlertCircle, FiZap } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";

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
  const [socialLoading, setSocialLoading] = useState<"google" | null>(null);

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
    } catch {
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
    } catch {
      setServerError("Demo login failed. Please try again.");
    } finally {
      setDemoLoading(false);
    }
  };

  const handleSocialLogin = async (provider: "google") => {
    setServerError("");
    setSocialLoading(provider);
    try {
      await authClient.signIn.social({ provider, callbackURL: "/dashboard" });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Social login failed. Please try again.";
      setServerError(message);
      setSocialLoading(null);
    }
  };

  const isDisabled = loading || demoLoading || socialLoading !== null;

  return (
    <div className="mesh-gradient flex min-h-[calc(100dvh-4rem)] items-center justify-center px-4 py-10 sm:px-6 sm:py-14">
      <div className="card w-full max-w-[440px] p-7 shadow-lg sm:p-9">
        {/* Logo */}
        <Link href="/" className="mb-6 flex items-center justify-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-sm font-bold text-white">
            C
          </span>
          <span className="text-lg font-bold text-slate-900">
            CareerPilot{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              AI
            </span>
          </span>
        </Link>

        <div className="mb-6 text-center">
          <h1 className="heading-page text-xl sm:text-2xl">Welcome Back!</h1>
          <p className="mt-1.5 text-sm text-slate-500">Login to continue your journey.</p>
        </div>

        {serverError && (
          <div className="alert alert-error mb-5">
            <FiAlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{serverError}</span>
          </div>
        )}

        {/* Demo login */}
        <button
          type="button"
          onClick={handleDemoLogin}
          disabled={isDisabled}
          className="btn btn-md mb-4 w-full rounded-xl border border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
        >
          {demoLoading ? (
            <>
              <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Logging in with demo account...</span>
            </>
          ) : (
            <>
              <FiZap className="h-4 w-4 shrink-0" />
              <span>Try Demo Login</span>
            </>
          )}
        </button>

        {/* Social login */}
        <button
          type="button"
          onClick={() => handleSocialLogin("google")}
          disabled={isDisabled}
          className="btn btn-secondary btn-md w-full rounded-xl"
        >
          {socialLoading === "google" ? (
            <>
              <svg className="h-5 w-5 animate-spin text-slate-500" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Connecting...</span>
            </>
          ) : (
            <>
              <FcGoogle className="h-5 w-5 shrink-0" />
              <span>Continue with Google</span>
            </>
          )}
        </button>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-slate-200" />
          <span className="text-xs font-medium text-slate-400">or</span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          <div>
            <label className="form-label">Email</label>
            <div className="relative">
              <FiMail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                inputMode="email"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com"
                disabled={isDisabled}
                className={`form-input-icon ${errors.email ? "form-input-error" : ""}`}
              />
            </div>
            {errors.email && <p className="form-error">{errors.email}</p>}
          </div>

          <div>
            <div className="mb-2 flex flex-wrap items-center justify-between gap-1">
              <label className="form-label mb-0">Password</label>
              <Link href="/forgot-password" className="text-xs font-semibold text-indigo-600 hover:text-indigo-700">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <FiLock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                disabled={isDisabled}
                className={`form-input-icon pr-10 ${errors.password ? "form-input-error" : ""}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                disabled={isDisabled}
                className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 disabled:opacity-50"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && <p className="form-error">{errors.password}</p>}
          </div>

          <label className="flex items-center gap-2.5 text-sm font-medium text-slate-600">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              disabled={isDisabled}
              className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 disabled:opacity-50"
            />
            Remember me
          </label>

          <button
            type="submit"
            disabled={isDisabled}
            className="btn btn-primary btn-lg mt-1 w-full rounded-xl"
          >
            {loading ? (
              <>
                <svg className="h-5 w-5 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Logging in...</span>
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="font-semibold text-indigo-600 hover:text-indigo-700">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
