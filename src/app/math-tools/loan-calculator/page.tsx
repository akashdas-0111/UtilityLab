"use client";

import React, { useState, useMemo } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  CreditCard, 
  Trash2, 
  Zap, 
  ShieldCheck, 
  Info, 
  RefreshCcw, 
  DollarSign,
  Calendar,
  Activity,
  PieChart as PieIcon,
  Settings2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export default function LoanCalculator() {
  const tool = tools.find((t) => t.id === "loan-calculator")!;

  // State
  const [principal, setPrincipal] = useState("300000");
  const [interest, setInterest] = useState("5.5");
  const [years, setYears] = useState("30");

  const results = useMemo(() => {
    const P = parseFloat(principal);
    const r = parseFloat(interest) / 100 / 12;
    const n = parseFloat(years) * 12;

    if (isNaN(P) || isNaN(r) || isNaN(n) || r === 0) {
      if (r === 0 && P > 0 && n > 0) {
        const monthly = P / n;
        return { monthly, total: P, interest: 0 };
      }
      return null;
    }

    const monthly = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const total = monthly * n;
    const totalInterest = total - P;

    return { 
      monthly, 
      total, 
      interest: totalInterest,
      chartData: [
        { name: "Principal", value: P },
        { name: "Interest", value: totalInterest }
      ]
    };
  }, [principal, interest, years]);

  const COLORS = ["#4f46e5", "#10b981"];

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Input & Chart Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           
           {/* Inputs Side */}
           <div className="lg:col-span-5 space-y-6">
              <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-10 border border-gray-100 dark:border-gray-800 shadow-sm space-y-8">
                 <h3 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
                    <Settings2 size={18} className="text-indigo-600" /> Loan Parameters
                 </h3>
                 
                 <div className="space-y-6">
                    <div className="space-y-2">
                       <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Principal Amount ($)</span>
                       <div className="relative">
                          <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300">
                             <DollarSign size={20} />
                          </div>
                          <input 
                            type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)}
                            className="w-full pl-14 pr-8 py-5 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-600 rounded-[2rem] outline-none text-2xl font-black transition-all shadow-inner"
                          />
                       </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-2">
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Rate (%)</span>
                          <input 
                            type="number" step="0.1" value={interest} onChange={(e) => setInterest(e.target.value)}
                            className="w-full px-8 py-5 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-600 rounded-[2rem] outline-none text-2xl font-black transition-all shadow-inner"
                          />
                       </div>
                       <div className="space-y-2">
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Term (Yrs)</span>
                          <input 
                            type="number" value={years} onChange={(e) => setYears(e.target.value)}
                            className="w-full px-8 py-5 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-600 rounded-[2rem] outline-none text-2xl font-black transition-all shadow-inner"
                          />
                       </div>
                    </div>
                 </div>
              </div>

              {results && (
                 <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-indigo-600 rounded-[3rem] p-10 text-white shadow-xl shadow-indigo-600/30 text-center">
                    <p className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-70">Monthly Payment</p>
                    <h2 className="text-5xl font-black mb-2">${results.monthly.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
                    <p className="text-xs font-bold opacity-50">Estimated principal + interest</p>
                 </motion.div>
              )}
           </div>

           {/* Visualization Side */}
           <div className="lg:col-span-7 bg-white dark:bg-gray-900 rounded-[3rem] border border-gray-100 dark:border-gray-800 shadow-sm p-10 flex flex-col">
              <h3 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-widest flex items-center gap-2 mb-8">
                 <PieIcon size={18} className="text-emerald-500" /> Cost Breakdown
              </h3>
              
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                 <div className="h-[300px] w-full">
                    {results && (
                       <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                             <Pie
                              data={results.chartData}
                              innerRadius={80}
                              outerRadius={110}
                              paddingAngle={8}
                              dataKey="value"
                             >
                                {results.chartData.map((entry, index) => (
                                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                             </Pie>
                             <Tooltip />
                          </PieChart>
                       </ResponsiveContainer>
                    )}
                 </div>
                 
                 <div className="space-y-6">
                    <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700">
                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Principal</p>
                       <p className="text-2xl font-black text-gray-900 dark:text-white">${parseFloat(principal).toLocaleString()}</p>
                    </div>
                    <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-3xl border border-emerald-100 dark:border-emerald-800">
                       <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">Total Interest</p>
                       <p className="text-2xl font-black text-emerald-600">${results?.interest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                    </div>
                    <div className="p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-3xl border border-indigo-100 dark:border-indigo-800">
                       <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-1">Total Payoff</p>
                       <p className="text-2xl font-black text-indigo-600">${results?.total.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl text-indigo-600">
              <Calendar size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Term Flexibility</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Compare 15-year vs. 30-year mortgages instantly to see how term length impacts 
                your monthly budget and long-term interest costs.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl text-emerald-600">
              <Activity size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Interest Analysis</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Visualize the ratio of principal to interest payments with high-fidelity charts, 
                helping you make informed borrowing decisions.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-amber-50 dark:bg-amber-900/30 rounded-2xl text-amber-600">
              <DollarSign size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Precision Planning</h4>
              <p className="text-[11px] text-gray-500 leading-relaxed">
                Our calculator uses the standard amortization formula to provide bank-accurate 
                payment estimates for personal loans and mortgages.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
