"use client";

import React, { useState, useMemo } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  Zap, 
  ArrowRightLeft, 
  Copy, 
  Info,
  Trash2,
  Plane,
  Car,
  Ship,
  Wind,
  CheckCircle2
} from "lucide-react";
import { motion } from "framer-motion";

const SPEED_UNITS = [
  { id: "kmh", name: "KM per Hour", factor: 1 },
  { id: "mph", name: "Miles per Hour", factor: 1.60934 },
  { id: "knots", name: "Knots", factor: 1.852 },
  { id: "ms", name: "Meters per Second", factor: 3.6 },
  { id: "mach", name: "Mach (at sea level)", factor: 1225.04 },
];

export default function SpeedConverter() {
  const tool = tools.find((t) => t.id === "speed-conv")!;

  // State
  const [value, setValue] = useState<string>("100");
  const [fromUnit, setFromUnit] = useState("kmh");

  // Calculations
  const results = useMemo(() => {
    const val = parseFloat(value);
    if (isNaN(val)) return [];

    const fromFactor = SPEED_UNITS.find(u => u.id === fromUnit)?.factor || 1;
    const baseValue = val * fromFactor;

    return SPEED_UNITS.map(u => ({
      ...u,
      result: baseValue / u.factor
    }));
  }, [value, fromUnit]);

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Main Input Card */}
        <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-8 md:p-12 border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform text-amber-500">
            <Zap size={120} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end relative z-10">
            <div className="space-y-4">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Speed Value</label>
              <input 
                type="number" value={value} onChange={(e) => setValue(e.target.value)}
                className="w-full px-6 py-6 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-amber-500 rounded-3xl outline-none text-4xl font-black transition-all"
              />
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Source Unit</label>
              <select 
                value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}
                className="w-full px-6 py-6 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl outline-none text-2xl font-black appearance-none cursor-pointer"
              >
                {SPEED_UNITS.map(u => (
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
              className={`p-8 rounded-[2.5rem] border-2 transition-all ${u.id === fromUnit ? 'bg-amber-500 border-amber-500 text-white shadow-xl shadow-amber-500/20' : 'bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 shadow-sm'}`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className={`text-[10px] font-black uppercase tracking-widest ${u.id === fromUnit ? 'text-amber-100' : 'text-gray-400'}`}>{u.name}</span>
                <button onClick={() => navigator.clipboard.writeText(u.result.toString())} className={`transition-colors ${u.id === fromUnit ? 'text-white/50 hover:text-white' : 'text-gray-300 hover:text-amber-600'}`}>
                  <Copy size={16} />
                </button>
              </div>
              <div className="flex items-baseline gap-2">
                <h4 className="text-3xl font-black truncate max-w-full">
                  {u.result.toLocaleString(undefined, { maximumFractionDigits: 6 })}
                </h4>
                <span className={`text-sm font-bold ${u.id === fromUnit ? 'text-amber-100' : 'text-gray-400'}`}>{u.id}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Transportation Icons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center gap-3">
             <Car className="text-blue-500" size={32} />
             <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Automotive</span>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center gap-3">
             <Plane className="text-indigo-500" size={32} />
             <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Aviation</span>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center gap-3">
             <Ship className="text-emerald-500" size={32} />
             <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Maritime</span>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center gap-3">
             <Wind className="text-rose-500" size={32} />
             <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Atmospheric</span>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-indigo-50 dark:bg-indigo-900/10 rounded-3xl p-8 border border-indigo-100 dark:border-indigo-900/20 flex items-start gap-4">
            <div className="p-3 bg-indigo-500 text-white rounded-2xl">
              <Zap size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-indigo-900 dark:text-indigo-100">Physics & Math</h4>
              <p className="text-sm text-indigo-800/70 dark:text-indigo-200/70 leading-relaxed">
                Speed is a scalar quantity, while velocity is a vector. This tool converts speed magnitudes 
                using standard SI and imperial factors.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl text-emerald-600">
              <CheckCircle2 size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Travel Ready</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Planning a road trip in Europe or the UK? Use this to quickly swap between KM/H and MPH 
                to stay within legal speed limits.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
