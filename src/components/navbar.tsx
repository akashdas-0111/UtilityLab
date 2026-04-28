"use client";

import * as React from "react";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, Rocket, Search } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { GlobalSearch } from "./global-search";

const categories = [
  { name: "Calculators", href: "/calculators" },
  { name: "Converters", href: "/converters" },
  { name: "Generators", href: "/generators" },
  { name: "Validators", href: "/validators" },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/20 group-hover:scale-110 transition-transform">
              <Rocket size={20} />
            </div>
            <span className="text-xl font-black tracking-tighter text-gray-900 dark:text-white uppercase">
              Utility<span className="text-indigo-600">Lab</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                className="text-sm font-bold text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                {cat.name}
              </Link>
            ))}
          </div>

          {/* Right Side (Search, Toggle & Hamburger) */}
          <div className="flex items-center gap-2 lg:gap-4">
            <div className="hidden lg:block">
              <GlobalSearch />
            </div>
            
            <button 
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Search size={20} />
            </button>

            <ThemeToggle />
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Overlay */}
      {isMobileSearchOpen && (
        <div className="lg:hidden px-4 pb-4 animate-in slide-in-from-top-2">
          <GlobalSearch />
        </div>
      )}

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800">
          <div className="px-4 py-6 space-y-4">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                className="block text-lg font-bold text-gray-900 dark:text-white hover:text-indigo-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
