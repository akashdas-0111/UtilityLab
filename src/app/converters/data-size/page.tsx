"use client";

import React, { useState, useMemo } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  Database, 
  ArrowRightLeft, 
  Copy, 
  Info,
  Zap,
  Trash2,
  HardDrive,
  Cpu,
  ShieldCheck,
  Smartphone
} from "lucide-react";
import { motion } from "framer-motion";

const UNITS = [
  { id: "B", name: "Bytes", power: 0 },
  { id: "KB", name: "Kilobytes", power: 1 },
  { id: "MB", name: "Megabytes", power: 2 },
  { id: "GB", name: "Gigabytes", power: 3 },
  { id: "TB", name: "Terabytes", power: 4 },
  { id: "PB", name: "Petabytes", power: 5 },
];

export default function DataSizeConverter() {
  const tool = tools.find((t) => t.id === "data-size-conv")!;

  // State
  const [value, setValue] = useState<string>("1");
  const [base, setBase] = useState<1000 | 1024>(1024);
  const [fromUnit, setFromUnit] = useState("GB");

  // Calculations
  const results = useMemo(() => {
    const val = parseFloat(value);
    if (isNaN(val)) return [];

    const fromPower = UNITS.find(u => u.id === fromUnit)?.power || 0;
    const baseValue = val * Math.pow(base, fromPower);

    return UNITS.map(u => ({
      ...u,
      result: baseValue / Math.pow(base, u.power)
    }));
  }, [value, base, fromUnit]);

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Main Input Card */}
        <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-8 md:p-12 border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform text-indigo-500">
            <Database size={120} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end relative z-10">
            
            {/* Value Input */}
            <div className="lg:col-span-4 space-y-4">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Input Amount</label>
              <input 
                type="number" value={value} onChange={(e) => setValue(e.target.value)}
                className="w-full px-6 py-6 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-600 rounded-3xl outline-none text-4xl font-black transition-all"
              />
            </div>

            {/* From Unit */}
            <div className="lg:col-span-4 space-y-4">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Source Unit</label>
              <select 
                value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}
                className="w-full px-6 py-6 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl outline-none text-2xl font-black appearance-none cursor-pointer"
              >
                {UNITS.map(u => (
                  <option key={u.id} value={u.id}>{u.name} ({u.id})</option>
                ))}
              </select>
            </div>

            {/* Base Toggle */}
            <div className="lg:col-span-4 space-y-4">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Calculation Base</label>
              <div className="flex bg-gray-50 dark:bg-gray-800 p-2 rounded-3xl border border-gray-100 dark:border-gray-700">
                <button 
                  onClick={() => setBase(1024)}
                  className={`flex-1 py-4 rounded-2xl font-black text-xs transition-all ${base === 1024 ? 'bg-white dark:bg-gray-700 shadow-lg text-indigo-600' : 'text-gray-400'}`}
                >
                  Binary (1024)
                </button>
                <button 
                  onClick={() => setBase(1000)}
                  className={`flex-1 py-4 rounded-2xl font-black text-xs transition-all ${base === 1000 ? 'bg-white dark:bg-gray-700 shadow-lg text-indigo-600' : 'text-gray-400'}`}
                >
                  Decimal (1000)
                </button>
              </div>
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
                  {u.result < 0.0001 ? u.result.toExponential(4) : u.result.toLocaleString(undefined, { maximumFractionDigits: 6 })}
                </h4>
                <span className={`text-sm font-bold ${u.id === fromUnit ? 'text-indigo-200' : 'text-gray-400'}`}>{u.id}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Comparison Section */}
        <div className="bg-gray-900 rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
            <ShieldCheck size={120} />
          </div>
          
          <h3 className="text-xl font-black mb-8 flex items-center gap-2">
            <Zap size={20} className="text-amber-400" />
            Storage Manufacturer Math
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
            <div className="space-y-4">
              <p className="text-gray-400 text-sm leading-relaxed">
                Ever wondered why your <span className="font-bold text-white">500GB</span> hard drive only shows <span className="font-bold text-white">465GB</span> in Windows?
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Manufacturers use **Decimal (1000)** base, while Operating Systems use **Binary (1024)** base. This tool helps you see the difference.
              </p>
            </div>
            <div className="bg-white/5 p-6 rounded-3xl border border-white/10 flex flex-col justify-center text-center">
               <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">500GB (Decimal) = </p>
               <h4 className="text-4xl font-black text-indigo-400">465.66 GB</h4>
               <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mt-2">in Binary Base</p>
            </div>
          </div>
        </div>

        {/* Device Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center text-center gap-4">
            <Smartphone className="text-indigo-600" size={32} />
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Mobile Apps</h4>
              <p className="text-xs text-gray-500 leading-relaxed">Typical app size: 100MB - 1GB. Modern phones have 128GB - 1TB storage.</p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center text-center gap-4">
            <HardDrive className="text-emerald-600" size={32} />
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">External Storage</h4>
              <p className="text-xs text-gray-500 leading-relaxed">Portable SSDs commonly range from 500GB to 4TB.</p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center text-center gap-4">
            <Cpu className="text-amber-600" size={32} />
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Cloud Systems</h4>
              <p className="text-xs text-gray-500 leading-relaxed">Enterprise clouds manage data in Petabytes (PB) and Exabytes.</p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
