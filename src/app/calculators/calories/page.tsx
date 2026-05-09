"use client";

import React, { useState, useMemo } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  Flame, 
  Clock, 
  Scale, 
  Activity, 
  BarChart3,
  Search,
  Info,
  CheckCircle2,
  ChevronRight
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from "recharts";
import { motion } from "framer-motion";

const ACTIVITIES = [
  { name: "Walking (Slow)", met: 2.0, icon: "🚶" },
  { name: "Walking (Brisk)", met: 3.5, icon: "🚶‍♂️" },
  { name: "Jogging", met: 7.0, icon: "🏃" },
  { name: "Running (10km/h)", met: 10.0, icon: "🏃‍♂️" },
  { name: "Cycling (Leisure)", met: 4.0, icon: "🚲" },
  { name: "Cycling (Moderate)", met: 8.0, icon: "🚴" },
  { name: "Swimming (Laps)", met: 7.0, icon: "🏊" },
  { name: "Weight Lifting", met: 3.5, icon: "🏋️" },
  { name: "Yoga", met: 2.5, icon: "🧘" },
  { name: "Basketball", met: 8.0, icon: "🏀" },
  { name: "Soccer", met: 7.0, icon: "⚽" },
  { name: "Hiking", met: 6.0, icon: "⛰️" },
];

export default function CaloriesBurnedCalculator() {
  const tool = tools.find((t) => t.id === "calories-burned")!;

  // State
  const [weight, setWeight] = useState<number>(70);
  const [duration, setDuration] = useState<number>(30);
  const [selectedActivity, setSelectedActivity] = useState(ACTIVITIES[3]); // Running
  const [search, setSearch] = useState("");

  // Calculations
  // Formula: Calories = MET * Weight(kg) * Time(hrs)
  const calories = useMemo(() => {
    return selectedActivity.met * weight * (duration / 60);
  }, [weight, duration, selectedActivity]);

  const filteredActivities = ACTIVITIES.filter(a => 
    a.name.toLowerCase().includes(search.toLowerCase())
  );

  const comparisonData = useMemo(() => {
    return ACTIVITIES.map(a => ({
      name: a.name,
      calories: Math.round(a.met * weight * (duration / 60)),
      icon: a.icon
    })).sort((a, b) => b.calories - a.calories);
  }, [weight, duration]);

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Main Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Inputs Section */}
          <div className="space-y-8 bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 md:p-10 border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
              <Flame size={120} />
            </div>

            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-orange-50 dark:bg-orange-900/30 rounded-lg text-orange-600">
                <Activity size={20} />
              </div>
              <h3 className="text-xl font-black text-gray-900 dark:text-white">Activity Profile</h3>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Scale size={14} /> Weight (kg)
                </label>
                <input 
                  type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))}
                  className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-orange-500 rounded-2xl outline-none text-xl font-black transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Clock size={14} /> Duration (min)
                </label>
                <input 
                  type="number" value={duration} onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-orange-500 rounded-2xl outline-none text-xl font-black transition-all"
                />
              </div>
            </div>

            {/* Activity Search & Selection */}
            <div className="space-y-4">
              <div className="relative">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search activities..."
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl outline-none text-sm font-bold"
                />
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-[200px] overflow-y-auto p-1 custom-scrollbar">
                {filteredActivities.map(a => (
                  <button 
                    key={a.name}
                    onClick={() => setSelectedActivity(a)}
                    className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${selectedActivity.name === a.name ? "border-orange-500 bg-orange-50 dark:bg-orange-900/10 text-orange-600" : "border-transparent bg-gray-50 dark:bg-gray-800 text-gray-500 hover:border-gray-200"}`}
                  >
                    <span className="text-2xl mb-1">{a.icon}</span>
                    <span className="text-[10px] font-black text-center uppercase tracking-tight">{a.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Display */}
          <div className="bg-orange-600 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-orange-600/20 flex flex-col justify-center items-center text-center space-y-6">
            <p className="text-xs font-bold opacity-80 uppercase tracking-[0.2em]">Estimated Energy Burned</p>
            <div className="relative">
              <h2 className="text-8xl font-black tracking-tighter">{Math.round(calories)}</h2>
              <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-sm font-bold bg-white/20 px-3 py-1 rounded-full uppercase tracking-widest">Calories</span>
            </div>
            
            <div className="pt-8 w-full max-w-xs space-y-4">
              <div className="flex items-center justify-between text-sm border-b border-white/10 pb-4">
                <span className="opacity-70 font-bold uppercase tracking-widest text-[10px]">Selected Activity</span>
                <span className="font-black">{selectedActivity.name}</span>
              </div>
              <div className="flex items-center justify-between text-sm border-b border-white/10 pb-4">
                <span className="opacity-70 font-bold uppercase tracking-widest text-[10px]">MET Intensity</span>
                <span className="font-black">{selectedActivity.met}</span>
              </div>
            </div>

            <p className="text-xs font-medium italic opacity-70">
              Equivalent to burning about {Math.round(calories / 7.7)}g of body fat.
            </p>
          </div>
        </div>

        {/* Comparison Chart */}
        <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 md:p-10 border border-gray-100 dark:border-gray-800 shadow-sm">
          <h3 className="font-black text-gray-900 dark:text-white flex items-center gap-2 mb-8">
            <BarChart3 size={20} className="text-orange-600" />
            Comparison With Other Activities ({duration} min)
          </h3>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonData} layout="vertical" margin={{ left: 40 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700 }} />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                  formatter={(v: number) => `${v} kcal`}
                />
                <Bar dataKey="calories" radius={[0, 10, 10, 0]} barSize={24}>
                  {comparisonData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.name === selectedActivity.name ? '#ea580c' : '#fdba74'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Informational Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-orange-50 dark:bg-orange-900/10 rounded-3xl p-8 border border-orange-100 dark:border-orange-900/20">
            <h4 className="text-lg font-black text-orange-900 dark:text-orange-100 mb-4 flex items-center gap-2">
              <Info size={20} />
              What is MET?
            </h4>
            <p className="text-orange-800/80 dark:text-orange-200/80 leading-relaxed text-sm font-medium">
              MET stands for **Metabolic Equivalent of Task**. It's a measure of how much energy the body uses during a specific activity 
              compared to resting. 1 MET is the energy spent sitting quietly.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 flex flex-col justify-center">
             <h4 className="font-black text-gray-900 dark:text-white mb-2 flex items-center gap-2">
              <CheckCircle2 size={18} className="text-orange-600" />
              Maximize Efficiency
            </h4>
            <p className="text-sm text-gray-500 leading-relaxed">
              Use this tool to compare activities. For example, you can see that running for 30 minutes burns nearly 
              5 times more calories than walking at a slow pace for the same duration.
            </p>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
