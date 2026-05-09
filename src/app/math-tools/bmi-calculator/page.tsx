"use client";

import React, { useState, useMemo } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  Activity, 
  Trash2, 
  Zap, 
  RefreshCcw, 
  ShieldCheck, 
  Info, 
  Target,
  Settings2,
  Scale,
  Ruler,
  TrendingUp,
  Heart
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function BMICalculator() {
  const tool = tools.find((t) => t.id === "bmi-calculator")!;

  // State
  const [weight, setWeight] = useState("70");
  const [height, setHeight] = useState("175");
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");

  const results = useMemo(() => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    if (isNaN(w) || isNaN(h) || h === 0) return null;

    let bmi = 0;
    if (unit === "metric") {
      bmi = w / Math.pow(h / 100, 2);
    } else {
      bmi = (w / Math.pow(h, 2)) * 703;
    }

    let category = "";
    let color = "";
    if (bmi < 18.5) { category = "Underweight"; color = "text-blue-500"; }
    else if (bmi < 25) { category = "Healthy Weight"; color = "text-emerald-500"; }
    else if (bmi < 30) { category = "Overweight"; color = "text-amber-500"; }
    else { category = "Obese"; color = "text-rose-500"; }

    return { bmi: bmi.toFixed(1), category, color };
  }, [weight, height, unit]);

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Unit Selector */}
        <div className="flex bg-gray-50 dark:bg-gray-800 p-2 rounded-2xl border border-gray-100 dark:border-gray-700 w-fit mx-auto">
          {[
            { id: "metric", label: "Metric (kg/cm)" },
            { id: "imperial", label: "Imperial (lb/in)" }
          ].map(opt => (
            <button 
              key={opt.id}
              onClick={() => setUnit(opt.id as any)}
              className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${unit === opt.id ? 'bg-white dark:bg-gray-700 shadow-lg text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Input & Gauge Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           
           {/* Inputs Side */}
           <div className="lg:col-span-5 space-y-6">
              <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-10 border border-gray-100 dark:border-gray-800 shadow-sm space-y-8">
                 <h3 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
                    <Settings2 size={18} className="text-indigo-600" /> Measurements
                 </h3>
                 
                 <div className="space-y-6">
                    <div className="space-y-2">
                       <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Weight ({unit === "metric" ? "kg" : "lb"})</span>
                       <div className="relative">
                          <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300">
                             <Scale size={20} />
                          </div>
                          <input 
                            type="number" value={weight} onChange={(e) => setWeight(e.target.value)}
                            className="w-full pl-14 pr-8 py-5 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-600 rounded-[2rem] outline-none text-2xl font-black transition-all shadow-inner"
                          />
                       </div>
                    </div>
                    
                    <div className="space-y-2">
                       <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Height ({unit === "metric" ? "cm" : "in"})</span>
                       <div className="relative">
                          <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300">
                             <Ruler size={20} />
                          </div>
                          <input 
                            type="number" value={height} onChange={(e) => setHeight(e.target.value)}
                            className="w-full pl-14 pr-8 py-5 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-600 rounded-[2rem] outline-none text-2xl font-black transition-all shadow-inner"
                          />
                       </div>
                    </div>
                 </div>
              </div>

              {results && (
                 <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gray-900 rounded-[3rem] p-10 text-white shadow-xl flex items-center justify-between">
                    <div>
                       <p className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-50">Status</p>
                       <h4 className={`text-2xl font-black ${results.color}`}>{results.category}</h4>
                    </div>
                    <div className="p-4 bg-white/10 rounded-2xl">
                       <Heart size={24} className={results.color} />
                    </div>
                 </motion.div>
              )}
           </div>

           {/* Results Side */}
           <div className="lg:col-span-7 bg-white dark:bg-gray-900 rounded-[3rem] border border-gray-100 dark:border-gray-800 shadow-sm p-12 flex flex-col items-center justify-center text-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform text-indigo-500">
                <TrendingUp size={120} />
              </div>
              
              <AnimatePresence mode="wait">
                 {results && (
                   <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6 relative z-10">
                      <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Your BMI Score</h4>
                      <h2 className="text-9xl font-black text-indigo-600 leading-none">{results.bmi}</h2>
                      <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full mt-12 relative">
                         <div className={`absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ${results.color.replace('text', 'bg')}`} style={{ width: `${Math.min(100, (parseFloat(results.bmi) / 40) * 100)}%` }} />
                      </div>
                      <div className="flex justify-between text-[8px] font-black text-gray-400 uppercase tracking-widest mt-2 px-1">
                         <span>Under</span>
                         <span>Healthy</span>
                         <span>Over</span>
                         <span>Obese</span>
                      </div>
                   </motion.div>
                 )}
              </AnimatePresence>
           </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-indigo-600/20 flex items-start gap-4">
            <div className="p-3 bg-indigo-500 rounded-2xl">
              <Zap size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black">Instant Assessment</h4>
              <p className="text-sm text-indigo-100 opacity-80 leading-relaxed">
                Calculates your BMI instantly as you adjust measurements. Get immediate feedback 
                on your health status with our reactive engine.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl text-emerald-600">
              <ShieldCheck size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Dual Units</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Supports both Metric and Imperial systems, making it accessible for health 
                tracking regardless of your regional standards.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-amber-50 dark:bg-amber-900/30 rounded-2xl text-amber-600">
              <Info size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Smart Visuals</h4>
              <p className="text-[11px] text-gray-500 leading-relaxed">
                Includes a visual gauge that maps your score against standard WHO health 
                categories for a more intuitive understanding of your results.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
