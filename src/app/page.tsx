"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { 
  Search, 
  TrendingUp, 
  Calculator, 
  ArrowRightLeft, 
  Zap, 
  CheckCircle, 
  Rocket,
  Shield,
  Code,
  Globe,
  Terminal,
  Activity,
  Heart,
  ChevronRight,
  FileText,
  Image as ImageIcon
} from "lucide-react";
import { tools, Tool } from "@/lib/tools";

const categoryCards = [
  { name: "Calculators", description: "SIP, EMI, Tax & Loans", icon: Calculator, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/20", path: "/calculators" },
  { name: "Math Tools", description: "Algebra, Stats & Units", icon: Activity, color: "text-rose-600", bg: "bg-rose-50 dark:bg-rose-900/20", path: "/math-tools" },
  { name: "Image Tools", description: "Crop, Resize & Color", icon: ImageIcon, color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-900/20", path: "/image-tools" },
  { name: "Text Tools", description: "Case, Lorem & Slugs", icon: Zap, color: "text-orange-600", bg: "bg-orange-50 dark:bg-orange-900/20", path: "/text-tools" },
  { name: "Developer Tools", description: "JSON, JWT & Debugging", icon: Code, color: "text-indigo-600", bg: "bg-indigo-50 dark:bg-indigo-900/20", path: "/developer-tools" },
  { name: "SEO & Content", description: "Meta, Sitemap & Ideas", icon: Globe, color: "text-cyan-600", bg: "bg-cyan-50 dark:bg-cyan-900/20", path: "/seo-tools" },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const popularTools = useMemo(() => {
    return tools.filter(t => t.popular).slice(0, 12);
  }, []);

  const filteredTools = useMemo(() => {
    if (!searchQuery) return [];
    return tools.filter(t => 
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 8);
  }, [searchQuery]);

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-6 animate-fade-in">
            <Rocket size={16} />
            <span>100+ Professional Tools & Utilities</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-gray-900 dark:text-white leading-tight">
            The Ultimate <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">Utility Workspace</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Professional-grade tools for developers, designers, and financial planners. 
            Open-source, privacy-focused, and incredibly fast.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-500 transition-colors">
                <Search size={20} />
              </div>
              <input
                type="text"
                placeholder="Search for any tool (e.g., SIP, JSON, UUID...)"
                className="block w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 text-gray-900 dark:text-white text-lg focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-xl shadow-gray-200/50 dark:shadow-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Search Results Dropdown */}
            {searchQuery && (
              <div className="absolute mt-2 w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-2xl z-50 overflow-hidden text-left animate-in fade-in slide-in-from-top-2">
                <div className="p-2">
                  {filteredTools.length > 0 ? (
                    filteredTools.map((tool) => (
                      <Link
                        key={tool.id}
                        href={tool.path}
                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                          <Zap size={18} />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white text-sm">{tool.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate w-64 md:w-96">{tool.description}</p>
                        </div>
                        <ChevronRight size={16} className="ml-auto text-gray-400" />
                      </Link>
                    ))
                  ) : (
                    <div className="p-8 text-center text-gray-500">
                      No tools found for "{searchQuery}"
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30 dark:opacity-20 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-400 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-400 rounded-full blur-[120px]" />
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Explore Categories</h2>
            <p className="text-gray-600 dark:text-gray-400">Find the right tool for your workflow</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoryCards.map((category) => (
            <Link
              key={category.name}
              href={category.path}
              className="group relative p-6 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all hover:shadow-xl hover:-translate-y-1"
            >
              <div className={`w-12 h-12 rounded-xl ${category.bg} flex items-center justify-center ${category.color} mb-4 group-hover:scale-110 transition-transform`}>
                <category.icon size={24} />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-1">{category.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{category.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular Tools Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/30 text-orange-600">
              <TrendingUp size={20} />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">Most Popular Tools</h2>
              <p className="text-gray-600 dark:text-gray-400">Join thousands of users using these tools daily</p>
            </div>
          </div>
          <Link 
            href="/tools" 
            className="hidden sm:flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold hover:gap-3 transition-all"
          >
            All 100+ Tools <ArrowRightLeft size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularTools.map((tool) => (
            <Link
              key={tool.id}
              href={tool.path}
              className="flex items-start gap-5 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors group"
            >
              <div className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 flex flex-shrink-0 items-center justify-center text-gray-600 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                <Zap size={24} />
              </div>
              <div className="flex-grow min-w-0">
                <h3 className="font-bold text-gray-900 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {tool.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                  {tool.description}
                </p>
              </div>
              <div className="self-center p-2 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                <ChevronRight size={16} />
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile View All Link */}
        <div className="mt-10 text-center sm:hidden">
          <Link 
            href="/tools" 
            className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold"
          >
            Explore All Tools <ChevronRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
