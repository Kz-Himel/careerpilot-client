"use client";

import Link from "next/link";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiTwitter,
  FiLinkedin,
  FiYoutube,
  FiInstagram,
} from "react-icons/fi";

const footerLinks = {
  product: [
    { label: "Features", href: "/features" },
    { label: "Career Paths", href: "/explore" },
    { label: "Pricing", href: "/pricing" },
    { label: "AI Roadmap", href: "/dashboard/ai-roadmap" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
  support: [
    { label: "Help Center", href: "/faq" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

const socialLinks = [
  { icon: FiTwitter, href: "https://twitter.com", label: "Twitter" },
  { icon: FiLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: FiYoutube, href: "https://youtube.com", label: "YouTube" },
  { icon: FiInstagram, href: "https://instagram.com", label: "Instagram" },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/50 bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand + contact */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="mb-4 flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-sm font-bold text-white">
                C
              </span>
              <span className="text-lg font-bold text-white">
                CareerPilot{" "}
                <span className="text-indigo-400">AI</span>
              </span>
            </Link>
            <p className="mb-5 text-sm leading-relaxed text-slate-400">
              Your AI-powered career coach for personalized growth and success.
            </p>
            <div className="flex flex-col gap-2.5 text-sm text-slate-400">
              <a
                href="mailto:hello@careerpilot.ai"
                className="flex items-center gap-2 transition-colors hover:text-indigo-400"
              >
                <FiMail className="h-4 w-4 shrink-0" />
                hello@careerpilot.ai
              </a>
              <a
                href="tel:+8801234567890"
                className="flex items-center gap-2 transition-colors hover:text-indigo-400"
              >
                <FiPhone className="h-4 w-4 shrink-0" />
                +880 1234 567890
              </a>
              <span className="flex items-center gap-2">
                <FiMapPin className="h-4 w-4 shrink-0" />
                Dhaka, Bangladesh
              </span>
            </div>
          </div>

          {/* Product links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-200">
              Product
            </h3>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-200">
              Company
            </h3>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-200">
              Support
            </h3>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center gap-5 border-t border-slate-800 pt-8 sm:flex-row sm:justify-between">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} CareerPilot AI. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 text-slate-400 transition-all duration-150 hover:border-indigo-500/50 hover:bg-indigo-500/10 hover:text-indigo-400"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
