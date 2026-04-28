"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search as SearchIcon, Zap, ChevronRight, Command } from "lucide-react";
import { tools, Tool } from "@/lib/tools";
import Link from "next/link";

export function GlobalSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Tool[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (query.length > 1) {
      const filtered = tools.filter(t => 
        t.name.toLowerCase().includes(query.toLowerCase()) ||
        t.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8);
      setResults(filtered);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter") {
      if (selectedIndex >= 0) {
        router.push(results[selectedIndex].path);
        setIsOpen(false);
        setQuery("");
      } else if (query) {
        router.push(`/search?q=${encodeURIComponent(query)}`);
        setIsOpen(false);
        setQuery("");
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative w-full max-w-sm" ref={containerRef}>
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-500 transition-colors">
          <SearchIcon size={16} />
        </div>
        <input
          type="text"
          placeholder="Search tools..."
          className="block w-full pl-10 pr-10 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 border-transparent focus:bg-white dark:focus:bg-gray-900 focus:ring-2 focus:ring-indigo-500/20 text-sm transition-all"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.length > 1 && setIsOpen(true)}
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <kbd className="hidden sm:inline-flex items-center gap-1 h-5 select-none rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-1.5 font-mono text-[10px] font-medium text-gray-500 dark:text-gray-400 opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
        </div>
      </div>

      {isOpen && (
        <div className="absolute mt-2 w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-2xl z-[60] overflow-hidden animate-in fade-in slide-in-from-top-1">
          <div className="p-2">
            {results.length > 0 ? (
              <>
                {results.map((tool, index) => (
                  <Link
                    key={tool.id}
                    href={tool.path}
                    className={`flex items-center gap-3 p-2.5 rounded-lg transition-colors ${
                      index === selectedIndex ? "bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400" : "hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                    onClick={() => {
                      setIsOpen(false);
                      setQuery("");
                    }}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${index === selectedIndex ? "bg-indigo-600 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-500"}`}>
                      <Zap size={14} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-gray-900 dark:text-white truncate">{tool.name}</p>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400 truncate">{tool.category}</p>
                    </div>
                    <ChevronRight size={12} className="ml-auto opacity-30" />
                  </Link>
                ))}
                <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-800 px-2 pb-1">
                  <button 
                    onClick={() => router.push(`/search?q=${encodeURIComponent(query)}`)}
                    className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                  >
                    View all results for "{query}" <ArrowRight size={10} />
                  </button>
                </div>
              </>
            ) : (
              <div className="p-4 text-center text-xs text-gray-500">
                No tools found matching your search
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Separate ArrowRight import to fix potential error
import { ArrowRight } from "lucide-react";
