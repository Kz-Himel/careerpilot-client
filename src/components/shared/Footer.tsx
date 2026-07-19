// components/share/Footer.tsx
"use client";

import Link from "next/link";
import { FiMail, FiPhone, FiMapPin, FiTwitter, FiLinkedin, FiYoutube, FiInstagram } from "react-icons/fi";

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
    <footer className="border-t border-gray-100 bg-white px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand + contact */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="mb-3 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
                C
              </span>
              <span className="text-lg font-bold text-gray-900">
                CareerPilot <span className="text-blue-600">AI</span>
              </span>
            </Link>
            <p className="mb-4 text-sm leading-relaxed text-gray-500">
              Your AI-powered career coach for personalized growth and success.
            </p>
            <div className="flex flex-col gap-2 text-sm text-gray-500">
              <a href="mailto:hello@careerpilot.ai" className="flex items-center gap-2 hover:text-blue-600">
                <FiMail className="h-4 w-4 shrink-0" />
                hello@careerpilot.ai
              </a>
              <a href="tel:+8801234567890" className="flex items-center gap-2 hover:text-blue-600">
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
            <h3 className="mb-3 text-sm font-semibold text-gray-900">Product</h3>
            <ul className="flex flex-col gap-2">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-500 hover:text-blue-600">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-gray-900">Company</h3>
            <ul className="flex flex-col gap-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-500 hover:text-blue-600">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support links */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-gray-900">Support</h3>
            <ul className="flex flex-col gap-2">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-500 hover:text-blue-600">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-center gap-4 border-t border-gray-100 pt-6 sm:flex-row sm:justify-between">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} CareerPilot AI. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
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