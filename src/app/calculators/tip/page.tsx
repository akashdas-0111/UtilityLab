"use client";

import React, { useState, useMemo } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  DollarSign, 
  Users, 
  Percent, 
  Receipt,
  Utensils,
  Plus,
  Minus,
  Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function TipCalculator() {
  const tool = tools.find((t) => t.id === "tip-calculator")!;

  // State
  const [billAmount, setBillAmount] = useState<number>(100);
  const [tipPercent, setTipPercent] = useState<number>(15);
  const [people, setPeople] = useState<number>(2);

  // Calculations
  const results = useMemo(() => {
    const totalTip = (billAmount * tipPercent) / 100;
    const totalBill = billAmount + totalTip;
    const perPersonBill = totalBill / people;
    const perPersonTip = totalTip / people;

    return {
      totalTip,
      totalBill,
      perPersonBill,
      perPersonTip
    };
  }, [billAmount, tipPercent, people]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  return (
    <ToolLayout tool={tool}>
      <div className="max-w-2xl mx-auto space-y-10">
        
        {/* Main Card */}
        <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-8 md:p-12 border border-gray-100 dark:border-gray-800 shadow-2xl shadow-indigo-600/5">
          <div className="space-y-10">
            
            {/* Bill Amount Input */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <Receipt className="text-indigo-600" size={20} />
                <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Bill Total</label>
              </div>
              <div className="relative group">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-3xl font-black text-gray-300 group-focus-within:text-indigo-600 transition-colors">$</div>
                <input 
                  type="number"
                  value={billAmount || ""}
                  onChange={(e) => setBillAmount(Number(e.target.value))}
                  placeholder="0.00"
                  className="w-full pl-12 pr-6 py-8 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-600 rounded-3xl outline-none text-5xl font-black text-gray-900 dark:text-white transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Tip Percentage */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <Percent className="text-indigo-600" size={18} />
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Tip Percentage</label>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[10, 15, 20].map(pct => (
                    <button 
                      key={pct}
                      onClick={() => setTipPercent(pct)}
                      className={`py-3 rounded-2xl font-black text-sm transition-all ${tipPercent === pct ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 scale-105" : "bg-gray-50 dark:bg-gray-800 text-gray-500 hover:bg-gray-100"}`}
                    >
                      {pct}%
                    </button>
                  ))}
                </div>
                <div className="relative mt-2">
                  <input 
                    type="number"
                    value={tipPercent}
                    onChange={(e) => setTipPercent(Number(e.target.value))}
                    className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 rounded-2xl outline-none text-lg font-black text-indigo-600 text-center"
                    placeholder="Custom %"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">%</div>
                </div>
              </div>

              {/* Number of People */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <Users className="text-indigo-600" size={18} />
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Split Between</label>
                </div>
                <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-2 rounded-2xl">
                  <button 
                    onClick={() => setPeople(Math.max(1, people - 1))}
                    className="p-3 bg-white dark:bg-gray-700 rounded-xl shadow-sm hover:scale-110 active:scale-95 transition-transform text-indigo-600"
                  >
                    <Minus size={20} />
                  </button>
                  <span className="text-3xl font-black text-gray-900 dark:text-white">{people}</span>
                  <button 
                    onClick={() => setPeople(people + 1)}
                    className="p-3 bg-white dark:bg-gray-700 rounded-xl shadow-sm hover:scale-110 active:scale-95 transition-transform text-indigo-600"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-widest">{people === 1 ? "Just you" : `${people} People`}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className="bg-indigo-600 rounded-[3rem] p-10 text-white shadow-2xl shadow-indigo-600/30 overflow-hidden relative group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
            <Utensils size={120} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
            <div className="space-y-1 text-center md:text-left">
              <p className="text-indigo-200 font-bold uppercase tracking-widest text-xs">Tip / Person</p>
              <h2 className="text-5xl font-black">{formatCurrency(results.perPersonTip)}</h2>
              <div className="pt-4 space-y-1 opacity-60">
                <p className="text-[10px] font-bold uppercase">Total Tip: {formatCurrency(results.totalTip)}</p>
              </div>
            </div>

            <div className="space-y-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                <p className="text-indigo-200 font-bold uppercase tracking-widest text-xs">Total / Person</p>
                <Sparkles size={14} className="text-amber-300 animate-pulse" />
              </div>
              <h2 className="text-6xl font-black text-amber-300">{formatCurrency(results.perPersonBill)}</h2>
              <div className="pt-4 space-y-1 opacity-60">
                <p className="text-[10px] font-bold uppercase">Grand Total: {formatCurrency(results.totalBill)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Informational Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-2xl text-blue-600">
              <Info size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-gray-900 dark:text-white">Tipping Standards</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Standard tipping ranges from 15% for good service to 20%+ for exceptional service. 
                In many countries, service charges are already included in the bill.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-amber-50 dark:bg-amber-900/30 rounded-2xl text-amber-600">
              <Sparkles size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-gray-900 dark:text-white">Pro Tip</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Always double-check if "Gratuity" or "Service Charge" is already added to your bill 
                before calculating an additional tip.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
