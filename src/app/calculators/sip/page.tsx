"use client";

import React, { useState, useMemo } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  TrendingUp, 
  DollarSign, 
  Calendar, 
  Percent, 
  ArrowUpRight, 
  Info,
  ChevronDown,
  ChevronUp,
  PieChart as PieIcon,
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
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";

export default function SIPCalculator() {
  const tool = tools.find((t) => t.id === "sip-calculator")!;

  // State
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(5000);
  const [returnRate, setReturnRate] = useState<number>(12);
  const [years, setYears] = useState<number>(10);
  const [showBreakdown, setShowBreakdown] = useState(false);

  // Calculations
  const results = useMemo(() => {
    const i = returnRate / 100 / 12; // Monthly rate
    const n = years * 12; // Total months
    const investedAmount = monthlyInvestment * n;
    
    // SIP Formula: M = P × ({[1 + i]^n – 1} / i) × (1 + i)
    const totalValue = monthlyInvestment * (((Math.pow(1 + i, n) - 1) / i) * (1 + i));
    const estimatedReturns = totalValue - investedAmount;

    // Generate Chart Data
    const chartData = [];
    for (let year = 1; year <= years; year++) {
      const months = year * 12;
      const yearInvested = monthlyInvestment * months;
      const yearValue = monthlyInvestment * (((Math.pow(1 + i, months) - 1) / i) * (1 + i));
      chartData.push({
        year: `Year ${year}`,
        invested: Math.round(yearInvested),
        returns: Math.round(yearValue - yearInvested),
        total: Math.round(yearValue),
      });
    }

    return {
      investedAmount,
      estimatedReturns,
      totalValue,
      chartData,
    };
  }, [monthlyInvestment, returnRate, years]);

  const pieData = [
    { name: "Invested Amount", value: results.investedAmount, color: "#6366f1" },
    { name: "Estimated Returns", value: results.estimatedReturns, color: "#10b981" },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Main Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Inputs Section */}
          <div className="space-y-8 bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg text-indigo-600">
                <TrendingUp size={20} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Investment Details</h3>
            </div>

            {/* Monthly Investment */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-gray-600 dark:text-gray-400">Monthly Investment</label>
                <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 px-3 py-1.5 rounded-xl border border-gray-100 dark:border-gray-700">
                  <span className="text-xs font-bold text-gray-400">₹</span>
                  <input 
                    type="number"
                    value={monthlyInvestment}
                    onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                    className="w-24 bg-transparent outline-none text-sm font-black text-indigo-600"
                  />
                </div>
              </div>
              <input 
                type="range"
                min="500"
                max="100000"
                step="500"
                value={monthlyInvestment}
                onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                <span>₹500</span>
                <span>₹1L</span>
              </div>
            </div>

            {/* Expected Return Rate */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-gray-600 dark:text-gray-400">Expected Return Rate (p.a)</label>
                <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 px-3 py-1.5 rounded-xl border border-gray-100 dark:border-gray-700">
                  <input 
                    type="number"
                    value={returnRate}
                    onChange={(e) => setReturnRate(Number(e.target.value))}
                    className="w-16 bg-transparent outline-none text-sm font-black text-indigo-600 text-right"
                  />
                  <span className="text-xs font-bold text-gray-400">%</span>
                </div>
              </div>
              <input 
                type="range"
                min="1"
                max="30"
                step="0.5"
                value={returnRate}
                onChange={(e) => setReturnRate(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                <span>1%</span>
                <span>30%</span>
              </div>
            </div>

            {/* Time Period */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-gray-600 dark:text-gray-400">Time Period (Years)</label>
                <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 px-3 py-1.5 rounded-xl border border-gray-100 dark:border-gray-700">
                  <input 
                    type="number"
                    value={years}
                    onChange={(e) => setYears(Number(e.target.value))}
                    className="w-12 bg-transparent outline-none text-sm font-black text-indigo-600 text-right"
                  />
                  <span className="text-xs font-bold text-gray-400">Yr</span>
                </div>
              </div>
              <input 
                type="range"
                min="1"
                max="40"
                step="1"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                <span>1 Yr</span>
                <span>40 Yr</span>
              </div>
            </div>

            {/* Results Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-800">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Invested</p>
                <p className="text-lg font-black text-gray-900 dark:text-white">{formatCurrency(results.investedAmount)}</p>
              </div>
              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/10 rounded-2xl border border-emerald-100/50 dark:border-emerald-900/20">
                <p className="text-[10px] font-bold text-emerald-600/70 dark:text-emerald-400/70 uppercase tracking-widest mb-1">Returns</p>
                <p className="text-lg font-black text-emerald-600 dark:text-emerald-400">{formatCurrency(results.estimatedReturns)}</p>
              </div>
              <div className="p-4 bg-indigo-50 dark:bg-indigo-900/10 rounded-2xl border border-indigo-100/50 dark:border-indigo-900/20">
                <p className="text-[10px] font-bold text-indigo-600/70 dark:text-indigo-400/70 uppercase tracking-widest mb-1">Total Value</p>
                <p className="text-lg font-black text-indigo-600 dark:text-indigo-400">{formatCurrency(results.totalValue)}</p>
              </div>
            </div>
          </div>

          {/* Visuals Section */}
          <div className="space-y-6 flex flex-col">
            {/* Pie Chart Card */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <PieIcon size={18} className="text-indigo-600" />
                  Portfolio Allocation
                </h3>
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
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: number) => formatCurrency(value)}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    />
                    <Legend verticalAlign="bottom" height={36}/>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Growth Chart Card */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <BarIcon size={18} className="text-indigo-600" />
                  Wealth Projection
                </h3>
              </div>
              <div className="flex-1 min-h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={results.chartData}>
                    <defs>
                      <linearGradient id="colorInvested" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorTotal" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis 
                      dataKey="year" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 10, fontWeight: 600 }} 
                      dy={10}
                    />
                    <YAxis 
                      hide
                    />
                    <Tooltip 
                      formatter={(value: number) => formatCurrency(value)}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="invested" 
                      stroke="#6366f1" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorInvested)" 
                      name="Invested"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="total" 
                      stroke="#10b981" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorTotal)" 
                      name="Total Value"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Yearly Breakdown Section */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
          <button 
            onClick={() => setShowBreakdown(!showBreakdown)}
            className="w-full flex items-center justify-between p-6 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-50 dark:bg-orange-900/30 rounded-lg text-orange-600">
                <Calendar size={20} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Yearly Breakdown</h3>
            </div>
            {showBreakdown ? <ChevronUp /> : <ChevronDown />}
          </button>

          <AnimatePresence>
            {showBreakdown && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-6 pt-0 overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-gray-100 dark:border-gray-800">
                        <th className="pb-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Year</th>
                        <th className="pb-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Invested Amount</th>
                        <th className="pb-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Est. Returns</th>
                        <th className="pb-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Total Value</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
                      {results.chartData.map((row, idx) => (
                        <tr key={idx} className="group hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                          <td className="py-4 text-sm font-bold text-gray-900 dark:text-white">{row.year}</td>
                          <td className="py-4 text-sm text-gray-600 dark:text-gray-400 font-medium">{formatCurrency(row.invested)}</td>
                          <td className="py-4 text-sm text-emerald-600 dark:text-emerald-400 font-bold">{formatCurrency(row.returns)}</td>
                          <td className="py-4 text-sm font-black text-gray-900 dark:text-white">{formatCurrency(row.total)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Informational Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-indigo-50 dark:bg-indigo-900/10 rounded-3xl p-8 border border-indigo-100 dark:border-indigo-900/20">
            <h4 className="text-lg font-black text-indigo-900 dark:text-indigo-100 mb-4 flex items-center gap-2">
              <Info size={20} />
              What is SIP?
            </h4>
            <p className="text-indigo-800/80 dark:text-indigo-200/80 leading-relaxed text-sm">
              A Systematic Investment Plan (SIP) is a disciplined way of investing in mutual funds. 
              Instead of a lump sum, you invest a fixed amount regularly (monthly/quarterly). 
              This allows you to take advantage of rupee cost averaging and the power of compounding.
            </p>
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-900/10 rounded-3xl p-8 border border-emerald-100 dark:border-emerald-900/20">
            <h4 className="text-lg font-black text-emerald-900 dark:text-emerald-100 mb-4 flex items-center gap-2">
              <ArrowUpRight size={20} />
              Compounding Power
            </h4>
            <p className="text-emerald-800/80 dark:text-emerald-200/80 leading-relaxed text-sm">
              Compounding happens when the returns on your investment start generating their own returns. 
              Over long periods, this creates a snowball effect, significantly increasing your wealth. 
              Starting early is more important than the amount you invest.
            </p>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
