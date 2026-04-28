"use client";

import React, { useState, useMemo } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { Copy, Trash2, Link2, Settings2 } from "lucide-react";

export default function SlugGenerator() {
  const [text, setText] = useState("");
  const [separator, setSeparator] = useState<"-" | "_">("-");
  
  const tool = tools.find(t => t.id === "slug-generator")!;

  const slug = useMemo(() => {
    if (!text) return "";
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "") // Remove non-word chars
      .replace(/[\s_-]+/g, separator) // Replace spaces and underscores/hyphens with separator
      .replace(new RegExp(`^${separator}+|${separator}+$`, "g"), ""); // Trim separators
  }, [text, separator]);

  const handleCopy = () => {
    if (!slug) return;
    navigator.clipboard.writeText(slug);
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-8">
        {/* Settings and Stats */}
        <div className="flex flex-col md:row gap-6 items-start md:items-center justify-between bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600">
              <Settings2 size={24} />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Separator</p>
              <div className="flex gap-2 mt-1">
                <button
                  onClick={() => setSeparator("-")}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    separator === "-" 
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20" 
                      : "bg-gray-50 dark:bg-gray-800 text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Hyphen (-)
                </button>
                <button
                  onClick={() => setSeparator("_")}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    separator === "_" 
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20" 
                      : "bg-gray-50 dark:bg-gray-800 text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Underscore (_)
                </button>
              </div>
            </div>
          </div>

          <div className="text-right">
            <p className="text-sm text-gray-500 dark:text-gray-400 italic">Result updates automatically as you type.</p>
          </div>
        </div>

        {/* Input/Output Grid */}
        <div className="space-y-6">
          <div className="space-y-3">
            <label className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider px-2">Input Title / Text</label>
            <div className="relative group">
              <input
                type="text"
                className="w-full p-6 pr-16 rounded-2xl bg-gray-50 dark:bg-gray-800/30 border-2 border-gray-100 dark:border-gray-800 focus:border-indigo-500 outline-none transition-all text-lg font-medium"
                placeholder="e.g. How to Build a Website in 2024"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <button 
                onClick={() => setText("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider px-2">Generated Slug</label>
            <div className="relative group">
              <div className="w-full p-6 pr-40 rounded-2xl bg-white dark:bg-gray-900 border-2 border-dashed border-gray-200 dark:border-gray-800 text-xl font-mono text-indigo-600 dark:text-indigo-400 min-h-[76px] flex items-center overflow-x-auto whitespace-nowrap scrollbar-hide">
                {slug || <span className="text-gray-300 dark:text-gray-700 italic">Slug will appear here...</span>}
              </div>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2">
                <button 
                  onClick={handleCopy}
                  disabled={!slug}
                  className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/20 flex items-center gap-2 disabled:opacity-50 disabled:shadow-none"
                >
                  <Copy size={16} />
                  Copy
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-16 pt-12 border-t border-gray-100 dark:border-gray-800">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">
            Everything you need to know about URL Slugs
          </h2>
          <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 leading-relaxed space-y-6">
            <p>
              A **slug** is the part of a URL that identifies a particular page in a human-readable format. For example, in the URL `https://example.com/blog/how-to-bake-a-cake`, the slug is `how-to-bake-a-cake`. Creating clean, descriptive slugs is a fundamental part of Search Engine Optimization (SEO).
            </p>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Why use our Slug Generator?</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>SEO Friendly:</strong> Automatically removes special characters, numbers (if requested), and unnecessary punctuation that can confuse search engine crawlers.</li>
              <li><strong>Readability:</strong> Converts your titles into lowercase strings with consistent separators, making them easy for users to read and share.</li>
              <li><strong>Customization:</strong> Choose between hyphens (the SEO standard) or underscores based on your CMS or backend requirements.</li>
            </ul>
            <p>
              <strong>Best Practices:</strong> For optimal SEO, we recommend keeping slugs short (under 5 words), avoiding "stop words" like 'a', 'the', and 'in', and always using hyphens as separators since most search engines treat them as space separators, unlike underscores which are often treated as part of the word.
            </p>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
