"use client";

import React, { useState, useMemo } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  Ruler, 
  ArrowRightLeft, 
  Copy, 
  Info,
  Zap,
  Trash2,
  Map,
  Construction,
  CheckCircle2,
  Navigation
} from "lucide-react";
import { motion } from "framer-motion";

const LENGTH_UNITS = [
  { id: "mm", name: "Millimeters", factor: 0.001 },
  { id: "cm", name: "Centimeters", factor: 0.01 },
  { id: "m", name: "Meters", factor: 1 },
  { id: "km", name: "Kilometers", factor: 1000 },
  { id: "in", name: "Inches", factor: 0.0254 },
  { id: "ft", name: "Feet", factor: 0.3048 },
  { id: "yd", name: "Yards", factor: 0.9144 },
  { id: "mi", name: "Miles", factor: 1609.344 },
];

export default function LengthConverter() {
  const tool = tools.find((t) => t.id === "length-conv")!;

  // State
  const [value, setValue] = useState<string>("1");
  const [fromUnit, setFromUnit] = useState("m");

  // Calculations
  const results = useMemo(() => {
    const val = parseFloat(value);
    if (isNaN(val)) return [];

    const fromFactor = LENGTH_UNITS.find(u => u.id === fromUnit)?.factor || 1;
    const baseValue = val * fromFactor;

    return LENGTH_UNITS.map(u => ({
      ...u,
      result: baseValue / u.factor
    }));
  }, [value, fromUnit]);

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Milestone Banner */}
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-indigo-600/20 flex items-center justify-between overflow-hidden relative">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Zap size={100} />
          </div>
          <div className="relative z-10">
            <h2 className="text-2xl font-black mb-1 flex items-center gap-2">
              <CheckCircle2 className="text-indigo-200" />
              50 Tools Milestone Reached!
            </h2>
            <p className="text-indigo-100 text-sm font-medium opacity-80">You are now viewing our 50th production-grade utility tool.</p>
          </div>
          <div className="hidden md:block px-6 py-2 bg-white/20 backdrop-blur rounded-full text-xs font-black uppercase tracking-widest">
            Level 50 Unlocked
          </div>
        </div>

        {/* Main Input Card */}
        <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-8 md:p-12 border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform text-indigo-500">
            <Ruler size={120} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end relative z-10">
            <div className="space-y-4">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Length Value</label>
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
                {LENGTH_UNITS.map(u => (
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
              <Construction size={32} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Architecture</h4>
              <p className="text-xs text-gray-500 leading-relaxed">Essential for converting structural dimensions from Meters to Feet and Inches for international blueprints.</p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center text-center gap-4">
            <div className="p-4 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl text-emerald-600">
              <Navigation size={32} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Aviation & Marine</h4>
              <p className="text-xs text-gray-500 leading-relaxed">Calculate travel distances across Kilometers and Miles with aeronautical precision for flight logs.</p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center text-center gap-4">
            <div className="p-4 bg-amber-50 dark:bg-amber-900/30 rounded-2xl text-amber-600">
              <Map size={32} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Logistics</h4>
              <p className="text-xs text-gray-500 leading-relaxed">Perfect for transport planning, converting routes across different national metric standards.</p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
