"use client";

import React, { useState, useMemo } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  RotateCcw, 
  ArrowRightLeft, 
  Copy, 
  Info,
  Zap,
  Trash2,
  Compass,
  PieChart,
  Target,
  CheckCircle2
} from "lucide-react";
import { motion } from "framer-motion";

const ANGLE_UNITS = [
  { id: "deg", name: "Degrees", factor: 1 },
  { id: "rad", name: "Radians", factor: 180 / Math.PI },
  { id: "grad", name: "Gradians", factor: 0.9 },
  { id: "arcmin", name: "Arcminutes", factor: 1/60 },
  { id: "arcsec", name: "Arcseconds", factor: 1/3600 },
];

export default function AngleConverter() {
  const tool = tools.find((t) => t.id === "angle-conv")!;

  // State
  const [value, setValue] = useState<string>("45");
  const [fromUnit, setFromUnit] = useState("deg");

  // Calculations
  const results = useMemo(() => {
    const val = parseFloat(value);
    if (isNaN(val)) return [];

    const fromFactor = ANGLE_UNITS.find(u => u.id === fromUnit)?.factor || 1;
    const baseValue = val * fromFactor;

    return ANGLE_UNITS.map(u => ({
      ...u,
      result: baseValue / u.factor
    }));
  }, [value, fromUnit]);

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Main Input Card */}
        <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-8 md:p-12 border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform text-rose-500">
            <RotateCcw size={120} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end relative z-10">
            <div className="space-y-4">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Angle Value</label>
              <input 
                type="number" value={value} onChange={(e) => setValue(e.target.value)}
                className="w-full px-6 py-6 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-rose-500 rounded-3xl outline-none text-4xl font-black transition-all"
              />
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Source Unit</label>
              <select 
                value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}
                className="w-full px-6 py-6 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl outline-none text-2xl font-black appearance-none cursor-pointer"
              >
                {ANGLE_UNITS.map(u => (
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
              className={`p-8 rounded-[2.5rem] border-2 transition-all ${u.id === fromUnit ? 'bg-rose-600 border-rose-600 text-white shadow-xl shadow-rose-600/20' : 'bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 shadow-sm'}`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className={`text-[10px] font-black uppercase tracking-widest ${u.id === fromUnit ? 'text-rose-200' : 'text-gray-400'}`}>{u.name}</span>
                <button onClick={() => navigator.clipboard.writeText(u.result.toString())} className={`transition-colors ${u.id === fromUnit ? 'text-white/50 hover:text-white' : 'text-gray-300 hover:text-rose-600'}`}>
                  <Copy size={16} />
                </button>
              </div>
              <div className="flex items-baseline gap-2">
                <h4 className="text-3xl font-black truncate max-w-full">
                  {u.result.toLocaleString(undefined, { maximumFractionDigits: 6 })}
                </h4>
                <span className={`text-sm font-bold ${u.id === fromUnit ? 'text-rose-200' : 'text-gray-400'}`}>{u.id}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Visualizer Chart Placeholder (Conceptual) */}
        <div className="bg-gray-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group flex items-center justify-center min-h-[300px]">
           <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-rose-500 via-transparent to-transparent"></div>
           <div className="relative z-10 flex flex-col items-center gap-6">
              <div className="w-40 h-40 rounded-full border-4 border-dashed border-rose-500/50 flex items-center justify-center relative">
                 <motion.div 
                  className="w-1 h-20 bg-rose-500 absolute bottom-1/2 origin-bottom rounded-full shadow-[0_0_20px_rgba(244,63,94,0.8)]"
                  style={{ rotate: fromUnit === 'deg' ? parseFloat(value) : (parseFloat(value) * 180 / Math.PI) }}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                 />
                 <div className="w-4 h-4 bg-white rounded-full z-20 shadow-lg"></div>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-black mb-2 uppercase tracking-tighter">Angular Orientation</h3>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Visualizing {value}° in 2D Space</p>
              </div>
           </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-rose-50 dark:bg-rose-900/30 rounded-2xl text-rose-600">
              <Compass size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Navigation & Surveying</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Degrees and Arcminutes are essential for geolocation, compass navigation, and 
                precise land surveying measurements.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl text-indigo-600">
              <Target size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Scientific Precision</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Radians are the standard unit for angular measure in mathematics and physics, 
                particularly in calculus and trigonometric functions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
