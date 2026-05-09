"use client";

import React, { useState } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  Wind, 
  Palette, 
  Copy, 
  RefreshCw, 
  Layers,
  Zap,
  Maximize
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function GradientGenerator() {
  const tool = tools.find((t) => t.id === "gradient-gen")!;
  const [color1, setColor1] = useState("#4f46e5");
  const [color2, setColor2] = useState("#9333ea");
  const [angle, setAngle] = useState(135);

  const gradient = `linear-gradient(${angle}deg, ${color1}, ${color2})`;
  const cssCode = `background: ${color1};\nbackground: ${gradient};`;

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-12">
        
        {/* Preview Area */}
        <div 
          className="w-full h-80 rounded-[4rem] shadow-2xl relative overflow-hidden flex items-center justify-center group"
          style={{ background: gradient }}
        >
           <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
           <div className="relative z-10 text-white text-center space-y-4 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
              <h2 className="text-4xl font-black uppercase tracking-tighter">Smooth Transition</h2>
              <p className="text-sm font-medium tracking-widest opacity-80 uppercase">Hand-crafted Dynamic Color Engine</p>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
           
           {/* Controls */}
           <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-10 border border-gray-100 dark:border-gray-800 shadow-xl space-y-10">
              <div className="grid grid-cols-2 gap-8">
                 <label className="block">
                   <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 mb-4 block">Start Color</span>
                   <div className="flex items-center gap-4">
                      <input 
                        type="color" value={color1} onChange={(e) => setColor1(e.target.value)}
                        className="w-16 h-16 rounded-2xl border-none cursor-pointer bg-transparent"
                      />
                      <input 
                        type="text" value={color1} onChange={(e) => setColor1(e.target.value)}
                        className="flex-grow bg-gray-50 dark:bg-gray-800 border-none rounded-xl py-3 px-4 outline-none font-mono font-bold"
                      />
                   </div>
                 </label>
                 <label className="block">
                   <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 mb-4 block">End Color</span>
                   <div className="flex items-center gap-4">
                      <input 
                        type="color" value={color2} onChange={(e) => setColor2(e.target.value)}
                        className="w-16 h-16 rounded-2xl border-none cursor-pointer bg-transparent"
                      />
                      <input 
                        type="text" value={color2} onChange={(e) => setColor2(e.target.value)}
                        className="flex-grow bg-gray-50 dark:bg-gray-800 border-none rounded-xl py-3 px-4 outline-none font-mono font-bold"
                      />
                   </div>
                 </label>
              </div>

              <label className="block">
                 <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600">Rotation Angle</span>
                    <span className="text-sm font-black text-gray-900 dark:text-white">{angle}°</span>
                 </div>
                 <input 
                  type="range" min="0" max="360" value={angle} onChange={(e) => setAngle(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                 />
              </label>
           </div>

           {/* Code Output */}
           <div className="bg-gray-900 rounded-[3rem] p-10 border border-gray-800 shadow-2xl space-y-6 relative overflow-hidden flex flex-col justify-center">
              <div className="absolute top-0 right-0 p-12 opacity-5 text-indigo-500 pointer-events-none">
                <Layers size={200} />
              </div>
              <div className="flex items-center justify-between relative z-10">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-indigo-400">CSS Snippet</h3>
                <button 
                  onClick={() => navigator.clipboard.writeText(cssCode)}
                  className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-white transition-colors"
                >
                  <Copy size={18} />
                </button>
              </div>
              <pre className="relative z-10 w-full bg-black/50 p-8 rounded-2xl text-indigo-300 font-mono text-xs break-all whitespace-pre-wrap border border-white/5">
                {cssCode}
              </pre>
           </div>
        </div>
      </div>
    </ToolLayout>
  );
}
