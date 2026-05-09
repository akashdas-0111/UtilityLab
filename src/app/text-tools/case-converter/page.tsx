"use client";

import React, { useState, useEffect } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  Type, 
  RefreshCcw, 
  Copy, 
  CheckCircle2, 
  Trash2, 
  Zap, 
  AlignLeft,
  FileText,
  Settings2,
  ALargeSmall,
  ArrowRightLeft
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CaseConverter() {
  const tool = tools.find((t) => t.id === "case-converter")!;

  // State
  const [input, setInput] = useState("UtilityLab is the most powerful tool suite for developers.");
  const [copied, setCopied] = useState(false);

  // Conversion Logic
  const toSentenceCase = (str: string) => str.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, c => c.toUpperCase());
  const toTitleCase = (str: string) => str.toLowerCase().split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const toCamelCase = (str: string) => str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
  const toSnakeCase = (str: string) => str.toLowerCase().replace(/\s+/g, '_').replace(/[^\w]/g, '');

  const transform = (mode: string) => {
    switch(mode) {
      case 'upper': setInput(input.toUpperCase()); break;
      case 'lower': setInput(input.toLowerCase()); break;
      case 'sentence': setInput(toSentenceCase(input)); break;
      case 'title': setInput(toTitleCase(input)); break;
      case 'camel': setInput(toCamelCase(input)); break;
      case 'snake': setInput(toSnakeCase(input)); break;
    }
  };

  const counts = {
    chars: input.length,
    words: input.trim() ? input.trim().split(/\s+/).length : 0,
    lines: input.trim() ? input.split(/\n/).length : 0
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Main Interface */}
        <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-8 md:p-12 border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform text-indigo-500">
            <ALargeSmall size={120} />
          </div>

          <div className="space-y-8 relative z-10">
            {/* Input Area */}
            <div className="relative">
              <div className="absolute top-6 right-6 z-10 flex gap-2">
                <button 
                  onClick={() => { navigator.clipboard.writeText(input); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                  className={`p-4 rounded-2xl transition-all shadow-xl ${copied ? "bg-emerald-500 text-white" : "bg-white dark:bg-gray-700 text-gray-400 hover:text-indigo-600"}`}
                >
                  {copied ? <CheckCircle2 size={24}/> : <Copy size={24}/>}
                </button>
                <button 
                  onClick={() => setInput("")}
                  className="p-4 bg-white dark:bg-gray-700 text-gray-400 hover:text-rose-600 rounded-2xl shadow-xl transition-all"
                >
                  <Trash2 size={24} />
                </button>
              </div>
              <textarea 
                value={input} onChange={(e) => setInput(e.target.value)}
                spellCheck={false}
                className="w-full min-h-[400px] p-12 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-600 rounded-[3rem] outline-none text-xl font-bold leading-relaxed resize-none transition-all shadow-inner"
                placeholder="Type or paste your text here..."
              />
            </div>

            {/* Stats Bar */}
            <div className="flex flex-wrap gap-4 px-2">
               {Object.entries(counts).map(([label, val]) => (
                 <div key={label} className="px-6 py-2 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mr-2">{label}</span>
                    <span className="text-xs font-black text-indigo-600">{val}</span>
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* Transformation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { id: "upper", label: "UPPERCASE" },
            { id: "lower", label: "lowercase" },
            { id: "sentence", label: "Sentence case" },
            { id: "title", label: "Title Case" },
            { id: "camel", label: "camelCase" },
            { id: "snake", label: "snake_case" }
          ].map(opt => (
            <button 
              key={opt.id}
              onClick={() => transform(opt.id)}
              className="p-6 bg-white dark:bg-gray-900 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm hover:border-indigo-600/50 hover:shadow-indigo-600/10 transition-all group text-center"
            >
              <ArrowRightLeft size={18} className="mx-auto mb-3 text-gray-300 group-hover:text-indigo-600 transition-colors" />
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white">{opt.label}</span>
            </button>
          ))}
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-indigo-600/20 flex items-start gap-4">
            <div className="p-3 bg-indigo-500 rounded-2xl">
              <Zap size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black">Developer Friendly</h4>
              <p className="text-sm text-indigo-100 opacity-80 leading-relaxed">
                Quickly convert between common naming conventions like camelCase and snake_case 
                for variables, filenames, and database columns.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl text-emerald-600">
              <FileText size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Content Ready</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Ideal for fixing accidentally ALL CAPS emails, formatting blog titles, and 
                cleaning up messy text inputs with professional precision.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
