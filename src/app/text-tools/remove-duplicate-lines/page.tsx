"use client";

import React, { useState } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  List, 
  Trash2, 
  Copy, 
  CheckCircle2, 
  Zap, 
  RefreshCcw, 
  Settings2,
  SortAsc,
  SortDesc,
  Filter,
  Check
} from "lucide-react";
import { motion } from "framer-motion";

export default function DuplicateLineRemover() {
  const tool = tools.find((t) => t.id === "remove-duplicates")!;

  // State
  const [text, setText] = useState("Apple\nOrange\nApple\nBanana\nOrange\nGrape");
  const [copied, setCopied] = useState(false);
  const [options, setOptions] = useState({
    caseSensitive: true,
    trim: true,
    sort: "none" as "none" | "asc" | "desc"
  });

  const process = () => {
    let lines = text.split('\n');
    
    if (options.trim) {
      lines = lines.map(line => line.trim());
    }

    const uniqueLines = Array.from(new Set(
      options.caseSensitive 
        ? lines 
        : lines.map(line => line.toLowerCase())
    ));

    // Map back to original case if not case sensitive (heuristic)
    let resultLines = options.caseSensitive 
      ? uniqueLines 
      : Array.from(new Set(lines.map(line => {
          const lower = line.toLowerCase();
          return lines.find(l => l.toLowerCase() === lower) || line;
        })));

    if (options.sort === "asc") {
      resultLines.sort((a, b) => a.localeCompare(b));
    } else if (options.sort === "desc") {
      resultLines.sort((a, b) => b.localeCompare(a));
    }

    setText(resultLines.join('\n'));
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Settings Bar */}
        <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-8">
           <div className="flex flex-wrap items-center gap-4">
             <label className="flex items-center gap-2 cursor-pointer group">
               <div className={`w-10 h-6 rounded-full transition-all relative ${options.caseSensitive ? 'bg-indigo-600' : 'bg-gray-200'}`}>
                 <input type="checkbox" className="hidden" checked={options.caseSensitive} onChange={() => setOptions({...options, caseSensitive: !options.caseSensitive})} />
                 <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${options.caseSensitive ? 'left-5' : 'left-1'}`} />
               </div>
               <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Case Sensitive</span>
             </label>

             <div className="flex bg-gray-50 dark:bg-gray-800 p-2 rounded-2xl border border-gray-100 dark:border-gray-700">
               {[
                 { id: "none", icon: Filter, label: "Unsorted" },
                 { id: "asc", icon: SortAsc, label: "A-Z" },
                 { id: "desc", icon: SortDesc, label: "Z-A" }
               ].map(opt => (
                 <button 
                  key={opt.id}
                  onClick={() => setOptions({...options, sort: opt.id as any})}
                  className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${options.sort === opt.id ? 'bg-white dark:bg-gray-700 shadow-lg text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
                 >
                   <opt.icon size={12} /> {opt.label}
                 </button>
               ))}
             </div>
           </div>

           <button 
            onClick={process}
            className="px-8 py-3 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-600/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
           >
             <Check size={16} /> Deduplicate Now
           </button>
        </div>

        {/* Editor Area */}
        <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-8 md:p-12 border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform text-indigo-500">
            <List size={120} />
          </div>

          <div className="space-y-8 relative z-10">
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
                className="w-full min-h-[500px] p-12 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-600 rounded-[3rem] outline-none text-xl font-bold leading-relaxed resize-none transition-all shadow-inner"
                placeholder="Enter your list here, one item per line..."
              />
            </div>
            
            <div className="flex justify-between px-2">
               <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Lines: {text.split('\n').filter(l => l.length > 0).length}</span>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl text-indigo-600">
              <RefreshCcw size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Smart Deduplication</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Remove accidental duplicates from large datasets, email lists, or code exports 
                with optional sorting and case sensitivity controls.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl text-emerald-600">
              <Settings2 size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Data Cleaning</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Automatically trim whitespace from each line to ensure perfect matches, even 
                if lines have trailing spaces or tabs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
