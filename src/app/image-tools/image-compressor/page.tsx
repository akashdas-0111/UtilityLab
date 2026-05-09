"use client";

import React, { useState, useRef } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  Zap, 
  Upload, 
  Download, 
  FileImage, 
  Maximize, 
  Settings,
  Scale,
  RefreshCw,
  Info
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ImageCompressor() {
  const tool = tools.find((t) => t.id === "image-compressor")!;
  
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [quality, setQuality] = useState(0.8);
  const [isProcessing, setIsProcessing] = useState(false);
  const [compressedImage, setCompressedImage] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setOriginalSize(file.size);
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
        compress(event.target?.result as string, quality);
      };
      reader.readAsDataURL(file);
    }
  };

  const compress = (imageSrc: string, q: number) => {
    setIsProcessing(true);
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      const compressedData = canvas.toDataURL("image/jpeg", q);
      setCompressedImage(compressedData);
      
      // Estimate size
      const stringLength = compressedData.length - "data:image/jpeg;base64,".length;
      const sizeInBytes = Math.ceil(stringLength * 0.75);
      setCompressedSize(sizeInBytes);
      setIsProcessing(false);
    };
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-12">
        
        {/* Upload Area */}
        {!selectedImage ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-80 rounded-[3rem] border-4 border-dashed border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center gap-6 cursor-pointer hover:border-indigo-500 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/10 transition-all group"
          >
            <div className="w-20 h-20 rounded-3xl bg-indigo-600 text-white flex items-center justify-center shadow-xl shadow-indigo-600/20 group-hover:scale-110 transition-transform">
              <Upload size={32} />
            </div>
            <div className="text-center">
              <p className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">Click to Upload Image</p>
              <p className="text-sm text-gray-400 font-bold uppercase tracking-widest mt-1">JPEG, PNG, WEBP (MAX 10MB)</p>
            </div>
            <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Preview & Controls */}
            <div className="space-y-8">
               <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-8 border border-gray-100 dark:border-gray-800 shadow-xl space-y-8">
                  <div className="flex items-center justify-between">
                     <h3 className="text-xs font-black uppercase tracking-widest text-indigo-600">Compression Settings</h3>
                     <button onClick={() => setSelectedImage(null)} className="text-[10px] font-black uppercase text-rose-500 hover:underline">Change Image</button>
                  </div>
                  
                  <div className="space-y-6">
                    <label className="block">
                       <div className="flex justify-between items-center mb-4">
                          <span className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-tight">Quality Level</span>
                          <span className="text-indigo-600 font-black">{Math.round(quality * 100)}%</span>
                       </div>
                       <input 
                        type="range" min="0.1" max="1" step="0.05" value={quality} 
                        onChange={(e) => {
                          const q = parseFloat(e.target.value);
                          setQuality(q);
                          compress(selectedImage, q);
                        }}
                        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                       />
                    </label>

                    <div className="p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-800/50 space-y-3">
                       <div className="flex justify-between items-center text-xs font-bold">
                          <span className="text-gray-400">Original Size:</span>
                          <span className="text-gray-900 dark:text-white">{formatSize(originalSize)}</span>
                       </div>
                       <div className="flex justify-between items-center text-xs font-bold">
                          <span className="text-gray-400">Compressed Size:</span>
                          <span className="text-emerald-500">{formatSize(compressedSize)}</span>
                       </div>
                       <div className="pt-2 border-t border-indigo-100 dark:border-indigo-800 flex justify-between items-center">
                          <span className="text-[10px] font-black uppercase text-indigo-600">Space Saved:</span>
                          <span className="text-lg font-black text-emerald-500">{Math.round((1 - compressedSize / originalSize) * 100)}%</span>
                       </div>
                    </div>
                  </div>
               </div>

               <button 
                onClick={() => {
                  const link = document.createElement('a');
                  link.download = 'compressed-image.jpg';
                  link.href = compressedImage!;
                  link.click();
                }}
                className="w-full bg-indigo-600 text-white font-black py-5 rounded-2xl shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-3 hover:scale-105 transition-transform"
               >
                 <Download size={20} /> DOWNLOAD OPTIMIZED
               </button>
            </div>

            {/* Comparison */}
            <div className="bg-gray-100 dark:bg-gray-800 rounded-[3rem] p-4 flex flex-col gap-4 overflow-hidden shadow-inner">
               <div className="relative flex-1 rounded-[2.5rem] overflow-hidden bg-white dark:bg-gray-900">
                  <img src={compressedImage || selectedImage} alt="Preview" className="w-full h-full object-contain" />
                  <div className="absolute bottom-6 left-6 px-4 py-2 bg-black/50 backdrop-blur-md rounded-full text-[10px] font-black text-white uppercase tracking-widest">
                    {isProcessing ? "Processing..." : "Real-time Preview"}
                  </div>
               </div>
            </div>
          </div>
        )}

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {[
             { icon: Zap, title: "Lossy Engine", text: "Advanced canvas-based compression that preserves visual clarity while slashing file size." },
             { icon: Scale, title: "Size Targeted", text: "Fine-tune the quality slider to reach your desired KB/MB target instantly." },
             { icon: RefreshCw, title: "Local Processing", text: "Your images never leave your browser. Zero server uploads mean total privacy." }
           ].map((f, i) => (
             <div key={i} className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
                <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl text-indigo-600">
                  <f.icon size={24} />
                </div>
                <div className="space-y-1">
                  <h4 className="font-black text-gray-900 dark:text-white uppercase text-[10px] tracking-widest">{f.title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{f.text}</p>
                </div>
             </div>
           ))}
        </div>
      </div>
    </ToolLayout>
  );
}
