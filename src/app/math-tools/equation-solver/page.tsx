"use client";

import React, { useState, useMemo } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  Calculator, 
  Trash2, 
  Zap, 
  RefreshCcw, 
  Hash,
  Settings2,
  Activity,
  Target,
  Info,
  FunctionSquare
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function EquationSolver() {
  const tool = tools.find((t) => t.id === "equation-solver")!;

  // State
  const [type, setType] = useState<"linear" | "quadratic">("quadratic");
  
  // Linear: ax + b = c
  const [la, setLa] = useState("2");
  const [lb, setLb] = useState("4");
  const [lc, setLc] = useState("10");

  // Quadratic: ax2 + bx + c = 0
  const [qa, setQa] = useState("1");
  const [qb, setQb] = useState("-5");
  const [qc, setQc] = useState("6");

  const results = useMemo(() => {
    if (type === "linear") {
      const a = parseFloat(la);
      const b = parseFloat(lb);
      const c = parseFloat(lc);
      if (a === 0) return { error: "Coefficient 'a' cannot be zero in a linear equation." };
      return { x: (c - b) / a };
    } else {
      const a = parseFloat(qa);
      const b = parseFloat(qb);
      const c = parseFloat(qc);
      if (a === 0) return { error: "Coefficient 'a' cannot be zero in a quadratic equation." };
      
      const discriminant = b * b - 4 * a * c;
      if (discriminant < 0) return { error: "Equation has complex roots (discriminant < 0)." };
      
      const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
      const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
      return { x1, x2, discriminant };
    }
  }, [type, la, lb, lc, qa, qb, qc]);

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Type Selector */}
        <div className="flex bg-gray-50 dark:bg-gray-800 p-2 rounded-2xl border border-gray-100 dark:border-gray-700 w-fit mx-auto">
          {[
            { id: "linear", label: "Linear (ax + b = c)" },
            { id: "quadratic", label: "Quadratic (ax² + bx + c = 0)" }
          ].map(opt => (
            <button 
              key={opt.id}
              onClick={() => setType(opt.id as any)}
              className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${type === opt.id ? 'bg-white dark:bg-gray-700 shadow-lg text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Solver Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           
           {/* Inputs */}
           <div className="lg:col-span-5 bg-white dark:bg-gray-900 rounded-[3rem] p-10 md:p-12 border border-gray-100 dark:border-gray-800 shadow-sm space-y-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform text-indigo-500">
                <FunctionSquare size={120} />
              </div>
              
              <div className="relative z-10 space-y-8">
                 <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <Settings2 size={14} className="text-indigo-600" /> Coefficients
                 </h3>
                 
                 <div className="space-y-6">
                    {type === "linear" ? (
                      <>
                        <div className="flex items-center gap-4">
                           <span className="w-12 text-2xl font-black text-gray-300">a</span>
                           <input type="number" value={la} onChange={(e) => setLa(e.target.value)} className="flex-1 px-6 py-4 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-600 rounded-2xl outline-none text-xl font-black transition-all shadow-inner" />
                        </div>
                        <div className="flex items-center gap-4">
                           <span className="w-12 text-2xl font-black text-gray-300">b</span>
                           <input type="number" value={lb} onChange={(e) => setLb(e.target.value)} className="flex-1 px-6 py-4 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-600 rounded-2xl outline-none text-xl font-black transition-all shadow-inner" />
                        </div>
                        <div className="flex items-center gap-4">
                           <span className="w-12 text-2xl font-black text-gray-300">c</span>
                           <input type="number" value={lc} onChange={(e) => setLc(e.target.value)} className="flex-1 px-6 py-4 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-600 rounded-2xl outline-none text-xl font-black transition-all shadow-inner" />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center gap-4">
                           <span className="w-12 text-2xl font-black text-gray-300">a</span>
                           <input type="number" value={qa} onChange={(e) => setQa(e.target.value)} className="flex-1 px-6 py-4 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-600 rounded-2xl outline-none text-xl font-black transition-all shadow-inner" />
                        </div>
                        <div className="flex items-center gap-4">
                           <span className="w-12 text-2xl font-black text-gray-300">b</span>
                           <input type="number" value={qb} onChange={(e) => setQb(e.target.value)} className="flex-1 px-6 py-4 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-600 rounded-2xl outline-none text-xl font-black transition-all shadow-inner" />
                        </div>
                        <div className="flex items-center gap-4">
                           <span className="w-12 text-2xl font-black text-gray-300">c</span>
                           <input type="number" value={qc} onChange={(e) => setQc(e.target.value)} className="flex-1 px-6 py-4 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-600 rounded-2xl outline-none text-xl font-black transition-all shadow-inner" />
                        </div>
                      </>
                    )}
                 </div>
              </div>
           </div>

           {/* Results */}
           <div className="lg:col-span-7 flex flex-col space-y-6">
              <AnimatePresence mode="wait">
                 {results?.error ? (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-10 bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 rounded-[3rem] text-rose-600 flex items-center gap-4">
                       <Activity size={24} />
                       <p className="font-bold">{results.error}</p>
                    </motion.div>
                 ) : (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex-1 bg-indigo-600 rounded-[3rem] p-12 text-white shadow-xl shadow-indigo-600/30 flex flex-col justify-center">
                       <h4 className="text-[10px] font-black uppercase tracking-widest mb-8 opacity-70">Solutions Found</h4>
                       {type === "linear" ? (
                         <div className="space-y-2">
                           <p className="text-[10px] font-black uppercase tracking-widest opacity-50">x =</p>
                           <h2 className="text-6xl font-black">{results.x?.toFixed(4)}</h2>
                         </div>
                       ) : (
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="space-y-2">
                               <p className="text-[10px] font-black uppercase tracking-widest opacity-50">x₁ =</p>
                               <h2 className="text-5xl font-black">{results.x1?.toFixed(4)}</h2>
                            </div>
                            <div className="space-y-2">
                               <p className="text-[10px] font-black uppercase tracking-widest opacity-50">x₂ =</p>
                               <h2 className="text-5xl font-black">{results.x2?.toFixed(4)}</h2>
                            </div>
                         </div>
                       )}
                       {type === "quadratic" && results.discriminant !== undefined && (
                         <div className="mt-12 pt-8 border-t border-white/10">
                            <p className="text-[9px] font-black uppercase tracking-widest opacity-50 mb-1">Discriminant (D)</p>
                            <p className="text-lg font-black">{results.discriminant.toFixed(4)}</p>
                         </div>
                       )}
                    </motion.div>
                 )}
              </AnimatePresence>
           </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl text-indigo-600">
              <Zap size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Instant Roots</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Calculates algebraic roots instantly as you modify coefficients. No manual 
                calculations or formulas needed.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl text-emerald-600">
              <RefreshCcw size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Precision Control</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Supports decimal coefficients and provides results with up to 4 decimal places 
                of accuracy for high-fidelity solving.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-amber-50 dark:bg-amber-900/30 rounded-2xl text-amber-600">
              <Info size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Step-by-Step Logic</h4>
              <p className="text-[11px] text-gray-500 leading-relaxed">
                Analyzes the discriminant and identifies complex root scenarios to ensure 
                mathematical integrity across all inputs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
