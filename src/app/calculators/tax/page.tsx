"use client";

import React, { useState } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  Receipt, 
  DollarSign, 
  Percent, 
  BarChart, 
  PieChart as PieChartIcon,
  ShieldCheck,
  TrendingDown,
  Info
} from "lucide-react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

export default function TaxCalculator() {
  const tool = tools.find((t) => t.id === "tax-calculator")!;

  const [income, setIncome] = useState("75000");
  const [taxRate, setTaxRate] = useState("20");

  const taxableAmount = parseFloat(income) || 0;
  const taxAmount = (taxableAmount * (parseFloat(taxRate) || 0)) / 100;
  const takeHome = taxableAmount - taxAmount;

  const data = [
    { name: "Take Home", value: takeHome, color: "#4f46e5" },
    { name: "Tax Paid", value: taxAmount, color: "#ef4444" },
  ];

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Controls */}
          <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-10 border border-gray-100 dark:border-gray-800 shadow-xl space-y-8">
            <div className="space-y-6">
              <label className="block">
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 mb-2 block">Annual Income ($)</span>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="number"
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl py-4 pl-12 pr-6 outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-bold text-xl"
                  />
                </div>
              </label>

              <label className="block">
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 mb-2 block">Effective Tax Rate (%)</span>
                <div className="relative">
                  <Percent className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="number"
                    value={taxRate}
                    onChange={(e) => setTaxRate(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl py-4 pl-12 pr-6 outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-bold text-xl"
                  />
                </div>
              </label>
            </div>

            <div className="p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-3xl border border-indigo-100 dark:border-indigo-800/30 flex items-start gap-4">
              <Info className="text-indigo-600 flex-shrink-0" size={20} />
              <p className="text-xs text-indigo-800 dark:text-indigo-300 leading-relaxed font-medium">
                This is a general estimator. Local tax laws, deductions, and credits can significantly 
                impact your final tax liability. Please consult a professional.
              </p>
            </div>
          </div>

          {/* Visualization */}
          <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-10 border border-gray-100 dark:border-gray-800 shadow-xl flex flex-col items-center justify-center min-h-[400px] min-w-0">
             <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-8">Income Breakdown</h3>
             <div className="w-full h-64">
               <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                   <Pie
                     data={data}
                     cx="50%"
                     cy="50%"
                     innerRadius={60}
                     outerRadius={80}
                     paddingAngle={8}
                     dataKey="value"
                   >
                     {data.map((entry, index) => (
                       <Cell key={`cell-${index}`} fill={entry.color} />
                     ))}
                   </Pie>
                   <Tooltip />
                   <Legend verticalAlign="bottom" height={36}/>
                 </PieChart>
               </ResponsiveContainer>
             </div>
             <div className="mt-8 text-center px-4 w-full">
               <p className="text-2xl md:text-4xl font-black text-gray-900 dark:text-white break-all leading-tight">${takeHome.toLocaleString()}</p>
               <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500 mt-2">Net Take Home Pay</p>
             </div>
          </div>

        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-4 group hover:border-indigo-500 transition-all min-w-0">
             <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
               <Receipt size={24} />
             </div>
             <div className="min-w-0 overflow-hidden">
               <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Tax Amount</h4>
               <p className="text-xl md:text-3xl font-black text-gray-900 dark:text-white break-all">${taxAmount.toLocaleString()}</p>
             </div>
          </div>

          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-4 group hover:border-emerald-500 transition-all min-w-0">
             <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
               <DollarSign size={24} />
             </div>
             <div className="min-w-0 overflow-hidden">
               <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Take Home</h4>
               <p className="text-xl md:text-3xl font-black text-gray-900 dark:text-white break-all">${takeHome.toLocaleString()}</p>
             </div>
          </div>

          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-4 group hover:border-amber-500 transition-all min-w-0">
             <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-900/30 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
               <TrendingDown size={24} />
             </div>
             <div className="min-w-0 overflow-hidden">
               <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Effective Rate</h4>
               <p className="text-xl md:text-3xl font-black text-gray-900 dark:text-white break-all">{taxRate}%</p>
             </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
