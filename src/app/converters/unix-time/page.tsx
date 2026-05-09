"use client";

import React, { useState, useEffect, useMemo } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  Timer, 
  Calendar, 
  ArrowRightLeft, 
  Copy, 
  Clock,
  Info,
  Zap,
  Globe,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function UnixTimestampConverter() {
  const tool = tools.find((t) => t.id === "unix-timestamp")!;

  // State
  const [now, setNow] = useState(Math.floor(Date.now() / 1000));
  const [timestamp, setTimestamp] = useState<string>(Math.floor(Date.now() / 1000).toString());
  const [dateInput, setDateInput] = useState<string>(new Date().toISOString().slice(0, 19));

  // Live Clock
  useEffect(() => {
    const timer = setInterval(() => setNow(Math.floor(Date.now() / 1000)), 1000);
    return () => clearInterval(timer);
  }, []);

  // Conversion Results
  const tsResults = useMemo(() => {
    try {
      const ms = timestamp.length > 10 ? parseInt(timestamp) : parseInt(timestamp) * 1000;
      const date = new Date(ms);
      if (isNaN(date.getTime())) throw new Error();
      return {
        local: date.toLocaleString(),
        utc: date.toUTCString(),
        relative: new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(
          Math.floor((date.getTime() - Date.now()) / 1000 / 60), "minute"
        ),
        iso: date.toISOString()
      };
    } catch (e) {
      return null;
    }
  }, [timestamp]);

  const dateToTs = useMemo(() => {
    try {
      const date = new Date(dateInput);
      return Math.floor(date.getTime() / 1000);
    } catch (e) {
      return null;
    }
  }, [dateInput]);

  const copyToClipboard = (val: string) => {
    navigator.clipboard.writeText(val);
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Live Clock Header */}
        <div className="bg-indigo-600 rounded-[3rem] p-10 text-white shadow-2xl shadow-indigo-600/20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
            <Timer size={120} />
          </div>
          <div className="relative z-10">
            <p className="text-xs font-bold text-indigo-200 uppercase tracking-widest mb-2">Current Unix Timestamp</p>
            <h2 className="text-6xl md:text-7xl font-black font-mono tracking-tighter mb-4">{now}</h2>
            <div className="flex flex-wrap gap-4">
              <span className="px-4 py-2 bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                <Globe size={14} /> UTC: {new Date().toUTCString().split(' ')[4]}
              </span>
              <button 
                onClick={() => setTimestamp(now.toString())}
                className="px-4 py-2 bg-white text-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all"
              >
                Use Current
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Timestamp to Date */}
          <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 md:p-10 border border-gray-100 dark:border-gray-800 shadow-sm space-y-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg text-indigo-600">
                <Timer size={20} />
              </div>
              <h3 className="text-xl font-black text-gray-900 dark:text-white">Timestamp to Date</h3>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Unix Timestamp</label>
              <input 
                type="text" value={timestamp} onChange={(e) => setTimestamp(e.target.value)}
                className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-600 rounded-2xl outline-none text-2xl font-black font-mono"
              />
            </div>

            <div className="space-y-4 pt-4">
              {tsResults ? (
                <>
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Local Time</p>
                      <p className="text-sm font-black text-gray-900 dark:text-white">{tsResults.local}</p>
                    </div>
                    <button onClick={() => copyToClipboard(tsResults.local)} className="text-gray-300 hover:text-indigo-600"><Copy size={16}/></button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">UTC Time</p>
                      <p className="text-sm font-black text-gray-900 dark:text-white">{tsResults.utc}</p>
                    </div>
                    <button onClick={() => copyToClipboard(tsResults.utc)} className="text-gray-300 hover:text-indigo-600"><Copy size={16}/></button>
                  </div>
                   <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">ISO 8601</p>
                      <p className="text-sm font-black text-indigo-600">{tsResults.iso}</p>
                    </div>
                    <button onClick={() => copyToClipboard(tsResults.iso)} className="text-gray-300 hover:text-indigo-600"><Copy size={16}/></button>
                  </div>
                </>
              ) : (
                <div className="p-8 border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-3xl flex flex-col items-center justify-center text-center opacity-50">
                  <AlertCircle size={32} className="text-rose-500 mb-2" />
                  <p className="text-xs font-bold uppercase tracking-widest">Invalid Timestamp</p>
                </div>
              )}
            </div>
          </div>

          {/* Date to Timestamp */}
          <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 md:p-10 border border-gray-100 dark:border-gray-800 shadow-sm space-y-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg text-emerald-600">
                <Calendar size={20} />
              </div>
              <h3 className="text-xl font-black text-gray-900 dark:text-white">Date to Timestamp</h3>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Select Date & Time</label>
              <input 
                type="datetime-local" value={dateInput} onChange={(e) => setDateInput(e.target.value)}
                className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-emerald-600 rounded-2xl outline-none text-xl font-bold"
              />
            </div>

            <div className="pt-10 flex flex-col items-center justify-center text-center space-y-4">
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Calculated Epoch</p>
               <h4 className="text-5xl font-black font-mono text-emerald-600 tracking-tighter">{dateToTs}</h4>
               <button 
                onClick={() => dateToTs && copyToClipboard(dateToTs.toString())}
                className="flex items-center gap-2 px-6 py-3 bg-emerald-50 dark:bg-emerald-900/10 text-emerald-600 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-emerald-100 transition-all"
               >
                <Copy size={16} /> Copy Timestamp
               </button>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl text-indigo-600">
              <Info size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-gray-900 dark:text-white">What is Epoch?</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                The Unix epoch is the time 00:00:00 UTC on 1 January 1970. Unix time is the number of seconds 
                that have elapsed since that moment.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl text-emerald-600">
              <Zap size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-gray-900 dark:text-white">Seconds vs MS</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Standard Unix time is in seconds (10 digits). JavaScript and modern APIs often use 
                milliseconds (13 digits). Our tool automatically detects and handles both.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
