"use client";

import React, { useState, useMemo } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  Zap, 
  Eye, 
  Trash2, 
  Copy, 
  CheckCircle2, 
  Settings2,
  BookOpen,
  Maximize2,
  Minimize2,
  Type
} from "lucide-react";
import { motion } from "framer-motion";

export default function BionicReadingConverter() {
  const tool = tools.find((t) => t.id === "bionic-reading")!;

  // State
  const [text, setText] = useState("Bionic Reading is a new method facilitating the reading process by guiding the eyes through text with artificial fixation points. As a result, the reader is only focusing on the highlighted initial letters and lets the brain center complete the word. In a digital world over-saturated with shallow content, Bionic Reading helps you to read faster and absorb more.");
  const [fixation, setFixation] = useState(0.5); // Percentage of word to bold
  const [fontSize, setFontSize] = useState(18);
  const [copied, setCopied] = useState(false);

  const bionicResult = useMemo(() => {
    return text.split(/\s+/).map((word, idx) => {
      const cleanWord = word.replace(/[^\w]/g, "");
      const boldLength = Math.ceil(cleanWord.length * fixation);
      const boldPart = word.substring(0, boldLength);
      const normalPart = word.substring(boldLength);
      
      return (
        <span key={idx} className="inline-block mr-[0.3em]">
          <span className="font-black text-gray-900 dark:text-white">{boldPart}</span>
          <span className="opacity-60 font-medium">{normalPart}</span>
        </span>
      );
    });
  }, [text, fixation]);

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Editor & Preview Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 min-h-[600px]">
          
          {/* Input Area */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <BookOpen size={18} className="text-indigo-600" />
                <h3 className="font-black text-gray-900 dark:text-white uppercase tracking-widest text-xs">Source Text</h3>
              </div>
              <button onClick={() => setText("")} className="text-gray-300 hover:text-rose-500 transition-colors"><Trash2 size={16}/></button>
            </div>
            <textarea 
              value={text} onChange={(e) => setText(e.target.value)}
              className="w-full h-full p-8 bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 rounded-[2.5rem] outline-none focus:border-indigo-600 transition-all font-medium text-lg leading-relaxed resize-none shadow-sm"
              placeholder="Paste text to convert..."
            />
          </div>

          {/* Bionic Preview */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <Eye size={18} className="text-emerald-600" />
                <h3 className="font-black text-gray-900 dark:text-white uppercase tracking-widest text-xs">Bionic View</h3>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                  className={`p-2 rounded-lg transition-all ${copied ? "bg-emerald-500 text-white" : "text-gray-400 hover:text-indigo-600"}`}
                >
                  <Copy size={16} />
                </button>
              </div>
            </div>
            <div 
              className="w-full h-full p-10 bg-gray-50 dark:bg-gray-800/50 border-2 border-transparent rounded-[2.5rem] overflow-auto leading-relaxed text-gray-800 dark:text-gray-200"
              style={{ fontSize: `${fontSize}px` }}
            >
              {bionicResult}
            </div>
          </div>
        </div>

        {/* Settings Bar */}
        <div className="bg-white dark:bg-gray-900 p-8 rounded-[3rem] border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-12">
           {/* Fixation Strength */}
           <div className="flex-1 w-full space-y-4">
              <div className="flex justify-between items-center px-1">
                 <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Fixation Strength</span>
                 <span className="text-xs font-black text-indigo-600">{Math.round(fixation * 100)}%</span>
              </div>
              <input 
                type="range" min="0.2" max="0.8" step="0.1" value={fixation}
                onChange={(e) => setFixation(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
           </div>

           {/* Font Size */}
           <div className="flex-1 w-full space-y-4">
              <div className="flex justify-between items-center px-1">
                 <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Display Size</span>
                 <span className="text-xs font-black text-emerald-600">{fontSize}px</span>
              </div>
              <div className="flex items-center gap-4">
                <button onClick={() => setFontSize(Math.max(12, fontSize - 2))} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-emerald-50 text-emerald-600 transition-all"><Minimize2 size={18}/></button>
                <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-800 rounded-full relative">
                   <div className="absolute top-0 left-0 h-full bg-emerald-500 rounded-full" style={{ width: `${((fontSize - 12) / 24) * 100}%` }} />
                </div>
                <button onClick={() => setFontSize(Math.min(36, fontSize + 2))} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-emerald-50 text-emerald-600 transition-all"><Maximize2 size={18}/></button>
              </div>
           </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-indigo-600/20 flex items-start gap-4">
            <div className="p-3 bg-indigo-500 rounded-2xl">
              <Zap size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black">Neuro-Reading</h4>
              <p className="text-sm text-indigo-100 opacity-80 leading-relaxed">
                By guiding the eye through the text with artificial fixation points, your brain 
                learns to process words faster and with less cognitive strain.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl text-emerald-600">
              <Type size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Accessibility First</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Especially helpful for people with ADHD or Dyslexia, Bionic Reading provides a 
                visual anchor that prevents skipping lines or losing focus.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
