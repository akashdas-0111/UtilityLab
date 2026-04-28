"use client";

import React, { useState } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { Copy, Trash2, RefreshCcw, AlignLeft, Settings, Hash } from "lucide-react";

const FILLER = [
  "is a versatile approach to managing digital complexity.",
  "provides an essential framework for modern development and design.",
  "ensures that all components work in perfect harmony across different platforms.",
  "leverages the latest in technological innovations to achieve superior performance.",
  "remains a top priority for businesses looking to scale their digital infrastructure.",
  "offers a unique perspective on solving common user interface challenges.",
  "integrates seamlessly with existing workflows to boost overall productivity.",
  "represents a significant shift in how we perceive professional online utilities.",
  "continues to evolve as new design patterns and user expectations emerge.",
  "is built upon the core principles of speed, privacy, and accessibility."
];

const STARTERS = [
  "Furthermore,", "Consequently,", "In addition,", "Moreover,", "Similarly,", "Interestingly,", "Specifically,", "Ultimately,", "As a result,", "In essence,"
];

export default function ParagraphGenerator() {
  const [topic, setTopic] = useState("");
  const [count, setCount] = useState(3);
  const [result, setResult] = useState("");
  
  const tool = tools.find(t => t.id === "paragraph-generator")!;

  const generateParagraphs = () => {
    const finalTopic = topic.trim() || "The solution";
    
    const paragraphs = Array.from({ length: count }, () => {
      const sentenceCount = Math.floor(Math.random() * 3) + 4;
      return Array.from({ length: sentenceCount }, (_, i) => {
        const filler = FILLER[Math.floor(Math.random() * FILLER.length)];
        const starter = i === 0 ? "" : STARTERS[Math.floor(Math.random() * STARTERS.length)] + " ";
        
        if (i === 0) {
          return `${finalTopic.charAt(0).toUpperCase()}${finalTopic.slice(1)} ${filler}`;
        }
        return `${starter}${finalTopic.toLowerCase()} ${filler}`;
      }).join(" ");
    });
    
    setResult(paragraphs.join("\n\n"));
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-8">
        {/* Input Bar */}
        <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Topic / Subject (Optional)</label>
              <input
                type="text"
                placeholder="e.g. Artificial Intelligence, Web Design, Finance"
                className="w-full px-5 py-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-500 outline-none transition-all text-lg font-medium"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Number of Paragraphs</label>
              <input
                type="number"
                min="1"
                max="50"
                value={count}
                onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full px-5 py-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-500 outline-none transition-all text-lg font-bold"
              />
            </div>
          </div>

          <button
            onClick={generateParagraphs}
            className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-3"
          >
            <RefreshCcw size={20} />
            Generate Paragraphs
          </button>
        </div>

        {/* Result Area */}
        <div className="relative group">
          <div className="flex items-center justify-between px-2 mb-3">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <AlignLeft size={16} className="text-indigo-600" />
              Generated Content
            </h3>
            {result && (
              <button onClick={() => setResult("")} className="text-xs text-red-500 hover:underline">Clear</button>
            )}
          </div>
          <textarea
            className="w-full h-96 p-8 rounded-3xl bg-gray-50 dark:bg-gray-800/30 border-2 border-gray-100 dark:border-gray-800 focus:border-indigo-500 outline-none transition-all resize-none text-gray-800 dark:text-gray-200 leading-relaxed overflow-y-auto"
            readOnly
            placeholder="Your structured paragraphs will appear here..."
            value={result}
          ></textarea>
          
          {result && (
            <div className="absolute bottom-8 right-8">
              <button 
                onClick={handleCopy}
                className="px-8 py-3 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 text-indigo-600 dark:text-indigo-400 font-bold hover:border-indigo-500 transition-all shadow-lg flex items-center gap-2"
              >
                <Copy size={18} />
                Copy Paragraphs
              </button>
            </div>
          )}
        </div>

        {/* SEO Content */}
        <div className="mt-16 pt-12 border-t border-gray-100 dark:border-gray-800">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">
            Level up your mockups with the Paragraph Generator
          </h2>
          <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 leading-relaxed space-y-6">
            <p>
              When presenting a design or a web layout, using "Lorem Ipsum" can sometimes feel disconnected from the actual intent of the project. Our **Paragraph Generator** allows you to inject relevance into your placeholder text by specifying a custom topic.
            </p>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Why use structured paragraphs?</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Thematic Relevance:</strong> By including your specific topic, the generated text feels more natural and helps clients visualize the final product more accurately.</li>
              <li><strong>Natural Flow:</strong> Unlike random word generators, we use transitional phrases (like "Furthermore" and "In addition") to create text that mimics real human writing.</li>
              <li><strong>Custom Length:</strong> Generate exactly as many paragraphs as your layout requires, from a single intro block to a full-length article mockup.</li>
            </ul>
            <p>
              <strong>Data Privacy:</strong> As with all UtilityLab tools, your generation happens locally in your browser. We don't track your topics or save your generated content.
            </p>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
