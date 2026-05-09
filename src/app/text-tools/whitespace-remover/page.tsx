"use client";

import React, { useState } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  AlignJustify, 
  Trash2, 
  Copy, 
  CheckCircle2, 
  Zap, 
  ShieldCheck, 
  RefreshCcw, 
  Settings2,
  Minimize2,
  Maximize2,
  CornerDownLeft
} from "lucide-react";
import { motion } from "framer-motion";

export default function WhitespaceRemover() {
  const tool = tools.find((t) => t.id === "whitespace-remover")!;

  // State
  const [text, setText] = useState("This   is   a   messy     text \n\n with too   many    spaces.");
  const [copied, setCopied] = useState(false);

  const clean = (mode: string) => {
    switch(mode) {
      case 'extra': setText(text.replace(/\s+/g, ' ').trim()); break;
      case 'all': setText(text.replace(/\s+/g, '')); break;
      case 'lines': setText(text.split(/\n+/).filter(line => line.trim().length > 0).join('\n')); break;
      case 'trim': setText(text.split('\n').map(line => line.trim()).join('\n')); break;
    }
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Main Interface */}
        <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-8 md:p-12 border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform text-indigo-500">
            <Minimize2 size={120} />
          </div>

          <div className="space-y-8 relative z-10">
            {/* Input Area */}
            <div className="relative">
              <div className="absolute top-6 right-6 z-10 flex gap-2">
                <button 
                  onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                  className={`p-4 rounded-2xl transition-all shadow-xl ${copied ? "bg-emerald-500 text-white" : "bg-white dark:bg-gray-700 text-gray-400 hover:text-indigo-600"}`}
                >
                  {copied ? <CheckCircle2 size={24}/> : <Copy size={24}/>}
                </button>
                <button 
                  onClick={() => setText("")}
                  className="p-4 bg-white dark:bg-gray-700 text-gray-400 hover:text-rose-600 rounded-2xl shadow-xl transition-all"
                >
                  <Trash2 size={24} />
                </button>
              </div>
              <textarea 
                value={text} onChange={(e) => setText(e.target.value)}
                spellCheck={false}
                className="w-full min-h-[400px] p-12 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-600 rounded-[3rem] outline-none text-xl font-bold leading-relaxed resize-none transition-all shadow-inner"
                placeholder="Paste your text here to clean up..."
              />
            </div>
          </div>
        </div>

        {/* Action Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { id: "extra", label: "Remove Extra Spaces", icon: Zap },
            { id: "all", label: "Remove All Spaces", icon: Minimize2 },
            { id: "lines", label: "Remove Empty Lines", icon: CornerDownLeft },
            { id: "trim", label: "Trim Each Line", icon: AlignJustify }
          ].map(opt => (
            <button 
              key={opt.id}
              onClick={() => clean(opt.id)}
              className="p-8 bg-white dark:bg-gray-900 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm hover:border-indigo-600/50 hover:shadow-indigo-600/10 transition-all group text-center flex flex-col items-center gap-3"
            >
              <opt.icon size={24} className="text-gray-300 group-hover:text-indigo-600 transition-colors" />
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white leading-tight">{opt.label}</span>
            </button>
          ))}
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-indigo-600/20 flex items-start gap-4">
            <div className="p-3 bg-indigo-500 rounded-2xl">
              <ShieldCheck size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black">Data Sanitization</h4>
              <p className="text-sm text-indigo-100 opacity-80 leading-relaxed">
                Perfect for cleaning up messy CSV data, SQL inserts, or code snippets before 
                pasting them into your project.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl text-emerald-600">
              <Maximize2 size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Professional Output</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Ensure your documents and emails look professional by removing accidental 
                multiple spaces and trailing line breaks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
