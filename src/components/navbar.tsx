"use client";

import * as React from "react";
import { useState, useMemo } from "react";
import Link from "next/link";
import { 
  Menu, 
  X, 
  Rocket, 
  Search, 
  ChevronDown, 
  Calculator, 
  Activity, 
  ArrowRightLeft, 
  Zap, 
  ShieldCheck, 
  Code, 
  Globe, 
  Image as ImageIcon,
  Cpu
} from "lucide-react";
import { GlobalSearch } from "./global-search";
import { tools, Tool } from "@/lib/tools";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORY_META: Record<string, { icon: any, color: string, bg: string }> = {
  "Calculators": { icon: Calculator, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/20" },
  "Math": { icon: Activity, color: "text-rose-600", bg: "bg-rose-50 dark:bg-rose-900/20" },
  "Converters": { icon: ArrowRightLeft, color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-900/20" },
  "Generators": { icon: Zap, color: "text-orange-600", bg: "bg-orange-50 dark:bg-orange-900/20" },
  "Validators": { icon: ShieldCheck, color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
  "Developer": { icon: Code, color: "text-indigo-600", bg: "bg-indigo-50 dark:bg-indigo-900/20" },
  "SEO": { icon: Globe, color: "text-cyan-600", bg: "bg-cyan-50 dark:bg-cyan-900/20" },
  "Image": { icon: ImageIcon, color: "text-purple-600", bg: "bg-purple-50 dark:bg-purple-900/20" },
  "Networking": { icon: Cpu, color: "text-slate-600", bg: "bg-slate-50 dark:bg-slate-900/20" },
  "Text": { icon: Zap, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20" }
};

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<boolean>(false);

  const toolsByCategory = useMemo(() => {
    const groups: Record<string, Tool[]> = {};
    tools.forEach(tool => {
      if (!groups[tool.category]) groups[tool.category] = [];
      if (groups[tool.category].length < 4) {
        groups[tool.category].push(tool);
      }
    });
    return groups;
  }, []);

  return (
    <nav 
      className="sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800"
      onMouseLeave={() => setActiveMegaMenu(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-xl shadow-indigo-600/20 group-hover:scale-110 transition-transform">
              <Rocket size={22} />
            </div>
            <span className="text-2xl font-black tracking-tighter text-gray-900 dark:text-white uppercase">
              Utility<span className="text-indigo-600">Lab</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <div 
              className="relative py-8"
              onMouseEnter={() => setActiveMegaMenu(true)}
            >
              <button className="flex items-center gap-2 text-sm font-black text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors uppercase tracking-widest">
                Tools & Categories <ChevronDown size={16} className={`transition-transform \${activeMegaMenu ? 'rotate-180' : ''}`} />
              </button>

              {/* Mega Menu */}
              <AnimatePresence>
                {activeMegaMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 w-[900px] bg-white dark:bg-gray-900/95 backdrop-blur-2xl border border-gray-100 dark:border-gray-800 shadow-2xl rounded-[3rem] p-10 grid grid-cols-4 gap-10 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-indigo-600/5 pointer-events-none" />
                    {Object.entries(toolsByCategory).map(([category, catTools]) => {
                      const meta = CATEGORY_META[category] || CATEGORY_META["Calculators"];
                      return (
                        <div key={category} className="space-y-4">
                          <div className="flex items-center gap-3 mb-2">
                             <div className={`w-8 h-8 rounded-lg \${meta.bg} flex items-center justify-center \${meta.color}`}>
                               <meta.icon size={16} />
                             </div>
                             <h3 className="font-black text-xs uppercase tracking-widest text-gray-900 dark:text-white">{category}</h3>
                          </div>
                          <ul className="space-y-2">
                            {catTools.map(t => (
                              <li key={t.id}>
                                <Link 
                                  href={t.path}
                                  className="text-[11px] font-bold text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors block truncate"
                                >
                                  {t.name}
                                </Link>
                              </li>
                            ))}
                            <li>
                               <Link 
                                href={
                                  category === "Math" ? "/math-tools" :
                                  category === "Developer" ? "/developer-tools" :
                                  category === "SEO" ? "/seo-tools" :
                                  category === "Image" ? "/image-tools" :
                                  category === "Text" ? "/text-tools" :
                                  category === "Networking" ? "/networking-tools" :
                                  `/${category.toLowerCase().replace(' ', '-')}`
                                }
                                className="text-[10px] font-black text-indigo-600 uppercase tracking-tighter hover:underline"
                               >
                                 View All →
                               </Link>
                            </li>
                          </ul>
                        </div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/calculators" className="text-sm font-black text-gray-700 dark:text-gray-300 hover:text-indigo-600 transition-colors uppercase tracking-widest">Calculators</Link>
            <Link href="/developer-tools" className="text-sm font-black text-gray-700 dark:text-gray-300 hover:text-indigo-600 transition-colors uppercase tracking-widest">Dev Tools</Link>
            <Link href="/blog" className="text-sm font-black text-gray-700 dark:text-gray-300 hover:text-indigo-600 transition-colors uppercase tracking-widest">Blog</Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <GlobalSearch />
            </div>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-3 rounded-2xl bg-gray-50 dark:bg-gray-900 text-gray-500 transition-all hover:bg-indigo-50"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 overflow-hidden"
          >
            <div className="px-6 py-10 space-y-8">
               <GlobalSearch />
               <div className="grid grid-cols-2 gap-6">
                  {Object.keys(toolsByCategory).map(cat => (
                    <Link 
                      key={cat}
                      href={
                        cat === "Math" ? "/math-tools" :
                        cat === "Developer" ? "/developer-tools" :
                        cat === "SEO" ? "/seo-tools" :
                        cat === "Image" ? "/image-tools" :
                        cat === "Text" ? "/text-tools" :
                        cat === "Networking" ? "/networking-tools" :
                        `/${cat.toLowerCase().replace(' ', '-')}`
                      }
                      onClick={() => setIsMenuOpen(false)}
                      className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 text-sm font-black uppercase tracking-widest text-center text-gray-700 dark:text-gray-300"
                    >
                      {cat}
                    </Link>
                  ))}
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
