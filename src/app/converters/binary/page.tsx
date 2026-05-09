"use client";

import React, { useState, useMemo } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  Binary, 
  Hash, 
  ArrowRightLeft, 
  Copy, 
  Info,
  CheckCircle2,
  Cpu,
  Zap,
  Code
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function BinaryConverter() {
  const tool = tools.find((t) => t.id === "binary-converter")!;

  // State
  const [decimal, setDecimal] = useState<string>("255");
  const [binary, setBinary] = useState<string>("11111111");
  const [hex, setHex] = useState<string>("FF");
  const [octal, setOctal] = useState<string>("377");
  const [error, setError] = useState<string | null>(null);

  // Sync Logic
  const syncFromDecimal = (val: string) => {
    setDecimal(val);
    if (!val) {
      setBinary(""); setHex(""); setOctal(""); setError(null);
      return;
    }
    const num = parseInt(val, 10);
    if (isNaN(num)) {
      setError("Invalid decimal number");
    } else {
      setBinary(num.toString(2));
      setHex(num.toString(16).toUpperCase());
      setOctal(num.toString(8));
      setError(null);
    }
  };

  const syncFromBinary = (val: string) => {
    setBinary(val);
    if (!val) {
      setDecimal(""); setHex(""); setOctal(""); setError(null);
      return;
    }
    const num = parseInt(val, 2);
    if (isNaN(num)) {
      setError("Invalid binary number");
    } else {
      setDecimal(num.toString(10));
      setHex(num.toString(16).toUpperCase());
      setOctal(num.toString(8));
      setError(null);
    }
  };

  const syncFromHex = (val: string) => {
    setHex(val);
    if (!val) {
      setDecimal(""); setBinary(""); setOctal(""); setError(null);
      return;
    }
    const num = parseInt(val, 16);
    if (isNaN(num)) {
      setError("Invalid hex number");
    } else {
      setDecimal(num.toString(10));
      setBinary(num.toString(2));
      setOctal(num.toString(8));
      setError(null);
    }
  };

  const syncFromOctal = (val: string) => {
    setOctal(val);
    if (!val) {
      setDecimal(""); setBinary(""); setHex(""); setError(null);
      return;
    }
    const num = parseInt(val, 8);
    if (isNaN(num)) {
      setError("Invalid octal number");
    } else {
      setDecimal(num.toString(10));
      setBinary(num.toString(2));
      setHex(num.toString(16).toUpperCase());
      setError(null);
    }
  };

  const copyToClipboard = (val: string) => {
    navigator.clipboard.writeText(val);
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Main Interface */}
        <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-8 md:p-12 border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
            <Cpu size={120} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
            
            {/* Decimal Input */}
            <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Decimal (Base 10)</label>
                <button onClick={() => copyToClipboard(decimal)} className="text-gray-300 hover:text-indigo-600 transition-colors"><Copy size={14}/></button>
              </div>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">10</div>
                <input 
                  type="text" value={decimal} onChange={(e) => syncFromDecimal(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-600 rounded-2xl outline-none text-2xl font-black font-mono transition-all"
                />
              </div>
            </div>

            {/* Binary Input */}
            <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Binary (Base 2)</label>
                <button onClick={() => copyToClipboard(binary)} className="text-gray-300 hover:text-indigo-600 transition-colors"><Copy size={14}/></button>
              </div>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">01</div>
                <input 
                  type="text" value={binary} onChange={(e) => syncFromBinary(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-600 rounded-2xl outline-none text-2xl font-black font-mono transition-all"
                />
              </div>
            </div>

            {/* Hex Input */}
            <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Hexadecimal (Base 16)</label>
                <button onClick={() => copyToClipboard(hex)} className="text-gray-300 hover:text-indigo-600 transition-colors"><Copy size={14}/></button>
              </div>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">0X</div>
                <input 
                  type="text" value={hex} onChange={(e) => syncFromHex(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-600 rounded-2xl outline-none text-2xl font-black font-mono transition-all"
                />
              </div>
            </div>

            {/* Octal Input */}
            <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Octal (Base 8)</label>
                <button onClick={() => copyToClipboard(octal)} className="text-gray-300 hover:text-indigo-600 transition-colors"><Copy size={14}/></button>
              </div>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">0O</div>
                <input 
                  type="text" value={octal} onChange={(e) => syncFromOctal(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-600 rounded-2xl outline-none text-2xl font-black font-mono transition-all"
                />
              </div>
            </div>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="mt-8 p-4 bg-rose-50 dark:bg-rose-900/30 border border-rose-200 dark:border-rose-800 rounded-2xl flex items-center gap-3"
              >
                <AlertCircle size={18} className="text-rose-600" />
                <p className="text-xs font-bold text-rose-600">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Informational Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-indigo-50 dark:bg-indigo-900/10 rounded-3xl p-8 border border-indigo-100 dark:border-indigo-900/20 flex items-start gap-4">
            <div className="p-3 bg-indigo-500 text-white rounded-2xl">
              <Binary size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-indigo-900 dark:text-indigo-100">Why Use Binary?</h4>
              <p className="text-sm text-indigo-800/70 dark:text-indigo-200/70 leading-relaxed">
                Binary is the fundamental language of computers. Everything from high-level code to 
                images and videos is ultimately stored as sequences of 0s and 1s.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl text-emerald-600">
              <Code size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Hexadecimal in Web</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Hex (Base 16) is widely used in web development for color codes (e.g. #FFFFFF) 
                and memory addresses because it's more human-readable than raw binary.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
