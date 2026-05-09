"use client";

import React, { useState, useMemo } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  ArrowUpRight, 
  DollarSign, 
  Calendar, 
  TrendingUp, 
  Info,
  ShieldAlert,
  ArrowDownRight,
  TrendingDown
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { motion } from "framer-motion";

export default function InflationCalculator() {
  const tool = tools.find((t) => t.id === "inflation-calc")!;

  // State
  const [amount, setAmount] = useState<number>(1000);
  const [rate, setRate] = useState<number>(4);
  const [years, setYears] = useState<number>(10);
  const [direction, setDirection] = useState<"future" | "past">("future");

  // Calculations
  const results = useMemo(() => {
    let finalValue = 0;
    const r = rate / 100;
    
    if (direction === "future") {
      // How much X will buy in the future?
      // P = A / (1+r)^t
      finalValue = amount / Math.pow(1 + r, years);
    } else {
      // How much X in the past is worth today?
      // A = P * (1+r)^t
      finalValue = amount * Math.pow(1 + r, years);
    }

    const chartData = [];
    for (let i = 0; i <= years; i++) {
      const val = direction === "future" 
        ? amount / Math.pow(1 + r, i)
        : amount * Math.pow(1 + r, i);
      chartData.push({
        year: direction === "future" ? `+${i} Yrs` : `-${i} Yrs`,
        value: Math.round(val),
      });
    }

    return {
      finalValue,
      loss: direction === "future" ? amount - finalValue : finalValue - amount,
      chartData
    };
  }, [amount, rate, years, direction]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Inputs Section */}
          <div className="space-y-8 bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 md:p-10 border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
              <TrendingDown size={120} />
            </div>

            <div className="flex bg-gray-50 dark:bg-gray-800 p-1.5 rounded-2xl border border-gray-100 dark:border-gray-700 relative z-10">
              <button 
                onClick={() => setDirection("future")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-black text-xs transition-all ${direction === "future" ? "bg-white dark:bg-gray-700 shadow-lg text-indigo-600" : "text-gray-400"}`}
              >
                <ArrowUpRight size={16} /> Future Value
              </button>
              <button 
                onClick={() => setDirection("past")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-black text-xs transition-all ${direction === "past" ? "bg-white dark:bg-gray-700 shadow-lg text-emerald-600" : "text-gray-400"}`}
              >
                <ArrowDownRight size={16} /> Past Value
              </button>
            </div>

            <div className="space-y-4">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Current Amount</label>
              <div className="relative">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-black text-gray-300">$</div>
                <input 
                  type="number" value={amount || ""} onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full pl-12 pr-6 py-6 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-600 rounded-3xl outline-none text-3xl font-black text-gray-900 dark:text-white transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Inflation Rate (%)</label>
                <input 
                  type="number" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl outline-none text-sm font-bold text-indigo-600"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Time (Years)</label>
                <input 
                  type="number" value={years} onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl outline-none text-sm font-bold text-indigo-600"
                />
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className={`rounded-[2.5rem] p-10 text-white shadow-2xl flex flex-col justify-between transition-colors ${direction === 'future' ? 'bg-rose-500 shadow-rose-500/20' : 'bg-emerald-500 shadow-emerald-500/20'}`}>
            <div className="space-y-2 text-center">
              <p className="text-xs font-bold opacity-80 uppercase tracking-widest">
                {direction === "future" ? "Equivalent Value in ${years} Years" : "Required in the past for same value"}
              </p>
              <h2 className="text-6xl font-black">{formatCurrency(results.finalValue)}</h2>
            </div>

            <div className="mt-8 space-y-4">
               <div className="flex items-center justify-between bg-white/10 p-5 rounded-2xl border border-white/10">
                <p className="text-xs font-bold uppercase tracking-widest opacity-80">
                  {direction === "future" ? "Purchasing Power Loss" : "Price Increase"}
                </p>
                <h4 className="text-xl font-black">{formatCurrency(results.loss)}</h4>
              </div>
              <p className="text-xs text-center opacity-80 font-medium italic">
                {direction === "future" 
                  ? `${formatCurrency(amount)} today will buy what ${formatCurrency(results.finalValue)} buys in ${years} years.`
                  : `${formatCurrency(results.finalValue)} today is equivalent to ${formatCurrency(amount)} from ${years} years ago.`}
              </p>
            </div>
          </div>
        </div>

        {/* Growth Chart */}
        <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 md:p-10 border border-gray-100 dark:border-gray-800 shadow-sm">
          <h3 className="font-black text-gray-900 dark:text-white flex items-center gap-2 mb-8">
            <TrendingUp size={20} className="text-indigo-600" />
            Purchasing Power Projection
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={results.chartData}>
                <defs>
                  <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={direction === 'future' ? '#f43f5e' : '#10b981'} stopOpacity={0.1}/>
                    <stop offset="95%" stopColor={direction === 'future' ? '#f43f5e' : '#10b981'} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 700 }} dy={10} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: number) => formatCurrency(value)}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke={direction === 'future' ? '#f43f5e' : '#10b981'} 
                  strokeWidth={4} 
                  fillOpacity={1} 
                  fill="url(#colorVal)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl text-indigo-600">
              <ShieldAlert size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-gray-900 dark:text-white">Why it matters?</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Inflation is the silent thief of wealth. If your savings interest rate is lower than the inflation rate, 
                you are effectively losing money over time even if your balance increases.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-amber-50 dark:bg-amber-900/30 rounded-2xl text-amber-600">
              <Info size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-gray-900 dark:text-white">Target Inflation</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Most central banks aim for a target inflation rate of around 2%. This is considered healthy for an economy 
                as it encourages spending and investment rather than hoarding cash.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
