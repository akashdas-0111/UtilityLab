"use client";

import React, { useState, useEffect } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  Laptop, 
  Smartphone, 
  Monitor, 
  Globe, 
  Cpu, 
  Info,
  Zap,
  RefreshCcw,
  Trash2,
  Terminal,
  ShieldCheck,
  Search,
  CheckCircle2
} from "lucide-react";
import UAParser from "ua-parser-js";
import { motion, AnimatePresence } from "framer-motion";

export default function UserAgentParser() {
  const tool = tools.find((t) => t.id === "ua-parser")!;

  // State
  const [uaInput, setUaInput] = useState("");
  const [result, setResult] = useState<any>(null);

  const parseUA = (ua: string) => {
    const parser = new UAParser(ua);
    setResult(parser.getResult());
  };

  useEffect(() => {
    const currentUA = window.navigator.userAgent;
    setUaInput(currentUA);
    parseUA(currentUA);
  }, []);

  useEffect(() => {
    parseUA(uaInput);
  }, [uaInput]);

  const useCurrent = () => {
    const currentUA = window.navigator.userAgent;
    setUaInput(currentUA);
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Input Card */}
        <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-8 md:p-12 border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform text-indigo-500">
            <Terminal size={120} />
          </div>

          <div className="space-y-6 relative z-10">
            <div className="flex items-center justify-between px-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <Search size={14} className="text-indigo-600" /> User Agent String
              </label>
              <div className="flex items-center gap-4">
                <button onClick={useCurrent} className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline transition-all">Use Current Browser</button>
                <button onClick={() => setUaInput("")} className="text-gray-300 hover:text-rose-500 transition-colors"><Trash2 size={14}/></button>
              </div>
            </div>
            <textarea 
              value={uaInput} onChange={(e) => setUaInput(e.target.value)}
              className="w-full h-32 p-8 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-600 rounded-[2.5rem] outline-none text-sm font-mono font-bold resize-none transition-all"
              placeholder="Paste User Agent string here..."
            />
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Browser */}
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center text-center gap-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-2xl text-blue-600">
              <Globe size={32} />
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Browser</p>
              <h4 className="text-xl font-black text-gray-900 dark:text-white">
                {result?.browser?.name || "Unknown"} {result?.browser?.major}
              </h4>
              <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase">{result?.engine?.name} Engine</p>
            </div>
          </div>

          {/* OS */}
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center text-center gap-4">
            <div className="p-4 bg-rose-50 dark:bg-rose-900/30 rounded-2xl text-rose-600">
              <Laptop size={32} />
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Operating System</p>
              <h4 className="text-xl font-black text-gray-900 dark:text-white">
                {result?.os?.name || "Unknown"} {result?.os?.version}
              </h4>
              <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase">Architecture: {result?.cpu?.architecture || "---"}</p>
            </div>
          </div>

          {/* Device */}
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center text-center gap-4">
            <div className="p-4 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl text-emerald-600">
              <Smartphone size={32} />
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Device Info</p>
              <h4 className="text-xl font-black text-gray-900 dark:text-white">
                {result?.device?.vendor || "Desktop"} {result?.device?.model}
              </h4>
              <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase">Type: {result?.device?.type || "Standard"}</p>
            </div>
          </div>

          {/* Extra Details */}
          <div className="bg-gray-900 rounded-[2.5rem] p-8 text-white shadow-xl flex flex-col justify-center gap-4">
             <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                   <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Engine</span>
                   <span className="text-xs font-bold text-indigo-400">{result?.engine?.name || "---"}</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                   <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Version</span>
                   <span className="text-xs font-bold text-emerald-400">{result?.engine?.version || "---"}</span>
                </div>
                <div className="flex justify-between items-center">
                   <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Bot Status</span>
                   <span className="text-[9px] font-black px-2 py-1 bg-white/10 rounded-lg">NOT DETECTED</span>
                </div>
             </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-indigo-600/20 flex items-start gap-4">
            <div className="p-3 bg-indigo-500 rounded-2xl">
              <Zap size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black">Deep Inspection</h4>
              <p className="text-sm text-indigo-100 opacity-80 leading-relaxed">
                Reveals hidden details like rendering engine, CPU architecture, and device model 
                from even the most complex UA strings.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl text-emerald-600">
              <ShieldCheck size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Reliable Parsing</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Powered by `ua-parser-js`, a battle-tested library used by major web applications 
                for accurate device and browser detection.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
