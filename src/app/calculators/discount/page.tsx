"use client";

import React, { useState, useMemo } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  Tag, 
  DollarSign, 
  Percent, 
  Sparkles, 
  Info,
  ChevronDown,
  ChevronUp,
  ShoppingBag,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function DiscountCalculator() {
  const tool = tools.find((t) => t.id === "discount-calc")!;

  // State
  const [originalPrice, setOriginalPrice] = useState<number>(100);
  const [discount1, setDiscount1] = useState<number>(20);
  const [discount2, setDiscount2] = useState<number>(0);
  const [tax, setTax] = useState<number>(0);

  // Calculations
  const results = useMemo(() => {
    const d1Amount = (originalPrice * discount1) / 100;
    const priceAfterD1 = originalPrice - d1Amount;
    
    const d2Amount = (priceAfterD1 * discount2) / 100;
    const priceAfterD2 = priceAfterD1 - d2Amount;
    
    const totalSavings = d1Amount + d2Amount;
    const taxAmount = (priceAfterD2 * tax) / 100;
    const finalPrice = priceAfterD2 + taxAmount;

    return {
      totalSavings,
      finalPrice,
      savingsPercent: (totalSavings / originalPrice) * 100,
      taxAmount,
      priceBeforeTax: priceAfterD2
    };
  }, [originalPrice, discount1, discount2, tax]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(val);
  };

  return (
    <ToolLayout tool={tool}>
      <div className="max-w-2xl mx-auto space-y-10">
        
        {/* Main Interface */}
        <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 md:p-10 border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
            <Tag size={120} />
          </div>

          <div className="space-y-8 relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg text-indigo-600">
                <ShoppingBag size={20} />
              </div>
              <h3 className="text-xl font-black text-gray-900 dark:text-white">Price & Discounts</h3>
            </div>

            {/* Original Price */}
            <div className="space-y-4">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Original Price</label>
              <div className="relative">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-black text-gray-300">$</div>
                <input 
                  type="number" value={originalPrice || ""} onChange={(e) => setOriginalPrice(Number(e.target.value))}
                  className="w-full pl-12 pr-6 py-6 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-600 rounded-3xl outline-none text-4xl font-black text-gray-900 dark:text-white transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Primary Discount */}
              <div className="space-y-4">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                   <Percent size={14} /> Discount (%)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[10, 25, 50].map(d => (
                    <button key={d} onClick={() => setDiscount1(d)} className={`py-3 rounded-xl font-black text-xs transition-all ${discount1 === d ? "bg-indigo-600 text-white" : "bg-gray-50 dark:bg-gray-800 text-gray-500 hover:bg-gray-100"}`}>
                      {d}%
                    </button>
                  ))}
                </div>
                <input 
                  type="number" value={discount1} onChange={(e) => setDiscount1(Number(e.target.value))}
                  className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 rounded-2xl outline-none text-lg font-black text-indigo-600 text-center"
                />
              </div>

              {/* Secondary Discount */}
              <div className="space-y-4">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                   <PlusCircle size={14} className="text-gray-400" /> Extra Off (%)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[5, 10, 15].map(d => (
                    <button key={d} onClick={() => setDiscount2(d)} className={`py-3 rounded-xl font-black text-xs transition-all ${discount2 === d ? "bg-emerald-500 text-white" : "bg-gray-50 dark:bg-gray-800 text-gray-500 hover:bg-gray-100"}`}>
                      {d}%
                    </button>
                  ))}
                </div>
                <input 
                  type="number" value={discount2} onChange={(e) => setDiscount2(Number(e.target.value))}
                  className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 rounded-2xl outline-none text-lg font-black text-emerald-600 text-center"
                />
              </div>
            </div>

            {/* Tax Option */}
            <div className="space-y-4 pt-4">
               <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                   Tax Rate (%)
                </label>
                <input 
                  type="number" value={tax} onChange={(e) => setTax(Number(e.target.value))}
                  className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl outline-none text-lg font-bold"
                />
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className="bg-indigo-600 rounded-[3rem] p-10 text-white shadow-2xl shadow-indigo-600/30">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-center md:text-left">
            <div className="space-y-1">
              <p className="text-indigo-200 font-bold uppercase tracking-widest text-xs">You Save</p>
              <h2 className="text-5xl font-black text-emerald-300">{formatCurrency(results.totalSavings)}</h2>
              <div className="pt-2">
                <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-black">
                  {results.savingsPercent.toFixed(1)}% OFF
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                <p className="text-indigo-200 font-bold uppercase tracking-widest text-xs">Final Price</p>
                <Sparkles size={14} className="text-amber-300 animate-pulse" />
              </div>
              <h2 className="text-6xl font-black">{formatCurrency(results.finalPrice)}</h2>
              {tax > 0 && (
                <p className="text-[10px] font-bold text-indigo-200 mt-2">Includes {formatCurrency(results.taxAmount)} Tax</p>
              )}
            </div>
          </div>

          <div className="mt-10 h-3 w-full bg-indigo-800 rounded-full overflow-hidden flex">
            <motion.div animate={{ width: `${(results.finalPrice / originalPrice) * 100}%` }} className="h-full bg-white opacity-90" />
            <motion.div animate={{ width: `${(results.totalSavings / originalPrice) * 100}%` }} className="h-full bg-emerald-400" />
          </div>
        </div>

        {/* Savings Visualizer */}
        <div className="bg-emerald-50 dark:bg-emerald-900/10 rounded-3xl p-8 border border-emerald-100 dark:border-emerald-900/20 flex items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-500 text-white rounded-2xl">
              <Tag size={24} />
            </div>
            <div>
              <h4 className="font-black text-emerald-900 dark:text-emerald-100">Smart Shopping</h4>
              <p className="text-sm text-emerald-800/70 dark:text-emerald-200/70 leading-relaxed">
                You're getting a great deal! The stacking discounts significantly lower the cost.
              </p>
            </div>
          </div>
          <ArrowRight className="text-emerald-500 hidden md:block" />
        </div>
      </div>
    </ToolLayout>
  );
}

function PlusCircle({ size, className }: { size: number, className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
    </svg>
  );
}
