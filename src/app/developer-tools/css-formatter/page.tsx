"use client";

import React, { useState } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  Palette, 
  Trash2, 
  Copy, 
  CheckCircle2, 
  Zap, 
  RefreshCcw, 
  Settings2,
  Terminal,
  Minimize2,
  Maximize2
} from "lucide-react";
import { motion } from "framer-motion";

export default function CSSFormatter() {
  const tool = tools.find((t) => t.id === "css-formatter")!;

  // State
  const [css, setCss] = useState('.container{display:flex;justify-content:center;align-items:center;padding:20px;background:#f0f0f0;border-radius:8px}');
  const [copied, setCopied] = useState(false);

  const beautify = () => {
    let formatted = css
      .replace(/\s*\{\s*/g, " {\n  ")
      .replace(/\s*;\s*/g, ";\n  ")
      .replace(/\s*\}\s*/g, "\n}\n\n")
      .replace(/\s*:\s*/g, ": ")
      .replace(/\n\s*\n/g, "\n")
      .trim();
    setCss(formatted);
  };

  const minify = () => {
    let minified = css
      .replace(/\s+/g, ' ')
      .replace(/\s*\{\s*/g, '{')
      .replace(/\s*\}\s*/g, '}')
      .replace(/\s*:\s*/g, ':')
      .replace(/\s*;\s*/g, ';')
      .trim();
    setCss(minified);
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Controls Bar */}
        <div className="flex items-center justify-between px-4">
           <div className="flex items-center gap-4">
             <div className="px-6 py-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-full border border-indigo-100 dark:border-indigo-800 flex items-center gap-2">
                <Palette size={16} className="text-indigo-600" />
                <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">CSS Mode</span>
             </div>
           </div>
           
           <div className="flex items-center gap-2">
             <button 
              onClick={beautify}
              className="px-6 py-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-50 hover:text-indigo-600 transition-all"
             >
               Beautify
             </button>
             <button 
              onClick={minify}
              className="px-6 py-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-50 hover:text-emerald-600 transition-all"
             >
               Minify
             </button>
           </div>
        </div>

        {/* Editor Area */}
        <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-8 md:p-12 border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform text-indigo-500">
            <Terminal size={120} />
          </div>

          <div className="space-y-8 relative z-10">
            <div className="relative">
              <div className="absolute top-6 right-6 z-10 flex gap-2">
                <button 
                  onClick={() => { navigator.clipboard.writeText(css); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                  className={`p-4 rounded-2xl transition-all shadow-xl ${copied ? "bg-emerald-500 text-white" : "bg-white dark:bg-gray-700 text-gray-400 hover:text-indigo-600"}`}
                >
                  {copied ? <CheckCircle2 size={24}/> : <Copy size={24}/>}
                </button>
                <button 
                  onClick={() => setCss("")}
                  className="p-4 bg-white dark:bg-gray-700 text-gray-400 hover:text-rose-600 rounded-2xl shadow-xl transition-all"
                >
                  <Trash2 size={24} />
                </button>
              </div>
              <textarea 
                value={css} onChange={(e) => setCss(e.target.value)}
                spellCheck={false}
                className="w-full min-h-[600px] p-12 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-600 rounded-[3rem] outline-none font-mono text-sm leading-relaxed resize-none transition-all shadow-inner"
                placeholder="Paste your CSS here..."
              />
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-indigo-600/20 flex items-start gap-4">
            <div className="p-3 bg-indigo-500 rounded-2xl">
              <Zap size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black">Instant Formatting</h4>
              <p className="text-sm text-indigo-100 opacity-80 leading-relaxed">
                Transform compact CSS strings into perfectly indented code for debugging, or 
                compress large stylesheets to save bytes for production deployments.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl text-emerald-600">
              <Settings2 size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Clean Syntax</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Our formatter ensures consistent spacing, proper line breaks, and standardized 
                property-value alignments for professional-grade codebases.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
