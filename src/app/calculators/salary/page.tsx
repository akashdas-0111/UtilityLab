"use client";

import React, { useState, useMemo } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  Wallet, 
  Clock, 
  Calendar, 
  Briefcase, 
  BarChart3,
  ArrowRight,
  Info,
  Settings2
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";

type PayPeriod = "hourly" | "daily" | "weekly" | "biweekly" | "monthly" | "yearly";

export default function SalaryCalculator() {
  const tool = tools.find((t) => t.id === "salary-calculator")!;

  // State
  const [salary, setSalary] = useState<number>(50000);
  const [period, setPeriod] = useState<PayPeriod>("yearly");
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(40);
  const [daysPerWeek, setDaysPerWeek] = useState<number>(5);
  const [weeksPerYear, setWeeksPerYear] = useState<number>(52);
  const [showSettings, setShowSettings] = useState(false);

  // Calculations
  const breakdown = useMemo(() => {
    let annual = 0;

    switch (period) {
      case "hourly": annual = salary * hoursPerWeek * weeksPerYear; break;
      case "daily": annual = salary * daysPerWeek * weeksPerYear; break;
      case "weekly": annual = salary * weeksPerYear; break;
      case "biweekly": annual = salary * (weeksPerYear / 2); break;
      case "monthly": annual = salary * 12; break;
      case "yearly": annual = salary; break;
    }

    const hourly = annual / (weeksPerYear * hoursPerWeek);
    const daily = annual / (weeksPerYear * daysPerWeek);
    const weekly = annual / weeksPerYear;
    const biweekly = annual / (weeksPerYear / 2);
    const monthly = annual / 12;

    const data = [
      { name: "Hourly", value: hourly, color: "#6366f1" },
      { name: "Daily", value: daily, color: "#8b5cf6" },
      { name: "Weekly", value: weekly, color: "#a855f7" },
      { name: "Bi-Weekly", value: biweekly, color: "#d946ef" },
      { name: "Monthly", value: monthly, color: "#ec4899" },
      { name: "Yearly", value: annual, color: "#f43f5e" },
    ];

    return {
      annual, monthly, biweekly, weekly, daily, hourly, data
    };
  }, [salary, period, hoursPerWeek, daysPerWeek, weeksPerYear]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: value < 100 ? 2 : 0,
    }).format(value);
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Input Card */}
        <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            
            <div className="lg:col-span-4 space-y-3">
              <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Salary Amount</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 font-bold">$</div>
                <input 
                  type="number"
                  value={salary || ""}
                  onChange={(e) => setSalary(Number(e.target.value))}
                  className="w-full pl-8 pr-4 py-4 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-600 rounded-2xl outline-none text-xl font-black text-gray-900 dark:text-white transition-all"
                />
              </div>
            </div>

            <div className="lg:col-span-3 space-y-3">
              <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Per Period</label>
              <select 
                value={period}
                onChange={(e) => setPeriod(e.target.value as PayPeriod)}
                className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-600 rounded-2xl outline-none text-lg font-bold text-gray-900 dark:text-white appearance-none cursor-pointer"
              >
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="biweekly">Bi-Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>

            <div className="lg:col-span-3 space-y-3">
              <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Hours / Week</label>
              <input 
                type="number"
                value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-600 rounded-2xl outline-none text-lg font-bold text-gray-900 dark:text-white"
              />
            </div>

            <div className="lg:col-span-2">
              <button 
                onClick={() => setShowSettings(!showSettings)}
                className={`w-full py-4 rounded-2xl border-2 flex items-center justify-center gap-2 transition-all ${showSettings ? "bg-indigo-600 border-indigo-600 text-white" : "bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 text-gray-400 hover:border-indigo-600 hover:text-indigo-600"}`}
              >
                <Settings2 size={20} />
                <span className="font-bold text-xs uppercase">Settings</span>
              </button>
            </div>
          </div>

          <AnimatePresence>
            {showSettings && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 mt-8 border-t border-gray-50 dark:border-gray-800/50">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-bold text-gray-500">Days per week</label>
                      <span className="text-sm font-black text-indigo-600">{daysPerWeek}</span>
                    </div>
                    <input type="range" min="1" max="7" value={daysPerWeek} onChange={(e) => setDaysPerWeek(Number(e.target.value))} className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-bold text-gray-500">Working weeks per year</label>
                      <span className="text-sm font-black text-indigo-600">{weeksPerYear}</span>
                    </div>
                    <input type="range" min="1" max="52" value={weeksPerYear} onChange={(e) => setWeeksPerYear(Number(e.target.value))} className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Visual */}
          <div className="lg:col-span-8 bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col">
            <h3 className="font-black text-gray-900 dark:text-white flex items-center gap-2 mb-8">
              <BarChart3 size={20} className="text-indigo-600" />
              Income Distribution
            </h3>
            <div className="flex-1 min-h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={breakdown.data.slice(0, 5)}> {/* Hide yearly to keep scale sensible */}
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 700 }} dy={10} />
                  <YAxis hide />
                  <Tooltip 
                    cursor={{ fill: 'transparent' }}
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                    formatter={(value: number) => formatCurrency(value)}
                  />
                  <Bar dataKey="value" radius={[12, 12, 12, 12]} barSize={40}>
                    {breakdown.data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-6 p-6 bg-indigo-50 dark:bg-indigo-900/10 rounded-3xl border border-indigo-100/50 dark:border-indigo-900/20 flex items-center justify-between">
               <div>
                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Estimated Annual Salary</p>
                <h4 className="text-3xl font-black text-indigo-600 dark:text-indigo-400">{formatCurrency(breakdown.annual)}</h4>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Take-home (Monthly)</p>
                <h4 className="text-2xl font-black text-gray-900 dark:text-white">{formatCurrency(breakdown.monthly)}</h4>
              </div>
            </div>
          </div>

          {/* Quick Breakdown */}
          <div className="lg:col-span-4 space-y-4">
            {breakdown.data.map((item, idx) => (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                key={item.name}
                className="bg-white dark:bg-gray-900 p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm group hover:border-indigo-600/50 transition-all cursor-default"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-xs font-black text-gray-400 uppercase tracking-widest">{item.name}</span>
                  </div>
                  <ArrowRight size={14} className="text-gray-200 group-hover:text-indigo-600 transition-colors" />
                </div>
                <p className="text-xl font-black text-gray-900 dark:text-white">{formatCurrency(item.value)}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-3xl p-8 border border-gray-100 dark:border-gray-800">
            <h4 className="font-black text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Info size={18} className="text-indigo-600" />
              Standard Assumptions
            </h4>
            <p className="text-sm text-gray-500 leading-relaxed">
              This calculator assumes 52 weeks in a year and standard working hours. 
              The results are gross income figures and do not include taxes, insurance, or other deductions.
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-3xl p-8 border border-gray-100 dark:border-gray-800">
            <h4 className="font-black text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Clock size={18} className="text-indigo-600" />
              Hours Matter
            </h4>
            <p className="text-sm text-gray-500 leading-relaxed">
              When comparing hourly pay to annual salary, the number of hours worked per week significantly 
              impacts the final result. A "40-hour week" is the global standard for full-time employment.
            </p>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
