"use client";

import React, { useState, useMemo } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  ArrowRightLeft, 
  Trash2, 
  Copy, 
  CheckCircle2, 
  Zap, 
  RefreshCcw, 
  Plus, 
  Minus,
  Settings2,
  Terminal,
  Columns
} from "lucide-react";
import * as diff from "diff";
import { motion, AnimatePresence } from "framer-motion";

export default function DiffChecker() {
  const tool = tools.find((t) => t.id === "diff-checker")!;

  // State
  const [text1, setText1] = useState("const name = 'UtilityLab';\nconsole.log(name);");
  const [text2, setText2] = useState("const name = 'UtilityLab Pro';\nconsole.log(name);\n// Added a comment");
  const [copied, setCopied] = useState(false);

  const diffResult = useMemo(() => {
    return diff.diffLines(text1, text2);
  }, [text1, text2]);

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Editor Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[400px]">
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between items-center px-2">
               <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">Original Text</h3>
               <button onClick={() => setText1("")} className="text-gray-300 hover:text-rose-500 transition-colors"><Trash2 size={14}/></button>
            </div>
            <textarea 
              value={text1} onChange={(e) => setText1(e.target.value)}
              spellCheck={false}
              className="w-full h-full p-8 bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 rounded-[2.5rem] outline-none focus:border-indigo-600 transition-all font-mono text-sm leading-relaxed resize-none shadow-sm"
              placeholder="Paste original version..."
            />
          </div>
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between items-center px-2">
               <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">Modified Text</h3>
               <button onClick={() => setText2("")} className="text-gray-300 hover:text-rose-500 transition-colors"><Trash2 size={14}/></button>
            </div>
            <textarea 
              value={text2} onChange={(e) => setText2(e.target.value)}
              spellCheck={false}
              className="w-full h-full p-8 bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 rounded-[2.5rem] outline-none focus:border-indigo-600 transition-all font-mono text-sm leading-relaxed resize-none shadow-sm"
              placeholder="Paste modified version..."
            />
          </div>
        </div>

        {/* Diff Output */}
        <div className="space-y-4">
           <div className="flex items-center justify-between px-2">
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <Columns size={16} className="text-indigo-600" /> Comparison Result
              </h3>
              <div className="flex gap-4">
                 <div className="flex items-center gap-2 text-[10px] font-black uppercase text-emerald-600">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full" /> Added
                 </div>
                 <div className="flex items-center gap-2 text-[10px] font-black uppercase text-rose-600">
                    <div className="w-2 h-2 bg-rose-500 rounded-full" /> Removed
                 </div>
              </div>
           </div>
           <div className="w-full min-h-[400px] bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 rounded-[3rem] p-8 md:p-12 font-mono text-sm overflow-x-auto shadow-sm">
             {diffResult.map((part, i) => (
               <div 
                key={i} 
                className={`px-4 py-1 rounded-lg ${part.added ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600' : part.removed ? 'bg-rose-50 dark:bg-rose-900/20 text-rose-600 line-through' : 'text-gray-500'}`}
               >
                 <span className="mr-4 opacity-30">{part.added ? "+" : part.removed ? "-" : " "}</span>
                 {part.value}
               </div>
             ))}
           </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-indigo-600/20 flex items-start gap-4">
            <div className="p-3 bg-indigo-500 rounded-2xl">
              <Zap size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black">Line-by-Line Analysis</h4>
              <p className="text-sm text-indigo-100 opacity-80 leading-relaxed">
                Our diff engine provides precise line-level granularity, making it easy to spot 
                even the smallest changes in your configuration files or source code.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl text-emerald-600">
              <Settings2 size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Smart Highlighting</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Color-coded output instantly differentiates between new additions and deleted 
                content, allowing for rapid auditing of document versions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
