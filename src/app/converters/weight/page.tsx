"use client";

import React, { useState, useMemo } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  Scale, 
  ArrowRightLeft, 
  Copy, 
  Info,
  Zap,
  Trash2,
  Dumbbell,
  ShoppingBag,
  Truck,
  CheckCircle2
} from "lucide-react";
import { motion } from "framer-motion";

const WEIGHT_UNITS = [
  { id: "kg", name: "Kilograms", factor: 1 },
  { id: "g", name: "Grams", factor: 0.001 },
  { id: "mg", name: "Milligrams", factor: 0.000001 },
  { id: "lb", name: "Pounds", factor: 0.453592 },
  { id: "oz", name: "Ounces", factor: 0.0283495 },
  { id: "st", name: "Stone", factor: 6.35029 },
  { id: "t", name: "Metric Ton", factor: 1000 },
];

export default function WeightConverter() {
  const tool = tools.find((t) => t.id === "weight-conv")!;

  // State
  const [value, setValue] = useState<string>("1");
  const [fromUnit, setFromUnit] = useState("kg");

  // Calculations
  const results = useMemo(() => {
    const val = parseFloat(value);
    if (isNaN(val)) return [];

    const fromFactor = WEIGHT_UNITS.find(u => u.id === fromUnit)?.factor || 1;
    const baseValue = val * fromFactor;

    return WEIGHT_UNITS.map(u => ({
      ...u,
      result: baseValue / u.factor
    }));
  }, [value, fromUnit]);

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Main Input Card */}
        <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-8 md:p-12 border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform text-indigo-500">
            <Scale size={120} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end relative z-10">
            <div className="space-y-4">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Weight Amount</label>
              <input 
                type="number" value={value} onChange={(e) => setValue(e.target.value)}
                className="w-full px-6 py-6 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-600 rounded-3xl outline-none text-4xl font-black transition-all"
              />
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Source Unit</label>
              <select 
                value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}
                className="w-full px-6 py-6 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl outline-none text-2xl font-black appearance-none cursor-pointer"
              >
                {WEIGHT_UNITS.map(u => (
                  <option key={u.id} value={u.id}>{u.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((u) => (
            <motion.div 
              layout
              key={u.id}
              className={`p-8 rounded-[2.5rem] border-2 transition-all ${u.id === fromUnit ? 'bg-indigo-600 border-indigo-600 text-white shadow-xl shadow-indigo-600/20' : 'bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 shadow-sm'}`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className={`text-[10px] font-black uppercase tracking-widest ${u.id === fromUnit ? 'text-indigo-200' : 'text-gray-400'}`}>{u.name}</span>
                <button onClick={() => navigator.clipboard.writeText(u.result.toString())} className={`transition-colors ${u.id === fromUnit ? 'text-white/50 hover:text-white' : 'text-gray-300 hover:text-indigo-600'}`}>
                  <Copy size={16} />
                </button>
              </div>
              <div className="flex items-baseline gap-2">
                <h4 className="text-3xl font-black truncate max-w-full">
                  {u.result.toLocaleString(undefined, { maximumFractionDigits: 6 })}
                </h4>
                <span className={`text-sm font-bold ${u.id === fromUnit ? 'text-indigo-200' : 'text-gray-400'}`}>{u.id}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Industry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center text-center gap-4">
            <div className="p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl text-indigo-600">
              <Dumbbell size={32} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Fitness & Sports</h4>
              <p className="text-xs text-gray-500 leading-relaxed">Perfect for gym enthusiasts converting between LBS and KG for weightlifting and bodybuilding.</p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center text-center gap-4">
            <div className="p-4 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl text-emerald-600">
              <ShoppingBag size={32} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Cooking & Baking</h4>
              <p className="text-xs text-gray-500 leading-relaxed">Convert recipe measurements between Grams, Ounces, and Pounds with culinary precision.</p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center text-center gap-4">
            <div className="p-4 bg-amber-50 dark:bg-amber-900/30 rounded-2xl text-amber-600">
              <Truck size={32} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Shipping & Freight</h4>
              <p className="text-xs text-gray-500 leading-relaxed">Ideal for logistics, converting Metric Tons and large shipments for international transport.</p>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-indigo-50 dark:bg-indigo-900/10 rounded-3xl p-8 border border-indigo-100 dark:border-indigo-900/20 flex items-start gap-4">
            <div className="p-3 bg-indigo-500 text-white rounded-2xl">
              <Zap size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-indigo-900 dark:text-indigo-100">Mass vs Weight</h4>
              <p className="text-sm text-indigo-800/70 dark:text-indigo-200/70 leading-relaxed">
                Technically, mass is intrinsic to an object, while weight depends on gravity. On Earth, 
                these terms are often used interchangeably for everyday units like KG and LBS.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl text-emerald-600">
              <CheckCircle2 size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">International Standards</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Most of the world uses the metric system (SI units), while the US and some other 
                countries still use imperial units for daily measurements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
