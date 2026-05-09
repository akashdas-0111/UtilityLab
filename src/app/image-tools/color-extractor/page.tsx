"use client";

import React, { useState, useRef, useCallback } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  Palette, 
  Upload, 
  Copy, 
  CheckCircle2, 
  Trash2, 
  Zap, 
  Image as ImageIcon,
  Pipette,
  Layers,
  Settings2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ColorExtractor() {
  const tool = tools.find((t) => t.id === "color-extractor")!;

  // State
  const [image, setImage] = useState<string | null>(null);
  const [colors, setColors] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const extractColors = (imgElement: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = imgElement.width;
    canvas.height = imgElement.height;
    ctx.drawImage(imgElement, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    const colorCounts: Record<string, number> = {};

    // Sample pixels (every 10th for performance)
    for (let i = 0; i < imageData.length; i += 40) {
      const r = imageData[i];
      const g = imageData[i + 1];
      const b = imageData[i + 2];
      
      // Group similar colors (quantization)
      const qr = Math.round(r / 10) * 10;
      const qg = Math.round(g / 10) * 10;
      const qb = Math.round(b / 10) * 10;
      
      const hex = `#${((1 << 24) + (qr << 16) + (qg << 8) + qb).toString(16).slice(1)}`;
      colorCounts[hex] = (colorCounts[hex] || 0) + 1;
    }

    const sortedColors = Object.entries(colorCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([hex]) => hex);

    setColors(sortedColors);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const url = event.target?.result as string;
        setImage(url);
        const img = new Image();
        img.onload = () => extractColors(img);
        img.src = url;
      };
      reader.readAsDataURL(file);
    }
  };

  const copyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopied(hex);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Upload & Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[500px]">
          
          {/* Upload Area */}
          <div className="relative group flex flex-col h-full">
            {!image ? (
              <label className="flex-1 border-4 border-dashed border-gray-100 dark:border-gray-800 rounded-[3rem] flex flex-col items-center justify-center gap-6 cursor-pointer hover:border-indigo-600/50 hover:bg-indigo-50/10 transition-all group">
                <input type="checkbox" className="hidden" />
                <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
                <div className="p-8 bg-indigo-50 dark:bg-indigo-900/30 rounded-full text-indigo-600 group-hover:scale-110 transition-transform">
                  <Upload size={48} />
                </div>
                <div className="text-center">
                  <p className="text-xl font-black text-gray-900 dark:text-white">Drop your image here</p>
                  <p className="text-sm text-gray-400 font-bold uppercase tracking-widest mt-2">or click to browse</p>
                </div>
              </label>
            ) : (
              <div className="flex-1 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[3rem] p-8 relative overflow-hidden flex items-center justify-center">
                <img src={image} className="max-w-full max-h-full rounded-2xl shadow-2xl object-contain" alt="Preview" />
                <button 
                  onClick={() => { setImage(null); setColors([]); }}
                  className="absolute top-6 right-6 p-4 bg-white/90 backdrop-blur rounded-2xl text-rose-500 shadow-xl hover:scale-110 transition-all"
                >
                  <Trash2 size={24} />
                </button>
              </div>
            )}
          </div>

          {/* Palette Area */}
          <div className="flex flex-col space-y-6 h-full">
            <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-10 border border-gray-100 dark:border-gray-800 shadow-sm flex-1 flex flex-col">
               <div className="flex items-center justify-between mb-8">
                 <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
                   <Palette size={18} className="text-indigo-600" /> Extracted Palette
                 </h3>
                 <span className="text-[10px] font-black px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full uppercase text-gray-400">{colors.length} Colors</span>
               </div>
               
               <div className="grid grid-cols-2 gap-4 flex-1">
                 <AnimatePresence mode="popLayout">
                   {colors.length > 0 ? colors.map((color, idx) => (
                     <motion.div 
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      key={color}
                      className="group relative h-24 rounded-3xl cursor-pointer overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm"
                      style={{ backgroundColor: color }}
                      onClick={() => copyColor(color)}
                     >
                       <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex flex-col items-center justify-center opacity-0 group-hover:opacity-100">
                          <span className="text-white font-black text-xs uppercase tracking-widest mb-1">{color}</span>
                          {copied === color ? <CheckCircle2 size={16} className="text-emerald-400" /> : <Copy size={16} className="text-white/70" />}
                       </div>
                     </motion.div>
                   )) : (
                     <div className="col-span-2 h-full flex flex-col items-center justify-center opacity-20">
                       <Pipette size={48} className="mb-4" />
                       <p className="text-[10px] font-black uppercase tracking-widest">Awaiting Image...</p>
                     </div>
                   )}
                 </AnimatePresence>
               </div>
            </div>
          </div>
        </div>

        {/* Hidden Canvas */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-indigo-600/20 flex flex-col justify-between">
            <Zap size={24} className="mb-4 text-indigo-300" />
            <div>
              <h4 className="font-black mb-2">Instant Sampling</h4>
              <p className="text-xs text-indigo-100 opacity-80 leading-relaxed">
                Uses advanced pixel-sampling algorithms to find the most dominant and visually 
                striking colors in any uploaded image.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col justify-between">
            <Layers size={24} className="mb-4 text-emerald-600" />
            <div>
              <h4 className="font-black text-gray-900 dark:text-white mb-2">Brand Consistency</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Perfect for extracting brand colors from logos or generating matching design 
                elements for a specific hero image.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col justify-between">
            <Settings2 size={24} className="mb-4 text-amber-600" />
            <div>
              <h4 className="font-black text-gray-900 dark:text-white mb-2">Pro Export</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Copy hex codes instantly with a single click. Our tool automatically groups 
                similar shades to provide the cleanest results.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
