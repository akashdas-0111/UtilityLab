"use client";

import React, { useState } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { Copy, Trash2, RefreshCcw, Settings, AlignLeft } from "lucide-react";

const WORDS = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud", "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo", "consequat", "duis", "aute", "irure", "dolor", "in", "reprehenderit", "voluptate", "velit", "esse", "cillum", "dolore", "eu", "fugiat", "nulla", "pariatur", "excepteur", "sint", "occaecat", "cupidatat", "non", "proident", "sunt", "in", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id", "est", "laborum", "creative", "workspace", "utility", "tools", "digital", "developer", "designer", "modern", "minimalist", "efficient", "performance", "speed", "privacy", "secure", "fast", "simple", "professional"
];

export default function RandomTextGenerator() {
  const [count, setCount] = useState(10);
  const [unit, setUnit] = useState<"words" | "sentences" | "paragraphs">("words");
  const [result, setResult] = useState("");
  
  const tool = tools.find(t => t.id === "random-text-generator")!;

  const generateText = () => {
    let output = "";
    
    if (unit === "words") {
      output = Array.from({ length: count }, () => WORDS[Math.floor(Math.random() * WORDS.length)]).join(" ");
    } else if (unit === "sentences") {
      output = Array.from({ length: count }, () => {
        const len = Math.floor(Math.random() * 8) + 5;
        const sentence = Array.from({ length: len }, () => WORDS[Math.floor(Math.random() * WORDS.length)]).join(" ");
        return sentence.charAt(0).toUpperCase() + sentence.slice(1) + ".";
      }).join(" ");
    } else {
      output = Array.from({ length: count }, () => {
        const sentenceCount = Math.floor(Math.random() * 4) + 3;
        return Array.from({ length: sentenceCount }, () => {
          const len = Math.floor(Math.random() * 8) + 5;
          const sentence = Array.from({ length: len }, () => WORDS[Math.floor(Math.random() * WORDS.length)]).join(" ");
          return sentence.charAt(0).toUpperCase() + sentence.slice(1) + ".";
        }).join(" ");
      }).join("\n\n");
    }
    
    setResult(output);
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-8">
        {/* Settings Bar */}
        <div className="flex flex-col lg:flex-row gap-6 p-8 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm items-start lg:items-center justify-between">
          <div className="flex flex-wrap items-center gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Generate</label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min="1"
                  max="1000"
                  value={count}
                  onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-20 px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                />
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value as any)}
                  className="px-4 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                >
                  <option value="words">Words</option>
                  <option value="sentences">Sentences</option>
                  <option value="paragraphs">Paragraphs</option>
                </select>
              </div>
            </div>
          </div>

          <button
            onClick={generateText}
            className="w-full lg:w-auto px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-3"
          >
            <RefreshCcw size={20} />
            Generate Text
          </button>
        </div>

        {/* Output Area */}
        <div className="relative group">
          <div className="flex items-center justify-between px-2 mb-3">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <AlignLeft size={16} className="text-indigo-600" />
              Resulting Text
            </h3>
            {result && (
              <button onClick={() => setResult("")} className="text-xs text-red-500 hover:underline">Clear</button>
            )}
          </div>
          <textarea
            className="w-full h-96 p-8 rounded-3xl bg-gray-50 dark:bg-gray-800/30 border-2 border-gray-100 dark:border-gray-800 focus:border-indigo-500 outline-none transition-all resize-none text-gray-800 dark:text-gray-200 leading-relaxed overflow-y-auto"
            readOnly
            placeholder="Your random text will appear here..."
            value={result}
          ></textarea>
          
          {result && (
            <div className="absolute bottom-8 right-8">
              <button 
                onClick={handleCopy}
                className="px-8 py-3 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 text-indigo-600 dark:text-indigo-400 font-bold hover:border-indigo-500 transition-all shadow-lg flex items-center gap-2"
              >
                <Copy size={18} />
                Copy All
              </button>
            </div>
          )}
        </div>

        {/* SEO Content */}
        <div className="mt-16 pt-12 border-t border-gray-100 dark:border-gray-800">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">
            Why use a Random Text Generator?
          </h2>
          <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 leading-relaxed space-y-6">
            <p>
              Whether you're a web designer needing to fill a new layout, a developer testing database capacity, or a student practicing typing, having a quick way to generate structured text is essential. Our **Random Text Generator** goes beyond standard Lorem Ipsum by providing customizable output in terms of words, sentences, or full paragraphs.
            </p>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Professional Features:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Precision Control:</strong> Specify exactly how much text you need, from a single word to 1000 paragraphs.</li>
              <li><strong>Semi-Realistic Content:</strong> Our dictionary includes both classic Latin words and modern tech-focused vocabulary, making mockups feel more authentic.</li>
              <li><strong>Instant Integration:</strong> The "Copy All" button ensures you can move from generator to project in a single click.</li>
            </ul>
            <p>
              <strong>Pro Tip:</strong> When designing web layouts, use Paragraph mode to test vertical spacing and line-height, and Word mode for buttons and small UI labels.
            </p>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
