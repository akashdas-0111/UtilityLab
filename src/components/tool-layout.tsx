"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Home, Zap, Info, Share2, Star } from "lucide-react";
import { Tool, tools } from "@/lib/tools";
import { AdUnit } from "./ad-unit";

interface ToolLayoutProps {
  tool: Tool;
  children: React.ReactNode;
}

export function ToolLayout({ tool, children }: ToolLayoutProps) {
  const pathSegments = tool.path.split("/").filter(Boolean);
  const categorySlug = pathSegments[0];
  const categoryName = categorySlug.replace("-", " ");

  const relatedTools = tools
    .filter((t) => t.path.startsWith(`/${categorySlug}`) && t.id !== tool.id)
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-8 overflow-x-auto whitespace-nowrap pb-2">
          <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1">
            <Home size={14} />
            <span>Home</span>
          </Link>
          <ChevronRight size={14} />
          <Link href={`/${categorySlug}`} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors capitalize">
            {categoryName}
          </Link>
          <ChevronRight size={14} />
          <span className="font-medium text-gray-900 dark:text-white">{tool.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-10 border border-gray-200 dark:border-gray-800 shadow-sm">
              <header className="mb-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/20">
                    <Zap size={28} />
                  </div>
          <div>
            <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight break-words">
              {tool.name}
            </h1>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 mt-1 line-clamp-2 md:line-clamp-none">
              {tool.description}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-wider">
            {tool.category}
          </span>
                  {tool.popular && (
                    <span className="px-3 py-1 rounded-full bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-xs font-bold flex items-center gap-1">
                      <Star size={12} fill="currentColor" /> Popular
                    </span>
                  )}
                </div>
              </header>

              <div className="min-h-[400px]">
                {children}
              </div>

              <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800">
                <AdUnit type="horizontal" slot="tool_bottom" />
              </div>
            </div>

            {/* Tool Information / FAQ Placeholder */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-8 border border-gray-200 dark:border-gray-800">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Info size={20} className="text-indigo-600" />
                How to use {tool.name}
              </h2>
              <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-400">
                <p>
                  Simply enter the required values in the fields above and click the action button. 
                  All calculations and processing are performed locally in your browser for maximum privacy and speed.
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            {/* Action Card */}
            <div className="bg-indigo-600 rounded-3xl p-6 text-white shadow-xl shadow-indigo-600/20">
              <h3 className="text-lg font-bold mb-2">Spread the word</h3>
              <p className="text-indigo-100 text-sm mb-6">
                Love using {tool.name}? Share it with your friends and colleagues!
              </p>
              <button className="w-full py-3 bg-white text-indigo-600 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-50 transition-colors">
                <Share2 size={18} />
                Share this tool
              </button>
            </div>

            <AdUnit type="rectangle" slot="sidebar_top" />

            {/* Related Tools */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-200 dark:border-gray-800">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Related {tool.category}</h3>
              <div className="space-y-4">
                {relatedTools.map((related) => (
                  <Link
                    key={related.id}
                    href={related.path}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex items-center justify-center text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      <Zap size={18} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-gray-900 dark:text-white truncate group-hover:text-indigo-600 transition-colors">
                        {related.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {related.category}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
              <Link 
                href={`/${categorySlug}`}
                className="mt-8 block text-center text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:underline capitalize"
              >
                View all {categoryName}
              </Link>
            </div>

            {/* Newsletter Shortcut */}
            <div className="bg-gray-100 dark:bg-gray-800/50 rounded-3xl p-6 border border-transparent dark:border-gray-800">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Stay Updated</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Get notified when we add new tools to the lab.
              </p>
              <input
                type="email"
                placeholder="Email address"
                className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button className="w-full py-2 bg-gray-900 dark:bg-indigo-600 text-white rounded-lg text-sm font-bold hover:opacity-90 transition-opacity">
                Subscribe
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
