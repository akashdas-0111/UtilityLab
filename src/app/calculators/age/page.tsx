"use client";

import React, { useState, useMemo } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  Calendar, 
  Clock, 
  Hourglass, 
  Cake, 
  Timer,
  ChevronRight,
  Info,
  Gift,
  Star
} from "lucide-react";
import { motion } from "framer-motion";

export default function AgeCalculator() {
  const tool = tools.find((t) => t.id === "age-calculator")!;

  // State
  const [dob, setDob] = useState<string>(new Date(1995, 0, 1).toISOString().split('T')[0]);
  const [atDate, setAtDate] = useState<string>(new Date().toISOString().split('T')[0]);

  // Calculations
  const results = useMemo(() => {
    const birth = new Date(dob);
    const today = new Date(atDate);

    if (isNaN(birth.getTime()) || isNaN(today.getTime()) || birth > today) {
      return null;
    }

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months -= 1;
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    // Total counts
    const diffMs = today.getTime() - birth.getTime();
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = (years * 12) + months;
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;
    const totalSeconds = totalMinutes * 60;

    // Next Birthday
    const nextBday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBday < today) {
      nextBday.setFullYear(today.getFullYear() + 1);
    }
    const diffBdayMs = nextBday.getTime() - today.getTime();
    const bdayDays = Math.ceil(diffBdayMs / (1000 * 60 * 60 * 24));
    const bdayMonths = Math.floor(bdayDays / 30.44); // avg
    const bdayRemainingDays = Math.floor(bdayDays % 30.44);

    return {
      years, months, days,
      totalMonths, totalWeeks, totalDays, totalHours, totalMinutes, totalSeconds,
      nextBday: {
        months: bdayMonths,
        days: bdayRemainingDays,
        totalDays: bdayDays
      }
    };
  }, [dob, atDate]);

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Input Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg text-indigo-600">
                <Calendar size={20} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Dates</h3>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Date of Birth</label>
                <input 
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-bold text-gray-900 dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Age at the Date of</label>
                <input 
                  type="date"
                  value={atDate}
                  onChange={(e) => setAtDate(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-bold text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Primary Results */}
          <div className="bg-indigo-600 rounded-3xl p-8 text-white shadow-xl shadow-indigo-600/20 flex flex-col justify-center items-center text-center space-y-6">
            {!results ? (
              <div className="space-y-2">
                <p className="text-indigo-200 font-bold uppercase tracking-widest text-sm">Waiting for input</p>
                <p className="text-indigo-100 text-xs">Please ensure the birth date is before the current date.</p>
              </div>
            ) : (
              <>
                <div className="space-y-1">
                  <p className="text-indigo-200 font-bold uppercase tracking-widest text-xs">You are currently</p>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-6xl font-black leading-none">{results.years}</span>
                    <span className="text-xl font-bold opacity-80 uppercase tracking-wider">Years old</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-indigo-100 font-bold">
                  <span>{results.months} Months</span>
                  <div className="w-1 h-1 bg-white/30 rounded-full" />
                  <span>{results.days} Days</span>
                </div>
              </>
            )}
          </div>
        </div>

        {results && (
          <>
            {/* Detail Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { label: "Total Months", value: results.totalMonths, icon: <Calendar size={14}/> },
                { label: "Total Weeks", value: results.totalWeeks, icon: <ChevronRight size={14}/> },
                { label: "Total Days", value: results.totalDays, icon: <Hourglass size={14}/> },
                { label: "Total Hours", value: results.totalHours.toLocaleString(), icon: <Clock size={14}/> },
                { label: "Total Minutes", value: results.totalMinutes.toLocaleString(), icon: <Timer size={14}/> },
                { label: "Total Seconds", value: results.totalSeconds.toLocaleString(), icon: <Star size={14}/> },
              ].map((stat, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={stat.label} 
                  className="bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 text-center"
                >
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter mb-1 flex items-center justify-center gap-1">
                    {stat.icon} {stat.label}
                  </p>
                  <p className="text-sm font-black text-gray-900 dark:text-white truncate">{stat.value}</p>
                </motion.div>
              ))}
            </div>

            {/* Next Birthday Section */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-6 text-center md:text-left">
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 flex items-center justify-center">
                  <Cake size={32} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white">Next Birthday</h4>
                  <p className="text-gray-500 text-sm">Don't forget to celebrate!</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl min-w-[80px]">
                  <p className="text-2xl font-black text-gray-900 dark:text-white">{results.nextBday.months}</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Months</p>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl min-w-[80px]">
                  <p className="text-2xl font-black text-gray-900 dark:text-white">{results.nextBday.days}</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Days</p>
                </div>
              </div>

              <div className="p-4 bg-emerald-500 text-white rounded-2xl font-bold text-sm flex items-center gap-2">
                <Gift size={18} />
                {results.nextBday.totalDays} Days Left
              </div>
            </div>
          </>
        )}

        {/* Informational Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-indigo-50 dark:bg-indigo-900/10 rounded-3xl p-8 border border-indigo-100 dark:border-indigo-900/20">
            <h4 className="text-lg font-black text-indigo-900 dark:text-indigo-100 mb-4 flex items-center gap-2">
              <Info size={20} />
              Chronological Age
            </h4>
            <p className="text-indigo-800/80 dark:text-indigo-200/80 leading-relaxed text-sm">
              Your age is more than just a number of years. It's the total duration of your existence 
              measured from the moment of your birth. Every second counts in your personal history.
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-3xl p-8 border border-gray-100 dark:border-gray-800">
            <h4 className="text-lg font-black text-gray-900 dark:text-white mb-4">Why calculate?</h4>
            <ul className="space-y-2">
              {['Insurance applications', 'Legal eligibility checks', 'Personal milestone tracking', 'Determining exact retirement dates'].map(item => (
                <li key={item} className="text-sm text-gray-500 flex items-center gap-2">
                  <div className="w-1 h-1 bg-indigo-600 rounded-full" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
