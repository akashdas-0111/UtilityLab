"use client";

import React, { useState, useMemo } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  Target, 
  DollarSign, 
  Calendar, 
  TrendingUp, 
  Info,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  BarChart as BarIcon
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine
} from "recharts";
import { motion } from "framer-motion";

export default function SavingsGoalCalculator() {
  const tool = tools.find((t) => t.id === "savings-goal")!;

  // State
  const [targetAmount, setTargetAmount] = useState<number>(10000);
  const [initialBalance, setInitialBalance] = useState<number>(1000);
  const [years, setYears] = useState<number>(3);
  const [rate, setRate] = useState<number>(5);

  // Calculations
  const results = useMemo(() => {
    const r = rate / 100 / 12;
    const n = years * 12;
    const FV = targetAmount;
    const PV = initialBalance;

    // Monthly Contribution Formula:
    // PMT = (FV - PV * (1+r)^n) / (((1+r)^n - 1) / r)
    const futureValueFromPV = PV * Math.pow(1 + r, n);
    const amountToSaveFromPMT = FV - futureValueFromPV;
    
    let monthlyNeeded = 0;
    if (r === 0) {
      monthlyNeeded = amountToSaveFromPMT / n;
    } else {
      monthlyNeeded = amountToSaveFromPMT / ((Math.pow(1 + r, n) - 1) / r);
    }

    // Chart Data
    const chartData = [];
    let currentBalance = PV;
    for (let m = 0; m <= n; m++) {
      if (m > 0) {
        currentBalance = currentBalance * (1 + r) + monthlyNeeded;
      }
      if (m % 3 === 0 || m === n) {
        chartData.push({
          month: `M${m}`,
          year: `Y${Math.floor(m/12)}`,
          balance: Math.round(currentBalance),
          target: targetAmount
        });
      }
    }

    return {
      monthlyNeeded: Math.max(0, monthlyNeeded),
      totalInterest: targetAmount - (PV + monthlyNeeded * n),
      chartData
    };
  }, [targetAmount, initialBalance, years, rate]);

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
        
        {/* Main Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Inputs Section */}
          <div className="space-y-8 bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
              <Target size={120} />
            </div>

            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg text-indigo-600">
                <ShieldCheck size={20} />
              </div>
              <h3 className="text-xl font-black text-gray-900 dark:text-white">Goal Details</h3>
            </div>

            <div className="space-y-4">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Target Amount</label>
              <div className="relative">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-black text-gray-300">$</div>
                <input 
                  type="number" value={targetAmount || ""} onChange={(e) => setTargetAmount(Number(e.target.value))}
                  className="w-full pl-12 pr-6 py-6 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-600 rounded-3xl outline-none text-3xl font-black text-gray-900 dark:text-white transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Initial Savings</label>
                <input type="number" value={initialBalance} onChange={(e) => setInitialBalance(Number(e.target.value))} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl outline-none text-sm font-bold" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Years to Reach</label>
                <input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl outline-none text-sm font-bold" />
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Expected APY (%)</label>
                <span className="text-sm font-black text-indigo-600">{rate}%</span>
              </div>
              <input type="range" min="0" max="20" step="0.5" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
            </div>
          </div>

          {/* Result Panel */}
          <div className="bg-indigo-600 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-indigo-600/20 flex flex-col justify-center items-center text-center space-y-6">
            <p className="text-xs font-bold opacity-80 uppercase tracking-[0.2em]">Monthly Contribution Needed</p>
            <div className="relative">
              <h2 className="text-8xl font-black tracking-tighter">{formatCurrency(results.monthlyNeeded)}</h2>
              <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-sm font-bold bg-white/20 px-3 py-1 rounded-full uppercase tracking-widest">Per Month</span>
            </div>
            
            <div className="pt-8 w-full max-w-xs space-y-4">
              <div className="flex items-center justify-between text-sm border-b border-white/10 pb-4">
                <span className="opacity-70 font-bold uppercase tracking-widest text-[10px]">Total Deposits</span>
                <span className="font-black">{formatCurrency(targetAmount - results.totalInterest)}</span>
              </div>
              <div className="flex items-center justify-between text-sm border-b border-white/10 pb-4">
                <span className="opacity-70 font-bold uppercase tracking-widest text-[10px]">Interest Earned</span>
                <span className="font-black text-emerald-300">+{formatCurrency(results.totalInterest)}</span>
              </div>
            </div>

            <p className="text-xs font-medium italic opacity-70">
              Interest will cover {((results.totalInterest / targetAmount) * 100).toFixed(1)}% of your goal!
            </p>
          </div>
        </div>

        {/* Projection Chart */}
        <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 md:p-10 border border-gray-100 dark:border-gray-800 shadow-sm">
          <h3 className="font-black text-gray-900 dark:text-white flex items-center gap-2 mb-8">
            <BarIcon size={20} className="text-indigo-600" />
            Goal Growth Projection
          </h3>
          <div className="h-[350px]">
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
                  dataKey="balance" 
                  stroke="#6366f1" 
                  strokeWidth={4} 
                  fillOpacity={1} 
                  fill="url(#colorVal)" 
                />
                <ReferenceLine y={targetAmount} stroke="#6366f1" strokeDasharray="5 5" label={{ position: 'top', value: 'TARGET', fill: '#6366f1', fontSize: 10, fontWeight: 900 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Action Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-emerald-50 dark:bg-emerald-900/10 rounded-3xl p-8 border border-emerald-100 dark:border-emerald-900/20 flex items-start gap-4">
            <div className="p-3 bg-emerald-500 text-white rounded-2xl">
              <Zap size={24} />
            </div>
            <div>
              <h4 className="font-black text-emerald-900 dark:text-emerald-100 mb-1">Boost Your Savings</h4>
              <p className="text-sm text-emerald-800/70 dark:text-emerald-200/70 leading-relaxed">
                Starting with a higher initial balance or finding a high-yield savings account (HYSA) can significantly 
                reduce your required monthly contribution.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl text-indigo-600">
              <Sparkles size={24} />
            </div>
            <div>
              <h4 className="font-black text-gray-900 dark:text-white mb-1">Stay Consistent</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Automating your savings is the best way to hit your goal. Set up a recurring transfer 
                for <span className="font-bold text-indigo-600">{formatCurrency(results.monthlyNeeded)}</span> on your payday.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
