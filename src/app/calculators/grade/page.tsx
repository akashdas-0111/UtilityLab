"use client";

import React, { useState, useMemo } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  GraduationCap, 
  Target, 
  Percent, 
  Plus, 
  Trash2, 
  Calculator, 
  Info,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function GradeCalculator() {
  const tool = tools.find((t) => t.id === "grade-calc")!;

  // Mode 1: Final Grade Calculator
  const [currentGrade, setCurrentGrade] = useState<number>(85);
  const [goalGrade, setGoalGrade] = useState<number>(90);
  const [finalWeight, setFinalWeight] = useState<number>(20);

  // Mode 2: Weighted Average (GPA-style)
  const [assignments, setAssignments] = useState([
    { id: 1, name: "Homework", score: 90, weight: 20 },
    { id: 2, name: "Midterm", score: 85, weight: 30 },
  ]);

  // Calculations
  const finalNeeded = useMemo(() => {
    // Formula: Final = (Goal - (Current * (1 - Weight))) / Weight
    const w = finalWeight / 100;
    const g = goalGrade;
    const c = currentGrade;
    return (g - (c * (1 - w))) / w;
  }, [currentGrade, goalGrade, finalWeight]);

  const weightedAverage = useMemo(() => {
    let totalWeight = 0;
    let weightedSum = 0;
    assignments.forEach(a => {
      totalWeight += a.weight;
      weightedSum += (a.score * (a.weight / 100));
    });
    return totalWeight === 0 ? 0 : (weightedSum / (totalWeight / 100));
  }, [assignments]);

  const addAssignment = () => {
    setAssignments([...assignments, { id: Date.now(), name: "", score: 0, weight: 0 }]);
  };

  const removeAssignment = (id: number) => {
    setAssignments(assignments.filter(a => a.id !== id));
  };

  const updateAssignment = (id: number, field: string, value: any) => {
    setAssignments(assignments.map(a => a.id === id ? { ...a, [field]: value } : a));
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-12">
        
        {/* Final Exam Mode */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 md:p-10 border border-gray-100 dark:border-gray-800 shadow-sm space-y-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg text-indigo-600">
                <Target size={20} />
              </div>
              <h3 className="text-xl font-black text-gray-900 dark:text-white">Final Exam Goal</h3>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Current Grade (%)</label>
                <input 
                  type="number" value={currentGrade} onChange={(e) => setCurrentGrade(Number(e.target.value))}
                  className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-600 rounded-2xl outline-none text-xl font-black"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Goal Grade (%)</label>
                <input 
                  type="number" value={goalGrade} onChange={(e) => setGoalGrade(Number(e.target.value))}
                  className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-600 rounded-2xl outline-none text-xl font-black"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Final Exam Weight (%)</label>
                <input 
                  type="number" value={finalWeight} onChange={(e) => setFinalWeight(Number(e.target.value))}
                  className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-600 rounded-2xl outline-none text-xl font-black"
                />
              </div>
            </div>
          </div>

          <div className={`rounded-[2.5rem] p-10 text-white shadow-2xl flex flex-col justify-center items-center text-center space-y-6 transition-colors ${finalNeeded > 100 ? 'bg-rose-500 shadow-rose-500/20' : 'bg-indigo-600 shadow-indigo-600/20'}`}>
            <p className="text-xs font-bold opacity-80 uppercase tracking-widest">You need a score of</p>
            <h2 className="text-7xl font-black">{finalNeeded.toFixed(1)}%</h2>
            <p className="text-sm font-bold opacity-80">On your final exam</p>
            
            <div className="pt-6 flex items-center gap-2">
              {finalNeeded > 100 ? (
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                  <AlertCircle size={14} />
                  <span className="text-xs font-bold uppercase">That's a tough one!</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                  <CheckCircle2 size={14} />
                  <span className="text-xs font-bold uppercase">Totally achievable!</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Weighted Average Mode */}
        <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 md:p-10 border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg text-emerald-600">
                <Calculator size={20} />
              </div>
              <h3 className="text-xl font-black text-gray-900 dark:text-white">Weighted Average</h3>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Current Average</p>
              <h4 className="text-3xl font-black text-emerald-600">{weightedAverage.toFixed(1)}%</h4>
            </div>
          </div>

          <div className="space-y-4">
            <AnimatePresence>
              {assignments.map((a, idx) => (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  key={a.id} 
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl group"
                >
                  <div className="md:col-span-6 space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Assignment Name</label>
                    <input 
                      type="text" value={a.name} onChange={(e) => updateAssignment(a.id, "name", e.target.value)}
                      placeholder="e.g. Finals"
                      className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl outline-none text-sm font-bold"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Score (%)</label>
                    <input 
                      type="number" value={a.score || ""} onChange={(e) => updateAssignment(a.id, "score", Number(e.target.value))}
                      className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl outline-none text-sm font-bold text-indigo-600"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Weight (%)</label>
                    <input 
                      type="number" value={a.weight || ""} onChange={(e) => updateAssignment(a.id, "weight", Number(e.target.value))}
                      className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl outline-none text-sm font-bold text-indigo-600"
                    />
                  </div>
                  <div className="md:col-span-2 flex justify-end pb-1">
                    <button 
                      onClick={() => removeAssignment(a.id)}
                      className="p-3 text-gray-300 hover:text-rose-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <button 
            onClick={addAssignment}
            className="mt-8 flex items-center gap-2 px-6 py-3 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 rounded-xl font-bold text-sm hover:bg-indigo-100 transition-colors"
          >
            <Plus size={18} /> Add Row
          </button>
        </div>

        {/* Guide */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-indigo-50 dark:bg-indigo-900/10 rounded-3xl p-8 border border-indigo-100 dark:border-indigo-900/20">
            <h4 className="text-lg font-black text-indigo-900 dark:text-indigo-100 mb-4 flex items-center gap-2">
              <Info size={20} />
              Final Grade Math
            </h4>
            <p className="text-indigo-800/80 dark:text-indigo-200/80 leading-relaxed text-sm">
              The "Final Exam Goal" calculator helps you reverse-engineer your target grade. 
              It tells you exactly what score you need on your remaining final exam to pull your current average up to your desired goal.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 flex flex-col justify-center">
            <h4 className="font-black text-gray-900 dark:text-white mb-2 flex items-center gap-2">
              <GraduationCap size={18} className="text-indigo-600" />
              Academic Pro-Tip
            </h4>
            <p className="text-sm text-gray-500 leading-relaxed">
              Always double-check your syllabus for the exact weightings. Sometimes finals are worth more 
              than you think, and small homework grades can add up over a full semester!
            </p>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
