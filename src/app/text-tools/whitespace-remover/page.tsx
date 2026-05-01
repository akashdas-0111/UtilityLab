"use client";

import React, { useState, useMemo } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { Copy, Trash2, Eraser, AlignLeft, Info } from "lucide-react";

export default function WhitespaceRemover() {
  const [text, setText] = useState("");
  const [mode, setMode] = useState<"extra" | "all" | "breaks">("extra");
  
  const tool = tools.find(t => t.id === "whitespace-remover")!;

  const resultText = useMemo(() => {
    if (!text) return "";
    
    switch (mode) {
      case "extra":
        return text.trim().replace(/\s+/g, " ");
      case "all":
        return text.replace(/\s+/g, "");
      case "breaks":
        return text.replace(/\n+|\r+/g, " ").replace(/\s+/g, " ").trim();
      default:
        return text;
    }
  }, [text, mode]);

  const handleCopy = () => {
    navigator.clipboard.writeText(resultText);
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-8">
        {/* Options Row */}
        <div className="flex flex-col md:row gap-4 p-4 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setMode("extra")}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                mode === "extra" 
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" 
                  : "bg-gray-50 dark:bg-gray-800 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              Remove Extra Spaces
            </button>
            <button
              onClick={() => setMode("all")}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                mode === "all" 
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" 
                  : "bg-gray-50 dark:bg-gray-800 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              Remove All Spaces
            </button>
            <button
              onClick={() => setMode("breaks")}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                mode === "breaks" 
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" 
                  : "bg-gray-50 dark:bg-gray-800 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              Remove Line Breaks
            </button>
          </div>
          
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 px-2 italic">
            <Info size={14} />
            <span>Changes are applied in real-time as you type.</span>
          </div>
        </div>

        {/* Text Areas Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between px-2">
              <label className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Input Text</label>
              <button onClick={() => setText("")} className="text-xs text-red-500 hover:underline">Clear</button>
            </div>
            <textarea
              className="w-full h-96 p-6 rounded-3xl bg-gray-50 dark:bg-gray-800/30 border-2 border-gray-100 dark:border-gray-800 focus:border-indigo-500 outline-none transition-all resize-none text-sm font-mono leading-relaxed"
              placeholder="Paste text with messy whitespace here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between px-2">
              <label className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Result</label>
              <button onClick={handleCopy} className="text-xs text-indigo-600 font-bold hover:underline flex items-center gap-1">
                <Copy size={12} /> Copy Result
              </button>
            </div>
            <textarea
              className="w-full h-96 p-6 rounded-3xl bg-white dark:bg-gray-950 border-2 border-gray-100 dark:border-gray-800 outline-none transition-all resize-none text-sm font-mono text-gray-800 dark:text-gray-200"
              readOnly
              value={resultText}
              placeholder="Cleaned text will appear here..."
            ></textarea>
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-16 pt-12 border-t border-gray-100 dark:border-gray-800">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">
            Optimize your content with the Whitespace Remover
          </h2>
          <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 leading-relaxed space-y-6">
            <p>
              Inconsistent spacing and hidden line breaks can ruin the formatting of your code, social media posts, or professional documents. Our **Whitespace Remover** is a specialized utility designed to strip away unwanted empty space with surgical precision.
            </p>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Three Intelligent Modes:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Remove Extra Spaces:</strong> Collapses multiple spaces into a single one and trims the start and end. This is the most common use case for cleaning up text copied from PDFs or messy web pages.</li>
              <li><strong>Remove All Spaces:</strong> Strips every single space from the text. Useful for generating IDs, slugs, or compact code strings.</li>
              <li><strong>Remove Line Breaks:</strong> Converts multi-line text into a single continuous block, replacing line breaks with single spaces for readability.</li>
            </ul>
            <p>
              <strong>Data Privacy:</strong> Like all tools on the UtilityLabs platform, your data is processed 100% locally in your browser. We never upload your text to our servers, making this tool safe for sensitive developer configs, private emails, and proprietary data.
            </p>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
