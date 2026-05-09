"use client";

import React, { useState, useMemo } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  Ruler, 
  Scale, 
  Thermometer, 
  Zap, 
  Database, 
  Box, 
  ArrowRightLeft,
  ChevronDown,
  Info,
  Clock,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const UNIT_DATA = {
  length: {
    icon: Ruler,
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-900/30",
    units: {
      mm: { name: "Millimeters", factor: 0.001 },
      cm: { name: "Centimeters", factor: 0.01 },
      m: { name: "Meters", factor: 1 },
      km: { name: "Kilometers", factor: 1000 },
      in: { name: "Inches", factor: 0.0254 },
      ft: { name: "Feet", factor: 0.3048 },
      yd: { name: "Yards", factor: 0.9144 },
      mi: { name: "Miles", factor: 1609.344 },
    }
  },
  weight: {
    icon: Scale,
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-900/30",
    units: {
      mg: { name: "Milligrams", factor: 0.000001 },
      g: { name: "Grams", factor: 0.001 },
      kg: { name: "Kilograms", factor: 1 },
      oz: { name: "Ounces", factor: 0.0283495 },
      lb: { name: "Pounds", factor: 0.453592 },
      st: { name: "Stone", factor: 6.35029 },
      t: { name: "Metric Ton", factor: 1000 },
    }
  },
  volume: {
    icon: Box,
    color: "text-amber-500",
    bg: "bg-amber-50 dark:bg-amber-900/30",
    units: {
      ml: { name: "Milliliters", factor: 0.001 },
      L: { name: "Liters", factor: 1 },
      tsp: { name: "Teaspoon (US)", factor: 0.00492892 },
      tbsp: { name: "Tablespoon (US)", factor: 0.0147868 },
      cup: { name: "Cup (US)", factor: 0.236588 },
      pt: { name: "Pint (US)", factor: 0.473176 },
      qt: { name: "Quart (US)", factor: 0.946353 },
      gal: { name: "Gallon (US)", factor: 3.78541 },
    }
  },
  temp: {
    icon: Thermometer,
    color: "text-rose-500",
    bg: "bg-rose-50 dark:bg-rose-900/30",
    units: {
      C: { name: "Celsius" },
      F: { name: "Fahrenheit" },
      K: { name: "Kelvin" },
    }
  },
  data: {
    icon: Database,
    color: "text-indigo-500",
    bg: "bg-indigo-50 dark:bg-indigo-900/30",
    units: {
      B: { name: "Bytes", factor: 1 },
      KB: { name: "Kilobytes", factor: 1024 },
      MB: { name: "Megabytes", factor: Math.pow(1024, 2) },
      GB: { name: "Gigabytes", factor: Math.pow(1024, 3) },
      TB: { name: "Terabytes", factor: Math.pow(1024, 4) },
      PB: { name: "Petabytes", factor: Math.pow(1024, 5) },
    }
  },
  speed: {
    icon: Zap,
    color: "text-orange-500",
    bg: "bg-orange-50 dark:bg-orange-900/30",
    units: {
      "m/s": { name: "Meters per second", factor: 1 },
      "km/h": { name: "Kilometers per hour", factor: 1/3.6 },
      mph: { name: "Miles per hour", factor: 0.44704 },
      kn: { name: "Knots", factor: 0.514444 },
    }
  }
};

