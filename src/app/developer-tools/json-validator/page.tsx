"use client";

import React, { useState, useEffect } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  FileCode, 
  CheckCircle2, 
  AlertCircle, 
  Trash2, 
  Copy, 
  RefreshCcw, 
  Zap, 
  Minimize2, 
  Maximize2,
  Terminal,
  Settings2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function JSONValidator() {
  const tool = tools.find((t) => t.id === "json-validator")!;

  // State
  const [json, setJson] = useState('{\n  "name": "UtilityLab",\n  "status": "online",\n  "tools": 67,\n  "premium": true\n}');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const validate = (val: string) => {
    try {
      if (val.trim() === "") {
        setError(null);
        return;
      }
      JSON.parse(val);
      setError(null);
    } catch (e: any) {
      setError(e.message);
    }
  };

  useEffect(() => {
    validate(json);
  }, [json]);

  const beautify = () => {
    try {
      const parsed = JSON.parse(json);
      setJson(JSON.stringify(parsed, null, 2));
    } catch (e) {}
  };

  const minify = () => {
    try {
      const parsed = JSON.parse(json);
      setJson(JSON.stringify(parsed));
    } catch (e) {}
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Status Bar */}
        <div className="flex items-center justify-between px-4">
           <div className="flex items-center gap-4">
             <div className={`flex items-center gap-2 px-6 py-2 rounded-full border ${error ? 'bg-rose-50 border-rose-200 text-rose-600' : 'bg-emerald-50 border-emerald-200 text-emerald-600'}`}>
                {error ? <AlertCircle size={16} /> : <CheckCircle2 size={16} />}
                <span className="text-[10px] font-black uppercase tracking-widest">{error ? "Invalid JSON" : "Valid JSON"}</span>
             </div>
             {error && (
               <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-[10px] font-bold text-rose-400 font-mono truncate max-w-[400px]"
               >
                 {error}
               </motion.span>
             )}
           </div>
           
           <div className="flex items-center gap-2">
             <button 
              onClick={beautify}
              className="px-6 py-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-50 hover:text-indigo-600 transition-all"
             >
               Beautify
             </button>
             <button 
              onClick={minify}
              className="px-6 py-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-50 hover:text-emerald-600 transition-all"
             >
               Minify
             </button>
           </div>
        </div>

        {/* Editor Area */}
        <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-8 md:p-12 border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform text-indigo-500">
            <Terminal size={120} />
          </div>

          <div className="space-y-8 relative z-10">
            <div className="relative">
              <div className="absolute top-6 right-6 z-10 flex gap-2">
                <button 
                  onClick={() => { navigator.clipboard.writeText(json); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                  className={`p-4 rounded-2xl transition-all shadow-xl ${copied ? "bg-emerald-500 text-white" : "bg-white dark:bg-gray-700 text-gray-400 hover:text-indigo-600"}`}
                >
                  {copied ? <CheckCircle2 size={24}/> : <Copy size={24}/>}
                </button>
                <button 
                  onClick={() => setJson("")}
                  className="p-4 bg-white dark:bg-gray-700 text-gray-400 hover:text-rose-600 rounded-2xl shadow-xl transition-all"
                >
                  <Trash2 size={24} />
                </button>
              </div>
              <textarea 
                value={json} onChange={(e) => setJson(e.target.value)}
                spellCheck={false}
                className={`w-full min-h-[600px] p-12 bg-gray-50 dark:bg-gray-800 border-2 rounded-[3rem] outline-none font-mono text-sm leading-relaxed resize-none transition-all shadow-inner ${error ? 'border-rose-100 dark:border-rose-900/30' : 'border-transparent focus:border-indigo-600'}`}
                placeholder="Paste your JSON here..."
              />
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-indigo-600/20 flex items-start gap-4">
            <div className="p-3 bg-indigo-500 rounded-2xl">
              <Zap size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black">Real-time Linting</h4>
              <p className="text-sm text-indigo-100 opacity-80 leading-relaxed">
                Detect syntax errors instantly as you type. Our validator points out exactly 
                where the structure is broken, from missing commas to unquoted keys.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl text-emerald-600">
              <Settings2 size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Format & Minify</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Transform messy data blobs into human-readable structures with 2-space 
                indentation, or compress them into single lines for storage efficiency.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
