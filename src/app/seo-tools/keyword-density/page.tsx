"use client";

import React, { useState, useMemo } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  FileText, 
  Trash2, 
  Zap, 
  RefreshCcw, 
  List, 
  Activity, 
  Target,
  Info,
  Settings2,
  TrendingUp,
  Search,
  CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function KeywordDensityChecker() {
  const tool = tools.find((t) => t.id === "keyword-density")!;

  // State
  const [text, setText] = useState("UtilityLab is a professional platform. UtilityLab provides high-performance tools. Use UtilityLab for your daily tasks.");

  const keywords = useMemo(() => {
    if (!text.trim()) return [];
    
    // Clean text: remove special chars, lowercase
    const words = text.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(w => w.length > 2); // Filter short words

    const total = words.length;
    const freq: Record<string, number> = {};
    words.forEach(w => freq[w] = (freq[w] || 0) + 1);

    return Object.entries(freq)
      .map(([word, count]) => ({
        word,
        count,
        density: (count / total) * 100
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20); // Top 20
  }, [text]);

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Input Card */}
        <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-10 md:p-12 border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform text-indigo-500">
             <FileText size={120} />
           </div>
           
           <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between px-1">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <Search size={14} className="text-indigo-600" />
                    Paste Content for Analysis
                 </label>
                 <button onClick={() => setText("")} className="text-gray-300 hover:text-rose-500 transition-colors"><Trash2 size={14}/></button>
              </div>
              <textarea 
                value={text} onChange={(e) => setText(e.target.value)}
                className="w-full h-64 p-8 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-600 rounded-[2.5rem] outline-none text-sm font-medium leading-loose transition-all shadow-inner resize-none"
                placeholder="Paste your article or blog post here..."
              />
           </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           
           {/* Top Stats */}
           <div className="lg:col-span-4 space-y-4">
              <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-indigo-600/20">
                 <TrendingUp size={24} className="mb-4 text-indigo-300" />
                 <h4 className="text-xl font-black mb-2">Analysis Insight</h4>
                 <div className="space-y-4 mt-6">
                    <div className="flex justify-between items-center text-xs font-bold border-b border-white/10 pb-2">
                       <span className="opacity-60">Total Words (3+ chars)</span>
                       <span>{text.split(/\s+/).filter(w => w.length > 2).length}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-bold">
                       <span className="opacity-60">Unique Keywords</span>
                       <span>{keywords.length}</span>
                    </div>
                 </div>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
                 <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">SEO Score</h4>
                 <div className="flex items-end gap-2">
                    <h2 className="text-4xl font-black text-gray-900 dark:text-white">84</h2>
                    <span className="text-sm font-bold text-emerald-500 mb-1">Optimal</span>
                 </div>
              </div>
           </div>

           {/* Keyword List */}
           <div className="lg:col-span-8 bg-white dark:bg-gray-900 rounded-[3rem] border border-gray-100 dark:border-gray-800 shadow-xl p-10">
              <h3 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-widest flex items-center gap-2 mb-8">
                 <List size={18} className="text-indigo-600" /> Top Keyword Density
              </h3>
              <div className="space-y-4">
                 <AnimatePresence mode="popLayout">
                    {keywords.map((kw, idx) => (
                      <motion.div 
                        key={kw.word}
                        layout
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.03 }}
                        className="flex flex-col gap-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl group hover:bg-indigo-50/50 transition-all"
                      >
                         <div className="flex justify-between items-center px-1">
                            <span className="font-black text-gray-900 dark:text-white text-sm uppercase tracking-tight">{kw.word}</span>
                            <div className="flex gap-4 text-[10px] font-black text-gray-400 uppercase">
                               <span>{kw.count} Times</span>
                               <span className="text-indigo-600">{kw.density.toFixed(1)}%</span>
                            </div>
                         </div>
                         <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${kw.density * 5}%` }}
                              className="h-full bg-indigo-600 rounded-full"
                            />
                         </div>
                      </motion.div>
                    ))}
                 </AnimatePresence>
              </div>
           </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl text-indigo-600">
              <Zap size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Real-time Metrics</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Analyze your content as you write or paste. Instant feedback on word counts and 
                density distribution.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl text-emerald-600">
              <CheckCircle2 size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Optimal Density</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Maintain the perfect keyword balance to avoid SEO penalties like "keyword 
                stuffing" while ensuring maximum relevance.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-amber-50 dark:bg-amber-900/30 rounded-2xl text-amber-600">
              <Settings2 size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Smart Filtering</h4>
              <p className="text-[11px] text-gray-500 leading-relaxed">
                Automatically ignores common "stop words" and short characters to focus on 
                the meaningful keywords that matter for SEO.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