export default function UnitConverter() {
  const tool = tools.find((t) => t.id === "unit-converter")!;

  // State
  const [category, setCategory] = useState<keyof typeof UNIT_DATA>("length");
  const [fromUnit, setFromUnit] = useState("m");
  const [toUnit, setToUnit] = useState("km");
  const [value, setValue] = useState<number>(1);

  // Sync units on category change
  React.useEffect(() => {
    const keys = Object.keys(UNIT_DATA[category].units);
    setFromUnit(keys[0]);
    setToUnit(keys[Math.min(1, keys.length - 1)]);
  }, [category]);

  // Logic
  const convertValue = (val: number, from: string, to: string, cat: keyof typeof UNIT_DATA) => {
    const catData = UNIT_DATA[cat];
    
    // Special handling for temperature
    if (cat === "temp") {
      let celsius = 0;
      if (from === "C") celsius = val;
      else if (from === "F") celsius = (val - 32) * 5/9;
      else if (from === "K") celsius = val - 273.15;

      if (to === "C") return celsius;
      else if (to === "F") return celsius * 9/5 + 32;
      else if (to === "K") return celsius + 273.15;
      return celsius;
    }

    // Standard factor conversion
    const units = catData.units as any;
    const fromFactor = units[from].factor;
    const toFactor = units[to].factor;
    return (val * fromFactor) / toFactor;
  };

  const result = useMemo(() => convertValue(value, fromUnit, toUnit, category), [value, fromUnit, toUnit, category]);

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Category Selector */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          {Object.entries(UNIT_DATA).map(([key, data]) => (
            <button 
              key={key}
              onClick={() => setCategory(key as any)}
              className={`flex flex-col items-center justify-center p-4 rounded-3xl border-2 transition-all ${category === key ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-900/10 text-indigo-600 shadow-lg shadow-indigo-600/5" : "border-transparent bg-white dark:bg-gray-900 text-gray-500 hover:bg-gray-50 hover:border-gray-100"}`}
            >
              <div className={`p-2 rounded-xl ${data.bg} ${data.color} mb-2`}>
                <data.icon size={20} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest">{key}</span>
            </button>
          ))}
        </div>

        {/* Converter Card */}
        <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-8 md:p-12 border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
            <ArrowRightLeft size={120} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-11 gap-8 items-center relative z-10">
            
            {/* From Input */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">From</label>
                <span className="text-xs font-bold text-indigo-600">{(UNIT_DATA[category].units as any)[fromUnit].name}</span>
              </div>
              <div className="relative">
                <input 
                  type="number" value={value || ""} onChange={(e) => setValue(Number(e.target.value))}
                  className="w-full px-6 py-6 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-600 rounded-2xl outline-none text-4xl font-black transition-all"
                />
              </div>
              <select 
                value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl outline-none text-sm font-bold"
              >
                {Object.entries(UNIT_DATA[category].units).map(([key, data]) => (
                  <option key={key} value={key}>{data.name} ({key})</option>
                ))}
              </select>
            </div>

            {/* Switch Icon */}
            <div className="lg:col-span-1 flex justify-center pt-8">
              <button 
                onClick={() => { const temp = fromUnit; setFromUnit(toUnit); setToUnit(temp); }}
                className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/20 hover:scale-110 active:rotate-180 transition-all"
              >
                <ArrowRightLeft size={20} />
              </button>
            </div>

            {/* To Result */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">To</label>
                <span className="text-xs font-bold text-emerald-600">{(UNIT_DATA[category].units as any)[toUnit].name}</span>
              </div>
              <div className="w-full px-6 py-6 bg-emerald-50 dark:bg-emerald-900/10 border-2 border-emerald-500/20 rounded-2xl text-4xl font-black text-emerald-600 overflow-hidden truncate">
                {result.toLocaleString(undefined, { maximumFractionDigits: 6 })}
              </div>
              <select 
                value={toUnit} onChange={(e) => setToUnit(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl outline-none text-sm font-bold"
              >
                {Object.entries(UNIT_DATA[category].units).map(([key, data]) => (
                  <option key={key} value={key}>{data.name} ({key})</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Quick Grid */}
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800">
           <h3 className="font-black text-gray-900 dark:text-white flex items-center gap-2 mb-8 uppercase tracking-widest text-xs">
            <Sparkles size={16} className="text-indigo-600" />
            Common Conversions ({value} {fromUnit})
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Object.entries(UNIT_DATA[category].units).slice(0, 8).map(([key, data]) => (
              <div key={key} className="p-4 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                <p className="text-[10px] font-black text-gray-400 uppercase mb-1">{data.name}</p>
                <p className="text-lg font-black text-gray-900 dark:text-white truncate">
                  {convertValue(value, fromUnit, key, category).toLocaleString(undefined, { maximumFractionDigits: 4 })}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl text-indigo-600">
              <Info size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-gray-900 dark:text-white">Precision & Accuracy</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                We use high-precision conversion factors for all calculations. However, for scientific or industrial applications, 
                always verify with a certified measurement tool.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl text-emerald-600">
              <Clock size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-gray-900 dark:text-white">Instant Feedback</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                The results update in real-time as you type or change units. Use the "Common Conversions" grid 
                to see multiple equivalents at a single glance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
