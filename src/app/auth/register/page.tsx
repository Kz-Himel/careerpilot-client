// app/register/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FiGithub, FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiAlertCircle } from "react-icons/fi";
import { authClient } from "@/lib/auth-client"; // adjust path to match your project

export default function RegisterPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<"google" | "github" | null>(null);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!fullName.trim()) newErrors.fullName = "Full name is required";

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!agreeTerms) newErrors.terms = "You must agree to the Terms & Conditions";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");

    if (!validate()) return;

    setLoading(true);
    try {
      const { error } = await authClient.signUp.email({
        name: fullName,
        email,
        password,
        callbackURL: "/dashboard",
      });

      if (error) {
        setServerError(error.message || "Something went wrong. Please try again.");
        return;
      }

      router.push("/dashboard");
    } catch (err) {
      setServerError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignup = async (provider: "google" | "github") => {
    setServerError("");
    setSocialLoading(provider);
    try {
      await authClient.signIn.social({
        provider,
        callbackURL: "/dashboard",
      });
    } catch (err) {
      setServerError("Social signup failed. Please try again.");
      setSocialLoading(null);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
        {/* Logo */}
        <Link href="/" className="mb-6 flex items-center justify-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
            C
          </span>
          <span className="text-lg font-bold text-gray-900">
            CareerPilot <span className="text-blue-600">AI</span>
          </span>
        </Link>

        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Create an Account</h1>
          <p className="mt-1 text-sm text-gray-500">Join thousands of learners today.</p>
        </div>

        {serverError && (
          <div className="mb-4 flex items-start gap-2 rounded-lg bg-red-50 px-3 py-2.5 text-sm text-red-600">
            <FiAlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{serverError}</span>
          </div>
        )}

        {/* Social signup */}
        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={() => handleSocialSignup("google")}
            disabled={socialLoading !== null}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-60"
          >
            <FcGoogle className="h-5 w-5" />
            {socialLoading === "google" ? "Connecting..." : "Continue with Google"}
          </button>
          <button
            type="button"
            onClick={() => handleSocialSignup("github")}
            disabled={socialLoading !== null}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-60"
          >
            <FiGithub className="h-5 w-5" />
            {socialLoading === "github" ? "Connecting..." : "Continue with GitHub"}
          </button>
        </div>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-xs font-medium text-gray-400">or</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          {/* Full Name */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Full Name</label>
            <div className="relative">
              <FiUser className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Rafi Hasan"
                className={`w-full rounded-lg border py-2.5 pl-10 pr-3 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${
                  errors.fullName ? "border-red-400" : "border-gray-200"
                }`}
              />
            </div>
            {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Email</label>
            <div className="relative">
              <FiMail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com"
                className={`w-full rounded-lg border py-2.5 pl-10 pr-3 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${
                  errors.email ? "border-red-400" : "border-gray-200"
                }`}
              />
            </div>
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <FiLock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full rounded-lg border py-2.5 pl-10 pr-10 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${
                  errors.password ? "border-red-400" : "border-gray-200"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
          </div>

          {/* Terms */}
          <div>
            <label className="flex items-start gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span>
                I agree to the{" "}
                <Link href="/terms" className="text-blue-600 hover:underline">
                  Terms & Conditions
                </Link>
              </span>
            </label>
            {errors.terms && <p className="mt-1 text-xs text-red-500">{errors.terms}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-1 w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}