"use client";

import React, { useState } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  ImageIcon, 
  Trash2, 
  Download, 
  Zap, 
  CheckCircle2, 
  FileCode, 
  Terminal,
  Settings2,
  RefreshCcw,
  Eye,
  ShieldCheck
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Base64ToImage() {
  const tool = tools.find((t) => t.id === "base64-to-image")!;

  // State
  const [base64, setBase64] = useState("");
  const [preview, setPreview] = useState<string | null>(null);

  const handleConvert = () => {
    try {
      // Basic validation for data URI or raw base64
      let src = base64.trim();
      if (!src.startsWith("data:image")) {
        // Try to guess mime type or assume png
        src = `data:image/png;base64,${src}`;
      }
      setPreview(src);
    } catch (e) {
      setPreview(null);
    }
  };

  const download = () => {
    if (!preview) return;
    const link = document.createElement("a");
    link.download = "utilitylab-decoded-image.png";
    link.href = preview;
    link.click();
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Main Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           
           {/* Input Side */}
           <div className="lg:col-span-6 flex flex-col space-y-6">
              <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm flex-1 relative overflow-hidden group flex flex-col">
                 <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform text-indigo-500">
                    <Terminal size={120} />
                 </div>
                 
                 <div className="space-y-6 relative z-10 flex-1 flex flex-col">
                    <div className="flex items-center justify-between px-1">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                          <FileCode size={14} className="text-indigo-600" />
                          Base64 / Data URI String
                       </label>
                       <button onClick={() => { setBase64(""); setPreview(null); }} className="text-gray-300 hover:text-rose-500 transition-colors"><Trash2 size={14}/></button>
                    </div>
                    <textarea 
                       value={base64} onChange={(e) => setBase64(e.target.value)}
                       className="flex-1 w-full p-8 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-600 rounded-[2.5rem] outline-none font-mono text-xs leading-loose resize-none transition-all shadow-inner text-indigo-600 dark:text-indigo-400"
                       placeholder="Paste your Base64 string here..."
                    />
                    <button 
                       onClick={handleConvert}
                       className="w-full mt-6 py-6 bg-indigo-600 text-white rounded-[2rem] font-black uppercase tracking-widest shadow-2xl shadow-indigo-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                    >
                       <RefreshCcw size={20} /> Convert to Image
                    </button>
                 </div>
              </div>
           </div>

           {/* Preview Side */}
           <div className="lg:col-span-6 flex flex-col min-h-[500px]">
              <div className="bg-white dark:bg-gray-900 rounded-[3rem] border border-gray-100 dark:border-gray-800 shadow-sm flex-1 p-8 flex flex-col items-center justify-center relative overflow-hidden group">
                 <AnimatePresence mode="wait">
                    {preview ? (
                       <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center gap-8 w-full h-full justify-center">
                          <div className="relative group/img max-w-full max-h-full">
                             <img src={preview} className="max-w-full max-h-[40vh] rounded-2xl shadow-2xl object-contain" alt="Decoded" />
                             <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 transition-opacity rounded-2xl flex items-center justify-center">
                                <Eye size={32} className="text-white" />
                             </div>
                          </div>
                          <button 
                             onClick={download}
                             className="px-10 py-5 bg-emerald-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-emerald-600/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
                          >
                             <Download size={20} /> Download PNG
                          </button>
                       </motion.div>
                    ) : (
                       <div className="text-center opacity-20 group-hover:scale-110 transition-transform">
                          <ImageIcon size={100} className="mx-auto mb-6" />
                          <p className="text-[10px] font-black uppercase tracking-widest">Awaiting Conversion</p>
                       </div>
                    )}
                 </AnimatePresence>
              </div>
           </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-indigo-600/20 flex items-start gap-4">
            <div className="p-3 bg-indigo-500 rounded-2xl">
              <Zap size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black">Instant Decoding</h4>
              <p className="text-sm text-indigo-100 opacity-80 leading-relaxed">
                Transform complex data strings into visual images instantly. Our tool handles 
                raw base64 and standard Data URIs with ease.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl text-emerald-600">
              <ShieldCheck size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Secure Processing</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                All decoding is performed entirely in your browser. Your visual data never 
                touches our servers, ensuring 100% privacy and security.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-amber-50 dark:bg-amber-900/30 rounded-2xl text-amber-600">
              <Settings2 size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Developer Friendly</h4>
              <p className="text-[11px] text-gray-500 leading-relaxed">
                Perfect for debugging database blobs, embedded CSS images, or API response 
                payloads during the development cycle.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
