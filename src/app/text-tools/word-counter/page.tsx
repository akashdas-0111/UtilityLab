"use client";

import React, { useState, useMemo } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  Type, 
  Clock, 
  Mic, 
  Hash, 
  FileText, 
  AlignLeft, 
  BarChart2,
  Copy,
  Trash2,
  CheckCircle2,
  Zap,
  Info
} from "lucide-react";
import { motion } from "framer-motion";

export default function WordCounter() {
  const tool = tools.find((t) => t.id === "word-counter")!;

  // State
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  // Calculations
  const stats = useMemo(() => {
    const trimmed = text.trim();
    const words = trimmed ? trimmed.split(/\s+/).filter(w => w.length > 0) : [];
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, "").length;
    const sentences = trimmed ? trimmed.split(/[\.\!\?]+/).filter(s => s.length > 0).length : 0;
    const paragraphs = trimmed ? trimmed.split(/\n+/).filter(p => p.length > 0).length : 0;
    
    // Reading/Speaking Time (approx 200/130 wpm)
    const readMinutes = words.length / 200;
    const speakMinutes = words.length / 130;

    // Keyword Density (Top 5)
    const wordFreq: Record<string, number> = {};
    words.forEach(w => {
      const clean = w.toLowerCase().replace(/[^\w]/g, "");
      if (clean.length > 3) {
        wordFreq[clean] = (wordFreq[clean] || 0) + 1;
      }
    });
    const keywords = Object.entries(wordFreq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    return { words, characters, charactersNoSpaces, sentences, paragraphs, readMinutes, speakMinutes, keywords };
  }, [text]);

  const formatTime = (mins: number) => {
    const seconds = Math.round(mins * 60);
    if (seconds < 60) return `${seconds}s`;
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Input Area */}
        <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-8 md:p-12 border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform text-indigo-500">
            <Type size={120} />
          </div>

          <div className="space-y-6 relative z-10">
            <div className="flex items-center justify-between px-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <AlignLeft size={14} className="text-indigo-600" /> Input Text
              </label>
              <div className="flex items-center gap-4">
                 <button 
                  onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                  className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline transition-all"
                 >
                   {copied ? "Copied!" : "Copy Text"}
                 </button>
                 <button onClick={() => setText("")} className="text-gray-300 hover:text-rose-500 transition-colors"><Trash2 size={14}/></button>
              </div>
            </div>
            <textarea 
              value={text} onChange={(e) => setText(e.target.value)}
              className="w-full h-80 p-8 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-600 rounded-[2.5rem] outline-none text-lg font-medium leading-relaxed resize-none transition-all shadow-inner"
              placeholder="Paste your content here to analyze..."
            />
          </div>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { label: "Words", val: stats.words.length, icon: FileText, color: "text-blue-500" },
            { label: "Chars", val: stats.characters, icon: Hash, color: "text-indigo-500" },
            { label: "No Spaces", val: stats.charactersNoSpaces, icon: AlignLeft, color: "text-emerald-500" },
            { label: "Sentences", val: stats.sentences, icon: Type, color: "text-amber-500" },
            { label: "Reading", val: formatTime(stats.readMinutes), icon: Clock, color: "text-rose-500" },
            { label: "Speaking", val: formatTime(stats.speakMinutes), icon: Mic, color: "text-violet-500" },
          ].map((item, idx) => (
            <motion.div 
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white dark:bg-gray-900 p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm text-center group hover:border-indigo-600/50 transition-all"
            >
              <item.icon size={20} className={`mx-auto mb-3 ${item.color}`} />
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">{item.label}</p>
              <h4 className="text-xl font-black text-gray-900 dark:text-white">{item.val}</h4>
            </motion.div>
          ))}
        </div>

        {/* Detailed Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Keyword Density */}
          <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 md:p-10 border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
            <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
              <BarChart2 size={18} className="text-indigo-600" /> Top Keywords
            </h3>
            <div className="space-y-4">
              {stats.keywords.length > 0 ? stats.keywords.map(([word, count]) => (
                <div key={word} className="space-y-1">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="capitalize">{word}</span>
                    <span className="text-gray-400">{count}x ({Math.round((count / stats.words.length) * 100)}%)</span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-50 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${(count / stats.words.length) * 100}%` }} />
                  </div>
                </div>
              )) : (
                <p className="text-center text-xs text-gray-400 font-bold uppercase py-8 opacity-30">No density data yet</p>
              )}
            </div>
          </div>

          {/* Pro Tips */}
          <div className="bg-gray-900 rounded-[2.5rem] p-8 md:p-10 text-white shadow-2xl space-y-6 relative overflow-hidden">
             <div className="absolute -top-4 -right-4 opacity-10">
               <Zap size={100} />
             </div>
             <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
               <Zap size={18} className="text-amber-400" /> Pro Insight
             </h3>
             <div className="space-y-4 relative z-10">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                   <h4 className="text-xs font-black mb-1">Optimal SEO Length</h4>
                   <p className="text-[11px] text-gray-400 leading-relaxed">For blog posts, aim for 1500-2500 words to maximize ranking potential. Keep your keyword density between 1-2%.</p>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                   <h4 className="text-xs font-black mb-1">Readability Tip</h4>
                   <p className="text-[11px] text-gray-400 leading-relaxed">Try to keep sentences under 20 words for best comprehension. Use our case converter to fix any capitalization issues.</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
