"use client";

import React, { useState } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  Percent, 
  Trash2, 
  ArrowUpRight, 
  ArrowDownRight, 
  Zap, 
  Calculator, 
  Hash,
  Settings2,
  TrendingUp,
  RefreshCcw,
  Target
} from "lucide-react";
import { motion } from "framer-motion";

export default function PercentageCalculator() {
  const tool = tools.find((t) => t.id === "percentage-calculator")!;

  // State
  const [val1, setVal1] = useState("10");
  const [val2, setVal2] = useState("100");
  
  const [inc1, setInc1] = useState("50");
  const [inc2, setInc2] = useState("100");

  const [rev1, setRev1] = useState("20");
  const [rev2, setRev2] = useState("80");

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Basic Calculation */}
        <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-10 md:p-12 border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform text-indigo-500">
             <Percent size={120} />
           </div>
           
           <div className="relative z-10 space-y-8">
              <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
                 <Target size={18} className="text-indigo-600" /> Basic Percentage
              </h3>
              
              <div className="flex flex-col md:flex-row items-center gap-6 text-2xl font-black text-gray-400">
                 <span className="shrink-0">What is</span>
                 <input 
                  type="number" value={val1} onChange={(e) => setVal1(e.target.value)}
                  className="w-full md:w-32 px-6 py-4 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-600 rounded-2xl outline-none text-gray-900 dark:text-white text-center transition-all shadow-inner"
                 />
                 <span className="shrink-0">% of</span>
                 <input 
                  type="number" value={val2} onChange={(e) => setVal2(e.target.value)}
                  className="w-full md:w-32 px-6 py-4 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-600 rounded-2xl outline-none text-gray-900 dark:text-white text-center transition-all shadow-inner"
                 />
                 <span className="shrink-0">?</span>
                 <div className="flex-1 bg-indigo-600 text-white px-8 py-4 rounded-2xl shadow-xl shadow-indigo-600/20 text-center">
                    {(parseFloat(val1) / 100 * parseFloat(val2)) || 0}
                 </div>
              </div>
           </div>
        </div>

        {/* Increase / Decrease */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-10 border border-gray-100 dark:border-gray-800 shadow-sm space-y-8">
              <h3 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
                 <TrendingUp size={18} className="text-emerald-600" /> % Increase / Decrease
              </h3>
              <div className="space-y-6">
                 <div className="flex items-center gap-4 text-xl font-black text-gray-400">
                    <span className="w-20">From</span>
                    <input 
                      type="number" value={inc1} onChange={(e) => setInc1(e.target.value)}
                      className="flex-1 px-6 py-4 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-emerald-600 rounded-2xl outline-none text-gray-900 dark:text-white transition-all shadow-inner"
                    />
                 </div>
                 <div className="flex items-center gap-4 text-xl font-black text-gray-400">
                    <span className="w-20">To</span>
                    <input 
                      type="number" value={inc2} onChange={(e) => setInc2(e.target.value)}
                      className="flex-1 px-6 py-4 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-emerald-600 rounded-2xl outline-none text-gray-900 dark:text-white transition-all shadow-inner"
                    />
                 </div>
                 <div className={`p-8 rounded-[2rem] text-center shadow-xl transition-all ${parseFloat(inc2) >= parseFloat(inc1) ? 'bg-emerald-50 text-emerald-600 shadow-emerald-500/10' : 'bg-rose-50 text-rose-600 shadow-rose-500/10'}`}>
                    <p className="text-[10px] font-black uppercase tracking-widest mb-1">Total Change</p>
                    <div className="text-3xl font-black flex items-center justify-center gap-2">
                       {parseFloat(inc2) >= parseFloat(inc1) ? <ArrowUpRight /> : <ArrowDownRight />}
                       {Math.abs(((parseFloat(inc2) - parseFloat(inc1)) / parseFloat(inc1)) * 100).toFixed(2)}%
                    </div>
                 </div>
              </div>
           </div>

           <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-10 border border-gray-100 dark:border-gray-800 shadow-sm space-y-8">
              <h3 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
                 <Calculator size={18} className="text-amber-500" /> Reverse Percentage
              </h3>
              <div className="space-y-6">
                 <div className="flex items-center gap-4 text-xl font-black text-gray-400">
                    <input 
                      type="number" value={rev1} onChange={(e) => setRev1(e.target.value)}
                      className="w-32 px-6 py-4 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-amber-600 rounded-2xl outline-none text-gray-900 dark:text-white text-center transition-all shadow-inner"
                    />
                    <span>is what % of</span>
                    <input 
                      type="number" value={rev2} onChange={(e) => setRev2(e.target.value)}
                      className="w-32 px-6 py-4 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-amber-600 rounded-2xl outline-none text-gray-900 dark:text-white text-center transition-all shadow-inner"
                    />
                 </div>
                 <div className="p-8 bg-amber-50 text-amber-600 rounded-[2rem] text-center shadow-xl shadow-amber-500/10">
                    <p className="text-[10px] font-black uppercase tracking-widest mb-1">Resulting Percentage</p>
                    <div className="text-3xl font-black">
                       {((parseFloat(rev1) / parseFloat(rev2)) * 100).toFixed(2)}%
                    </div>
                 </div>
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
              <h4 className="font-black text-gray-900 dark:text-white">Instant Math</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Calculates results as you type. No reload or submit buttons required. Get fast 
                answers for complex growth and decay formulas.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl text-emerald-600">
              <Settings2 size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Business Ready</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Perfect for calculating profit margins, VAT/GST taxes, and discount rates for 
                e-commerce and financial reporting.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-amber-50 dark:bg-amber-900/30 rounded-2xl text-amber-600">
              <RefreshCcw size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Dual Precision</h4>
              <p className="text-[11px] text-gray-500 leading-relaxed">
                Handles both basic and reverse percentage calculations with high-precision 
                rounding to ensure your reports are always accurate.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
