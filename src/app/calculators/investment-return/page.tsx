"use client";

import React, { useState, useMemo } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  TrendingUp, 
  DollarSign, 
  Calendar, 
  BarChart, 
  ArrowUpRight, 
  Info,
  LineChart as LineIcon,
  PieChart as PieIcon,
  Target
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

export default function InvestmentReturnCalculator() {
  const tool = tools.find((t) => t.id === "investment-return")!;

  // State
  const [initialInvestment, setInitialInvestment] = useState<number>(10000);
  const [finalValue, setFinalValue] = useState<number>(25000);
  const [years, setYears] = useState<number>(5);

  // Calculations
  const results = useMemo(() => {
    const totalProfit = finalValue - initialInvestment;
    const totalROI = (totalProfit / initialInvestment) * 100;
    
    // CAGR Formula: [(Final Value / Initial Value) ^ (1 / Number of Years)] - 1
    const cagr = (Math.pow(finalValue / initialInvestment, 1 / years) - 1) * 100;

    // Chart Data (simulated linear growth with this CAGR)
    const chartData = [];
    for (let i = 0; i <= years; i++) {
      const yearValue = initialInvestment * Math.pow(1 + cagr / 100, i);
      chartData.push({
        year: `Year ${i}`,
        value: Math.round(yearValue),
      });
    }

    return {
      totalProfit,
      totalROI,
      cagr,
      chartData,
    };
  }, [initialInvestment, finalValue, years]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Input Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-900 rounded-[2rem] p-6 border border-gray-100 dark:border-gray-800 shadow-sm space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign size={16} className="text-indigo-600" />
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Initial Investment</label>
            </div>
            <input 
              type="number"
              value={initialInvestment}
              onChange={(e) => setInitialInvestment(Number(e.target.value))}
              className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800 rounded-2xl outline-none text-2xl font-black text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-600 transition-all"
            />
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-[2rem] p-6 border border-gray-100 dark:border-gray-800 shadow-sm space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Target size={16} className="text-emerald-600" />
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Final Value</label>
            </div>
            <input 
              type="number"
              value={finalValue}
              onChange={(e) => setFinalValue(Number(e.target.value))}
              className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800 rounded-2xl outline-none text-2xl font-black text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-600 transition-all"
            />
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-[2rem] p-6 border border-gray-100 dark:border-gray-800 shadow-sm space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Calendar size={16} className="text-orange-600" />
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Time Period (Years)</label>
            </div>
            <input 
              type="number"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800 rounded-2xl outline-none text-2xl font-black text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-600 transition-all"
            />
          </div>
        </div>

        {/* Results Visuals */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Chart */}
          <div className="lg:col-span-8 bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-black text-gray-900 dark:text-white flex items-center gap-2">
                <LineIcon size={20} className="text-indigo-600" />
                Growth Projection
              </h3>
            </div>
            <div className="flex-1 min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={results.chartData}>
                  <defs>
                    <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
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
                    stroke="#6366f1" 
                    strokeWidth={4} 
                    fillOpacity={1} 
                    fill="url(#colorVal)" 
                    animationDuration={1500}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Right Metrics */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-indigo-600 rounded-[2rem] p-8 text-white shadow-xl shadow-indigo-600/20">
              <p className="text-[10px] font-black text-indigo-200 uppercase tracking-widest mb-1">Total ROI</p>
              <h2 className="text-5xl font-black mb-2">{results.totalROI.toFixed(1)}%</h2>
              <p className="text-indigo-100 text-sm font-medium flex items-center gap-1">
                Profit: <span className="font-black">{formatCurrency(results.totalProfit)}</span>
              </p>
            </div>

            <div className="bg-emerald-500 rounded-[2rem] p-8 text-white shadow-xl shadow-emerald-600/20">
              <div className="flex items-center justify-between mb-1">
                <p className="text-[10px] font-black text-emerald-100 uppercase tracking-widest">Annual (CAGR)</p>
                <div className="p-1 bg-white/20 rounded-lg">
                  <TrendingUp size={14} />
                </div>
              </div>
              <h2 className="text-5xl font-black mb-2">{results.cagr.toFixed(2)}%</h2>
              <p className="text-emerald-50 text-xs leading-relaxed opacity-80">
                The annual return required to grow your investment to the final value.
              </p>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-indigo-50 dark:bg-indigo-900/10 rounded-3xl p-8 border border-indigo-100 dark:border-indigo-900/20">
            <h4 className="text-lg font-black text-indigo-900 dark:text-indigo-100 mb-4 flex items-center gap-2">
              <Info size={20} />
              ROI vs CAGR
            </h4>
            <p className="text-indigo-800/80 dark:text-indigo-200/80 leading-relaxed text-sm">
              **ROI (Return on Investment)** shows the total growth from start to finish. 
              **CAGR (Compound Annual Growth Rate)** provides the "smoothed" annual rate, 
              which is much better for comparing investments over different time periods.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 flex flex-col justify-center">
            <h4 className="font-black text-gray-900 dark:text-white mb-2">Did you know?</h4>
            <p className="text-sm text-gray-500 leading-relaxed italic">
              "Compound interest is the eighth wonder of the world. He who understands it, earns it; he who doesn't, pays it." 
              — Albert Einstein
            </p>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
