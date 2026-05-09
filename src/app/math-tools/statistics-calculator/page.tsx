"use client";

import React, { useState, useMemo } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  BarChart3, 
  Trash2, 
  Zap, 
  RefreshCcw, 
  List, 
  Activity, 
  Target,
  Info,
  Settings2,
  TrendingUp,
  LineChart as LineChartIcon,
  CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function StatisticsCalculator() {
  const tool = tools.find((t) => t.id === "statistics-calculator")!;

  // State
  const [input, setInput] = useState("10, 20, 30, 40, 50, 60, 70, 80, 90, 100");

  const stats = useMemo(() => {
    const nums = input.split(/[,\s]+/).map(n => parseFloat(n)).filter(n => !isNaN(n));
    if (nums.length === 0) return null;

    const count = nums.length;
    const sum = nums.reduce((a, b) => a + b, 0);
    const mean = sum / count;
    
    const sorted = [...nums].sort((a, b) => a - b);
    const median = count % 2 === 0 
      ? (sorted[count/2 - 1] + sorted[count/2]) / 2 
      : sorted[Math.floor(count/2)];

    const freq: Record<number, number> = {};
    let maxFreq = 0;
    nums.forEach(n => {
      freq[n] = (freq[n] || 0) + 1;
      maxFreq = Math.max(maxFreq, freq[n]);
    });
    const modes = Object.entries(freq).filter(([_, f]) => f === maxFreq).map(([n]) => parseFloat(n));
    
    const variance = nums.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / count;
    const stdDev = Math.sqrt(variance);
    const min = Math.min(...nums);
    const max = Math.max(...nums);
    const range = max - min;

    return { count, sum, mean, median, modes, stdDev, variance, min, max, range };
  }, [input]);

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Input Card */}
        <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-10 md:p-12 border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform text-indigo-500">
             <BarChart3 size={120} />
           </div>
           
           <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between px-1">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <List size={14} className="text-indigo-600" />
                    Dataset (Comma or Space Separated)
                 </label>
                 <button onClick={() => setInput("")} className="text-gray-300 hover:text-rose-500 transition-colors"><Trash2 size={14}/></button>
              </div>
              <textarea 
                value={input} onChange={(e) => setInput(e.target.value)}
                className="w-full h-40 p-8 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-600 rounded-[2.5rem] outline-none text-xl font-bold transition-all shadow-inner resize-none"
                placeholder="e.g. 10, 20, 30..."
              />
           </div>
        </div>

        {/* Results Grid */}
        <AnimatePresence mode="wait">
          {stats && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
               {[
                 { label: "Mean (Average)", val: stats.mean.toFixed(2), icon: Target, color: "text-indigo-600" },
                 { label: "Median", val: stats.median.toFixed(2), icon: LineChartIcon, color: "text-emerald-600" },
                 { label: "Std Deviation", val: stats.stdDev.toFixed(2), icon: Activity, color: "text-amber-600" },
                 { label: "Sample Count", val: stats.count, icon: Hash, color: "text-rose-600" },
                 { label: "Variance", val: stats.variance.toFixed(2), icon: Settings2, color: "text-blue-600" },
                 { label: "Range", val: stats.range.toFixed(2), icon: TrendingUp, color: "text-violet-600" },
                 { label: "Minimum", val: stats.min.toFixed(2), icon: Trash2, color: "text-gray-400" },
                 { label: "Maximum", val: stats.max.toFixed(2), icon: Zap, color: "text-amber-400" }
               ].map((item, idx) => (
                 <motion.div 
                   key={item.label}
                   initial={{ opacity: 0, scale: 0.9 }}
                   animate={{ opacity: 1, scale: 1 }}
                   transition={{ delay: idx * 0.05 }}
                   className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center text-center group hover:border-indigo-600/30 transition-all"
                 >
                    <item.icon size={20} className={`${item.color} mb-4`} />
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">{item.label}</p>
                    <h4 className="text-2xl font-black text-gray-900 dark:text-white">{item.val}</h4>
                 </motion.div>
               ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-indigo-600/20 flex items-start gap-4">
            <div className="p-3 bg-indigo-500 rounded-2xl">
              <Zap size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black">Instant Analysis</h4>
              <p className="text-sm text-indigo-100 opacity-80 leading-relaxed">
                Processes your entire dataset in real-time. Simply paste your numbers and get a 
                comprehensive statistical profile immediately.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl text-emerald-600">
              <CheckCircle2 size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Full Profile</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Calculates mean, median, mode, variance, and standard deviation in a single pass, 
                providing a 360-degree view of your data.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-amber-50 dark:bg-amber-900/30 rounded-2xl text-amber-600">
              <Info size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Smart Parsing</h4>
              <p className="text-[11px] text-gray-500 leading-relaxed">
                Our parser automatically handles multiple delimiters (commas, spaces, newlines) 
                and filters out invalid entries for robust data cleaning.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
