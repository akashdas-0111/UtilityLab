"use client";

import React, { useState, useEffect, useMemo } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  Code, 
  Search, 
  Trash2, 
  Copy, 
  CheckCircle2, 
  Zap, 
  ShieldCheck, 
  Eye, 
  FileCode,
  CheckCircle,
  AlertCircle,
  Settings2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const PRESETS = [
  { name: "Email", regex: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$" },
  { name: "URL", regex: "^(https?:\\/\\/)?(www\\.)?([a-zA-Z0-9]+(-[a-zA-Z0-9]+)*\\.)+[a-z]{2,}(:\\d+)?(\\/.*)?$" },
  { name: "Date (YYYY-MM-DD)", regex: "^\\d{4}-\\d{2}-\\d{2}$" },
  { name: "Phone (Intl)", regex: "^\\+?[1-9]\\d{1,14}$" },
  { name: "Alpha-Numeric", regex: "^[a-zA-Z0-9]+$" },
  { name: "Digits Only", regex: "^\\d+$" },
];

export default function RegExGenerator() {
  const tool = tools.find((t) => t.id === "regex")!;

  // State
  const [regexStr, setRegexStr] = useState("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$");
  const [flags, setFlags] = useState("g");
  const [testText, setTestText] = useState("contact@utilitylab.com\ninvalid-email\nsupport@google.co.uk");
  const [copied, setCopied] = useState(false);

  const testResults = useMemo(() => {
    try {
      const re = new RegExp(regexStr, flags);
      const matches = [...testText.matchAll(re)];
      return { matches, error: null };
    } catch (e: any) {
      return { matches: [], error: e.message };
    }
  }, [regexStr, flags, testText]);

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Main Editor Card */}
        <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-8 md:p-12 border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform text-indigo-500">
            <Search size={120} />
          </div>

          <div className="space-y-8 relative z-10">
            {/* Regex Input */}
            <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                   <Code size={14} className="text-indigo-600" /> Regular Expression
                 </label>
                 <div className="flex items-center gap-4">
                   <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 px-3 py-1 rounded-xl border border-gray-100 dark:border-gray-700">
                      <span className="text-[9px] font-bold text-gray-400 uppercase">Flags</span>
                      <input 
                        value={flags} onChange={(e) => setFlags(e.target.value)}
                        className="w-10 bg-transparent font-mono font-black text-indigo-600 outline-none text-xs"
                      />
                   </div>
                   <button onClick={() => setRegexStr("")} className="text-gray-300 hover:text-rose-500 transition-colors"><Trash2 size={16}/></button>
                 </div>
              </div>
              <div className="relative">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 font-mono text-2xl">/</span>
                <input 
                  value={regexStr} onChange={(e) => setRegexStr(e.target.value)}
                  className="w-full pl-10 pr-24 py-6 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-600 rounded-[2rem] outline-none text-xl font-mono font-black transition-all"
                  placeholder="[a-z]+"
                />
                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300 font-mono text-2xl">/{flags}</span>
              </div>
              {testResults.error && (
                <div className="p-3 bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 rounded-xl flex items-center gap-2 text-rose-600 text-[10px] font-bold">
                  <AlertCircle size={14} /> {testResults.error}
                </div>
              )}
            </div>

            {/* Presets */}
            <div className="space-y-4">
               <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                 <Settings2 size={14} className="text-amber-500" /> Presets
               </h3>
               <div className="flex flex-wrap gap-2">
                 {PRESETS.map(p => (
                   <button 
                    key={p.name}
                    onClick={() => setRegexStr(p.regex)}
                    className="px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-500 hover:bg-indigo-50 hover:text-indigo-600 transition-all"
                   >
                     {p.name}
                   </button>
                 ))}
               </div>
            </div>
          </div>
        </div>

        {/* Tester Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[450px]">
          {/* Test Input */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center gap-2 px-2">
              <Eye size={18} className="text-indigo-600" />
              <h3 className="font-black text-gray-900 dark:text-white uppercase tracking-widest text-xs">Test Strings</h3>
            </div>
            <textarea 
              value={testText} onChange={(e) => setTestText(e.target.value)}
              spellCheck={false}
              className="w-full h-full p-8 bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 rounded-[2.5rem] outline-none focus:border-indigo-600 transition-all font-mono text-sm leading-relaxed resize-none shadow-sm"
              placeholder="Enter text to test against..."
            />
          </div>

          {/* Matches Output */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <CheckCircle size={18} className="text-emerald-600" />
                <h3 className="font-black text-gray-900 dark:text-white uppercase tracking-widest text-xs">Matches Found</h3>
              </div>
              <span className="px-3 py-1 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                {testResults.matches.length} Matches
              </span>
            </div>
            <div className="w-full h-full p-8 bg-gray-50 dark:bg-gray-800/50 border-2 border-transparent rounded-[2.5rem] font-mono text-sm overflow-auto space-y-2">
              {testResults.matches.length > 0 ? (
                testResults.matches.map((m, i) => (
                  <div key={i} className="p-3 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 flex justify-between items-center group">
                    <span className="text-indigo-600 font-bold truncate pr-4">"{m[0]}"</span>
                    <span className="text-[9px] text-gray-400 font-black uppercase opacity-0 group-hover:opacity-100 transition-opacity">Index: {m.index}</span>
                  </div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center opacity-20">
                  <Search size={48} className="mb-4" />
                  <p className="text-xs font-black uppercase tracking-widest">No matches found</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-indigo-600/20 flex flex-col justify-between">
            <Zap size={24} className="mb-4 text-indigo-300" />
            <div>
              <h4 className="font-black mb-2">Live Testing</h4>
              <p className="text-xs text-indigo-100 opacity-80 leading-relaxed">
                See matches instantly as you type your regex or test strings. No refresh required.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col justify-between">
            <ShieldCheck size={24} className="mb-4 text-emerald-600" />
            <div>
              <h4 className="font-black text-gray-900 dark:text-white mb-2">Safe Execution</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                All regular expressions are executed locally in your browser. Secure and private.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col justify-between">
            <FileCode size={24} className="mb-4 text-amber-600" />
            <div>
              <h4 className="font-black text-gray-900 dark:text-white mb-2">Clean Syntax</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Easily copy your regex and use it directly in JavaScript, Python, or PHP projects.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
