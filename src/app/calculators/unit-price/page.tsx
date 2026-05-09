"use client";

import React, { useState, useMemo } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  ShoppingCart, 
  Tag, 
  Scale, 
  Info,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Sparkles,
  Zap
} from "lucide-react";
import { motion } from "framer-motion";

export default function UnitPriceCalculator() {
  const tool = tools.find((t) => t.id === "unit-price-calc")!;

  // State
  const [item1, setItem1] = useState({ price: 5.99, quantity: 500, unit: "g" });
  const [item2, setItem2] = useState({ price: 9.50, quantity: 1, unit: "kg" });

  // Conversion logic (to base unit for comparison)
  const getUnitMultiplier = (unit: string) => {
    switch (unit) {
      case "kg": return 1000;
      case "lbs": return 453.59;
      case "oz": return 28.35;
      case "L": return 1000;
      default: return 1;
    }
  };

  const results = useMemo(() => {
    const unit1Base = item1.quantity * getUnitMultiplier(item1.unit);
    const unit2Base = item2.quantity * getUnitMultiplier(item2.unit);

    const up1 = item1.price / unit1Base;
    const up2 = item2.price / unit2Base;

    // Price per 100 base units (e.g. per 100g/ml)
    const p100_1 = up1 * 100;
    const p100_2 = up2 * 100;

    const winner = up1 < up2 ? 1 : 2;
    const diffPercent = Math.abs((up1 - up2) / Math.max(up1, up2)) * 100;

    return {
      up1, up2, p100_1, p100_2, winner, diffPercent
    };
  }, [item1, item2]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(val);
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Comparison Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Item 1 */}
          <div className={`p-8 rounded-[2.5rem] border-2 transition-all ${results.winner === 1 ? "bg-indigo-50 border-indigo-500 shadow-xl shadow-indigo-600/5 dark:bg-indigo-900/10" : "bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800"}`}>
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-black text-gray-900 dark:text-white flex items-center gap-2">
                <div className="p-2 bg-indigo-600 text-white rounded-lg">1</div>
                Item A
              </h3>
              {results.winner === 1 && (
                <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                  <Sparkles size={10} /> Better Deal
                </span>
              )}
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Price</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</div>
                  <input 
                    type="number" value={item1.price} onChange={(e) => setItem1({...item1, price: Number(e.target.value)})}
                    className="w-full pl-8 pr-4 py-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl outline-none text-xl font-black"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Quantity</label>
                  <input 
                    type="number" value={item1.quantity} onChange={(e) => setItem1({...item1, quantity: Number(e.target.value)})}
                    className="w-full px-4 py-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl outline-none text-xl font-black"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Unit</label>
                  <select 
                    value={item1.unit} onChange={(e) => setItem1({...item1, unit: e.target.value})}
                    className="w-full px-4 py-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl outline-none text-lg font-bold"
                  >
                    <option value="g">Grams (g)</option>
                    <option value="kg">Kilograms (kg)</option>
                    <option value="oz">Ounces (oz)</option>
                    <option value="lbs">Pounds (lbs)</option>
                    <option value="ml">Milliliters (ml)</option>
                    <option value="L">Liters (L)</option>
                    <option value="unit">Units / Pieces</option>
                  </select>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100 dark:border-gray-800 text-center">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Unit Price</p>
                <h4 className={`text-3xl font-black ${results.winner === 1 ? "text-indigo-600" : "text-gray-900 dark:text-white"}`}>
                  {formatCurrency(results.p100_1)}
                  <span className="text-xs font-bold opacity-40 ml-1">/ 100 {item1.unit === "unit" ? "units" : "g/ml"}</span>
                </h4>
              </div>
            </div>
          </div>

          {/* Item 2 */}
          <div className={`p-8 rounded-[2.5rem] border-2 transition-all ${results.winner === 2 ? "bg-emerald-50 border-emerald-500 shadow-xl shadow-emerald-600/5 dark:bg-emerald-900/10" : "bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800"}`}>
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-black text-gray-900 dark:text-white flex items-center gap-2">
                <div className="p-2 bg-emerald-600 text-white rounded-lg">2</div>
                Item B
              </h3>
              {results.winner === 2 && (
                <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                  <Sparkles size={10} /> Better Deal
                </span>
              )}
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Price</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</div>
                  <input 
                    type="number" value={item2.price} onChange={(e) => setItem2({...item2, price: Number(e.target.value)})}
                    className="w-full pl-8 pr-4 py-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl outline-none text-xl font-black"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Quantity</label>
                  <input 
                    type="number" value={item2.quantity} onChange={(e) => setItem2({...item2, quantity: Number(e.target.value)})}
                    className="w-full px-4 py-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl outline-none text-xl font-black"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Unit</label>
                  <select 
                    value={item2.unit} onChange={(e) => setItem2({...item2, unit: e.target.value})}
                    className="w-full px-4 py-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl outline-none text-lg font-bold"
                  >
                    <option value="g">Grams (g)</option>
                    <option value="kg">Kilograms (kg)</option>
                    <option value="oz">Ounces (oz)</option>
                    <option value="lbs">Pounds (lbs)</option>
                    <option value="ml">Milliliters (ml)</option>
                    <option value="L">Liters (L)</option>
                    <option value="unit">Units / Pieces</option>
                  </select>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100 dark:border-gray-800 text-center">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Unit Price</p>
                <h4 className={`text-3xl font-black ${results.winner === 2 ? "text-emerald-600" : "text-gray-900 dark:text-white"}`}>
                  {formatCurrency(results.p100_2)}
                  <span className="text-xs font-bold opacity-40 ml-1">/ 100 {item2.unit === "unit" ? "units" : "g/ml"}</span>
                </h4>
              </div>
            </div>
          </div>
        </div>

        {/* Savings Alert */}
        <div className="bg-indigo-600 rounded-3xl p-8 text-white shadow-2xl shadow-indigo-600/20 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
              <Zap size={32} />
            </div>
            <div>
              <h4 className="text-xl font-black">Item {results.winner === 1 ? 'A' : 'B'} is the winner!</h4>
              <p className="text-indigo-100 opacity-80 text-sm">
                You save <span className="font-black text-white">{results.diffPercent.toFixed(1)}%</span> by choosing this option.
              </p>
            </div>
          </div>
          <button className="px-8 py-4 bg-white text-indigo-600 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all">
            Add to List
          </button>
        </div>

        {/* Informational Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-amber-50 dark:bg-amber-900/30 rounded-2xl text-amber-600">
              <Info size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-gray-900 dark:text-white">The Unit Price Trap</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Larger packs aren't always cheaper. Sometimes smaller packs on sale have a much lower unit price. 
                Always check the price per gram or ounce for the real value.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl text-indigo-600">
              <CheckCircle2 size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-gray-900 dark:text-white">Smart Bulk Buying</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                If the price difference is significant and the product is non-perishable, 
                bulk buying the lower unit-price item is a great way to save money over the long term.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
