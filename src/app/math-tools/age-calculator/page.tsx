"use client";

import React, { useState, useMemo } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  Calendar, 
  Trash2, 
  Zap, 
  RefreshCcw, 
  Clock, 
  User, 
  Activity,
  History,
  Info,
  ChevronRight,
  Timer
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AgeCalculator() {
  const tool = tools.find((t) => t.id === "age-calculator")!;

  // State
  const [birthDate, setBirthDate] = useState("1995-01-01");
  const [targetDate, setTargetDate] = useState(new Date().toISOString().split('T')[0]);

  const age = useMemo(() => {
    const birth = new Date(birthDate);
    const target = new Date(targetDate);
    
    if (isNaN(birth.getTime()) || isNaN(target.getTime())) return null;
    
    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    const totalDays = Math.floor((target.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;

    return { years, months, days, totalDays, totalWeeks, totalMonths };
  }, [birthDate, targetDate]);

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Date Inputs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-10 border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                 <User size={14} className="text-indigo-600" /> Date of Birth
              </h3>
              <input 
                type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)}
                className="w-full px-8 py-5 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-600 rounded-[2rem] outline-none text-xl font-black transition-all shadow-inner uppercase"
              />
           </div>
           <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-10 border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                 <Calendar size={14} className="text-emerald-600" /> Target Date
              </h3>
              <input 
                type="date" value={targetDate} onChange={(e) => setTargetDate(e.target.value)}
                className="w-full px-8 py-5 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-emerald-600 rounded-[2rem] outline-none text-xl font-black transition-all shadow-inner uppercase"
              />
           </div>
        </div>

        {/* Results Dashboard */}
        <AnimatePresence mode="wait">
          {age && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
               
               {/* Main Age Card */}
               <div className="bg-indigo-600 rounded-[4rem] p-12 text-white shadow-2xl shadow-indigo-600/30 text-center relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 opacity-10">
                    <History size={300} />
                  </div>
                  <h4 className="text-[11px] font-black uppercase tracking-[0.2em] mb-6 opacity-70">Current Age</h4>
                  <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 relative z-10">
                     <div className="space-y-1">
                        <h2 className="text-8xl font-black leading-none">{age.years}</h2>
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-50">Years</p>
                     </div>
                     <div className="w-px h-16 bg-white/20 hidden md:block" />
                     <div className="space-y-1">
                        <h2 className="text-8xl font-black leading-none">{age.months}</h2>
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-50">Months</p>
                     </div>
                     <div className="w-px h-16 bg-white/20 hidden md:block" />
                     <div className="space-y-1">
                        <h2 className="text-8xl font-black leading-none">{age.days}</h2>
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-50">Days</p>
                     </div>
                  </div>
               </div>

               {/* Detailed Stats Grid */}
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Total Months", val: age.totalMonths, icon: Activity, color: "text-blue-500" },
                    { label: "Total Weeks", val: age.totalWeeks, icon: Timer, color: "text-emerald-500" },
                    { label: "Total Days", val: age.totalDays, icon: Calendar, color: "text-amber-500" },
                    { label: "Next Birthday", val: "TBD", icon: Zap, color: "text-rose-500" }
                  ].map((stat, idx) => (
                    <motion.div 
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center text-center group hover:border-indigo-600/30 transition-all"
                    >
                       <stat.icon size={20} className={`${stat.color} mb-4`} />
                       <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
                       <h4 className="text-xl font-black text-gray-900 dark:text-white">{stat.val.toLocaleString()}</h4>
                    </motion.div>
                  ))}
               </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl text-indigo-600">
              <Clock size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Time Precision</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Calculate chronological age with precise month and day accounting, handling leap 
                years and variable month lengths automatically.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl text-emerald-600">
              <RefreshCcw size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Milestone Tracking</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Determine the total time elapsed for anniversaries, project duration, or life 
                milestones in multiple units (months, weeks, days).
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
