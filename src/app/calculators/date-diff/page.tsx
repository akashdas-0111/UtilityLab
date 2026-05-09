"use client";

import React, { useState, useMemo } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  Calendar, 
  Clock, 
  ArrowRight, 
  Info,
  CalendarDays,
  Coffee,
  Briefcase,
  ChevronRight,
  Timer
} from "lucide-react";
import { motion } from "framer-motion";

export default function DateDifferenceCalculator() {
  const tool = tools.find((t) => t.id === "date-difference")!;

  // State
  const [startDate, setStartDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState<string>(new Date(new Date().getTime() + 86400000 * 30).toISOString().split('T')[0]);
  const [includeEndDay, setIncludeEndDay] = useState(false);

  // Calculations
  const results = useMemo(() => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) return null;

    let diffMs = end.getTime() - start.getTime();
    if (includeEndDay) diffMs += 86400000;
    
    const totalDays = Math.floor(diffMs / 86400000);
    const totalWeeks = Math.floor(totalDays / 7);
    const remainingDaysInWeek = totalDays % 7;

    // Work days vs Weekends
    let workDays = 0;
    let weekends = 0;
    const tempDate = new Date(start);
    const endIteration = includeEndDay ? totalDays : totalDays;
    
    for (let i = 0; i < totalDays; i++) {
      const day = tempDate.getDay();
      if (day === 0 || day === 6) weekends++;
      else workDays++;
      tempDate.setDate(tempDate.getDate() + 1);
    }

    // Years, Months, Days
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();

    if (includeEndDay) days += 1;

    if (days < 0) {
      months -= 1;
      const lastMonth = new Date(end.getFullYear(), end.getMonth(), 0);
      days += lastMonth.getDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    return {
      totalDays, totalWeeks, remainingDaysInWeek,
      workDays, weekends,
      years, months, days
    };
  }, [startDate, endDate, includeEndDay]);

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Input Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <Calendar size={14} className="text-indigo-600" /> Start Date
              </label>
              <input 
                type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-600 rounded-2xl outline-none text-lg font-bold"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <CalendarDays size={14} className="text-indigo-600" /> End Date
              </label>
              <input 
                type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-600 rounded-2xl outline-none text-lg font-bold"
              />
            </div>
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input 
                  type="checkbox" checked={includeEndDay} onChange={(e) => setIncludeEndDay(e.target.checked)}
                  className="sr-only"
                />
                <div className={`w-10 h-5 rounded-full transition-colors ${includeEndDay ? "bg-indigo-600" : "bg-gray-200 dark:bg-gray-700"}`} />
                <div className={`absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition-transform ${includeEndDay ? "translate-x-5" : "translate-x-0"}`} />
              </div>
              <span className="text-xs font-bold text-gray-500 group-hover:text-indigo-600 transition-colors">Include end day (+1 day)</span>
            </label>
          </div>

          <div className="lg:col-span-2 flex justify-center">
            <div className="w-12 h-12 rounded-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex items-center justify-center text-gray-400">
              <ArrowRight size={24} />
            </div>
          </div>

          <div className="lg:col-span-5 bg-indigo-600 rounded-3xl p-8 md:p-10 text-white shadow-xl shadow-indigo-600/20 text-center space-y-4">
            {!results ? (
              <p className="text-indigo-200 font-bold uppercase tracking-widest text-sm">Waiting for selection</p>
            ) : (
              <>
                <p className="text-indigo-200 font-bold uppercase tracking-widest text-xs">Total Duration</p>
                <h2 className="text-6xl font-black">{results.totalDays}</h2>
                <p className="text-2xl font-bold opacity-80 uppercase tracking-widest">Days</p>
              </>
            )}
          </div>
        </div>

        {results && (
          <>
            {/* Breakdowns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center text-center space-y-4">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-2xl text-blue-600">
                  <Clock size={28} />
                </div>
                <div>
                  <p className="text-3xl font-black text-gray-900 dark:text-white">
                    {results.years}y {results.months}m {results.days}d
                  </p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Calendar Format</p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center text-center space-y-4">
                <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl text-emerald-600">
                  <Briefcase size={28} />
                </div>
                <div>
                  <p className="text-3xl font-black text-gray-900 dark:text-white">
                    {results.workDays}
                  </p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Working Days</p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center text-center space-y-4">
                <div className="p-3 bg-amber-50 dark:bg-amber-900/30 rounded-2xl text-amber-600">
                  <Coffee size={28} />
                </div>
                <div>
                  <p className="text-3xl font-black text-gray-900 dark:text-white">
                    {results.weekends}
                  </p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Weekend Days</p>
                </div>
              </div>
            </div>

            {/* Other stats */}
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-3xl p-8 border border-gray-100 dark:border-gray-800">
              <h4 className="font-black text-gray-900 dark:text-white mb-8 flex items-center gap-2 uppercase tracking-widest text-xs">
                <Timer size={16} className="text-indigo-600" /> Detailed Breakdown
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { label: "Weeks", val: results.totalWeeks },
                  { label: "Hours", val: (results.totalDays * 24).toLocaleString() },
                  { label: "Minutes", val: (results.totalDays * 24 * 60).toLocaleString() },
                  { label: "Seconds", val: (results.totalDays * 24 * 60 * 60).toLocaleString() },
                ].map(stat => (
                  <div key={stat.label}>
                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">{stat.label}</p>
                    <p className="text-2xl font-black text-gray-900 dark:text-white">{stat.val}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-indigo-50 dark:bg-indigo-900/10 rounded-3xl p-8 border border-indigo-100 dark:border-indigo-900/20">
            <h4 className="text-lg font-black text-indigo-900 dark:text-indigo-100 mb-4 flex items-center gap-2">
              <Info size={20} />
              Project Planning
            </h4>
            <p className="text-indigo-800/80 dark:text-indigo-200/80 leading-relaxed text-sm">
              Use this tool to determine project deadlines, calculate lead times, or simply find out how many days 
              are left until a significant event. The working day calculation helps in professional scheduling.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 flex flex-col justify-center">
            <h4 className="font-black text-gray-900 dark:text-white mb-2">Weekend Policy</h4>
            <p className="text-sm text-gray-500 leading-relaxed">
              This calculator assumes a standard Saturday-Sunday weekend. Working days are counted as Monday through Friday.
            </p>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
