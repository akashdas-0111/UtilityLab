"use client";

import React, { useState } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  Monitor, 
  Smartphone, 
  Globe, 
  RefreshCw, 
  Copy, 
  Zap,
  MousePointer2,
  Cpu
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const UA_TEMPLATES = {
  Chrome: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  Safari: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15",
  Firefox: "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0",
  iPhone: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/15E148 Safari/604.1",
  Android: "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36"
};

export default function UserAgentGenerator() {
  const tool = tools.find((t) => t.id === "user-agent")!;
  const [currentUA, setCurrentUA] = useState(UA_TEMPLATES.Chrome);

  const generateRandom = () => {
    const keys = Object.keys(UA_TEMPLATES);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    setCurrentUA((UA_TEMPLATES as any)[randomKey]);
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-12">
        
        {/* Results */}
        <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-10 border border-gray-100 dark:border-gray-800 shadow-xl space-y-8 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-12 opacity-5 text-indigo-500 pointer-events-none">
              <Monitor size={200} />
           </div>
           
           <div className="relative z-10 space-y-6">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-indigo-600">Generated User Agent</h3>
              <div className="w-full bg-gray-50 dark:bg-gray-800 p-8 rounded-[2rem] border border-gray-100 dark:border-gray-700 text-lg font-mono text-gray-700 dark:text-indigo-300 break-all leading-relaxed shadow-inner">
                {currentUA}
              </div>
              <div className="flex flex-wrap gap-4">
                 <button 
                  onClick={generateRandom}
                  className="bg-indigo-600 text-white font-black px-10 py-4 rounded-2xl shadow-xl hover:scale-105 transition-transform flex items-center gap-3"
                 >
                   <RefreshCw size={20} /> GENERATE RANDOM
                 </button>
                 <button 
                  onClick={() => navigator.clipboard.writeText(currentUA)}
                  className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 font-black px-10 py-4 rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all flex items-center gap-3"
                 >
                   <Copy size={20} /> COPY TO CLIPBOARD
                 </button>
              </div>
           </div>
        </div>

        {/* Templates */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {Object.entries(UA_TEMPLATES).map(([name, ua]) => (
             <button 
              key={name}
              onClick={() => setCurrentUA(ua)}
              className="bg-white dark:bg-gray-900 p-8 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-6 group hover:border-indigo-500 transition-all text-left"
             >
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                  {name.includes('iPhone') || name.includes('Android') ? <Smartphone size={24} /> : <Monitor size={24} />}
                </div>
                <div>
                   <h4 className="font-black text-gray-900 dark:text-white uppercase text-xs tracking-widest">{name}</h4>
                   <p className="text-[10px] text-gray-500 line-clamp-1 font-mono mt-1">{ua}</p>
                </div>
             </button>
           ))}
        </div>
      </div>
    </ToolLayout>
  );
}
