"use client";

import React, { useState, useEffect } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  Fingerprint, 
  RefreshCcw, 
  Copy, 
  Plus, 
  Trash2, 
  Info,
  Zap,
  CheckCircle2,
  List,
  ShieldCheck,
  Settings2
} from "lucide-react";
import { v4 as uuidv4, v1 as uuidv1 } from "uuid";
import { uuidv7 } from "uuidv7";
import { motion, AnimatePresence } from "framer-motion";

type Version = "v1" | "v4" | "v7";

export default function UUIDGenerator() {
  const tool = tools.find((t) => t.id === "uuid")!;

  // State
  const [version, setVersion] = useState<Version>("v4");
  const [count, setCount] = useState(5);
  const [uuids, setUuids] = useState<string[]>([]);
  const [copied, setCopied] = useState<number | null>(null);

  const generate = () => {
    const newUuids = Array.from({ length: count }, () => {
      if (version === "v1") return uuidv1();
      if (version === "v7") return uuidv7();
      return uuidv4();
    });
    setUuids(newUuids);
  };

  useEffect(() => {
    generate();
  }, [version, count]);

  const copyToClipboard = (val: string, index: number) => {
    navigator.clipboard.writeText(val);
    setCopied(index);
    setTimeout(() => setCopied(null), 2000);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.join("\n"));
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Settings Bar */}
        <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="flex flex-wrap items-center gap-4">
             <div className="flex bg-gray-50 dark:bg-gray-800 p-2 rounded-2xl border border-gray-100 dark:border-gray-700">
               {(["v1", "v4", "v7"] as Version[]).map(v => (
                 <button 
                  key={v}
                  onClick={() => setVersion(v)}
                  className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${version === v ? 'bg-white dark:bg-gray-700 shadow-lg text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
                 >
                   {v}
                 </button>
               ))}
             </div>
             <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 px-4 py-2 rounded-2xl border border-gray-100 dark:border-gray-700">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Count</span>
                <input 
                  type="number" min="1" max="100" value={count} onChange={(e) => setCount(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
                  className="w-12 bg-transparent text-center font-black text-indigo-600 outline-none"
                />
             </div>
           </div>

           <div className="flex items-center gap-4">
             <button 
              onClick={generate}
              className="px-6 py-3 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-600/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
             >
               <RefreshCcw size={14} /> Regenerate
             </button>
             <button 
              onClick={copyAll}
              className="px-6 py-3 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-50 transition-all flex items-center gap-2"
             >
               <Copy size={14} /> Copy All
             </button>
           </div>
        </div>

        {/* UUID List */}
        <div className="grid grid-cols-1 gap-4">
          <AnimatePresence mode="popLayout">
            {uuids.map((id, idx) => (
              <motion.div 
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={id + idx}
                className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center justify-between group hover:border-indigo-600/50 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-400 font-mono text-xs font-bold">
                    {idx + 1}
                  </div>
                  <code className="text-sm md:text-lg font-black font-mono tracking-tight text-gray-900 dark:text-white truncate">
                    {id}
                  </code>
                </div>
                <button 
                  onClick={() => copyToClipboard(id, idx)}
                  className={`p-3 rounded-xl transition-all ${copied === idx ? "bg-emerald-500 text-white" : "text-gray-300 hover:text-indigo-600 hover:bg-indigo-50"}`}
                >
                  {copied === idx ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-indigo-600/20 flex flex-col justify-between">
            <Zap size={24} className="mb-4 text-indigo-300" />
            <div>
              <h4 className="font-black mb-2">v4 (Random)</h4>
              <p className="text-xs text-indigo-100 opacity-80 leading-relaxed">
                The most common version. Generated using high-quality random numbers for extreme collision resistance.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col justify-between">
            <ShieldCheck size={24} className="mb-4 text-emerald-600" />
            <div>
              <h4 className="font-black text-gray-900 dark:text-white mb-2">v7 (Time-Sorted)</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                New standard! Time-ordered UUIDs that are better for database indexing performance.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col justify-between">
            <Settings2 size={24} className="mb-4 text-amber-600" />
            <div>
              <h4 className="font-black text-gray-900 dark:text-white mb-2">v1 (Timestamp)</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Generated from the host computer's MAC address and current timestamp.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
