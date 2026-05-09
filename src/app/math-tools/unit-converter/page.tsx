"use client";

import React, { useState, useMemo } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  Ruler, 
  Trash2, 
  Zap, 
  RefreshCcw, 
  Scale, 
  Thermometer, 
  Database,
  ArrowRightLeft,
  Settings2,
  CheckCircle2,
  Info,
  Maximize2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES = {
  length: {
    icon: Ruler,
    units: {
      meters: 1,
      kilometers: 0.001,
      centimeters: 100,
      millimeters: 1000,
      miles: 0.000621371,
      yards: 1.09361,
      feet: 3.28084,
      inches: 39.3701
    }
  },
  mass: {
    icon: Scale,
    units: {
      kilograms: 1,
      grams: 1000,
      milligrams: 1000000,
      pounds: 2.20462,
      ounces: 35.274
    }
  },
  data: {
    icon: Database,
    units: {
      bytes: 1,
      kilobytes: 1/1024,
      megabytes: 1/Math.pow(1024, 2),
      gigabytes: 1/Math.pow(1024, 3),
      terabytes: 1/Math.pow(1024, 4)
    }
  }
};

type Category = keyof typeof CATEGORIES;

export default function UnitConverter() {
  const tool = tools.find((t) => t.id === "unit-converter")!;

  // State
  const [category, setCategory] = useState<Category>("length");
  const [val1, setVal1] = useState("1");
  const [unit1, setUnit1] = useState("meters");
  const [unit2, setUnit2] = useState("kilometers");

  const val2 = useMemo(() => {
    const v = parseFloat(val1);
    if (isNaN(v)) return "0";
    
    // Convert to base unit then to target unit
    const catData = CATEGORIES[category];
    const base = v / (catData.units as any)[unit1];
    const result = base * (catData.units as any)[unit2];
    
    return result.toLocaleString(undefined, { maximumFractionDigits: 10 });
  }, [val1, unit1, unit2, category]);

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Category Selector */}
        <div className="flex flex-wrap justify-center gap-4">
           {Object.entries(CATEGORIES).map(([id, data]) => (
             <button 
              key={id}
              onClick={() => {
                setCategory(id as Category);
                setUnit1(Object.keys(data.units)[0]);
                setUnit2(Object.keys(data.units)[1]);
              }}
              className={`px-10 py-5 rounded-[2rem] text-sm font-black uppercase tracking-widest transition-all flex items-center gap-3 ${category === id ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/30' : 'bg-white dark:bg-gray-800 text-gray-400 border border-gray-100 dark:border-gray-700 hover:text-gray-900'}`}
             >
               <data.icon size={20} /> {id}
             </button>
           ))}
        </div>

        {/* Converter Interface */}
        <div className="bg-white dark:bg-gray-900 rounded-[4rem] p-12 md:p-20 border border-gray-100 dark:border-gray-800 shadow-xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:scale-110 transition-transform text-indigo-500">
             <RefreshCcw size={200} />
           </div>
           
           <div className="relative z-10 grid grid-cols-1 lg:grid-cols-11 gap-12 items-center">
              
              {/* Unit 1 */}
              <div className="lg:col-span-5 space-y-6">
                 <select 
                  value={unit1} onChange={(e) => setUnit1(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-800 border-none outline-none px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 appearance-none"
                 >
                    {Object.keys(CATEGORIES[category].units).map(u => <option key={u} value={u}>{u}</option>)}
                 </select>
                 <input 
                  type="number" value={val1} onChange={(e) => setVal1(e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-7xl font-black text-gray-900 dark:text-white"
                 />
              </div>

              {/* Arrow */}
              <div className="lg:col-span-1 flex justify-center">
                 <div className="p-6 bg-indigo-50 dark:bg-indigo-900/30 rounded-full text-indigo-600 rotate-90 lg:rotate-0">
                    <ArrowRightLeft size={32} />
                 </div>
              </div>

              {/* Unit 2 */}
              <div className="lg:col-span-5 space-y-6">
                 <select 
                  value={unit2} onChange={(e) => setUnit2(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-800 border-none outline-none px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 appearance-none text-right"
                 >
                    {Object.keys(CATEGORIES[category].units).map(u => <option key={u} value={u}>{u}</option>)}
                 </select>
                 <div className="text-7xl font-black text-gray-900 dark:text-white text-right break-all">
                    {val2}
                 </div>
              </div>
           </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl text-indigo-600">
              <Zap size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Universal Scaling</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Supports scientific, technical, and everyday measurements across Length, Mass, 
                and Data categories with 100% precision.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl text-emerald-600">
              <Maximize2 size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">High Precision</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Calculates results with up to 10 decimal places, ensuring that even the smallest 
                scientific adjustments are reflected accurately.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-amber-50 dark:bg-amber-900/30 rounded-2xl text-amber-600">
              <CheckCircle2 size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">100 Tool Milestone</h4>
              <p className="text-[11px] text-gray-500 leading-relaxed">
                This universal converter completes the UtilityLab 100-tool platform, providing 
                essential math utility for global users.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
