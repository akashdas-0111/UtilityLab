"use client";

import React, { useState } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { Copy, Trash2, ArrowRightLeft, Type } from "lucide-react";

export default function CaseConverter() {
  const [text, setText] = useState("");
  
  const tool = tools.find(t => t.id === "case-converter")!;

  const convertTo = (type: string) => {
    let result = text;
    switch (type) {
      case "upper":
        result = text.toUpperCase();
        break;
      case "lower":
        result = text.toLowerCase();
        break;
      case "title":
        result = text.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
        break;
      case "sentence":
        result = text.toLowerCase().replace(/(^\w|\.\s+\w)/gm, (c) => c.toUpperCase());
        break;
      case "alternate":
        result = text.split("").map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()).join("");
        break;
      case "inverse":
        result = text.split("").map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join("");
        break;
    }
    setText(result);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-8">
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
              Copy Result
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

        {/* Action Buttons Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <button 
            onClick={() => convertTo("upper")}
            className="py-3 px-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl font-bold text-sm hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all"
          >
            UPPERCASE
          </button>
          <button 
            onClick={() => convertTo("lower")}
            className="py-3 px-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl font-bold text-sm hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all"
          >
            lowercase
          </button>
          <button 
            onClick={() => convertTo("title")}
            className="py-3 px-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl font-bold text-sm hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all"
          >
            Title Case
          </button>
          <button 
            onClick={() => convertTo("sentence")}
            className="py-3 px-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl font-bold text-sm hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all"
          >
            Sentence case
          </button>
          <button 
            onClick={() => convertTo("alternate")}
            className="py-3 px-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl font-bold text-sm hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all"
          >
            aLtErNaTe
          </button>
          <button 
            onClick={() => convertTo("inverse")}
            className="py-3 px-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl font-bold text-sm hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all"
          >
            iNvErSe
          </button>
        </div>

        {/* SEO Content */}
        <div className="mt-16 pt-12 border-t border-gray-100 dark:border-gray-800">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">
            When to use a Case Converter?
          </h2>
          <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 leading-relaxed space-y-6">
            <p>
              Transforming text case manually can be a tedious and error-prone process. Our **Case Converter** tool is designed to automate this task, providing you with multiple formatting options in a single click. Whether you need to fix a "CAPS LOCK" accident or format a list of titles for a publication, we have the solution.
            </p>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Supported Conversion Types:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>UPPERCASE:</strong> Converts all characters to their capital form. Great for headings and emphasis.</li>
              <li><strong>lowercase:</strong> Converts all characters to small letters. Ideal for cleaning up inconsistently formatted data.</li>
              <li><strong>Title Case:</strong> Capitalizes the first letter of every word. The standard for article titles and names.</li>
              <li><strong>Sentence case:</strong> Capitalizes the first letter of each sentence, mirroring standard prose formatting.</li>
              <li><strong>Alternate Case:</strong> Randomly capitalizes characters (aLtErNaTe). Useful for social media or specific stylistic choices.</li>
              <li><strong>Inverse Case:</strong> Flips the case of every character (uPPER to Lower).</li>
            </ul>
            <p>
              Like all tools at UtilityLab, your text is processed entirely within your browser using JavaScript. No data is sent to external servers, ensuring your content remains private and secure.
            </p>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
