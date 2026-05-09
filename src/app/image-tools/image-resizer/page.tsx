"use client";

import React, { useState, useRef, useEffect } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  Maximize2, 
  Upload, 
  Download, 
  Trash2, 
  Lock, 
  Unlock, 
  Zap, 
  ImageIcon,
  Settings2,
  CheckCircle2,
  RefreshCcw,
  Monitor
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Format = "image/png" | "image/jpeg" | "image/webp";

export default function ImageResizer() {
  const tool = tools.find((t) => t.id === "image-resizer")!;

  // State
  const [image, setImage] = useState<string | null>(null);
  const [originalDim, setOriginalDim] = useState({ w: 0, h: 0 });
  const [targetDim, setTargetDim] = useState({ w: 0, h: 0 });
  const [lockRatio, setLockRatio] = useState(true);
  const [format, setFormat] = useState<Format>("image/png");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const url = event.target?.result as string;
        const img = new Image();
        img.onload = () => {
          setImage(url);
          setOriginalDim({ w: img.width, h: img.height });
          setTargetDim({ w: img.width, h: img.height });
        };
        img.src = url;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleWidthChange = (val: number) => {
    if (lockRatio) {
      const ratio = originalDim.h / originalDim.w;
      setTargetDim({ w: val, h: Math.round(val * ratio) });
    } else {
      setTargetDim(prev => ({ ...prev, w: val }));
    }
  };

  const handleHeightChange = (val: number) => {
    if (lockRatio) {
      const ratio = originalDim.w / originalDim.h;
      setTargetDim({ w: Math.round(val * ratio), h: val });
    } else {
      setTargetDim(prev => ({ ...prev, h: val }));
    }
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas || !image) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = targetDim.w;
      canvas.height = targetDim.h;
      ctx.drawImage(img, 0, 0, targetDim.w, targetDim.h);
      
      const link = document.createElement("a");
      link.download = `utilitylab-resized.${format.split("/")[1]}`;
      link.href = canvas.toDataURL(format, 0.9);
      link.click();
    };
    img.src = image;
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Main Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Controls Side */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-8 md:p-10 border border-gray-100 dark:border-gray-800 shadow-sm space-y-8">
               
               {/* Dimensions */}
               <div className="space-y-6">
                 <div className="flex items-center justify-between px-1">
                   <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                     <Maximize2 size={14} className="text-indigo-600" /> Target Dimensions
                   </h3>
                   <button onClick={() => setLockRatio(!lockRatio)} className="text-gray-300 hover:text-indigo-600 transition-colors">
                     {lockRatio ? <Lock size={16} /> : <Unlock size={16} />}
                   </button>
                 </div>
                 
                 <div className="space-y-4">
                   <div className="space-y-2">
                     <span className="text-[9px] font-bold text-gray-400 uppercase">Width (px)</span>
                     <input 
                      type="number" value={targetDim.w} onChange={(e) => handleWidthChange(parseInt(e.target.value) || 0)}
                      className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-600 rounded-2xl outline-none font-black text-lg transition-all"
                     />
                   </div>
                   <div className="space-y-2">
                     <span className="text-[9px] font-bold text-gray-400 uppercase">Height (px)</span>
                     <input 
                      type="number" value={targetDim.h} onChange={(e) => handleHeightChange(parseInt(e.target.value) || 0)}
                      className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-600 rounded-2xl outline-none font-black text-lg transition-all"
                     />
                   </div>
                 </div>
               </div>

               {/* Export Settings */}
               <div className="space-y-4">
                 <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                   <Settings2 size={14} className="text-amber-500" /> Export Format
                 </h3>
                 <select 
                  value={format} onChange={(e) => setFormat(e.target.value as Format)}
                  className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl outline-none font-black text-sm appearance-none cursor-pointer"
                 >
                   <option value="image/png">PNG (Lossless)</option>
                   <option value="image/jpeg">JPEG (Compressed)</option>
                   <option value="image/webp">WebP (Optimized)</option>
                 </select>
               </div>

               {/* Download Action */}
               <button 
                onClick={downloadImage}
                disabled={!image}
                className="w-full py-6 bg-indigo-600 text-white rounded-[2rem] font-black uppercase tracking-widest shadow-2xl shadow-indigo-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:hover:scale-100"
               >
                 <Download size={20} /> Download
               </button>
            </div>
          </div>

          {/* Preview Side */}
          <div className="lg:col-span-8 flex flex-col min-h-[500px]">
            {!image ? (
              <label className="flex-1 border-4 border-dashed border-gray-100 dark:border-gray-800 rounded-[3rem] flex flex-col items-center justify-center gap-6 cursor-pointer hover:border-indigo-600/50 hover:bg-indigo-50/10 transition-all group">
                <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
                <div className="p-8 bg-indigo-50 dark:bg-indigo-900/30 rounded-full text-indigo-600 group-hover:scale-110 transition-transform">
                  <Upload size={48} />
                </div>
                <div className="text-center">
                  <p className="text-xl font-black text-gray-900 dark:text-white">Upload your image</p>
                  <p className="text-sm text-gray-400 font-bold uppercase tracking-widest mt-2">or drag and drop</p>
                </div>
              </label>
            ) : (
              <div className="flex-1 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[3rem] p-8 relative overflow-hidden flex flex-col items-center justify-center">
                <div className="relative group/img max-w-full max-h-full">
                   <img src={image} className="max-w-full max-h-[60vh] rounded-2xl shadow-2xl object-contain transition-all" style={{ width: targetDim.w > targetDim.h ? '100%' : 'auto', height: targetDim.h > targetDim.w ? '100%' : 'auto' }} alt="Preview" />
                   <div className="absolute top-4 left-4 px-4 py-2 bg-black/50 backdrop-blur rounded-full text-[9px] font-black text-white uppercase tracking-widest">
                     Target: {targetDim.w}x{targetDim.h}
                   </div>
                </div>
                <button 
                  onClick={() => setImage(null)}
                  className="mt-8 px-6 py-3 bg-rose-50 text-rose-500 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-rose-500 hover:text-white transition-all"
                >
                  <Trash2 size={16} /> Remove Image
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Hidden Canvas */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-indigo-600/20 flex items-start gap-4">
            <div className="p-3 bg-indigo-500 rounded-2xl">
              <Monitor size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black">Exact Scaling</h4>
              <p className="text-sm text-indigo-100 opacity-80 leading-relaxed">
                Resize to specific pixel dimensions for responsive web design, social media posts, 
                or print layouts with 100% precision.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl text-emerald-600">
              <RefreshCcw size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Smart Aspect Ratio</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Automatically maintain the original image proportions when scaling, or unlock 
                to freely distort dimensions for custom needs.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-amber-50 dark:bg-amber-900/30 rounded-2xl text-amber-600">
              <CheckCircle2 size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Format Optimized</h4>
              <p className="text-[11px] text-gray-500 leading-relaxed">
                Choose the best export format for your use case. Use WebP for ultra-fast load 
                times on websites or PNG for maximum clarity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
