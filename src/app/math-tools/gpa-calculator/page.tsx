"use client";

import React, { useState, useMemo } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  GraduationCap, 
  Trash2, 
  Plus, 
  BookOpen,
  CheckCircle2,
  Settings2,
  Hash,
  Activity
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const GRADE_VALUES: Record<string, number> = {
  "A+": 4.0, "A": 4.0, "A-": 3.7,
  "B+": 3.3, "B": 3.0, "B-": 2.7,
  "C+": 2.3, "C": 2.0, "C-": 1.7,
  "D+": 1.3, "D": 1.0, "F": 0.0
};

interface Course {
  id: string;
  name: string;
  grade: string;
  credits: number;
}

export default function GPACalculator() {
  const tool = tools.find((t) => t.id === "gpa-calculator")!;

  // State
  const [courses, setCourses] = useState<Course[]>([
    { id: "1", name: "Semester 1 - Major", grade: "A", credits: 4 },
    { id: "2", name: "Semester 1 - Elective", grade: "B+", credits: 3 },
  ]);

  const addCourse = () => {
    setCourses([...courses, { id: Date.now().toString(), name: "", grade: "A", credits: 3 }]);
  };

  const removeCourse = (id: string) => {
    setCourses(prev => prev.filter(c => c.id !== id));
  };

  const updateCourse = (id: string, field: keyof Course, value: any) => {
    setCourses(prev => prev.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const gpa = useMemo(() => {
    let totalPoints = 0;
    let totalCredits = 0;
    courses.forEach(c => {
      const val = GRADE_VALUES[c.grade] || 0;
      totalPoints += val * c.credits;
      totalCredits += c.credits;
    });
    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";
  }, [courses]);

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Main Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           
           {/* Course List */}
           <div className="lg:col-span-8 space-y-6">
              <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-8 md:p-10 border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden relative group">
                 <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform text-indigo-500">
                    <BookOpen size={120} />
                 </div>
                 
                 <div className="relative z-10 space-y-8">
                    <div className="flex items-center justify-between">
                       <h3 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
                          <GraduationCap size={18} className="text-indigo-600" /> Course List
                       </h3>
                       <button 
                        onClick={addCourse}
                        className="p-4 bg-indigo-600 text-white rounded-2xl shadow-xl shadow-indigo-600/20 hover:scale-110 active:scale-95 transition-all"
                       >
                         <Plus size={20} />
                       </button>
                    </div>

                    <div className="space-y-6">
                       <AnimatePresence mode="popLayout" initial={false}>
                          {courses.length > 0 ? courses.map((course) => (
                            <motion.div 
                             layout
                             initial={{ opacity: 0, y: 10 }}
                             animate={{ opacity: 1, y: 0 }}
                             exit={{ opacity: 0, scale: 0.9 }}
                             key={course.id}
                             className="flex flex-col md:grid md:grid-cols-12 gap-6 items-center p-6 md:p-5 bg-gray-50 dark:bg-gray-800/50 rounded-[2rem] md:rounded-3xl border border-gray-100 dark:border-gray-800 group hover:border-indigo-500/30 transition-colors"
                            >
                               <div className="w-full md:col-span-5">
                                  <input 
                                   value={course.name} onChange={(e) => updateCourse(course.id, "name", e.target.value)}
                                   placeholder="Course Name (e.g. Advanced Math)"
                                   className="w-full bg-transparent border-none outline-none font-black text-sm text-gray-900 dark:text-white placeholder:text-gray-400"
                                  />
                               </div>
                               <div className="w-full flex gap-4 md:grid md:grid-cols-7 md:col-span-7 items-center">
                                  <div className="flex-1 md:col-span-3">
                                     <select 
                                      value={course.grade} onChange={(e) => updateCourse(course.id, "grade", e.target.value)}
                                      className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl py-2 px-3 text-xs font-black outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm"
                                     >
                                       {Object.keys(GRADE_VALUES).map(g => <option key={g} value={g}>{g}</option>)}
                                     </select>
                                  </div>
                                  <div className="flex-1 md:col-span-3">
                                     <div className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 shadow-sm">
                                        <span className="text-[9px] font-black text-gray-400 uppercase hidden sm:inline">Credits</span>
                                        <input 
                                         type="number" value={course.credits} onChange={(e) => updateCourse(course.id, "credits", parseInt(e.target.value) || 0)}
                                         className="w-full bg-transparent border-none outline-none text-xs font-black text-center"
                                        />
                                     </div>
                                  </div>
                                  <div className="md:col-span-1 text-right">
                                     <button onClick={() => removeCourse(course.id)} className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-all">
                                        <Trash2 size={16} />
                                     </button>
                                  </div>
                               </div>
                            </motion.div>
                          )) : (
                            <motion.div 
                              initial={{ opacity: 0 }} 
                              animate={{ opacity: 1 }} 
                              className="py-12 text-center bg-gray-50 dark:bg-gray-800/20 rounded-[2rem] border border-dashed border-gray-200 dark:border-gray-800"
                            >
                              <p className="text-xs font-black text-gray-400 uppercase tracking-widest">No courses added yet</p>
                              <button onClick={addCourse} className="mt-4 text-xs font-black text-indigo-600 hover:underline">Add your first course</button>
                            </motion.div>
                          )}
                       </AnimatePresence>
                    </div>
                 </div>
              </div>
           </div>

           {/* Results Side */}
           <div className="lg:col-span-4 flex flex-col space-y-6">
              <div className="flex-1 bg-indigo-600 rounded-[3rem] p-12 text-white shadow-xl shadow-indigo-600/30 flex flex-col items-center justify-center text-center">
                 <h4 className="text-[10px] font-black uppercase tracking-widest mb-4 opacity-70">Current GPA</h4>
                 <h2 className="text-7xl md:text-8xl font-black mb-6">{gpa}</h2>
                 <div className="px-6 py-2 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-widest">
                    Based on {courses.reduce((acc, curr) => acc + curr.credits, 0)} Credits
                 </div>
              </div>
              
              <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm flex items-center justify-between">
                 <div className="flex items-center gap-4">
                    <div className="p-4 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl text-emerald-600">
                       <CheckCircle2 size={24} />
                    </div>
                    <div>
                       <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Academic Status</h4>
                       <p className="text-lg font-black text-gray-900 dark:text-white">
                         {parseFloat(gpa) >= 3.5 ? "Honor Roll" : parseFloat(gpa) >= 2.0 ? "Good Standing" : "Needs Review"}
                       </p>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl text-indigo-600">
              <Settings2 size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Standard Weighting</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Uses the standard 4.0 scale compatible with most US universities and colleges for 
                accurate grade point average calculation.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl text-emerald-600">
              <Activity size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Dynamic Credits</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Adjust credit weights per course to accurately reflect semester workload and 
                weighted performance across diverse subjects.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-amber-50 dark:bg-amber-900/30 rounded-2xl text-amber-600">
              <Hash size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Real-time Calculation</h4>
              <p className="text-[11px] text-gray-500 leading-relaxed">
                Instantly see how a single grade change affects your total GPA, allowing for 
                strategic academic planning and goal setting.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
