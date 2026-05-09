"use client";

import React, { useState, useRef } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  Image as ImageIcon, 
  Upload, 
  Download, 
  RefreshCcw, 
  Trash2, 
  Info,
  Zap,
  CheckCircle2,
  AlertCircle,
  FileImage,
  Layers
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ImageToWebP() {
  const tool = tools.find((t) => t.id === "image-to-webp")!;

  // State
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [webpImage, setWebpImage] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [quality, setQuality] = useState(0.8);
  const [originalSize, setOriginalSize] = useState(0);
  const [newSize, setNewSize] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError("Please select a valid image file.");
        return;
      }
      setOriginalSize(file.size);
      const reader = new FileReader();
      reader.onload = (event) => {
        setSourceImage(event.target?.result as string);
        setWebpImage(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const convertToWebP = () => {
    if (!sourceImage) return;
    setIsConverting(true);
    
    const img = new Image();
    img.src = sourceImage;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      ctx.drawImage(img, 0, 0);
      
      canvas.toBlob((blob) => {
        if (blob) {
          setNewSize(blob.size);
          const url = URL.createObjectURL(blob);
          setWebpImage(url);
          setIsConverting(false);
        }
      }, 'image/webp', quality);
    };
  };

  const downloadImage = () => {
    if (!webpImage) return;
    const a = document.createElement('a');
    a.href = webpImage;
    a.download = "converted-image.webp";
    a.click();
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Main Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Controls & Preview */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-8 md:p-10 border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden flex flex-col items-center justify-center min-h-[400px]">
              {!sourceImage ? (
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center gap-4 cursor-pointer group"
                >
                  <div className="w-20 h-20 rounded-full bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-all">
                    <Upload size={32} />
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-black text-gray-900 dark:text-white">Click or Drag Image</p>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">PNG, JPG, HEIC supported</p>
                  </div>
                </div>
              ) : (
                <div className="w-full relative group">
                  <img 
                    src={webpImage || sourceImage} 
                    alt="Preview" 
                    className="max-h-[500px] mx-auto rounded-2xl shadow-2xl object-contain"
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button 
                      onClick={() => { setSourceImage(null); setWebpImage(null); }}
                      className="p-3 bg-white/90 backdrop-blur text-rose-600 rounded-xl shadow-lg hover:bg-rose-500 hover:text-white transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              )}
              <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} accept="image/*" />
            </div>

            {/* Quality Slider */}
            <div className="bg-white dark:bg-gray-900 rounded-[2rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
               <div className="flex items-center justify-between mb-6">
                 <div className="flex items-center gap-3">
                   <Layers size={18} className="text-indigo-600" />
                   <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-widest">Compression Quality</h3>
                 </div>
                 <span className="px-4 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 rounded-full text-xs font-black">
                   {Math.round(quality * 100)}%
                 </span>
               </div>
               <input 
                type="range" min="0.1" max="1" step="0.05" value={quality}
                onChange={(e) => setQuality(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
               />
               <div className="flex justify-between mt-4 text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">
                 <span>Smallest Size</span>
                 <span>Best Quality</span>
               </div>
            </div>
          </div>

          {/* Stats & Actions */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-gray-900 rounded-[3rem] p-8 text-white space-y-8 flex flex-col justify-between h-full">
              <div className="space-y-8">
                <h3 className="text-xl font-black flex items-center gap-2">
                  <Zap size={20} className="text-amber-400" />
                  Performance Info
                </h3>
                
                <div className="space-y-4">
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Original Size</p>
                    <p className="text-2xl font-black">{(originalSize / 1024).toFixed(2)} KB</p>
                  </div>
                  <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
                    <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">WebP Size</p>
                    <p className="text-2xl font-black text-emerald-400">{newSize ? (newSize / 1024).toFixed(2) : "--"} KB</p>
                  </div>
                  {newSize > 0 && (
                    <div className="text-center">
                      <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Savings</p>
                      <p className="text-4xl font-black text-emerald-400">{Math.max(0, Math.round(((originalSize - newSize) / originalSize) * 100))}%</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                {!webpImage ? (
                  <button 
                    disabled={!sourceImage || isConverting}
                    onClick={convertToWebP}
                    className="w-full py-6 bg-indigo-600 rounded-3xl font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                  >
                    {isConverting ? <RefreshCcw className="animate-spin" /> : "Convert to WebP"}
                  </button>
                ) : (
                  <button 
                    onClick={downloadImage}
                    className="w-full py-6 bg-emerald-600 rounded-3xl font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3"
                  >
                    <Download size={20} /> Download WebP
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl text-indigo-600">
              <ImageIcon size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Why WebP?</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                WebP images are significantly smaller than PNGs or JPGs while maintaining high visual quality. 
                They speed up website loading and improve SEO rankings.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl text-emerald-600">
              <CheckCircle2 size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Client-Side Security</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                All processing happens in your browser. Your images are never uploaded to any server, 
                ensuring 100% privacy and security for your visual assets.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
