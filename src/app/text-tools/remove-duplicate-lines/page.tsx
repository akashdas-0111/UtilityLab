"use client";

import React, { useState, useMemo } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { Copy, Trash2, ListFilter, Check, Settings2 } from "lucide-react";

export default function RemoveDuplicateLines() {
  const [text, setText] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [trimWhitespace, setTrimWhitespace] = useState(true);
  
  const tool = tools.find(t => t.id === "remove-duplicate-lines")!;

  const { resultText, originalCount, resultCount } = useMemo(() => {
    const lines = text.split(/\n/);
    const originalCount = text.trim() ? lines.length : 0;
    
    if (!text.trim()) {
      return { resultText: "", originalCount: 0, resultCount: 0 };
    }

    const seen = new Set();
    const resultLines = lines.filter(line => {
      let processed = line;
      if (trimWhitespace) processed = processed.trim();
      if (!caseSensitive) processed = processed.toLowerCase();
      
      if (seen.has(processed)) return false;
      seen.add(processed);
      return true;
    });

    return {
      resultText: resultLines.join("\n"),
      originalCount,
      resultCount: resultLines.length
    };
  }, [text, caseSensitive, trimWhitespace]);

  const handleCopy = () => {
    navigator.clipboard.writeText(resultText);
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-8">
        {/* Stats and Options Row */}
        <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="flex gap-8">
            <div className="text-center lg:text-left">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{originalCount}</p>
              <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Original Lines</p>
            </div>
            <div className="text-center lg:text-left">
              <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{resultCount}</p>
              <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Unique Lines</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 items-center">
            <label className="flex items-center gap-2 cursor-pointer group">
              <div className={`w-10 h-6 rounded-full transition-all relative ${caseSensitive ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'}`}>
                <input 
                  type="checkbox" 
                  className="sr-only" 
                  checked={caseSensitive}
                  onChange={() => setCaseSensitive(!caseSensitive)}
                />
                <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${caseSensitive ? 'translate-x-4' : ''}`} />
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 transition-colors">Case Sensitive</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer group">
              <div className={`w-10 h-6 rounded-full transition-all relative ${trimWhitespace ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'}`}>
                <input 
                  type="checkbox" 
                  className="sr-only" 
                  checked={trimWhitespace}
                  onChange={() => setTrimWhitespace(!trimWhitespace)}
                />
                <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${trimWhitespace ? 'translate-x-4' : ''}`} />
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 transition-colors">Trim Whitespace</span>
            </label>
          </div>
        </div>

        {/* Text Areas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between px-2">
              <label className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Input Text</label>
              <button onClick={() => setText("")} className="text-xs text-red-500 hover:underline">Clear</button>
            </div>
            <textarea
              className="w-full h-96 p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/30 border-2 border-gray-100 dark:border-gray-800 focus:border-indigo-500 outline-none transition-all resize-none text-sm font-mono"
              placeholder="Paste your list here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between px-2">
              <label className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Result</label>
              <button onClick={handleCopy} className="text-xs text-indigo-600 hover:underline flex items-center gap-1">
                <Copy size={12} /> Copy Result
              </button>
            </div>
            <textarea
              className="w-full h-96 p-6 rounded-2xl bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 outline-none transition-all resize-none text-sm font-mono text-gray-800 dark:text-gray-200"
              readOnly
              value={resultText}
              placeholder="Unique lines will appear here..."
            ></textarea>
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-16 pt-12 border-t border-gray-100 dark:border-gray-800">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">
            Clean your lists with our Remove Duplicates tool
          </h2>
          <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 leading-relaxed space-y-6">
            <p>
              Managing large datasets, email lists, or code snippets often leads to accidental duplicates. Our **Remove Duplicate Lines** tool is a fast, efficient, and privacy-focused solution for cleaning up your data in seconds.
            </p>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Smart Filtering Options:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Case Sensitivity:</strong> Toggle whether "Apple" and "apple" should be treated as the same line.</li>
              <li><strong>Trim Whitespace:</strong> Automatically remove leading and trailing spaces before comparing lines. This ensures that " Line " and "Line" are correctly identified as duplicates.</li>
              <li><strong>Real-time Stats:</strong> See exactly how many lines were removed and what your new list size is.</li>
            </ul>
            <p>
              <strong>Developers & Marketers:</strong> This tool is perfect for cleaning up CSV columns, removing duplicate CSS selectors, or refining prospect lists. Since all operations happen in your browser, your sensitive data is never uploaded to any server.
            </p>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
