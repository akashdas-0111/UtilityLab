"use client";

import React, { useState, useMemo } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  Clock, 
  Terminal, 
  Trash2, 
  Copy, 
  CheckCircle2, 
  Zap, 
  RefreshCcw, 
  Calendar,
  AlertCircle,
  Settings2,
  List,
  Info
} from "lucide-react";
import cronstrue from "cronstrue";
import cronParser from "cron-parser";
import { motion, AnimatePresence } from "framer-motion";

export default function CronParser() {
  const tool = tools.find((t) => t.id === "cron-parser")!;

  // State
  const [expression, setExpression] = useState("0 12 * * MON-FRI");
  const [copied, setCopied] = useState(false);

  const results = useMemo(() => {
    try {
      const description = cronstrue.toString(expression, { use24HourTimeFormat: true });
      const interval = cronParser.parseExpression(expression);
      const nextDates = [];
      for (let i = 0; i < 5; i++) {
        nextDates.push(interval.next().toString());
      }
      return { description, nextDates, error: null };
    } catch (e: any) {
      return { description: null, nextDates: [], error: e.message };
    }
  }, [expression]);

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Input Card */}
        <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-8 md:p-12 border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform text-indigo-500">
            <Clock size={120} />
          </div>

          <div className="space-y-6 relative z-10">
            <div className="flex items-center justify-between px-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <Terminal size={14} className="text-indigo-600" />
                Cron Expression
              </label>
              <button onClick={() => setExpression("")} className="text-gray-300 hover:text-rose-500 transition-colors"><Trash2 size={14}/></button>
            </div>
            <input 
              value={expression} onChange={(e) => setExpression(e.target.value)}
              className="w-full px-8 py-6 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-600 rounded-[2rem] outline-none text-2xl font-mono font-black transition-all"
              placeholder="e.g. 0 * * * *"
            />
            
            <AnimatePresence mode="wait">
               {results.error ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-800 rounded-2xl flex items-center gap-3 text-rose-600 text-xs font-bold"
                  >
                    <AlertCircle size={16} /> {results.error}
                  </motion.div>
               ) : (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-8 bg-indigo-600 rounded-[2.5rem] text-white shadow-xl shadow-indigo-600/20"
                  >
                     <div className="flex items-center gap-3 mb-2">
                        <Zap size={16} className="text-indigo-200" />
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-70">Human Interpretation</span>
                     </div>
                     <p className="text-2xl font-black">{results.description}</p>
                  </motion.div>
               )}
            </AnimatePresence>
          </div>
        </div>

        {/* Schedule Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           {/* Next Occurrences */}
           <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 md:p-10 border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
              <h3 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
                <Calendar size={18} className="text-emerald-600" /> Next 5 Occurrences
              </h3>
              <div className="space-y-3">
                 {results.nextDates.length > 0 ? results.nextDates.map((date, i) => (
                   <div key={i} className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700 flex items-center justify-between group">
                      <div className="flex items-center gap-4">
                        <span className="text-xs font-black text-gray-300">#{i+1}</span>
                        <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{date}</span>
                      </div>
                      <CheckCircle2 size={16} className="text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                   </div>
                 )) : (
                   <div className="h-32 flex items-center justify-center text-gray-300 font-bold uppercase text-[10px] tracking-widest">Awaiting valid expression</div>
                 )}
              </div>
           </div>

           {/* Reference Table */}
           <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 md:p-10 border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
              <h3 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
                <List size={18} className="text-amber-500" /> Quick Syntax
              </h3>
              <div className="grid grid-cols-2 gap-4">
                 {[
                   { label: "*", desc: "Any value" },
                   { label: ",", desc: "Value list separator" },
                   { label: "-", desc: "Range of values" },
                   { label: "/", desc: "Step values" },
                   { label: "0 0 * * *", desc: "Daily at midnight" },
                   { label: "*/15 * * * *", desc: "Every 15 minutes" }
                 ].map(item => (
                   <div key={item.label} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                      <code className="text-xs font-black text-indigo-600 block mb-1">{item.label}</code>
                      <p className="text-[10px] text-gray-400 font-bold uppercase">{item.desc}</p>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl text-indigo-600">
              <Settings2 size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Natural Language</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Powered by `cronstrue`, our parser converts complex five or six-part cron 
                expressions into simple, easy-to-read English sentences.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl text-emerald-600">
              <Info size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Validation First</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Includes real-time syntax validation. If your cron expression is invalid, our 
                tool provides detailed error messages to help you fix it fast.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
