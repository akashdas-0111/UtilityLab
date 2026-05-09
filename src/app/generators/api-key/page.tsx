"use client";

import React, { useState } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  Key, 
  RefreshCw, 
  Copy, 
  Shield, 
  Settings,
  Lock,
  Eye,
  EyeOff
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function APIKeyGenerator() {
  const tool = tools.find((t) => t.id === "api-key-gen")!;
  const [length, setLength] = useState(32);
  const [prefix, setPrefix] = useState("sk_live_");
  const [keys, setKeys] = useState<string[]>([]);
  const [showKeys, setShowKeys] = useState(true);

  const generateKeys = () => {
    const newKeys = Array.from({ length: 5 }, () => {
      const randomPart = Array.from(crypto.getRandomValues(new Uint8Array(length)))
        .map(b => b.toString(36))
        .join("")
        .substring(0, length);
      return `${prefix}${randomPart}`;
    });
    setKeys(newKeys);
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-12">
        
        {/* Controls */}
        <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-10 border border-gray-100 dark:border-gray-800 shadow-xl space-y-8">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <label className="block">
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 mb-2 block">Key Prefix (e.g. sk_live_)</span>
                <input 
                  type="text" value={prefix} onChange={(e) => setPrefix(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-indigo-500 font-bold"
                />
              </label>

              <label className="block">
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 mb-2 block">Entropy Length (${length})</span>
                <input 
                  type="range" min="16" max="64" value={length} onChange={(e) => setLength(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-600 mt-4"
                />
              </label>
           </div>

           <button 
            onClick={generateKeys}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-5 rounded-2xl shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-3 transition-all"
           >
             <RefreshCw size={20} />
             GENERATE API SECRETS
           </button>
        </div>

        {/* Results */}
        <AnimatePresence>
          {keys.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between px-6">
                <h3 className="text-sm font-black uppercase tracking-widest text-gray-400">Generated Secrets</h3>
                <button 
                  onClick={() => setShowKeys(!showKeys)}
                  className="flex items-center gap-2 text-xs font-bold text-indigo-600"
                >
                  {showKeys ? <EyeOff size={16} /> : <Eye size={16} />}
                  {showKeys ? "MASK KEYS" : "REVEAL KEYS"}
                </button>
              </div>

              {keys.map((key, i) => (
                <div key={i} className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 flex items-center justify-between group">
                   <code className="font-mono text-sm text-gray-600 dark:text-indigo-300">
                     {showKeys ? key : key.replace(/./g, "•")}
                   </code>
                   <button 
                    onClick={() => navigator.clipboard.writeText(key)}
                    className="p-2 opacity-0 group-hover:opacity-100 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 rounded-lg transition-all"
                   >
                     <Copy size={16} />
                   </button>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ToolLayout>
  );
}
