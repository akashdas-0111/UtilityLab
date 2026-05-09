"use client";

import React, { useState, useCallback } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  Dices, 
  Trash2, 
  Zap, 
  RefreshCcw, 
  Hash, 
  List, 
  Target,
  Info,
  Settings2,
  Copy,
  CheckCircle2,
  Minimize2,
  Maximize2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function RandomNumberGenerator() {
  const tool = tools.find((t) => t.id === "random-number-gen")!;

  // State
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [count, setCount] = useState(1);
  const [unique, setUnique] = useState(true);
  const [results, setResults] = useState<number[]>([]);
  const [copied, setCopied] = useState(false);

  const generate = useCallback(() => {
    const range = max - min + 1;
    if (range <= 0) return;
    if (unique && count > range) {
       alert("Count cannot be greater than range for unique numbers.");
       return;
    }

    const newResults: number[] = [];
    const used = new Set<number>();

    while (newResults.length < count) {
      // Use crypto for better randomness
      const array = new Uint32Array(1);
      window.crypto.getRandomValues(array);
      const random = min + (array[0] % range);
      
      if (unique) {
        if (!used.has(random)) {
          used.add(random);
          newResults.push(random);
        }
      } else {
        newResults.push(random);
      }
    }
    setResults(newResults);
  }, [min, max, count, unique]);

  const copyResults = () => {
    navigator.clipboard.writeText(results.join(", "));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Controls Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           
           {/* Settings Side */}
           <div className="lg:col-span-5 space-y-6">
              <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-10 border border-gray-100 dark:border-gray-800 shadow-sm space-y-8">
                 <h3 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
                    <Settings2 size={18} className="text-indigo-600" /> Range & Rules
                 </h3>
                 
                 <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-2">
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Minimum</span>
                          <input 
                            type="number" value={min} onChange={(e) => setMin(parseInt(e.target.value) || 0)}
                            className="w-full px-8 py-5 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-600 rounded-[2rem] outline-none text-2xl font-black transition-all shadow-inner"
                          />
                       </div>
                       <div className="space-y-2">
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Maximum</span>
                          <input 
                            type="number" value={max} onChange={(e) => setMax(parseInt(e.target.value) || 0)}
                            className="w-full px-8 py-5 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-600 rounded-[2rem] outline-none text-2xl font-black transition-all shadow-inner"
                          />
                       </div>
                    </div>

                    <div className="space-y-2">
                       <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">How Many Numbers?</span>
                       <input 
                        type="number" value={count} onChange={(e) => setCount(parseInt(e.target.value) || 1)}
                        className="w-full px-8 py-5 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-600 rounded-[2rem] outline-none text-2xl font-black transition-all shadow-inner"
                       />
                    </div>

                    <label className="flex items-center gap-4 cursor-pointer group">
                       <div className={`w-12 h-7 rounded-full transition-all relative ${unique ? 'bg-indigo-600' : 'bg-gray-200'}`}>
                          <input type="checkbox" className="hidden" checked={unique} onChange={() => setUnique(!unique)} />
                          <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${unique ? 'left-6' : 'left-1'}`} />
                       </div>
                       <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest group-hover:text-gray-900 transition-colors">Only Unique Numbers</span>
                    </label>
                 </div>

                 <button 
                  onClick={generate}
                  className="w-full py-6 bg-indigo-600 text-white rounded-[2rem] font-black uppercase tracking-widest shadow-2xl shadow-indigo-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                 >
                   <Dices size={20} /> Generate Numbers
                 </button>
              </div>
           </div>

           {/* Results Side */}
           <div className="lg:col-span-7 flex flex-col space-y-6">
              <div className="flex-1 bg-white dark:bg-gray-900 rounded-[3rem] border border-gray-100 dark:border-gray-800 shadow-sm p-10 flex flex-col relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform text-emerald-500">
                   <Target size={120} />
                 </div>
                 
                 <div className="flex items-center justify-between mb-8 relative z-10">
                    <h3 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
                       <List size={18} className="text-emerald-500" /> Result List
                    </h3>
                    {results.length > 0 && (
                       <button onClick={copyResults} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl hover:text-indigo-600 transition-all flex items-center gap-2">
                          {copied ? <CheckCircle2 size={16} className="text-emerald-500" /> : <Copy size={16} />}
                          <span className="text-[10px] font-black uppercase tracking-widest">{copied ? "Copied" : "Copy All"}</span>
                       </button>
                    )}
                 </div>

                 <div className="flex-1 flex flex-wrap gap-4 content-start relative z-10 overflow-y-auto max-h-[500px] pr-4 custom-scrollbar">
                    <AnimatePresence mode="popLayout">
                       {results.length > 0 ? results.map((n, idx) => (
                         <motion.div 
                          layout
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.02 }}
                          key={`${idx}-${n}`}
                          className="px-6 py-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl border border-indigo-100 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 font-black text-xl"
                         >
                           {n}
                         </motion.div>
                       )) : (
                         <div className="w-full h-full flex flex-col items-center justify-center opacity-20 text-gray-400">
                            <Dices size={80} className="mb-4" />
                            <p className="text-[10px] font-black uppercase tracking-widest">Awaiting Generation</p>
                         </div>
                       )}
                    </AnimatePresence>
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
              <h4 className="font-black text-gray-900 dark:text-white">Crypto Secure</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Uses the Web Crypto API's high-entropy entropy for generating cryptographically 
                strong random numbers suitable for research and games.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl text-emerald-600">
              <Minimize2 size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Unique Mode</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Ensure no duplicates in your results, making it perfect for lottery simulations, 
                raffle drawings, and experimental group assignments.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-amber-50 dark:bg-amber-900/30 rounded-2xl text-amber-600">
              <Maximize2 size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Bulk Generation</h4>
              <p className="text-[11px] text-gray-500 leading-relaxed">
                Generate hundreds of random numbers in a single click with instant formatting 
                and easy export to your clipboard or spreadsheets.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
