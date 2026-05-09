"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { tools } from "@/lib/tools";
import { Zap, ChevronRight, Home, Search } from "lucide-react";
import { AdUnit } from "@/components/ad-unit";

// Map URL paths to tool categories or tags
const categoryMap: Record<string, { title: string; description: string; filter: (t: any) => boolean }> = {
  "calculators": {
    title: "Financial & Daily Calculators",
    description: "SIP, EMI, Tax, and investment tools for precise financial planning.",
    filter: (t) => t.category === "Calculators",
  },
  "math-tools": {
    title: "Mathematical & Scientific Utilities",
    description: "Algebra solvers, unit converters, statistics, and number theory tools.",
    filter: (t) => t.category === "Math",
  },
  "developer-tools": {
    title: "Developer Utilities",
    description: "JSON, JWT, SQL, and system debuggers for professional engineering.",
    filter: (t) => t.category === "Developer" || t.category === "Validators",
  },
  "text-tools": {
    title: "Text & Content Mastery",
    description: "Manipulate strings, generate placeholder content, and clean data.",
    filter: (t) => t.category === "Text",
  },
  "image-tools": {
    title: "Image & Visual Utilities",
    description: "Professional-grade cropping, resizing, and color extraction tools.",
    filter: (t) => t.category === "Image",
  },
  "seo-tools": {
    title: "SEO & Content Strategy",
    description: "Meta generators, keyword analysis, and sitemap creators for digital growth.",
    filter: (t) => t.category === "SEO",
  },
  "networking-tools": {
    title: "Network Diagnostics",
    description: "IP lookup, header checking, and connectivity audit tools.",
    filter: (t) => t.category === "Networking",
  },
  "converters": {
    title: "Universal Format Converters",
    description: "Seamlessly switch between data types, units, and media formats.",
    filter: (t) => t.category === "Converters",
  },
  "validators": {
    title: "Diagnostic & Validation Tools",
    description: "Ensure the integrity and correctness of your data, code, and configurations.",
    filter: (t) => t.category === "Validators" || t.name.toLowerCase().includes("validator") || t.name.toLowerCase().includes("checker"),
  }
};

export default function CategoryPage() {
  const params = useParams();
  const categoryKey = params.category as string;
  const config = categoryMap[categoryKey];

  if (!config) {
    notFound();
  }

  const categoryTools = useMemo(() => {
    return tools.filter(config.filter);
  }, [config]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
          <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1">
            <Home size={14} />
            <span>Home</span>
          </Link>
          <ChevronRight size={14} />
          <span className="font-medium text-gray-900 dark:text-white capitalize">{categoryKey.replace("-", " ")}</span>
        </nav>

        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
            {config.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl">
            {config.description}
          </p>
        </header>

        {/* Top Ad */}
        <AdUnit type="horizontal" slot="category_top" className="mb-12" />

        {/* Search within category */}
        <div className="relative max-w-md mb-12">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder={`Search in ${config.title}...`}
            className="block w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {categoryTools.length > 0 ? (
            categoryTools.map((tool) => (
              <Link
                key={tool.id}
                href={tool.path}
                className="flex items-start gap-5 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all group hover:shadow-lg"
              >
                <div className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex flex-shrink-0 items-center justify-center text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
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
                <div className="self-center p-2 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  <ChevronRight size={16} />
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full py-20 text-center bg-white dark:bg-gray-900 rounded-3xl border border-dashed border-gray-300 dark:border-gray-700">
              <p className="text-gray-500 dark:text-gray-400">No tools found in this category yet. Check back soon!</p>
            </div>
          )}
        </div>

        {/* Bottom Ad */}
        <AdUnit type="horizontal" slot="category_bottom" />
      </div>
    </div>
  );
}
