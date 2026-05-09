"use client";

import React, { useState, useEffect } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  Columns, 
  ArrowRightLeft, 
  Copy, 
  Info,
  Zap,
  Trash2,
  Hash,
  History,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ROMAN_MAP: [number, string][] = [
  [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"],
  [100, "C"], [90, "XC"], [50, "L"], [40, "XL"],
  [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]
];

const ROMAN_VALUES: Record<string, number> = {
  M: 1000, D: 500, C: 100, L: 50, X: 10, V: 5, I: 1
};

export default function RomanNumeralsConverter() {
  const tool = tools.find((t) => t.id === "roman-numerals")!;

  // State
  const [number, setNumber] = useState<string>("2024");
  const [roman, setRoman] = useState<string>("MMXXIV");
  const [error, setError] = useState<string | null>(null);

  // Conversion Logic
  const toRoman = (num: number) => {
    if (num <= 0 || num > 3999) return "N/A";
    let result = "";
    for (const [val, symbol] of ROMAN_MAP) {
      while (num >= val) {
        result += symbol;
        num -= val;
      }
    }
    return result;
  };

  const fromRoman = (rom: string) => {
    rom = rom.toUpperCase();
    let result = 0;
    for (let i = 0; i < rom.length; i++) {
      const current = ROMAN_VALUES[rom[i]];
      const next = ROMAN_VALUES[rom[i + 1]];
      if (next > current) {
        result += (next - current);
        i++;
      } else {
        result += current;
      }
    }
    return isNaN(result) ? null : result;
  };

  const handleNumberChange = (val: string) => {
    setNumber(val);
    const n = parseInt(val);
    if (isNaN(n)) {
      setRoman("");
      setError(null);
    } else if (n <= 0 || n > 3999) {
      setRoman("");
      setError("Please enter a number between 1 and 3999");
    } else {
      setRoman(toRoman(n));
      setError(null);
    }
  };

  const handleRomanChange = (val: string) => {
    const rom = val.toUpperCase().replace(/[^MDCLXVI]/g, '');
    setRoman(rom);
    const n = fromRoman(rom);
    if (n === null || isNaN(n)) {
      setNumber("");
      setError("Invalid Roman Numeral");
    } else {
      setNumber(n.toString());
      setError(null);
    }
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Main Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Decimal Input */}
          <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 md:p-10 border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-2">
                <Hash size={20} className="text-indigo-600" />
                Integer (1-3999)
              </h3>
              <button onClick={() => setNumber("")} className="text-gray-300 hover:text-rose-500 transition-colors"><Trash2 size={18}/></button>
            </div>
            <input 
              type="number" value={number} onChange={(e) => handleNumberChange(e.target.value)}
              className="w-full px-6 py-6 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-600 rounded-2xl outline-none text-4xl font-black transition-all"
              placeholder="e.g. 2024"
            />
          </div>

          {/* Roman Output */}
          <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 md:p-10 border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-2">
                <Columns size={20} className="text-emerald-600" />
                Roman Numerals
              </h3>
              <div className="flex items-center gap-2">
                <button onClick={() => navigator.clipboard.writeText(roman)} className="p-2 text-gray-300 hover:text-indigo-600"><Copy size={18}/></button>
                <button onClick={() => setRoman("")} className="text-gray-300 hover:text-rose-500 transition-colors"><Trash2 size={18}/></button>
              </div>
            </div>
            <input 
              type="text" value={roman} onChange={(e) => handleRomanChange(e.target.value)}
              className="w-full px-6 py-6 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-emerald-600 rounded-2xl outline-none text-4xl font-black font-serif tracking-widest transition-all"
              placeholder="e.g. MMXXIV"
            />
          </div>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="p-4 bg-rose-50 dark:bg-rose-900/30 border border-rose-200 dark:border-rose-800 rounded-2xl flex items-center gap-3"
            >
              <AlertCircle size={18} className="text-rose-600" />
              <p className="text-xs font-bold text-rose-600">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reference Table */}
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-[2.5rem] p-8 md:p-10 border border-gray-100 dark:border-gray-800">
           <h3 className="font-black text-gray-900 dark:text-white flex items-center gap-2 mb-8 uppercase tracking-widest text-xs">
            <Info size={16} className="text-indigo-600" />
            Roman Numeral Reference Chart
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {ROMAN_MAP.map(([val, sym]) => (
              <div key={sym} className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 text-center group hover:border-indigo-500/50 transition-all">
                <span className="text-3xl font-serif font-black block mb-2 text-indigo-600 group-hover:scale-110 transition-transform">{sym}</span>
                <span className="text-xs font-black text-gray-400 uppercase tracking-widest">{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl text-indigo-600">
              <Zap size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Historical Context</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Roman numerals originated in ancient Rome and remained the usual way of writing numbers 
                throughout Europe well into the Late Middle Ages.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl text-emerald-600">
              <CheckCircle2 size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Modern Usage</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Today, Roman numerals are still used in names of monarchs, book chapters, watch faces, 
                and for stylistic purposes in movie credits (copyright years).
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
