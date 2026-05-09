"use client";

import React, { useState, useRef } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  Crop, 
  Upload, 
  Download, 
  Trash2, 
  RefreshCcw, 
  RotateCw, 
  FlipHorizontal,
  FlipVertical,
  Zap,
  Settings2,
  Maximize2,
  Minimize2,
  CheckCircle2
} from "lucide-react";
import { Cropper, ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { motion, AnimatePresence } from "framer-motion";

export default function ImageCropper() {
  const tool = tools.find((t) => t.id === "image-cropper")!;

  // State
  const [image, setImage] = useState<string | null>(null);
  const [cropData, setCropData] = useState("#");
  const cropperRef = useRef<ReactCropperElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
    }
  };

  const downloadCrop = () => {
    const link = document.createElement("a");
    link.download = "utilitylab-cropped.png";
    link.href = cropperRef.current?.cropper.getCroppedCanvas().toDataURL() || "";
    link.click();
  };

  const setRatio = (ratio: number) => {
    cropperRef.current?.cropper.setAspectRatio(ratio);
  };

  const rotate = (deg: number) => {
    cropperRef.current?.cropper.rotate(deg);
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Main Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Controls Side */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-8 md:p-10 border border-gray-100 dark:border-gray-800 shadow-sm space-y-8">
               
               {/* Aspect Ratios */}
               <div className="space-y-4">
                 <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                   <Crop size={14} className="text-indigo-600" /> Presets
                 </h3>
                 <div className="grid grid-cols-2 gap-3">
                   {[
                     { label: "1:1 Square", ratio: 1 },
                     { label: "4:3 Classic", ratio: 4/3 },
                     { label: "16:9 Wide", ratio: 16/9 },
                     { label: "Free Form", ratio: 0 }
                   ].map(opt => (
                     <button 
                      key={opt.label}
                      onClick={() => setRatio(opt.ratio)}
                      className="p-4 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-500 hover:bg-indigo-50 hover:text-indigo-600 transition-all"
                     >
                       {opt.label}
                     </button>
                   ))}
                 </div>
               </div>

               {/* Transformations */}
               <div className="space-y-4">
                 <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                   <Settings2 size={14} className="text-amber-500" /> Adjustments
                 </h3>
                 <div className="flex gap-4">
                   <button onClick={() => rotate(-90)} className="flex-1 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl hover:bg-amber-50 transition-all flex flex-col items-center gap-2">
                      <RotateCw className="-scale-x-100 text-amber-600" size={18} />
                      <span className="text-[9px] font-black uppercase text-gray-400">-90°</span>
                   </button>
                   <button onClick={() => rotate(90)} className="flex-1 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl hover:bg-amber-50 transition-all flex flex-col items-center gap-2">
                      <RotateCw className="text-amber-600" size={18} />
                      <span className="text-[9px] font-black uppercase text-gray-400">+90°</span>
                   </button>
                 </div>
                 <div className="flex gap-4">
                   <button onClick={() => cropperRef.current?.cropper.scaleX(-cropperRef.current?.cropper.getData().scaleX || -1)} className="flex-1 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl hover:bg-indigo-50 transition-all flex flex-col items-center gap-2">
                      <FlipHorizontal className="text-indigo-600" size={18} />
                      <span className="text-[9px] font-black uppercase text-gray-400">Flip X</span>
                   </button>
                   <button onClick={() => cropperRef.current?.cropper.scaleY(-cropperRef.current?.cropper.getData().scaleY || -1)} className="flex-1 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl hover:bg-indigo-50 transition-all flex flex-col items-center gap-2">
                      <FlipVertical className="text-indigo-600" size={18} />
                      <span className="text-[9px] font-black uppercase text-gray-400">Flip Y</span>
                   </button>
                 </div>
               </div>

               {/* Download Action */}
               <button 
                onClick={downloadCrop}
                disabled={!image}
                className="w-full py-6 bg-indigo-600 text-white rounded-[2rem] font-black uppercase tracking-widest shadow-2xl shadow-indigo-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
               >
                 <Download size={20} /> Export Crop
               </button>
            </div>
          </div>

          {/* Editor Side */}
          <div className="lg:col-span-8 flex flex-col min-h-[600px]">
            {!image ? (
              <label className="flex-1 border-4 border-dashed border-gray-100 dark:border-gray-800 rounded-[3rem] flex flex-col items-center justify-center gap-6 cursor-pointer hover:border-indigo-600/50 hover:bg-indigo-50/10 transition-all group">
                <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
                <div className="p-8 bg-indigo-50 dark:bg-indigo-900/30 rounded-full text-indigo-600 group-hover:scale-110 transition-transform">
                  <Upload size={48} />
                </div>
                <div className="text-center">
                  <p className="text-xl font-black text-gray-900 dark:text-white">Upload your image</p>
                  <p className="text-sm text-gray-400 font-bold uppercase tracking-widest mt-2">to start cropping</p>
                </div>
              </label>
            ) : (
              <div className="flex-1 bg-gray-900 border border-gray-800 rounded-[3rem] p-10 relative overflow-hidden flex flex-col">
                <div className="flex-1 rounded-2xl overflow-hidden shadow-2xl">
                   <Cropper
                    ref={cropperRef}
                    style={{ height: "100%", width: "100%" }}
                    initialAspectRatio={1}
                    src={image}
                    viewMode={1}
                    minCanvasWidth={100}
                    minCanvasHeight={100}
                    background={false}
                    responsive={true}
                    autoCropArea={1}
                    checkOrientation={false}
                    guides={true}
                  />
                </div>
                <div className="flex justify-between mt-8">
                   <button 
                    onClick={() => setImage(null)}
                    className="px-6 py-3 bg-white/10 text-white/50 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all flex items-center gap-2"
                   >
                    <Trash2 size={16} /> Reset
                   </button>
                   <div className="flex gap-2">
                     <button onClick={() => cropperRef.current?.cropper.zoom(0.1)} className="p-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all"><Maximize2 size={18}/></button>
                     <button onClick={() => cropperRef.current?.cropper.zoom(-0.1)} className="p-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all"><Minimize2 size={18}/></button>
                   </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-indigo-600/20 flex items-start gap-4">
            <div className="p-3 bg-indigo-500 rounded-2xl">
              <Zap size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black">Dynamic Controls</h4>
              <p className="text-sm text-indigo-100 opacity-80 leading-relaxed">
                Rotate, flip, and zoom with instantaneous precision. Our interactive cropper 
                provides real-time feedback on every adjustment.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl text-emerald-600">
              <Settings2 size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Smart Presets</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Choose from standardized aspect ratios for Instagram squares, HD video wide screens, 
                or classic photography formats with a single click.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-amber-50 dark:bg-amber-900/30 rounded-2xl text-amber-600">
              <CheckCircle2 size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Pro Quality</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Exports are handled with high-fidelity canvas rendering, ensuring your cropped 
                images remain sharp and professional.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
