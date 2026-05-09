"use client";

import React, { useState, useMemo } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  Hash, 
  Trash2, 
  Zap, 
  ShieldCheck, 
  Info, 
  RefreshCcw, 
  Activity,
  List,
  Target,
  Search
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PrimeChecker() {
  const tool = tools.find((t) => t.id === "prime-checker")!;

  // State
  const [num, setNum] = useState("13");

  const results = useMemo(() => {
    const n = parseInt(num);
    if (isNaN(n) || n < 1) return null;

    const isPrime = (x: number) => {
      if (x < 2) return false;
      for (let i = 2; i <= Math.sqrt(x); i++) {
        if (x % i === 0) return false;
      }
      return true;
    };

    const getFactors = (x: number) => {
      const factors = [];
      for (let i = 1; i <= x; i++) {
        if (x % i === 0) factors.push(i);
      }
      return factors;
    };

    const nextPrime = (x: number) => {
      let current = x + 1;
      while (!isPrime(current)) current++;
      return current;
    };

    return {
      prime: isPrime(n),
      factors: getFactors(n),
      next: nextPrime(n)
    };
  }, [num]);

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Input Section */}
        <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-10 md:p-12 border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform text-indigo-500">
             <Target size={120} />
           </div>
           
           <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between px-1">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <Search size={14} className="text-indigo-600" />
                    Enter Number to Test
                 </label>
                 <button onClick={() => setNum("")} className="text-gray-300 hover:text-rose-500 transition-colors"><Trash2 size={14}/></button>
              </div>
              <input 
                type="number" value={num} onChange={(e) => setNum(e.target.value)}
                className="w-full px-10 py-8 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-600 rounded-[2.5rem] outline-none text-4xl font-black transition-all text-center shadow-inner"
                placeholder="e.g. 13"
              />
           </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           
           {/* Primality Status */}
           <div className="lg:col-span-5">
              <AnimatePresence mode="wait">
                 {results && (
                   <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`h-full p-12 rounded-[3rem] text-center flex flex-col items-center justify-center shadow-xl transition-all ${results.prime ? 'bg-emerald-600 text-white shadow-emerald-600/20' : 'bg-rose-600 text-white shadow-rose-600/20'}`}
                   >
                      <Activity size={48} className="mb-6 opacity-50" />
                      <h4 className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-70">Result</h4>
                      <h2 className="text-5xl font-black mb-4">{results.prime ? "Prime" : "Composite"}</h2>
                      <p className="text-sm font-bold opacity-60">
                        {results.prime ? `${num} is only divisible by 1 and itself.` : `${num} has multiple factors.`}
                      </p>
                   </motion.div>
                 )}
              </AnimatePresence>
           </div>

           {/* Factors & Next Prime */}
           <div className="lg:col-span-7 space-y-6">
              <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
                 <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 mb-6">
                    <List size={14} className="text-indigo-600" /> All Factors
                 </h3>
                 <div className="flex flex-wrap gap-2">
                    {results?.factors.map(f => (
                      <span key={f} className="px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-xl text-xs font-black text-indigo-600 border border-gray-100 dark:border-gray-700">{f}</span>
                    ))}
                 </div>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm flex items-center justify-between">
                 <div className="flex items-center gap-4">
                    <div className="p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl text-indigo-600">
                       <Zap size={24} />
                    </div>
                    <div>
                       <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Next Prime Number</h4>
                       <p className="text-2xl font-black text-gray-900 dark:text-white">{results?.next || "---"}</p>
                    </div>
                 </div>
                 <RefreshCcw size={20} className="text-gray-200" />
              </div>
           </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl text-indigo-600">
              <ShieldCheck size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Theoretic Accuracy</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Uses the trial division method with square root optimization to provide 100% 
                accurate results for any positive integer.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl text-emerald-600">
              <Info size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Factor Analysis</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Instantly lists every integer factor of your input, helping you understand the 
                composition of composite numbers.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-amber-50 dark:bg-amber-900/30 rounded-2xl text-amber-600">
              <Activity size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Sequence Discovery</h4>
              <p className="text-[11px] text-gray-500 leading-relaxed">
                Easily find the subsequent prime in the mathematical sequence, facilitating 
                exploration of the distribution of primes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
