"use client";

import React, { useState } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { Copy, Trash2, Hash, Type } from "lucide-react";

export default function CharacterCounter() {
  const [text, setText] = useState("");
  
  const charWithSpaces = text.length;
  const charWithoutSpaces = text.replace(/\s/g, "").length;
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  const tool = tools.find(t => t.id === "character-counter")!;

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-900/30 text-center">
            <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{charWithSpaces}</p>
            <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mt-1">Characters (With Spaces)</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 text-center">
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{charWithoutSpaces}</p>
            <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mt-1">Characters (No Spaces)</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 text-center">
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{wordCount}</p>
            <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mt-1">Total Words</p>
          </div>
        </div>

        {/* Input Area */}
        <div className="relative group">
          <textarea
            className="w-full h-80 p-8 rounded-3xl bg-gray-50 dark:bg-gray-800/30 border-2 border-gray-100 dark:border-gray-800 focus:border-indigo-500 dark:focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all resize-none text-lg text-gray-800 dark:text-gray-200 leading-relaxed"
            placeholder="Type or paste your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          
          <div className="absolute bottom-8 right-8 flex gap-3">
            <button 
              onClick={handleCopy}
              className="px-6 py-3 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:text-indigo-600 hover:border-indigo-500 transition-all shadow-sm flex items-center gap-2 font-bold"
            >
              <Copy size={18} />
              Copy
            </button>
            <button 
              onClick={() => setText("")}
              className="p-3 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-400 hover:text-red-600 hover:border-red-500 transition-all shadow-sm"
              title="Clear text"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-16 pt-12 border-t border-gray-100 dark:border-gray-800">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">
            About our Character Counter tool
          </h2>
          <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 leading-relaxed space-y-6">
            <p>
              In many digital environments, character limits are a strict reality. Whether you're optimizing a Meta Description for Google (which should be under 160 characters), writing a bio for social media, or ensuring your SMS marketing campaign doesn't span multiple messages, knowing your exact character count is essential.
            </p>
            <p>
              Our **Character Counter** provides two distinct metrics to help you navigate these limits: 
              <strong> Characters with spaces</strong> and <strong>Characters without spaces</strong>. 
              The first metric is crucial for technical limits where every byte matters, while the second is often used in academic and creative writing to measure the actual density of your content.
            </p>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Why use an online character counter?</h3>
            <p>
              While most word processors have built-in counters, they are often buried in menus or don't provide real-time updates as you type. Our tool is built for the web, meaning it's accessible from any device, requires no installation, and offers a distraction-free environment for quick edits.
            </p>
            <p>
              <strong>Privacy Guaranteed:</strong> Just like all tools at UtilityLabs, your text is processed entirely in your browser. We don't store your input on our servers, making it safe for handling sensitive information.
            </p>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
