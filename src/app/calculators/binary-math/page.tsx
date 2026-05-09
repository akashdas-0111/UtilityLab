"use client";

import React, { useState, useMemo } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  Binary, 
  Settings, 
  Info,
  Hash,
  Activity,
  Code,
  Terminal,
  Cpu
} from "lucide-react";
import { motion } from "framer-motion";

type Operation = "add" | "sub" | "mul" | "div" | "and" | "or" | "xor";

export default function BinaryCalculator() {
  const tool = tools.find((t) => t.id === "binary-calc")!;

  // State
  const [val1, setVal1] = useState<string>("1010");
  const [val2, setVal2] = useState<string>("1100");
  const [operation, setOperation] = useState<Operation>("add");

  // Logic
  const results = useMemo(() => {
    try {
      const n1 = parseInt(val1, 2);
      const n2 = parseInt(val2, 2);

      if (isNaN(n1) || isNaN(n2)) return null;

      let res = 0;
      switch (operation) {
        case "add": res = n1 + n2; break;
        case "sub": res = n1 - n2; break;
        case "mul": res = n1 * n2; break;
        case "div": res = Math.floor(n1 / n2); break;
        case "and": res = n1 & n2; break;
        case "or": res = n1 | n2; break;
        case "xor": res = n1 ^ n2; break;
      }

      return {
        bin: res.toString(2),
        dec: res.toString(10),
        hex: res.toString(16).toUpperCase(),
        oct: res.toString(8)
      };
    } catch (e) {
      return null;
    }
  }, [val1, val2, operation]);

  const isValidBinary = (str: string) => /^[01]*$/.test(str);

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Main Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Inputs Section */}
          <div className="space-y-8 bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 md:p-10 border border-gray-100 dark:border-gray-800 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg text-indigo-600">
                <Terminal size={20} />
              </div>
              <h3 className="text-xl font-black text-gray-900 dark:text-white">Binary Inputs</h3>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Binary Value 1</label>
                <input 
                  type="text" value={val1} onChange={(e) => isValidBinary(e.target.value) && setVal1(e.target.value)}
                  className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-600 rounded-2xl outline-none text-2xl font-black text-indigo-600 tracking-widest"
                  placeholder="e.g. 1010"
                />
              </div>
              
              <div className="flex justify-center py-2">
                <div className="grid grid-cols-4 md:grid-cols-7 gap-2 w-full">
                  {[
                    { id: "add", label: "+" }, { id: "sub", label: "-" }, { id: "mul", label: "×" }, { id: "div", label: "÷" },
                    { id: "and", label: "AND" }, { id: "or", label: "OR" }, { id: "xor", label: "XOR" }
                  ].map(op => (
                    <button 
                      key={op.id}
                      onClick={() => setOperation(op.id as Operation)}
                      className={`py-2 rounded-xl font-black text-xs transition-all ${operation === op.id ? "bg-indigo-600 text-white shadow-lg" : "bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-gray-200"}`}
                    >
                      {op.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Binary Value 2</label>
                <input 
                  type="text" value={val2} onChange={(e) => isValidBinary(e.target.value) && setVal2(e.target.value)}
                  className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-600 rounded-2xl outline-none text-2xl font-black text-indigo-600 tracking-widest"
                  placeholder="e.g. 1100"
                />
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-gray-900 rounded-[2.5rem] p-8 md:p-10 text-white shadow-2xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
              <Cpu size={120} />
            </div>

            <div className="space-y-6 relative z-10">
              <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Binary Result</p>
                <div className="bg-white/5 p-6 rounded-2xl border border-white/5 break-all">
                  <p className="text-3xl font-black text-indigo-400 tracking-widest">{results?.bin || "---"}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Decimal</p>
                  <p className="text-xl font-black">{results?.dec || "0"}</p>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Hexadecimal</p>
                  <p className="text-xl font-black">0x{results?.hex || "0"}</p>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Octal</p>
                  <p className="text-xl font-black">{results?.oct || "0"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Binary Guide */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-indigo-50 dark:bg-indigo-900/10 rounded-3xl p-8 border border-indigo-100 dark:border-indigo-900/20">
            <h4 className="text-lg font-black text-indigo-900 dark:text-indigo-100 mb-4 flex items-center gap-2">
              <Code size={20} />
              Bitwise Operations
            </h4>
            <div className="space-y-3 text-sm text-indigo-800/80 dark:text-indigo-200/80 leading-relaxed font-medium">
              <p>• **AND (&):** Result is 1 only if both bits are 1.</p>
              <p>• **OR (|):** Result is 1 if at least one bit is 1.</p>
              <p>• **XOR (^):** Result is 1 if bits are different.</p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
             <h4 className="font-black text-gray-900 dark:text-white mb-2 flex items-center gap-2">
              <Info size={18} className="text-indigo-600" />
              Pro Tip
            </h4>
            <p className="text-sm text-gray-500 leading-relaxed">
              Binary math is the foundation of digital computing. Each digit (bit) represents a power of 2. 
              The leftmost bit in a 1010 string is 2^3 (8), then 2^2 (4), 2^1 (2), and 2^0 (1).
            </p>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
