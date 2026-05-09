"use client";

import React, { useState, useEffect } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  Laptop, 
  Trash2, 
  Zap, 
  RefreshCcw, 
  Search, 
  Monitor, 
  Smartphone,
  Cpu,
  Globe,
  Settings2,
  Activity,
  Info,
  Layers,
  Terminal
} from "lucide-react";
import { UAParser } from "ua-parser-js";
import { motion, AnimatePresence } from "framer-motion";

export default function UAParserTool() {
  const tool = tools.find((t) => t.id === "ua-parser")!;

  // State
  const [ua, setUa] = useState("");
  const [data, setData] = useState<any>(null);

  const parseUA = (val: string) => {
    const parser = new UAParser(val);
    setData(parser.getResult());
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentUA = window.navigator.userAgent;
      setUa(currentUA);
      parseUA(currentUA);
    }
  }, []);

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Search Bar */}
        <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-10 md:p-12 border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform text-indigo-500">
            <Monitor size={120} />
          </div>

          <div className="space-y-6 relative z-10">
            <div className="flex items-center justify-between px-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <Search size={14} className="text-indigo-600" />
                User Agent String
              </label>
              <button onClick={() => { setUa(""); setData(null); }} className="text-gray-300 hover:text-rose-500 transition-colors"><Trash2 size={14}/></button>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <input 
                value={ua} onChange={(e) => { setUa(e.target.value); parseUA(e.target.value); }}
                className="flex-1 px-8 py-6 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-600 rounded-[2.5rem] outline-none text-xs font-mono font-bold transition-all shadow-inner"
                placeholder="Paste User Agent string here..."
              />
            </div>
          </div>
        </div>

        {/* Results Grid */}
        <AnimatePresence mode="wait">
          {data && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
               
               {/* Main Insight Cards */}
               <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-8 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[2.5rem] shadow-sm flex items-center gap-6 group hover:border-indigo-600/30 transition-all">
                     <div className="p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl text-indigo-600">
                        <Globe size={24} />
                     </div>
                     <div>
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Browser</p>
                        <h4 className="text-xl font-black text-gray-900 dark:text-white">{data.browser.name || "Unknown"} {data.browser.version}</h4>
                     </div>
                  </div>
                  <div className="p-8 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[2.5rem] shadow-sm flex items-center gap-6 group hover:border-emerald-600/30 transition-all">
                     <div className="p-4 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl text-emerald-600">
                        <Laptop size={24} />
                     </div>
                     <div>
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Operating System</p>
                        <h4 className="text-xl font-black text-gray-900 dark:text-white">{data.os.name || "Unknown"} {data.os.version}</h4>
                     </div>
                  </div>
                  <div className="p-8 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[2.5rem] shadow-sm flex items-center gap-6 group hover:border-amber-600/30 transition-all">
                     <div className="p-4 bg-amber-50 dark:bg-amber-900/30 rounded-2xl text-amber-600">
                        <Smartphone size={24} />
                     </div>
                     <div>
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Device Type</p>
                        <h4 className="text-xl font-black text-gray-900 dark:text-white">{data.device.type || "Desktop"}</h4>
                        <p className="text-[10px] font-bold text-gray-400 uppercase mt-1">{data.device.vendor} {data.device.model}</p>
                     </div>
                  </div>
                  <div className="p-8 bg-gray-900 rounded-[2.5rem] shadow-xl flex items-center gap-6 text-white group">
                     <div className="p-4 bg-white/10 rounded-2xl text-indigo-400">
                        <Cpu size={24} />
                     </div>
                     <div>
                        <p className="text-[9px] font-black text-white/50 uppercase tracking-widest mb-1">Engine</p>
                        <h4 className="text-xl font-black">{data.engine.name || "Unknown"}</h4>
                        <p className="text-[10px] font-bold text-indigo-400 uppercase mt-1">Ver: {data.engine.version}</p>
                     </div>
                  </div>
               </div>

               {/* Raw Details Sidebar */}
               <div className="lg:col-span-4 bg-white dark:bg-gray-900 rounded-[3rem] border border-gray-100 dark:border-gray-800 shadow-sm p-10 space-y-8 flex flex-col">
                  <h3 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
                     <Terminal size={18} className="text-indigo-600" /> Full Analysis
                  </h3>
                  <div className="space-y-4 flex-1">
                     <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl space-y-1">
                        <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Architecture</p>
                        <p className="text-sm font-bold text-gray-900 dark:text-white">{data.cpu.architecture || "Unknown"}</p>
                     </div>
                     <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl space-y-1">
                        <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Mobile Detection</p>
                        <p className="text-sm font-bold text-gray-900 dark:text-white">{data.device.type === 'mobile' ? 'YES' : 'NO'}</p>
                     </div>
                  </div>
                  <div className="p-6 bg-indigo-600 rounded-[2rem] text-white shadow-lg shadow-indigo-600/20 text-center">
                     <Layers size={24} className="mx-auto mb-2 opacity-50" />
                     <p className="text-[9px] font-black uppercase tracking-widest">Platform Integrity</p>
                     <p className="text-lg font-black">Verified</p>
                  </div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl text-indigo-600">
              <Activity size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Real-time Parsing</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Automatically detects your current browser's UA string or allows you to paste 
                external strings for instantaneous technical breakdown.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl text-emerald-600">
              <Settings2 size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Deep Intelligence</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Identifies not just the browser name, but the underlying rendering engine, 
                hardware vendor, and CPU architecture for precision debugging.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-amber-50 dark:bg-amber-900/30 rounded-2xl text-amber-600">
              <Info size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Mobile Detection</h4>
              <p className="text-[11px] text-gray-500 leading-relaxed">
                Instantly categorize devices into Mobile, Tablet, or Desktop, helping you 
                debug responsive layout issues and platform-specific features.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
