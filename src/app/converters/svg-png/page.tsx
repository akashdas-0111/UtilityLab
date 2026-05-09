"use client";

import React, { useState, useRef, useEffect } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  FileCode, 
  Image as ImageIcon, 
  Download, 
  RefreshCcw, 
  Trash2, 
  Info,
  Zap,
  CheckCircle2,
  AlertCircle,
  Settings2,
  Maximize2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SVGToPNG() {
  const tool = tools.find((t) => t.id === "svg-to-png")!;

  // State
  const [svgCode, setSvgCode] = useState<string>(`<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
</svg>`);
  const [pngImage, setPngImage] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [scale, setScale] = useState(2);
  const [error, setError] = useState<string | null>(null);

  const convertToPNG = () => {
    setIsConverting(true);
    setError(null);

    try {
      const svgBlob = new Blob([svgCode], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);
      const img = new Image();
      img.src = url;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error("Could not initialize canvas");

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        setPngImage(canvas.toDataURL('image/png'));
        setIsConverting(false);
        URL.revokeObjectURL(url);
      };

      img.onerror = () => {
        setError("Invalid SVG code.");
        setIsConverting(false);
      };
    } catch (e: any) {
      setError(e.message);
      setIsConverting(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(convertToPNG, 500);
    return () => clearTimeout(timer);
  }, [svgCode, scale]);

  const downloadPNG = () => {
    if (!pngImage) return;
    const a = document.createElement('a');
    a.href = pngImage;
    a.download = "rasterized-svg.png";
    a.click();
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Main Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[600px]">
          
          {/* SVG Input */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <FileCode size={18} className="text-indigo-600" />
                <h3 className="font-black text-gray-900 dark:text-white uppercase tracking-widest text-xs">SVG Source</h3>
              </div>
              <button 
                onClick={() => setSvgCode("")}
                className="p-2 text-gray-300 hover:text-rose-500 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
            <textarea 
              value={svgCode}
              onChange={(e) => setSvgCode(e.target.value)}
              spellCheck={false}
              className="w-full h-full p-8 bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 rounded-[2.5rem] outline-none focus:border-indigo-600 transition-all font-mono text-sm leading-relaxed resize-none shadow-sm"
              placeholder="Paste <svg> code here..."
            />
          </div>

          {/* PNG Preview */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <ImageIcon size={18} className="text-emerald-600" />
                <h3 className="font-black text-gray-900 dark:text-white uppercase tracking-widest text-xs">PNG Result</h3>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={downloadPNG}
                  disabled={!pngImage}
                  className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all disabled:opacity-30"
                >
                  <Download size={16} />
                </button>
              </div>
            </div>
            <div className="w-full h-full bg-gray-50 dark:bg-gray-800/50 border-2 border-transparent rounded-[2.5rem] flex items-center justify-center overflow-auto p-10 relative">
              {pngImage ? (
                <img src={pngImage} alt="PNG Output" className="max-w-full h-auto shadow-lg rounded-lg" />
              ) : (
                <div className="text-center opacity-30">
                  <ImageIcon size={64} className="mx-auto mb-4" />
                  <p className="text-xs font-black uppercase tracking-widest">Awaiting Valid SVG</p>
                </div>
              )}
              {error && (
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-rose-50 dark:bg-rose-900/30 border border-rose-200 dark:border-rose-800 rounded-2xl flex items-center gap-3">
                  <AlertCircle size={18} className="text-rose-600" />
                  <p className="text-xs font-bold text-rose-600 truncate">{error}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Settings Bar */}
        <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="flex items-center gap-6">
             <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl text-indigo-600">
               <Settings2 size={24} />
             </div>
             <div>
               <h4 className="font-black text-gray-900 dark:text-white">Raster Settings</h4>
               <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Adjust output quality and size</p>
             </div>
           </div>
           
           <div className="flex items-center gap-6 w-full md:w-auto">
             <div className="flex-1 md:w-64 space-y-2">
               <div className="flex justify-between text-[10px] font-black text-gray-400 uppercase tracking-widest">
                 <span>Scale Factor</span>
                 <span className="text-indigo-600">{scale}x</span>
               </div>
               <input 
                 type="range" min="1" max="10" step="1" value={scale}
                 onChange={(e) => setScale(parseInt(e.target.value))}
                 className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
               />
             </div>
             <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 min-w-[120px] text-center">
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Resolution</p>
               <p className="text-xs font-black text-indigo-600">High Def</p>
             </div>
           </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-indigo-50 dark:bg-indigo-900/10 rounded-3xl p-8 border border-indigo-100 dark:border-indigo-900/20 flex items-start gap-4">
            <div className="p-3 bg-indigo-500 text-white rounded-2xl">
              <Maximize2 size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-indigo-900 dark:text-indigo-100">Super Sampling</h4>
              <p className="text-sm text-indigo-800/70 dark:text-indigo-200/70 leading-relaxed">
                By increasing the scale factor, you can generate high-resolution PNGs from small SVG vectors 
                without any loss in sharpness or clarity.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl text-emerald-600">
              <Zap size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Designer Tool</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Perfect for creating app icons, web assets, or presentation images from SVG code 
                found in UI libraries or generated by design software.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
