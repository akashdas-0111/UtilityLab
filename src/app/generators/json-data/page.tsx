"use client";

import React, { useState } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  Braces, 
  Copy, 
  RefreshCw, 
  Settings, 
  ShieldCheck,
  FileJson,
  Zap,
  Terminal
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function JSONDataGenerator() {
  const tool = tools.find((t) => t.id === "json-mock-data")!;
  const [count, setCount] = useState(5);
  const [generatedJson, setGeneratedJson] = useState("");

  const generate = () => {
    const data = Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      uuid: crypto.randomUUID(),
      name: ["John Doe", "Jane Smith", "Alice Johnson", "Bob Brown"][Math.floor(Math.random() * 4)],
      email: `user${i+1}@example.com`,
      status: Math.random() > 0.5 ? "active" : "inactive",
      metadata: {
        role: "admin",
        verified: true
      }
    }));
    setGeneratedJson(JSON.stringify(data, null, 2));
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Controls */}
          <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-10 border border-gray-100 dark:border-gray-800 shadow-xl space-y-8">
            <div className="space-y-6">
              <label className="block">
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 mb-4 block">Record Count (${count})</span>
                <input 
                  type="range" min="1" max="50" value={count} onChange={(e) => setCount(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </label>

              <div className="p-6 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl border border-indigo-100 dark:border-indigo-800/50 flex items-center gap-4">
                 <Terminal className="text-indigo-600" size={20} />
                 <p className="text-xs text-indigo-800 dark:text-indigo-300 font-bold uppercase tracking-wider">Dynamic Schema: User Profiles</p>
              </div>
            </div>

            <button 
              onClick={generate}
              className="w-full bg-indigo-600 text-white font-black py-5 rounded-2xl shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform"
            >
              <RefreshCw size={20} /> GENERATE MOCK JSON
            </button>
          </div>

          {/* Result Output */}
          <div className="bg-gray-900 rounded-[3rem] p-10 border border-gray-800 shadow-2xl space-y-6 relative overflow-hidden flex flex-col min-h-[500px]">
             <div className="absolute top-0 right-0 p-12 opacity-5 text-indigo-500 pointer-events-none">
                <Braces size={200} />
             </div>
             
             <div className="flex items-center justify-between relative z-10">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Mock Output</h3>
                <button 
                  onClick={() => navigator.clipboard.writeText(generatedJson)}
                  disabled={!generatedJson}
                  className="p-3 bg-white/5 hover:bg-white/10 disabled:opacity-30 rounded-xl text-white transition-colors"
                >
                  <Copy size={18} />
                </button>
             </div>

             <pre className="relative z-10 w-full bg-black/50 p-8 rounded-2xl text-emerald-400 font-mono text-xs break-all whitespace-pre-wrap border border-white/5 flex-grow overflow-y-auto">
               {generatedJson || "// Click generate to see mock data..."}
             </pre>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
