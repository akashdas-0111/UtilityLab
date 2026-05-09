"use client";

import React, { useState, useEffect } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  Hash, 
  RefreshCcw, 
  Copy, 
  CheckCircle2, 
  Zap, 
  TrendingUp, 
  Search,
  Trash2,
  Instagram,
  Twitter,
  Plus
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const HASHTAG_MAP: Record<string, string[]> = {
  "tech": ["technology", "innovation", "future", "coding", "software", "ai", "webdev", "digital", "gadgets", "programming"],
  "business": ["entrepreneur", "startup", "success", "marketing", "growth", "finance", "strategy", "leadership", "work", "goals"],
  "fitness": ["gym", "workout", "motivation", "health", "lifestyle", "training", "bodybuilding", "crossfit", "yoga", "fit"],
  "food": ["cooking", "recipe", "delicious", "yum", "homemade", "foodie", "healthyfood", "dinner", "breakfast", "chef"],
  "travel": ["adventure", "explore", "nature", "vacation", "photography", "wanderlust", "trip", "mountain", "beach", "world"],
  "art": ["artist", "drawing", "painting", "design", "creative", "illustration", "digitalart", "sketch", "artwork", "gallery"],
  "music": ["musician", "song", "playlist", "concert", "performance", "sound", "producer", "studio", "live", "beat"]
};

export default function HashtagGenerator() {
  const tool = tools.find((t) => t.id === "hashtag-generator")!;

  // State
  const [keyword, setKeyword] = useState("");
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const generate = () => {
    if (!keyword.trim()) {
      setHashtags([]);
      return;
    }
    
    const key = keyword.toLowerCase().trim();
    let base = HASHTAG_MAP[key] || [key, `${key}life`, `${key}oftheday`, `${key}gram`, `best${key}`, `love${key}`, `${key}art`];
    
    // Add common viral hashtags
    const viral = ["trending", "viral", "explorepage", "instadaily", "instagood"];
    const results = [...new Set([...base, ...viral])].map(tag => `#${tag}`);
    setHashtags(results.sort(() => Math.random() - 0.5));
  };

  useEffect(() => {
    const timer = setTimeout(generate, 300);
    return () => clearTimeout(timer);
  }, [keyword]);

  const copyAll = () => {
    navigator.clipboard.writeText(hashtags.join(" "));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Input Card */}
        <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-8 md:p-12 border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform text-indigo-500">
            <Hash size={120} />
          </div>

          <div className="space-y-6 relative z-10">
            <div className="flex items-center justify-between px-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <Search size={14} className="text-indigo-600" />
                Seed Keyword
              </label>
              <button onClick={() => setKeyword("")} className="text-gray-300 hover:text-rose-500 transition-colors"><Trash2 size={14}/></button>
            </div>
            <div className="relative">
              <input 
                value={keyword} onChange={(e) => setKeyword(e.target.value)}
                className="w-full px-8 py-6 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-600 rounded-[2rem] outline-none text-2xl font-black transition-all"
                placeholder="e.g. Technology, Fitness, Travel..."
              />
              <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-2">
                 <button 
                  onClick={copyAll}
                  disabled={hashtags.length === 0}
                  className={`px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${copied ? 'bg-emerald-500 text-white shadow-lg' : 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20 hover:scale-105 active:scale-95 disabled:opacity-50'}`}
                 >
                   {copied ? "Copied!" : "Copy All"}
                 </button>
              </div>
            </div>
          </div>
        </div>

        {/* Suggestion Chips */}
        <div className="flex flex-wrap gap-2 px-2">
          {["Tech", "Business", "Fitness", "Food", "Travel", "Art", "Music"].map(tag => (
            <button 
              key={tag}
              onClick={() => setKeyword(tag)}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-[10px] font-black text-gray-400 uppercase tracking-widest rounded-full hover:bg-indigo-50 hover:text-indigo-600 transition-all"
            >
              # {tag}
            </button>
          ))}
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {hashtags.map((tag) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={tag}
                className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center justify-between group hover:border-indigo-600/50 transition-all cursor-pointer"
                onClick={() => navigator.clipboard.writeText(tag)}
              >
                <span className="text-sm font-black text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 transition-colors">{tag}</span>
                <Plus size={14} className="text-gray-300 group-hover:text-indigo-600 group-hover:rotate-90 transition-all" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-indigo-600/20 flex items-start gap-4">
            <div className="p-3 bg-indigo-500 rounded-2xl">
              <TrendingUp size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black">Viral Reach</h4>
              <p className="text-sm text-indigo-100 opacity-80 leading-relaxed">
                Automatically injects high-performing viral hashtags into every search result 
                to maximize your chances of appearing on explore pages.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl text-emerald-600">
              <Zap size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Smart Mapping</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Our algorithm analyzes your keyword to suggest niche and specific tags that 
                help you target the right audience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
