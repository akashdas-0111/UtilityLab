"use client";

import React, { useState } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { Copy, Trash2, RotateCcw, ArrowRightLeft, AlignLeft } from "lucide-react";

export default function TextReverser() {
  const [text, setText] = useState("");
  const [mode, setMode] = useState<"characters" | "words">("characters");
  
  const tool = tools.find(t => t.id === "text-reverser")!;

  const handleReverse = () => {
    if (!text) return;
    
    let result = "";
    if (mode === "characters") {
      result = text.split("").reverse().join("");
    } else {
      result = text.split(/\s+/).reverse().join(" ");
    }
    setText(result);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-8">
        {/* Mode Selector */}
        <div className="flex gap-4 p-1 bg-gray-100 dark:bg-gray-800 rounded-2xl w-fit">
          <button
            onClick={() => setMode("characters")}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
              mode === "characters" 
                ? "bg-white dark:bg-gray-900 text-indigo-600 shadow-sm" 
                : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            Reverse Characters
          </button>
          <button
            onClick={() => setMode("words")}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
              mode === "words" 
                ? "bg-white dark:bg-gray-900 text-indigo-600 shadow-sm" 
                : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            Reverse Words
          </button>
        </div>

        {/* Input Area */}
        <div className="relative group">
          <textarea
            className="w-full h-80 p-8 rounded-3xl bg-gray-50 dark:bg-gray-800/30 border-2 border-gray-100 dark:border-gray-800 focus:border-indigo-500 dark:focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all resize-none text-xl text-gray-800 dark:text-gray-200 leading-relaxed font-mono"
            placeholder={mode === "characters" ? "Type 'Hello' to get 'olleH'..." : "Type 'Hello World' to get 'World Hello'..."}
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          
          <div className="absolute bottom-8 right-8 flex gap-3">
            <button 
              onClick={handleReverse}
              className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/20 flex items-center gap-2"
            >
              <RotateCcw size={18} />
              Reverse Now
            </button>
            <button 
              onClick={handleCopy}
              className="p-3 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-500 hover:text-indigo-600 transition-all shadow-sm"
              title="Copy text"
            >
              <Copy size={18} />
            </button>
            <button 
              onClick={() => setText("")}
              className="p-3 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-400 hover:text-red-600 transition-all shadow-sm"
              title="Clear text"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-16 pt-12 border-t border-gray-100 dark:border-gray-800">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">
            Why use a Text Reverser?
          </h2>
          <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 leading-relaxed space-y-6">
            <p>
              Reversing text is a simple but surprisingly versatile operation. Whether you're a developer testing algorithm edge cases, a puzzle enthusiast creating palindromes, or just looking for a unique way to style your social media captions, our **Text Reverser** makes the process instant and effortless.
            </p>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Two Powerful Modes:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Reverse Characters:</strong> Flips every single character in your text string. Perfect for checking for palindromes or basic string manipulation testing.</li>
              <li><strong>Reverse Word Order:</strong> Keeps individual words intact but flips their sequence in the sentence. This is often used in linguistics, data parsing, or creative writing experiments.</li>
            </ul>
            <p>
              <strong>Privacy and Speed:</strong> Unlike other online tools that process your data on remote servers, UtilityLab runs entirely on your local machine. Your text never leaves your browser, ensuring total privacy even when working with sensitive snippets.
            </p>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
