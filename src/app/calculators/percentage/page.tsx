"use client";

import React, { useState } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  Percent, 
  ArrowRight, 
  Equal, 
  TrendingUp, 
  TrendingDown,
  Info,
  HelpCircle,
  Zap
} from "lucide-react";
import { motion } from "framer-motion";

export default function PercentageCalculator() {
  const tool = tools.find((t) => t.id === "percentage-calc")!;

  // Calculator 1: What is X% of Y?
  const [c1_x, setC1_x] = useState<number>(10);
  const [c1_y, setC1_y] = useState<number>(100);
  const c1_res = (c1_x / 100) * c1_y;

  // Calculator 2: X is what % of Y?
  const [c2_x, setC2_x] = useState<number>(20);
  const [c2_y, setC2_y] = useState<number>(200);
  const c2_res = (c2_x / c2_y) * 100;

  // Calculator 3: % Increase/Decrease from X to Y
  const [c3_x, setC3_x] = useState<number>(100);
  const [c3_y, setC3_y] = useState<number>(150);
  const c3_diff = c3_y - c3_x;
  const c3_res = (c3_diff / Math.abs(c3_x)) * 100;

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Mode 1 */}
        <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 md:p-10 border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
            <Percent size={120} />
          </div>
          
          <h3 className="text-xl font-black text-gray-900 dark:text-white mb-8 flex items-center gap-2">
            <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg text-indigo-600">
              <Zap size={18} />
            </div>
            What is X% of Y?
          </h3>

          <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
            <div className="w-full md:w-32">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Percent (%)</label>
              <input 
                type="number" value={c1_x} onChange={(e) => setC1_x(Number(e.target.value))}
                className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800 rounded-2xl outline-none text-xl font-black text-indigo-600 focus:ring-2 focus:ring-indigo-600 transition-all"
              />
            </div>
            <div className="text-gray-300 font-black pt-6">OF</div>
            <div className="w-full md:w-48">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Value (Y)</label>
              <input 
                type="number" value={c1_y} onChange={(e) => setC1_y(Number(e.target.value))}
                className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800 rounded-2xl outline-none text-xl font-black text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-600 transition-all"
              />
            </div>
            <div className="flex-1 flex items-center gap-6 pt-6 w-full">
              <Equal className="text-gray-300 hidden md:block" />
              <div className="flex-1 bg-indigo-600 p-4 rounded-2xl text-center md:text-left">
                <p className="text-[10px] font-bold text-indigo-200 uppercase tracking-widest mb-1">Result</p>
                <p className="text-3xl font-black text-white">{c1_res.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mode 2 */}
        <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 md:p-10 border border-gray-100 dark:border-gray-800 shadow-sm">
          <h3 className="text-xl font-black text-gray-900 dark:text-white mb-8 flex items-center gap-2">
            <div className="p-2 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg text-emerald-600">
              <Percent size={18} />
            </div>
            X is what percent of Y?
          </h3>

          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-full md:w-48">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Value (X)</label>
              <input 
                type="number" value={c2_x} onChange={(e) => setC2_x(Number(e.target.value))}
                className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800 rounded-2xl outline-none text-xl font-black text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-600 transition-all"
              />
            </div>
            <div className="text-gray-300 font-black pt-6">IS % OF</div>
            <div className="w-full md:w-48">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Total (Y)</label>
              <input 
                type="number" value={c2_y} onChange={(e) => setC2_y(Number(e.target.value))}
                className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800 rounded-2xl outline-none text-xl font-black text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-600 transition-all"
              />
            </div>
            <div className="flex-1 flex items-center gap-6 pt-6 w-full">
              <Equal className="text-gray-300 hidden md:block" />
              <div className="flex-1 bg-emerald-600 p-4 rounded-2xl text-center md:text-left">
                <p className="text-[10px] font-bold text-emerald-100 uppercase tracking-widest mb-1">Percentage</p>
                <p className="text-3xl font-black text-white">{c2_res.toFixed(2)}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mode 3 */}
        <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 md:p-10 border border-gray-100 dark:border-gray-800 shadow-sm">
          <h3 className="text-xl font-black text-gray-900 dark:text-white mb-8 flex items-center gap-2">
            <div className={`p-2 rounded-lg ${c3_res >= 0 ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600" : "bg-rose-50 dark:bg-rose-900/30 text-rose-600"}`}>
              {c3_res >= 0 ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
            </div>
            Percentage Increase/Decrease
          </h3>

          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-full md:w-48">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Original (X)</label>
              <input 
                type="number" value={c3_x} onChange={(e) => setC3_x(Number(e.target.value))}
                className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800 rounded-2xl outline-none text-xl font-black text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 transition-all"
              />
            </div>
            <div className="text-gray-300 font-black pt-6">TO</div>
            <div className="w-full md:w-48">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">New (Y)</label>
              <input 
                type="number" value={c3_y} onChange={(e) => setC3_y(Number(e.target.value))}
                className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800 rounded-2xl outline-none text-xl font-black text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 transition-all"
              />
            </div>
            <div className="flex-1 flex items-center gap-6 pt-6 w-full">
              <Equal className="text-gray-300 hidden md:block" />
              <div className={`flex-1 p-4 rounded-2xl text-center md:text-left ${c3_res >= 0 ? "bg-blue-600" : "bg-rose-600"}`}>
                <p className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${c3_res >= 0 ? "text-blue-100" : "text-rose-100"}`}>
                  {c3_res >= 0 ? "Increase" : "Decrease"}
                </p>
                <p className="text-3xl font-black text-white">{Math.abs(c3_res).toFixed(2)}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Informational Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-indigo-50 dark:bg-indigo-900/10 rounded-3xl p-8 border border-indigo-100 dark:border-indigo-900/20">
            <h4 className="text-lg font-black text-indigo-900 dark:text-indigo-100 mb-4 flex items-center gap-2">
              <Info size={20} />
              Quick Formulas
            </h4>
            <div className="space-y-3 text-sm text-indigo-800/80 dark:text-indigo-200/80 leading-relaxed font-medium">
              <p>• **X% of Y:** (X / 100) * Y</p>
              <p>• **% Change:** ((New - Old) / Old) * 100</p>
              <p>• **Ratio to %:** (Part / Total) * 100</p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 flex flex-col justify-center">
             <h4 className="font-black text-gray-900 dark:text-white mb-2 flex items-center gap-2">
              <HelpCircle size={18} className="text-indigo-600" />
              Need help?
            </h4>
            <p className="text-sm text-gray-500 leading-relaxed">
              Use this tool to quickly calculate discounts, markups, investment growth, or portion sizes. 
              The results update automatically as you type for instant productivity.
            </p>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
