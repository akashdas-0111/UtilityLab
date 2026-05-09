"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { tools } from "@/lib/tools";
import { Zap, ChevronRight, Home, Search } from "lucide-react";

interface CategoryListProps {
  categoryKey: string;
  title: string;
  description: string;
  categoryName: string;
}

export function CategoryList({ categoryKey, title, description, categoryName }: CategoryListProps) {
  const categoryTools = useMemo(() => {
    return tools.filter(t => t.category === categoryName);
  }, [categoryName]);

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
            {title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl">
            {description}
          </p>
        </header>

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
      </div>
    </div>
  );
}
