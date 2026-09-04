"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, Sparkles, X } from "lucide-react";
import { AUTH_CHANGE_EVENT, AUTH_STORAGE_KEY, notifyAuthChange } from "@/lib/auth";

export const appname = {
  name: "Elysium Galaxy",
};

export const navbarlinks = [
  { label: "Welcome", href: "/" }, // يُفضل التوجيه للـ Root /
  { label: "Galaxy", href: "/galaxy1" },
  { label: "Premium", href: "/premium" },
  // { label: "Sign Up", href: "/login" },
];

export default function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const syncAuthState = () => {
      setIsAuthenticated(Boolean(localStorage.getItem(AUTH_STORAGE_KEY)));
    };

    syncAuthState();
    window.addEventListener(AUTH_CHANGE_EVENT, syncAuthState);
    window.addEventListener("storage", syncAuthState);

    return () => {
      window.removeEventListener(AUTH_CHANGE_EVENT, syncAuthState);
      window.removeEventListener("storage", syncAuthState);
    };
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setIsAuthenticated(false);
    notifyAuthChange();
    closeMenu();
    router.push("/");
  };

  return (
    <header className="relative z-50 overflow-hidden font-['Poppins']">
      <div className="mx-auto flex w-full max-w-7xl items-center px-5 py-5 sm:px-8 sm:py-8">
        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-controls="main-navigation"
          aria-label={
            isMenuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          className="relative z-20 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-md transition-colors duration-200 hover:bg-white/20 sm:hidden"
        >
          {isMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>

        <Link href="/" className="ml-4 hidden items-center gap-3 sm:flex">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-tr from-cyan-400 to-indigo-600 shadow-lg shadow-cyan-500/30">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <span className="text-3xl font-semibold tracking-wide text-white">
            Elysium Galaxy
          </span>
        </Link>

        <nav
          id="main-navigation"
          className="ml-4 min-w-0 flex-1 overflow-hidden text-lg font-light text-gray-300 sm:ml-auto sm:w-auto sm:flex-none sm:overflow-visible"
        >
          <div
            className={`flex w-max flex-nowrap items-center justify-end gap-5 transition-transform duration-300 ease-out sm:w-auto sm:gap-10 ${isMenuOpen
              ? "translate-x-0"
              : "-translate-x-full sm:translate-x-0"
              }`}
          >
            {navbarlinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="shrink-0 rounded-lg px-2 py-3 text-sm transition-colors duration-200 hover:bg-white/10 hover:text-white sm:px-0 sm:py-0 sm:text-lg sm:hover:bg-transparent"
              >
                {link.label}
              </Link>
            ))}
            {isAuthenticated ? (
              <button
                type="button"
                onClick={handleLogout}
                className="shrink-0 rounded-lg px-2 py-3 text-sm transition-colors duration-200 hover:bg-white/10 hover:text-white sm:px-0 sm:py-0 sm:text-lg sm:hover:bg-transparent"
              >
                Log Out
              </button>
            ) : (
              <Link
                href="/login"
                onClick={closeMenu}
                className="shrink-0 rounded-lg px-2 py-3 text-sm transition-colors duration-200 hover:bg-white/10 hover:text-white sm:px-0 sm:py-0 sm:text-lg sm:hover:bg-transparent"
              >
                Sign Up
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}