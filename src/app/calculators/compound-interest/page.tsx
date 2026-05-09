"use client";

import React, { useState, useMemo } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  Coins, 
  TrendingUp, 
  Calendar, 
  Percent, 
  Info,
  ChevronDown,
  ChevronUp,
  PieChart as PieIcon,
  BarChart as BarIcon,
  PlusCircle
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";

export default function CompoundInterestCalculator() {
  const tool = tools.find((t) => t.id === "compound-interest")!;

  // State
  const [principal, setPrincipal] = useState<number>(10000);
  const [rate, setRate] = useState<number>(10);
  const [years, setYears] = useState<number>(10);
  const [frequency, setFrequency] = useState<number>(12); // Compounding frequency per year
  const [monthlyContribution, setMonthlyContribution] = useState<number>(500);

  // Calculations
  const results = useMemo(() => {
    const r = rate / 100;
    const n = frequency;
    const t = years;
    const PMT = monthlyContribution;

    // Formula with monthly contributions:
    // A = P(1 + r/n)^(nt) + PMT * [((1 + r/n)^(nt) - 1) / (r/n)]
    // Note: This assumes contribution at the end of each period (month).
    // For simplicity, we adjust 'n' for the contribution part if n != 12, 
    // but here we'll assume PMT is monthly.
    
    const chartData = [];
    let currentBalance = principal;
    let totalInvested = principal;

    for (let year = 0; year <= years; year++) {
      if (year > 0) {
        // We calculate year by year to get chart points
        // For each month in the year:
        for (let m = 1; m <= 12; m++) {
          // Add monthly contribution
          currentBalance += PMT;
          totalInvested += PMT;
          
          // Apply interest (if compounding is monthly or more frequent)
          // To be precise with any 'n', we use the effective monthly rate
          const monthlyRate = Math.pow(1 + r/n, n/12) - 1;
          currentBalance *= (1 + monthlyRate);
        }
      }
      
      chartData.push({
        year: `Year ${year}`,
        invested: Math.round(totalInvested),
        total: Math.round(currentBalance),
        interest: Math.round(currentBalance - totalInvested)
      });
    }

    const finalValue = currentBalance;
    const totalInterest = finalValue - totalInvested;

    return {
      finalValue,
      totalInvested,
      totalInterest,
      chartData
    };
  }, [principal, rate, years, frequency, monthlyContribution]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const pieData = [
    { name: "Principal", value: principal, color: "#6366f1" },
    { name: "Contributions", value: results.totalInvested - principal, color: "#8b5cf6" },
    { name: "Total Interest", value: results.totalInterest, color: "#10b981" },
  ];

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Main Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Inputs Section */}
          <div className="space-y-8 bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg text-indigo-600">
                <Coins size={20} />
              </div>
              <h3 className="text-xl font-black text-gray-900 dark:text-white">Initial Setup</h3>
            </div>

            {/* Principal */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Initial Investment</label>
                <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 px-3 py-1.5 rounded-xl border border-gray-100 dark:border-gray-700">
                  <span className="text-xs font-bold text-gray-400">$</span>
                  <input 
                    type="number"
                    value={principal}
                    onChange={(e) => setPrincipal(Number(e.target.value))}
                    className="w-24 bg-transparent outline-none text-sm font-black text-indigo-600"
                  />
                </div>
              </div>
              <input type="range" min="1000" max="1000000" step="1000" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
            </div>

            {/* Monthly Contribution */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <PlusCircle size={14} className="text-indigo-400" /> Monthly Contribution
                </label>
                <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 px-3 py-1.5 rounded-xl border border-gray-100 dark:border-gray-700">
                  <span className="text-xs font-bold text-gray-400">$</span>
                  <input 
                    type="number"
                    value={monthlyContribution}
                    onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                    className="w-20 bg-transparent outline-none text-sm font-black text-indigo-600"
                  />
                </div>
              </div>
              <input type="range" min="0" max="50000" step="100" value={monthlyContribution} onChange={(e) => setMonthlyContribution(Number(e.target.value))} className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Interest Rate (%)</label>
                <input 
                  type="number" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl outline-none text-sm font-bold text-indigo-600"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Years</label>
                <input 
                  type="number" value={years} onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl outline-none text-sm font-bold text-indigo-600"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Compounding Frequency</label>
              <select 
                value={frequency}
                onChange={(e) => setFrequency(Number(e.target.value))}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl outline-none text-sm font-bold"
              >
                <option value={1}>Yearly</option>
                <option value={2}>Semi-Annually</option>
                <option value={4}>Quarterly</option>
                <option value={12}>Monthly</option>
                <option value={365}>Daily</option>
              </select>
            </div>
          </div>

          {/* Visualization Section */}
          <div className="flex flex-col bg-indigo-600 rounded-[2.5rem] p-10 text-white shadow-xl shadow-indigo-600/20">
            <div className="text-center space-y-2 mb-10">
              <p className="text-xs font-bold text-indigo-200 uppercase tracking-widest">Estimated Future Value</p>
              <h2 className="text-6xl font-black">{formatCurrency(results.finalValue)}</h2>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="p-4 bg-white/10 rounded-2xl border border-white/10">
                <p className="text-[10px] font-bold text-indigo-100 uppercase tracking-widest mb-1">Total Invested</p>
                <p className="text-xl font-black">{formatCurrency(results.totalInvested)}</p>
              </div>
              <div className="p-4 bg-white/10 rounded-2xl border border-white/10">
                <p className="text-[10px] font-bold text-indigo-100 uppercase tracking-widest mb-1">Total Interest</p>
                <p className="text-xl font-black">{formatCurrency(results.totalInterest)}</p>
              </div>
            </div>

            <div className="flex-1 min-h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', color: '#000' }} formatter={(v: number) => formatCurrency(v)}/>
                  <Legend verticalAlign="bottom" wrapperStyle={{ paddingTop: '20px', color: '#fff' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Growth Chart */}
        <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 md:p-10 border border-gray-100 dark:border-gray-800 shadow-sm">
          <h3 className="font-black text-gray-900 dark:text-white flex items-center gap-2 mb-8">
            <BarIcon size={20} className="text-indigo-600" />
            Growth Projection Over Time
          </h3>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={results.chartData}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
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
                  dataKey="total" 
                  stroke="#6366f1" 
                  strokeWidth={4} 
                  fillOpacity={1} 
                  fill="url(#colorTotal)" 
                  name="Future Value"
                />
                <Area 
                  type="monotone" 
                  dataKey="invested" 
                  stroke="#10b981" 
                  strokeWidth={2} 
                  fillOpacity={0} 
                  name="Invested Amount"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-indigo-50 dark:bg-indigo-900/10 rounded-3xl p-8 border border-indigo-100 dark:border-indigo-900/20">
            <h4 className="text-lg font-black text-indigo-900 dark:text-indigo-100 mb-4 flex items-center gap-2">
              <Info size={20} />
              What is Compounding?
            </h4>
            <p className="text-indigo-800/80 dark:text-indigo-200/80 leading-relaxed text-sm">
              Compounding is the process where the value of an investment increases because the earnings on an investment, both capital gains and interest, earn interest as time passes. 
              The more frequent the compounding frequency, the higher the final return.
            </p>
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-900/10 rounded-3xl p-8 border border-emerald-100 dark:border-emerald-900/20">
            <h4 className="text-lg font-black text-emerald-900 dark:text-emerald-100 mb-4 flex items-center gap-2">
              <TrendingUp size={20} />
              Power of Regular Saving
            </h4>
            <p className="text-emerald-800/80 dark:text-emerald-200/80 leading-relaxed text-sm">
              Even small monthly contributions can lead to massive wealth over decades. 
              Consistency is often more important than the initial amount invested when it comes to the magic of compound interest.
            </p>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
