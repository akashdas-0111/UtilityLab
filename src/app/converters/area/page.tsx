"use client";

import React, { useState, useMemo } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  Square, 
  ArrowRightLeft, 
  Copy, 
  Info,
  Zap,
  Trash2,
  Map,
  Home,
  CheckCircle2,
  Sparkles
} from "lucide-react";
import { motion } from "framer-motion";

const AREA_UNITS = [
  { id: "sqm", name: "Sq Meters", factor: 1 },
  { id: "sqkm", name: "Sq Kilometers", factor: 1000000 },
  { id: "sqft", name: "Sq Feet", factor: 0.092903 },
  { id: "acre", name: "Acres", factor: 4046.86 },
  { id: "hectare", name: "Hectares", factor: 10000 },
  { id: "sqmi", name: "Sq Miles", factor: 2589988.11 },
];

export default function AreaConverter() {
  const tool = tools.find((t) => t.id === "area-conv")!;

  // State
  const [value, setValue] = useState<string>("1");
  const [fromUnit, setFromUnit] = useState("sqm");

  // Calculations
  const results = useMemo(() => {
    const val = parseFloat(value);
    if (isNaN(val)) return [];

    const fromFactor = AREA_UNITS.find(u => u.id === fromUnit)?.factor || 1;
    const baseValue = val * fromFactor;

    return AREA_UNITS.map(u => ({
      ...u,
      result: baseValue / u.factor
    }));
  }, [value, fromUnit]);

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Main Input Card */}
        <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-8 md:p-12 border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform text-emerald-500">
            <Square size={120} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end relative z-10">
            <div className="space-y-4">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Area Amount</label>
              <input 
                type="number" value={value} onChange={(e) => setValue(e.target.value)}
                className="w-full px-6 py-6 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-emerald-500 rounded-3xl outline-none text-4xl font-black transition-all"
              />
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Source Unit</label>
              <select 
                value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}
                className="w-full px-6 py-6 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl outline-none text-2xl font-black appearance-none cursor-pointer"
              >
                {AREA_UNITS.map(u => (
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
              className={`p-8 rounded-[2.5rem] border-2 transition-all ${u.id === fromUnit ? 'bg-emerald-600 border-emerald-600 text-white shadow-xl shadow-emerald-600/20' : 'bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 shadow-sm'}`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className={`text-[10px] font-black uppercase tracking-widest ${u.id === fromUnit ? 'text-emerald-200' : 'text-gray-400'}`}>{u.name}</span>
                <button onClick={() => navigator.clipboard.writeText(u.result.toString())} className={`transition-colors ${u.id === fromUnit ? 'text-white/50 hover:text-white' : 'text-gray-300 hover:text-emerald-600'}`}>
                  <Copy size={16} />
                </button>
              </div>
              <div className="flex items-baseline gap-2">
                <h4 className="text-3xl font-black truncate max-w-full">
                  {u.result.toLocaleString(undefined, { maximumFractionDigits: 6 })}
                </h4>
                <span className={`text-sm font-bold ${u.id === fromUnit ? 'text-emerald-200' : 'text-gray-400'}`}>{u.id}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Comparison Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl text-emerald-600">
              <Home size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Real Estate Pro</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Quickly convert floor plans from square meters to square feet for international clients or property listings.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl text-indigo-600">
              <Map size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Land Management</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Easily scale between hectares and acres for farming, forestry, and large-scale urban planning projects.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
