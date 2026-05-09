"use client";

import React, { useState, useEffect } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  Link as LinkIcon, 
  RefreshCcw, 
  Copy, 
  CheckCircle2, 
  Zap, 
  Globe, 
  Trash2,
  Terminal,
  Settings2,
  Minus,
  Hash
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SlugGenerator() {
  const tool = tools.find((t) => t.id === "slug-generator")!;

  // State
  const [input, setInput] = useState("UtilityLab: The Ultimate Developer Suite 2024!");
  const [slug, setSlug] = useState("");
  const [separator, setSeparator] = useState("-");
  const [lowercase, setLowercase] = useState(true);
  const [copied, setCopied] = useState(false);

  const generateSlug = () => {
    let result = input;
    if (lowercase) result = result.toLowerCase();
    
    // Remove special characters
    result = result.replace(/[^\w\s-]/g, '');
    
    // Replace spaces and underscores with separator
    result = result.replace(/[\s_]+/g, separator);
    
    // Remove leading/trailing separator
    const escapedSep = separator.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(`^(${escapedSep})+|(${escapedSep})+$`, 'g');
    result = result.replace(re, '');

    setSlug(result);
  };

  useEffect(() => {
    generateSlug();
  }, [input, separator, lowercase]);

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Main Interface */}
        <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-8 md:p-12 border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform text-indigo-500">
            <LinkIcon size={120} />
          </div>

          <div className="space-y-8 relative z-10">
            {/* Input Title */}
            <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Terminal size={14} className="text-indigo-600" />
                  Article Title / Text
                </label>
                <button onClick={() => setInput("")} className="text-gray-300 hover:text-rose-500 transition-colors"><Trash2 size={14}/></button>
              </div>
              <input 
                value={input} onChange={(e) => setInput(e.target.value)}
                className="w-full px-8 py-6 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-600 rounded-[2rem] outline-none text-2xl font-black transition-all"
                placeholder="Enter title here..."
              />
            </div>

            {/* Slug Result */}
            <div className="space-y-4">
               <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                 <Globe size={14} className="text-emerald-600" />
                 Generated SEO Slug
               </label>
               <div className="relative">
                 <div className="w-full px-8 py-8 bg-indigo-50 dark:bg-indigo-900/20 border-2 border-indigo-100 dark:border-indigo-800 rounded-[2rem] font-mono text-xl font-bold text-indigo-600 dark:text-indigo-400 break-all pr-24">
                   {slug || "your-slug-here"}
                 </div>
                 <button 
                  onClick={() => { navigator.clipboard.writeText(slug); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                  className={`absolute right-4 top-1/2 -translate-y-1/2 p-4 rounded-2xl transition-all shadow-xl ${copied ? "bg-emerald-500 text-white" : "bg-white dark:bg-gray-700 text-gray-400 hover:text-indigo-600"}`}
                >
                  {copied ? <CheckCircle2 size={24}/> : <Copy size={24}/>}
                </button>
               </div>
            </div>
          </div>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm space-y-4">
             <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
               <Minus size={14} className="text-indigo-600" /> Separator
             </h4>
             <div className="flex bg-gray-50 dark:bg-gray-800 p-2 rounded-2xl border border-gray-100 dark:border-gray-700">
               {[
                 { id: "-", label: "Hyphen (-)" },
                 { id: "_", label: "Underscore (_)" }
               ].map(opt => (
                 <button 
                  key={opt.id}
                  onClick={() => setSeparator(opt.id)}
                  className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${separator === opt.id ? 'bg-white dark:bg-gray-700 shadow-lg text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
                 >
                   {opt.label}
                 </button>
               ))}
             </div>
          </div>

          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm space-y-4">
             <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
               <Zap size={14} className="text-amber-500" /> Text Case
             </h4>
             <button 
              onClick={() => setLowercase(!lowercase)}
              className={`w-full py-4 rounded-2xl border transition-all text-xs font-black uppercase tracking-widest ${lowercase ? 'bg-indigo-50 border-indigo-600 text-indigo-600' : 'bg-gray-50 border-gray-100 text-gray-400'}`}
             >
               {lowercase ? "Force Lowercase" : "Original Case"}
             </button>
          </div>

          <div className="bg-gray-900 rounded-[2.5rem] p-8 text-white shadow-xl flex items-center gap-4">
             <div className="p-3 bg-white/10 rounded-2xl">
               <Hash size={24} className="text-emerald-400" />
             </div>
             <div>
               <h4 className="font-black text-sm">SEO Ready</h4>
               <p className="text-[10px] text-gray-400 uppercase tracking-widest">Optimized for search engines</p>
             </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl text-indigo-600">
              <Settings2 size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Clean Links</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Automatically removes symbols, punctuation, and emojis to ensure your URLs are 
                valid and scannable by all web servers and browsers.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl text-emerald-600">
              <Globe size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Permalink Perfection</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Standardize your blog posts and product pages with consistent, human-readable 
                permalinks that help with both UX and SEO ranking.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
