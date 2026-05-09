"use client";

import React, { useState } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  Barcode as BarcodeIcon, 
  Settings, 
  Download, 
  Copy, 
  RefreshCw,
  Box,
  Tag,
  Maximize
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function BarcodeGenerator() {
  const tool = tools.find((t) => t.id === "barcode")!;
  const [data, setData] = useState("123456789012");
  const [format, setFormat] = useState("CODE128");

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Controls */}
          <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-10 border border-gray-100 dark:border-gray-800 shadow-xl space-y-8">
            <div className="space-y-6">
              <label className="block">
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 mb-2 block">Barcode Data</span>
                <input 
                  type="text" value={data} onChange={(e) => setData(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-indigo-500 font-bold"
                  placeholder="Enter alphanumeric data"
                />
              </label>

              <label className="block">
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 mb-2 block">Standard Format</span>
                <select 
                  value={format} onChange={(e) => setFormat(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-indigo-500 font-bold"
                >
                  <option>CODE128</option>
                  <option>EAN-13</option>
                  <option>UPC-A</option>
                  <option>CODE39</option>
                </select>
              </label>
            </div>

            <div className="p-6 bg-amber-50 dark:bg-amber-900/20 rounded-3xl border border-amber-100 dark:border-amber-800/30 flex items-start gap-4">
               <Tag className="text-amber-600 flex-shrink-0" size={20} />
               <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed font-medium">
                 Ensure the data matches the selected standard requirements (e.g., EAN-13 requires 12 digits + checksum).
               </p>
            </div>
          </div>

          {/* Barcode Visualization (Mockup using CSS bars for high-fidelity feel) */}
          <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-10 border border-gray-100 dark:border-gray-800 shadow-xl flex flex-col items-center justify-center min-h-[400px]">
             <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-12">Preview Output</h3>
             
             <div className="flex flex-col items-center gap-6">
                <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm flex flex-col items-center gap-4">
                   <div className="flex items-end h-24 gap-[1px]">
                      {Array.from({ length: 40 }).map((_, i) => (
                        <div 
                          key={i} 
                          className="bg-black transition-all"
                          style={{ 
                            width: `${Math.random() > 0.5 ? '2px' : '4px'}`,
                            height: `${Math.random() > 0.1 ? '100%' : '110%'}` 
                          }}
                        />
                      ))}
                   </div>
                   <p className="font-mono text-lg font-black tracking-[0.5em] text-black uppercase">{data || "EMPTY"}</p>
                </div>

                <div className="flex gap-4">
                   <button className="bg-indigo-600 text-white font-black px-8 py-3 rounded-xl shadow-lg shadow-indigo-600/20 flex items-center gap-2 hover:scale-105 transition-transform">
                      <Download size={18} /> DOWNLOAD PNG
                   </button>
                   <button className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 font-black px-8 py-3 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all flex items-center gap-2">
                      <Copy size={18} /> COPY SVG
                   </button>
                </div>
             </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
