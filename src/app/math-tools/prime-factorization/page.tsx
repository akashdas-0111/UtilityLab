"use client";

import React, { useState, useMemo } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  Hash, 
  Trash2, 
  Zap, 
  RefreshCcw, 
  List, 
  Activity, 
  Target,
  Info,
  Settings2,
  Box
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PrimeFactorization() {
  const tool = tools.find((t) => t.id === "prime-factorization")!;

  // State
  const [num, setNum] = useState("120");

  const results = useMemo(() => {
    const n = parseInt(num);
    if (isNaN(n) || n < 2) return null;

    let temp = n;
    const factors: Record<number, number> = {};
    let d = 2;
    while (temp >= d * d) {
      if (temp % d === 0) {
        factors[d] = (factors[d] || 0) + 1;
        temp /= d;
      } else {
        d++;
      }
    }
    if (temp > 1) factors[temp] = (factors[temp] || 0) + 1;

    const list = Object.entries(factors).map(([f, e]) => ({ factor: parseInt(f), exponent: e }));
    const notation = list.map(item => `${item.factor}${item.exponent > 1 ? `^ ${item.exponent}` : ""}`).join(" × ");

    return { list, notation };
  }, [num]);

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Input Card */}
        <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-10 md:p-12 border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform text-indigo-500">
             <Target size={120} />
           </div>
           
           <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between px-1">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <Hash size={14} className="text-indigo-600" />
                    Enter Number
                 </label>
                 <button onClick={() => setNum("")} className="text-gray-300 hover:text-rose-500 transition-colors"><Trash2 size={14}/></button>
              </div>
              <input 
                type="number" value={num} onChange={(e) => setNum(e.target.value)}
                className="w-full px-10 py-8 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-600 rounded-[2.5rem] outline-none text-4xl font-black transition-all text-center shadow-inner"
                placeholder="e.g. 120"
              />
           </div>
        </div>

        {/* Results Dashboard */}
        <AnimatePresence mode="wait">
          {results && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
               
               {/* Main Notation Card */}
               <div className="bg-indigo-600 rounded-[4rem] p-12 text-white shadow-2xl shadow-indigo-600/30 text-center relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 opacity-10">
                    <Box size={300} />
                  </div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-6 opacity-70">Prime Factor Notation</h4>
                  <h2 className="text-5xl md:text-6xl font-black leading-tight relative z-10">{results.notation}</h2>
               </div>

               {/* Factor Breakdown List */}
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {results.list.map((item, idx) => (
                    <motion.div 
                      key={item.factor}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-center justify-between group hover:border-indigo-600/30 transition-all"
                    >
                       <div className="space-y-1">
                          <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Factor</p>
                          <h4 className="text-3xl font-black text-indigo-600">{item.factor}</h4>
                       </div>
                       <div className="text-right space-y-1">
                          <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Count</p>
                          <h4 className="text-2xl font-black text-gray-900 dark:text-white">x{item.exponent}</h4>
                       </div>
                    </motion.div>
                  ))}
               </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl text-indigo-600">
              <Zap size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Instant Decomposition</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Break down any positive integer into its unique prime building blocks instantly 
                with real-time updates.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl text-emerald-600">
              <Settings2 size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Power Notation</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Automatically formats results using standard mathematical exponent notation for 
                maximum clarity and academic compatibility.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-amber-50 dark:bg-amber-900/30 rounded-2xl text-amber-600">
              <Activity size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Number Theory</h4>
              <p className="text-[11px] text-gray-500 leading-relaxed">
                Essential tool for students exploring GCD, LCM, and modular arithmetic concepts 
                through deep integer breakdown.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
