"use client";

import React, { useState, useMemo } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  ShieldCheck, 
  Plus, 
  Minus, 
  Receipt, 
  Percent, 
  ArrowRight,
  Info,
  ChevronDown
} from "lucide-react";
import { motion } from "framer-motion";

type Mode = "add" | "remove";

export default function VATCalculator() {
  const tool = tools.find((t) => t.id === "vat-calculator")!;

  // State
  const [amount, setAmount] = useState<number>(100);
  const [vatRate, setVatRate] = useState<number>(20);
  const [mode, setMode] = useState<Mode>("add");

  // Calculations
  const results = useMemo(() => {
    let net = 0;
    let vat = 0;
    let gross = 0;

    if (mode === "add") {
      net = amount;
      vat = (amount * vatRate) / 100;
      gross = net + vat;
    } else {
      gross = amount;
      net = amount / (1 + vatRate / 100);
      vat = gross - net;
    }

    return { net, vat, gross };
  }, [amount, vatRate, mode]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    }).format(val);
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Main Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Inputs Section */}
          <div className="space-y-8 bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 md:p-10 border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
              <ShieldCheck size={120} />
            </div>

            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg text-indigo-600">
                <Receipt size={20} />
              </div>
              <h3 className="text-xl font-black text-gray-900 dark:text-white">Tax Configuration</h3>
            </div>

            {/* Mode Switcher */}
            <div className="flex bg-gray-50 dark:bg-gray-800 p-1.5 rounded-2xl border border-gray-100 dark:border-gray-700">
              <button 
                onClick={() => setMode("add")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-black text-sm transition-all ${mode === "add" ? "bg-white dark:bg-gray-700 shadow-lg text-indigo-600" : "text-gray-400"}`}
              >
                <Plus size={16} /> Add VAT
              </button>
              <button 
                onClick={() => setMode("remove")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-black text-sm transition-all ${mode === "remove" ? "bg-white dark:bg-gray-700 shadow-lg text-rose-600" : "text-gray-400"}`}
              >
                <Minus size={16} /> Remove VAT
              </button>
            </div>

            {/* Amount Input */}
            <div className="space-y-4">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                {mode === "add" ? "Net Amount (Excl. VAT)" : "Gross Amount (Incl. VAT)"}
              </label>
              <div className="relative">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-black text-gray-300">£</div>
                <input 
                  type="number"
                  value={amount || ""}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full pl-12 pr-6 py-6 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-600 rounded-2xl outline-none text-3xl font-black text-gray-900 dark:text-white transition-all"
                />
              </div>
            </div>

            {/* VAT Rate */}
            <div className="space-y-4">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                <Percent size={14} /> VAT Rate (%)
              </label>
              <div className="grid grid-cols-4 gap-3">
                {[5, 12, 15, 20].map(rate => (
                  <button 
                    key={rate}
                    onClick={() => setVatRate(rate)}
                    className={`py-3 rounded-xl font-black text-sm transition-all ${vatRate === rate ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "bg-gray-50 dark:bg-gray-800 text-gray-500 hover:bg-gray-100"}`}
                  >
                    {rate}%
                  </button>
                ))}
              </div>
              <div className="relative mt-2">
                <input 
                  type="number"
                  value={vatRate}
                  onChange={(e) => setVatRate(Number(e.target.value))}
                  className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 rounded-2xl outline-none text-lg font-black text-indigo-600 text-center"
                  placeholder="Custom %"
                />
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-indigo-600 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-indigo-600/20 flex flex-col justify-between">
            <div className="space-y-8">
              <div className="flex items-center justify-between border-b border-white/10 pb-6">
                <p className="text-indigo-200 font-bold uppercase tracking-widest text-xs">Net Price (Excl. VAT)</p>
                <h4 className="text-2xl font-black">{formatCurrency(results.net)}</h4>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-6">
                <p className="text-indigo-200 font-bold uppercase tracking-widest text-xs">VAT Amount ({vatRate}%)</p>
                <h4 className="text-2xl font-black text-indigo-300">+{formatCurrency(results.vat)}</h4>
              </div>
              <div className="pt-4 text-center space-y-2">
                <p className="text-indigo-100 font-bold uppercase tracking-widest text-sm">Gross Total (Incl. VAT)</p>
                <h2 className="text-6xl font-black">{formatCurrency(results.gross)}</h2>
              </div>
            </div>

            {/* Mini Visual */}
            <div className="mt-10 relative h-3 w-full bg-indigo-800 rounded-full overflow-hidden flex">
              <motion.div 
                animate={{ width: `${(results.net / results.gross) * 100}%` }}
                className="h-full bg-white opacity-90"
              />
              <motion.div 
                animate={{ width: `${(results.vat / results.gross) * 100}%` }}
                className="h-full bg-indigo-300 opacity-60"
              />
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-amber-50 dark:bg-amber-900/30 rounded-2xl text-amber-600">
              <Info size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-gray-900 dark:text-white">Business Invoicing</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                When invoicing businesses, it's common to state the net price and then add VAT. 
                Always ensure you're using the correct tax rate for your region and product category.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl text-indigo-600">
              <ShieldCheck size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-gray-900 dark:text-white">Tax Deductions</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Registered businesses can often claim back the VAT they pay on business-related expenses. 
                This calculator helps you find exactly how much tax is hidden in a gross price.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
