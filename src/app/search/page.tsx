"use client";

import React, { useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { tools, Tool } from "@/lib/tools";
import { Zap, ChevronRight, Search as SearchIcon, Filter } from "lucide-react";
import { AdUnit } from "@/components/ad-unit";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const filteredResults = useMemo(() => {
    if (!query) return [];
    return tools.filter(t => 
      t.name.toLowerCase().includes(query.toLowerCase()) ||
      t.description.toLowerCase().includes(query.toLowerCase()) ||
      t.category.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-4 text-gray-500 dark:text-gray-400">
            <SearchIcon size={24} />
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Search Results
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Showing results for <span className="font-bold text-indigo-600 dark:text-indigo-400">"{query}"</span>
          </p>
        </header>

        <AdUnit type="horizontal" slot="search_top" className="mb-12" />

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Results Area */}
          <div className="flex-grow">
            {filteredResults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredResults.map((tool) => (
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
                      <span className="mt-3 inline-block px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                        {tool.category}
                      </span>
                    </div>
                    <div className="self-center p-2 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                      <ChevronRight size={16} />
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center bg-white dark:bg-gray-900 rounded-3xl border border-dashed border-gray-300 dark:border-gray-700">
                <p className="text-gray-500 dark:text-gray-400 mb-4 text-lg">No tools found matching your criteria.</p>
                <Link href="/" className="text-indigo-600 font-bold hover:underline">Back to Homepage</Link>
              </div>
            )}
          </div>

          {/* Sidebar Ads */}
          <aside className="w-full lg:w-80 flex flex-col gap-8">
            <AdUnit type="rectangle" slot="search_sidebar_1" />
            <AdUnit type="rectangle" slot="search_sidebar_2" />
          </aside>
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-20 text-center">Loading search...</div>}>
      <SearchResults />
    </Suspense>
  );
}
