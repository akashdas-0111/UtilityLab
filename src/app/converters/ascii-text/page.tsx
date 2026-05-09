"use client";

import React, { useState, useEffect } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  Type, 
  Trash2, 
  Copy, 
  Zap, 
  CheckCircle2, 
  Binary, 
  Terminal,
  Settings2,
  RefreshCcw,
  Hash,
  Hash as HashIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Mode = "dec" | "hex" | "bin" | "oct";

export default function ASCIIToText() {
  const tool = tools.find((t) => t.id === "ascii-text")!;

  // State
  const [text, setText] = useState("Hello");
  const [ascii, setAscii] = useState("");
  const [mode, setMode] = useState<Mode>("dec");
  const [direction, setDirection] = useState<"text2ascii" | "ascii2text">("text2ascii");
  const [copied, setCopied] = useState<"text" | "ascii" | null>(null);

  const convert = (val: string, dir: "text2ascii" | "ascii2text", currentMode: Mode) => {
    try {
      if (val.trim() === "") {
        setAscii("");
        setText("");
        return;
      }

      if (dir === "text2ascii") {
        const result = val.split("").map(char => {
          const code = char.charCodeAt(0);
          if (currentMode === "dec") return code.toString(10);
          if (currentMode === "hex") return code.toString(16).toUpperCase();
          if (currentMode === "bin") return code.toString(2).padStart(8, '0');
          if (currentMode === "oct") return code.toString(8);
          return code;
        }).join(" ");
        setAscii(result);
      } else {
        const result = val.trim().split(/\s+/).map(code => {
          let charCode;
          if (currentMode === "dec") charCode = parseInt(code, 10);
          if (currentMode === "hex") charCode = parseInt(code, 16);
          if (currentMode === "bin") charCode = parseInt(code, 2);
          if (currentMode === "oct") charCode = parseInt(code, 8);
          return String.fromCharCode(charCode || 0);
        }).join("");
        setText(result);
      }
    } catch (e) {}
  };

  useEffect(() => {
    convert(direction === "text2ascii" ? text : ascii, direction, mode);
  }, [text, ascii, direction, mode]);

  const copy = (type: "text" | "ascii") => {
    navigator.clipboard.writeText(type === "text" ? text : ascii);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Mode Selector */}
        <div className="flex bg-gray-50 dark:bg-gray-800 p-2 rounded-2xl border border-gray-100 dark:border-gray-700 w-fit mx-auto">
          {[
            { id: "dec", label: "Decimal", icon: HashIcon },
            { id: "hex", label: "Hex", icon: Terminal },
            { id: "bin", label: "Binary", icon: Binary },
            { id: "oct", label: "Octal", icon: Settings2 }
          ].map(opt => (
            <button 
              key={opt.id}
              onClick={() => setMode(opt.id as Mode)}
              className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${mode === opt.id ? 'bg-white dark:bg-gray-700 shadow-lg text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <opt.icon size={14} /> {opt.label}
            </button>
          ))}
        </div>

        {/* Converter Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[500px]">
          
          {/* Plain Text Side */}
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between items-center px-4">
               <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
                 <Type size={18} className="text-indigo-600" /> Plain Text
               </h3>
               <div className="flex gap-2">
                 <button onClick={() => copy("text")} className="p-3 bg-white dark:bg-gray-800 rounded-xl hover:text-indigo-600 transition-all shadow-sm">
                    {copied === "text" ? <CheckCircle2 size={18} className="text-emerald-500" /> : <Copy size={18} />}
                 </button>
                 <button onClick={() => setText("")} className="p-3 bg-white dark:bg-gray-800 rounded-xl hover:text-rose-600 transition-all shadow-sm">
                    <Trash2 size={18} />
                 </button>
               </div>
            </div>
            <textarea 
              value={text} onChange={(e) => { setText(e.target.value); setDirection("text2ascii"); }}
              className="flex-1 p-10 bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 rounded-[3rem] outline-none focus:border-indigo-600 transition-all font-medium text-2xl leading-relaxed resize-none shadow-sm text-center"
              placeholder="Type your message..."
            />
          </div>

          {/* ASCII Side */}
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between items-center px-4">
               <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
                 <Binary size={18} className="text-amber-500" /> ASCII / Encoding
               </h3>
               <div className="flex gap-2">
                 <button onClick={() => copy("ascii")} className="p-3 bg-white dark:bg-gray-800 rounded-xl hover:text-amber-600 transition-all shadow-sm">
                    {copied === "ascii" ? <CheckCircle2 size={18} className="text-emerald-500" /> : <Copy size={18} />}
                 </button>
                 <button onClick={() => setAscii("")} className="p-3 bg-white dark:bg-gray-800 rounded-xl hover:text-rose-600 transition-all shadow-sm">
                    <Trash2 size={18} />
                 </button>
               </div>
            </div>
            <textarea 
              value={ascii} onChange={(e) => { setAscii(e.target.value); setDirection("ascii2text"); }}
              className="flex-1 p-10 bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 rounded-[3rem] outline-none focus:border-amber-600 transition-all font-mono text-xl leading-loose resize-none shadow-sm text-center text-amber-600"
              placeholder="Encoding result here..."
            />
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-indigo-600/20 flex flex-col justify-between">
            <Zap size={24} className="mb-4 text-indigo-300" />
            <div>
              <h4 className="font-black mb-2">Multi-Base Support</h4>
              <p className="text-xs text-indigo-100 opacity-80 leading-relaxed">
                Switch instantly between Decimal, Hexadecimal, Binary, and Octal formats to 
                analyze character encodings from any perspective.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col justify-between">
            <Terminal size={24} className="mb-4 text-emerald-600" />
            <div>
              <h4 className="font-black text-gray-900 dark:text-white mb-2">Bi-directional</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Convert plain text to machine code or decode raw byte arrays back into human 
                language with a single fluid interface.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col justify-between">
            <RefreshCcw size={24} className="mb-4 text-amber-600" />
            <div>
              <h4 className="font-black text-gray-900 dark:text-white mb-2">Instant Validation</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Real-time updates as you type, ensuring that every character mapping is 
                accurate and structure is preserved across conversions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
