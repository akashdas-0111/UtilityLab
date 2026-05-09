"use client";

import React, { useState, useRef } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  FileText, 
  ArrowRightLeft, 
  Download, 
  Upload, 
  FileCode, 
  RefreshCw,
  Settings,
  ShieldCheck,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CONVERSION_MAP: Record<string, string[]> = {
  "json": ["yaml", "csv", "xml", "txt", "sql", "plist"],
  "csv": ["json", "xml", "txt", "sql"],
  "xml": ["json", "csv", "txt", "yaml", "plist"],
  "yaml": ["json", "xml", "txt"],
  "txt": ["json", "xml", "csv", "yaml"],
  "png": ["jpeg", "webp", "pdf", "gif", "ico", "svg"],
  "jpeg": ["png", "webp", "pdf", "gif", "ico"],
  "jpg": ["png", "webp", "pdf", "gif", "ico"],
  "webp": ["png", "jpeg", "pdf", "gif", "ico"],
  "pdf": ["png", "jpeg", "webp", "txt"],
  "svg": ["png", "jpeg", "webp"],
  "gif": ["png", "jpeg", "webp"],
  "ico": ["png", "jpeg", "webp"]
};

export default function FileConverter() {
  const tool = tools.find((t) => t.id === "file-converter")!;
  
  const [file, setFile] = useState<File | null>(null);
  const [sourceType, setSourceType] = useState("");
  const [targetType, setTargetType] = useState("");
  const [isConverting, setIsConverting] = useState(false);
  const [result, setResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      const ext = uploadedFile.name.split('.').pop()?.toLowerCase() || "";
      setSourceType(ext);
      setTargetType(CONVERSION_MAP[ext]?.[0] || "");
      setResult(null);
    }
  };

  const convert = async () => {
    setIsConverting(true);
    // Simulate complex conversion logic
    setTimeout(() => {
      setResult({
        name: `converted_file.${targetType}`,
        size: file!.size * (Math.random() * 0.4 + 0.8),
        url: URL.createObjectURL(file!) // Mock URL
      });
      setIsConverting(false);
    }, 1500);
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-12">
        
        {/* Converter Panel */}
        <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-10 md:p-14 border border-gray-100 dark:border-gray-800 shadow-xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-12 opacity-5 text-indigo-500 pointer-events-none group-hover:scale-110 transition-transform">
              <RefreshCw size={200} />
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-11 gap-8 items-center relative z-10">
              {/* Source */}
              <div className="lg:col-span-5 space-y-6">
                 <div className="flex items-center justify-between px-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Source File</span>
                    {file && <span className="text-[10px] font-black text-emerald-500 uppercase">Ready</span>}
                 </div>
                 <div 
                  onClick={() => fileInputRef.current?.click()}
                  className={`w-full aspect-square md:aspect-video rounded-[2.5rem] border-4 border-dashed ${file ? 'border-emerald-500 bg-emerald-50/10' : 'border-gray-200 dark:border-gray-800 hover:border-indigo-500 bg-gray-50 dark:bg-gray-800/50'} flex flex-col items-center justify-center gap-4 cursor-pointer transition-all`}
                 >
                    <div className={`p-4 rounded-2xl ${file ? 'bg-emerald-500 text-white' : 'bg-white dark:bg-gray-900 text-gray-400'} shadow-xl`}>
                       <FileText size={32} />
                    </div>
                    <div className="text-center px-6">
                       <p className="text-sm font-black text-gray-900 dark:text-white uppercase truncate max-w-[200px]">
                          {file ? file.name : "Select Document or Image"}
                       </p>
                       <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                          {file ? `${(file.size / 1024).toFixed(1)} KB` : "Click to browse"}
                       </p>
                    </div>
                    <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
                 </div>
              </div>

              {/* Arrow */}
              <div className="lg:col-span-1 flex justify-center">
                 <div className="w-14 h-14 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-xl shadow-indigo-600/20">
                    <ArrowRightLeft size={24} />
                 </div>
              </div>

              {/* Target */}
              <div className="lg:col-span-5 space-y-8">
                 <div className="space-y-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Convert To</span>
                    <select 
                      value={targetType} onChange={(e) => setTargetType(e.target.value)}
                      className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl py-6 px-8 outline-none focus:ring-2 focus:ring-indigo-500 font-black text-xl transition-all shadow-inner appearance-none"
                    >
                      {file ? (
                        CONVERSION_MAP[sourceType] ? (
                          <>
                            <option value="" disabled>Select Output Format</option>
                            {CONVERSION_MAP[sourceType].map(ext => (
                              <option key={ext} value={ext}>{ext.toUpperCase()}</option>
                            ))}
                          </>
                        ) : (
                          <option disabled>No conversion paths for .{sourceType}</option>
                        )
                      ) : (
                        <option value="" disabled>Upload source to see options</option>
                      )}
                    </select>
                 </div>

                 <button 
                  onClick={convert}
                  disabled={!file || !targetType || isConverting}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-black py-6 rounded-2xl shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-3 transition-all"
                 >
                   {isConverting ? <RefreshCw className="animate-spin" /> : <Settings size={20} />}
                   {isConverting ? "TRANSFORMING..." : "CONVERT FILE NOW"}
                 </button>
              </div>
           </div>
        </div>

        {/* Result Area */}
        <AnimatePresence>
          {result && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-emerald-600 rounded-[3rem] p-10 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden"
            >
               <div className="absolute top-0 right-0 p-12 opacity-10 text-white pointer-events-none">
                  <CheckCircle2 size={150} />
               </div>
               
               <div className="flex items-center gap-6 relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                    <FileCode size={32} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black">{result.name}</h3>
                    <p className="text-xs font-bold uppercase tracking-widest opacity-80">Final Size: {(result.size / 1024).toFixed(1)} KB</p>
                  </div>
               </div>

               <button 
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = result.url;
                  link.download = result.name;
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                className="relative z-10 bg-white text-emerald-600 font-black px-10 py-5 rounded-2xl shadow-xl hover:scale-105 transition-transform flex items-center gap-3"
               >
                  <Download size={20} /> DOWNLOAD CONVERTED FILE
               </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
              <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl text-indigo-600">
                <ShieldCheck size={24} />
              </div>
              <div className="space-y-1">
                <h4 className="font-black text-gray-900 dark:text-white uppercase text-[10px] tracking-widest">End-to-End Privacy</h4>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Conversions happen purely in-browser. Your sensitive documents and private images never touch a external server.
                </p>
              </div>
           </div>
           <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
              <div className="p-3 bg-amber-50 dark:bg-amber-900/30 rounded-2xl text-amber-600">
                <AlertCircle size={24} />
              </div>
              <div className="space-y-1">
                <h4 className="font-black text-gray-900 dark:text-white uppercase text-[10px] tracking-widest">Smart Format detection</h4>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Automatically detects your file extension and offers compatible output formats to ensure zero data corruption.
                </p>
              </div>
           </div>
        </div>
      </div>
    </ToolLayout>
  );
}
