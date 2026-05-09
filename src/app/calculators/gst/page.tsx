"use client";

import React, { useState, useMemo } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  FileText, 
  Plus, 
  Minus, 
  IndianRupee, 
  Percent, 
  ArrowRight,
  Info,
  MapPin,
  Building
} from "lucide-react";
import { motion } from "framer-motion";

type Mode = "add" | "remove";
type GSTType = "intra" | "inter"; // Intra-state (CGST+SGST) or Inter-state (IGST)

export default function GSTCalculator() {
  const tool = tools.find((t) => t.id === "gst-calculator")!;

  // State
  const [amount, setAmount] = useState<number>(1000);
  const [gstRate, setGstRate] = useState<number>(18);
  const [mode, setMode] = useState<Mode>("add");
  const [gstType, setGstType] = useState<GSTType>("intra");

  // Calculations
  const results = useMemo(() => {
    let base = 0;
    let totalGST = 0;
    let totalAmount = 0;

    if (mode === "add") {
      base = amount;
      totalGST = (amount * gstRate) / 100;
      totalAmount = base + totalGST;
    } else {
      totalAmount = amount;
      base = amount / (1 + gstRate / 100);
      totalGST = totalAmount - base;
    }

    const halfGST = totalGST / 2;

    return { base, totalGST, totalAmount, halfGST };
  }, [amount, gstRate, mode]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(val);
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Main Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Inputs Section */}
          <div className="space-y-8 bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 md:p-10 border border-gray-100 dark:border-gray-800 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg text-indigo-600">
                <FileText size={20} />
              </div>
              <h3 className="text-xl font-black text-gray-900 dark:text-white">Tax Configuration</h3>
            </div>

            {/* Mode Switcher */}
            <div className="flex bg-gray-50 dark:bg-gray-800 p-1.5 rounded-2xl border border-gray-100 dark:border-gray-700">
              <button 
                onClick={() => setMode("add")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-black text-sm transition-all ${mode === "add" ? "bg-white dark:bg-gray-700 shadow-lg text-indigo-600" : "text-gray-400"}`}
              >
                <Plus size={16} /> Add GST
              </button>
              <button 
                onClick={() => setMode("remove")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-black text-sm transition-all ${mode === "remove" ? "bg-white dark:bg-gray-700 shadow-lg text-rose-600" : "text-gray-400"}`}
              >
                <Minus size={16} /> Remove GST
              </button>
            </div>

            {/* GST Type Switcher */}
            <div className="space-y-4">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                <MapPin size={14} /> Transaction Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => setGstType("intra")}
                  className={`px-4 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all border-2 ${gstType === "intra" ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-900/10 text-indigo-600" : "border-transparent bg-gray-50 dark:bg-gray-800 text-gray-400"}`}
                >
                  <Building size={14} /> Intra-State (CGST + SGST)
                </button>
                <button 
                  onClick={() => setGstType("inter")}
                  className={`px-4 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all border-2 ${gstType === "inter" ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-900/10 text-indigo-600" : "border-transparent bg-gray-50 dark:bg-gray-800 text-gray-400"}`}
                >
                  <MapPin size={14} /> Inter-State (IGST)
                </button>
              </div>
            </div>

            {/* Amount Input */}
            <div className="space-y-4">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                {mode === "add" ? "Base Amount (Excl. GST)" : "Total Amount (Incl. GST)"}
              </label>
              <div className="relative">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-black text-gray-300">₹</div>
                <input 
                  type="number"
                  value={amount || ""}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full pl-12 pr-6 py-6 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-600 rounded-2xl outline-none text-3xl font-black text-gray-900 dark:text-white transition-all"
                />
              </div>
            </div>

            {/* GST Rate */}
            <div className="space-y-4">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                <Percent size={14} /> GST Rate (%)
              </label>
              <div className="grid grid-cols-4 gap-3">
                {[5, 12, 18, 28].map(rate => (
                  <button 
                    key={rate}
                    onClick={() => setGstRate(rate)}
                    className={`py-3 rounded-xl font-black text-sm transition-all ${gstRate === rate ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "bg-gray-50 dark:bg-gray-800 text-gray-500 hover:bg-gray-100"}`}
                  >
                    {rate}%
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tax Invoice Result */}
          <div className="bg-white dark:bg-gray-950 rounded-[2.5rem] p-10 border-2 border-gray-100 dark:border-gray-800 shadow-sm flex flex-col relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform" />
            
            <div className="mb-8 border-b-2 border-dashed border-gray-100 dark:border-gray-800 pb-8 text-center">
              <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-2">Calculation Summary</h4>
              <p className="text-sm font-bold text-gray-500">{gstType === "intra" ? "Intra-State Transaction" : "Inter-State Transaction"}</p>
            </div>

            <div className="space-y-6 flex-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Base Amount</p>
                <h4 className="text-xl font-black text-gray-900 dark:text-white">{formatCurrency(results.base)}</h4>
              </div>

              {gstType === "intra" ? (
                <>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">CGST ({gstRate / 2}%)</p>
                    <h4 className="text-xl font-black text-indigo-600">+{formatCurrency(results.halfGST)}</h4>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">SGST/UTGST ({gstRate / 2}%)</p>
                    <h4 className="text-xl font-black text-indigo-600">+{formatCurrency(results.halfGST)}</h4>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">IGST ({gstRate}%)</p>
                  <h4 className="text-xl font-black text-indigo-600">+{formatCurrency(results.totalGST)}</h4>
                </div>
              )}

              <div className="flex items-center justify-between pt-6 mt-6 border-t-2 border-gray-100 dark:border-gray-800">
                <p className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-widest">Total Amount</p>
                <h4 className="text-3xl font-black text-indigo-600">{formatCurrency(results.totalAmount)}</h4>
              </div>
            </div>

            <div className="mt-10 p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 text-center">
              <p className="text-xs font-bold text-gray-400">Total Tax Amount: <span className="text-indigo-600 font-black">{formatCurrency(results.totalGST)}</span></p>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-indigo-50 dark:bg-indigo-900/10 rounded-3xl p-8 border border-indigo-100 dark:border-indigo-900/20">
            <h4 className="text-lg font-black text-indigo-900 dark:text-indigo-100 mb-4 flex items-center gap-2">
              <Info size={20} />
              GST Components
            </h4>
            <div className="space-y-4 text-sm text-indigo-800/80 dark:text-indigo-200/80 leading-relaxed font-medium">
              <p>• **CGST:** Central GST collected by the Central Government on an intra-state sale.</p>
              <p>• **SGST:** State GST collected by the State Government on an intra-state sale.</p>
              <p>• **IGST:** Integrated GST collected by the Central Government for inter-state transactions.</p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col justify-center">
             <h4 className="font-black text-gray-900 dark:text-white mb-2 flex items-center gap-2">
              <IndianRupee size={18} className="text-indigo-600" />
              Rupee Costing
            </h4>
            <p className="text-sm text-gray-500 leading-relaxed">
              Standard GST slabs in India are 5%, 12%, 18%, and 28%. Most consumer goods fall under the 18% slab. 
              This tool provides a precise breakdown suitable for invoice generation and auditing.
            </p>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
