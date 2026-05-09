"use client";

import React, { useState, useMemo } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  Lightbulb, 
  Trash2, 
  Zap, 
  RefreshCcw, 
  Search, 
  Target, 
  Sparkles,
  TrendingUp,
  MessageSquare,
  Copy,
  CheckCircle2,
  List
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TEMPLATES = [
  "How to Master {keyword} in 30 Days",
  "10 Secrets About {keyword} Professionals Won't Tell You",
  "Why {keyword} is the Future of Industry",
  "The Ultimate Guide to {keyword} for Beginners",
  "Top 5 {keyword} Tools You Need to Try Today",
  "Common Mistakes People Make with {keyword}",
  "How {keyword} Can Transform Your Business",
  "Everything You Need to Know About {keyword}",
  "X {keyword} Hacks to Save You Time",
  "The Surprising Link Between {keyword} and Success"
];

export default function ContentIdeaGenerator() {
  const tool = tools.find((t) => t.id === "content-ideas")!;

  // State
  const [keyword, setKeyword] = useState("Web Development");
  const [ideas, setIdeas] = useState<string[]>([]);
  const [copied, setCopied] = useState<number | null>(null);

  const generateIdeas = () => {
    if (!keyword.trim()) return;
    const result = TEMPLATES.map(t => t.replace(/{keyword}/g, keyword));
    setIdeas(result);
  };

  const copyIdea = (idx: number) => {
    navigator.clipboard.writeText(ideas[idx]);
    setCopied(idx);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Search Bar */}
        <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-10 md:p-12 border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform text-amber-500">
            <Lightbulb size={120} />
          </div>

          <div className="space-y-6 relative z-10">
            <div className="flex items-center justify-between px-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <Target size={14} className="text-amber-500" />
                Target Topic / Keyword
              </label>
              <button onClick={() => setKeyword("")} className="text-gray-300 hover:text-rose-500 transition-colors"><Trash2 size={14}/></button>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <input 
                value={keyword} onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && generateIdeas()}
                className="flex-1 px-8 py-6 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-amber-500 rounded-[2.5rem] outline-none text-2xl font-black transition-all shadow-inner"
                placeholder="e.g. Artificial Intelligence"
              />
              <button 
                onClick={generateIdeas}
                className="px-10 py-6 bg-amber-500 text-white rounded-[2rem] font-black uppercase tracking-widest shadow-xl shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
              >
                <Sparkles size={20} /> Generate Ideas
              </button>
            </div>
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           
           {/* Sidebar Info */}
           <div className="lg:col-span-4 space-y-4">
              <div className="bg-amber-500 rounded-[2.5rem] p-8 text-white shadow-xl shadow-amber-500/20">
                 <Zap size={24} className="mb-4 text-amber-200" />
                 <h4 className="text-xl font-black mb-2">Strategy Tip</h4>
                 <p className="text-sm text-amber-100 opacity-80 leading-relaxed mt-4">
                    Focus on "Low Competition" long-tail keywords to increase your chances of 
                    ranking on the first page of Google.
                 </p>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-4">
                 <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl text-indigo-600">
                    <TrendingUp size={20} />
                 </div>
                 <div>
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Market Trend</h4>
                    <p className="text-xs font-bold text-gray-900 dark:text-white">High Interest in {keyword || "Topic"}</p>
                 </div>
              </div>
           </div>

           {/* Idea List */}
           <div className="lg:col-span-8 bg-white dark:bg-gray-900 rounded-[3rem] border border-gray-100 dark:border-gray-800 shadow-xl p-10">
              <h3 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-widest flex items-center gap-2 mb-8">
                 <List size={18} className="text-amber-500" /> Viral Content Suggestions
              </h3>
              <div className="space-y-4">
                 <AnimatePresence mode="popLayout">
                    {ideas.length > 0 ? ideas.map((idea, idx) => (
                      <motion.div 
                        key={idea}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex items-center justify-between p-6 bg-gray-50 dark:bg-gray-800 rounded-[2rem] group hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-all border border-transparent hover:border-amber-500/30"
                      >
                         <p className="font-bold text-gray-900 dark:text-white text-sm md:text-base pr-4">{idea}</p>
                         <button 
                          onClick={() => copyIdea(idx)}
                          className={`p-3 rounded-xl transition-all ${copied === idx ? "bg-emerald-500 text-white" : "text-gray-300 hover:text-amber-500 bg-white dark:bg-gray-700 shadow-sm"}`}
                         >
                            {copied === idx ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                         </button>
                      </motion.div>
                    )) : (
                      <div className="h-64 flex flex-col items-center justify-center opacity-20 text-gray-400">
                         <Sparkles size={80} className="mb-4" />
                         <p className="text-[10px] font-black uppercase tracking-widest">Awaiting Your Topic</p>
                      </div>
                    )}
                 </AnimatePresence>
              </div>
           </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-amber-50 dark:bg-amber-900/30 rounded-2xl text-amber-600">
              <Lightbulb size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Writer's Block Cure</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Never stare at a blank page again. Generate dozens of unique content angles for 
                any niche or industry in seconds.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl text-emerald-600">
              <Target size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">SEO Optimized</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Templates are designed around high-converting headline patterns known to perform 
                well in search engine results and social media.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl text-indigo-600">
              <MessageSquare size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Multi-Platform</h4>
              <p className="text-[11px] text-gray-500 leading-relaxed">
                Perfect for generating blog post titles, YouTube video ideas, newsletter 
                headlines, or social media hook sentences.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
