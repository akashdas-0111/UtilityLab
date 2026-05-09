"use client";

import React, { useState, useEffect, useMemo } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  Globe, 
  Clock, 
  ArrowRightLeft, 
  Plus, 
  Trash2, 
  Info,
  Zap,
  MapPin,
  Calendar,
  CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TIMEZONES = [
  "UTC", "America/New_York", "America/Los_Angeles", "America/Chicago", 
  "Europe/London", "Europe/Paris", "Europe/Berlin", "Asia/Tokyo", 
  "Asia/Shanghai", "Asia/Dubai", "Asia/Kolkata", "Australia/Sydney"
];

export default function TimeZoneConverter() {
  const tool = tools.find((t) => t.id === "time-zone-conv")!;

  // State
  const [baseTime, setBaseTime] = useState<string>(new Date().toISOString().slice(0, 16));
  const [baseZone, setBaseZone] = useState("UTC");
  const [targetZones, setTargetZones] = useState(["America/New_York", "Europe/London", "Asia/Kolkata"]);
  const [now, setNow] = useState(new Date());

  // Live Clock
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Conversion Logic
  const convertTime = (time: string, fromZone: string, toZone: string) => {
    try {
      const date = new Date(time);
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: toZone,
        year: 'numeric', month: 'short', day: '2-digit',
        hour: '2-digit', minute: '2-digit', hour12: true
      });
      return formatter.format(date);
    } catch (e) {
      return "Invalid Time";
    }
  };

  const addZone = (zone: string) => {
    if (!targetZones.includes(zone)) {
      setTargetZones([...targetZones, zone]);
    }
  };

  const removeZone = (zone: string) => {
    setTargetZones(targetZones.filter(z => z !== zone));
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* World Clock Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {["UTC", "America/New_York", "Europe/London", "Asia/Kolkata"].map(zone => (
            <div key={zone} className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm text-center">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{zone.split('/').pop()}</p>
              <h4 className="text-xl font-black text-indigo-600">
                {now.toLocaleTimeString("en-US", { timeZone: zone, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}
              </h4>
            </div>
          ))}
        </div>

        {/* Main Converter Panel */}
        <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-8 md:p-12 border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform text-indigo-500">
            <Globe size={120} />
          </div>

          <div className="space-y-8 relative z-10">
            
            {/* Base Time Input */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Select Base Time</label>
                <input 
                  type="datetime-local" value={baseTime} onChange={(e) => setBaseTime(e.target.value)}
                  className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-600 rounded-2xl outline-none text-xl font-bold"
                />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Base Time Zone</label>
                <select 
                  value={baseZone} onChange={(e) => setBaseZone(e.target.value)}
                  className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl outline-none text-lg font-bold"
                >
                  {TIMEZONES.map(z => <option key={z} value={z}>{z}</option>)}
                </select>
              </div>
            </div>

            {/* Results List */}
            <div className="space-y-4 pt-6">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest px-1">Converted Times</h3>
              <div className="grid grid-cols-1 gap-4">
                {targetZones.map(zone => (
                  <div key={zone} className="flex items-center justify-between p-6 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700 group">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white dark:bg-gray-900 rounded-xl text-indigo-600 shadow-sm">
                        <MapPin size={18} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{zone}</p>
                        <h4 className="text-xl font-black text-gray-900 dark:text-white">{convertTime(baseTime, baseZone, zone)}</h4>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeZone(zone)}
                      className="p-2 text-gray-300 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Add Zone Button */}
            <div className="pt-4 flex flex-wrap gap-2">
              {TIMEZONES.filter(z => !targetZones.includes(z)).map(z => (
                <button 
                  key={z} 
                  onClick={() => addZone(z)}
                  className="px-4 py-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-100 transition-all"
                >
                  + {z.split('/').pop()}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl text-indigo-600">
              <Calendar size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Meeting Planner</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Use the date-time picker to find the perfect overlap for global team meetings across US, Europe, and Asia.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl text-emerald-600">
              <Clock size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Live Sync</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                The top clocks stay synced to the exact second, helping you monitor current global hours effortlessly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
