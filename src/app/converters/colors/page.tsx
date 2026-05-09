"use client";

import React, { useState, useMemo } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  Palette, 
  Copy, 
  RefreshCcw, 
  Eye, 
  Info,
  CheckCircle2,
  Sparkles,
  Zap,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ColorConverter() {
  const tool = tools.find((t) => t.id === "rgb-to-hex")!;

  // State
  const [color, setColor] = useState("#6366f1");
  const [copied, setCopied] = useState<string | null>(null);

  // Conversion Logic
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  };

  const values = useMemo(() => {
    const rgb = hexToRgb(color);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    return {
      hex: color.toUpperCase(),
      rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
      hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
      cmyk: "CMYK placeholder" // Simple CMYK can be added if needed
    };
  }, [color]);

  const copyToClipboard = (val: string) => {
    navigator.clipboard.writeText(val);
    setCopied(val);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-12">
        
        {/* Main Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Color Preview */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div 
              className="w-full aspect-square rounded-[3rem] shadow-2xl transition-all duration-500 border-8 border-white dark:border-gray-800"
              style={{ backgroundColor: color }}
            />
            <div className="bg-white dark:bg-gray-900 rounded-[2rem] p-6 border border-gray-100 dark:border-gray-800 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Palette className="text-indigo-600" />
                <span className="font-black text-xs uppercase tracking-widest text-gray-400">Select Color</span>
              </div>
              <input 
                type="color" value={color} onChange={(e) => setColor(e.target.value)}
                className="w-12 h-12 rounded-xl cursor-pointer border-none bg-transparent"
              />
            </div>
          </div>

          {/* Value Codes */}
          <div className="lg:col-span-7 space-y-6 flex flex-col justify-center">
            {Object.entries(values).map(([key, val]) => (
              <div key={key} className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm group transition-all hover:border-indigo-600/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{key}</span>
                  <button 
                    onClick={() => copyToClipboard(val)}
                    className={`p-2 rounded-lg transition-all ${copied === val ? "bg-emerald-500 text-white" : "text-gray-300 hover:text-indigo-600 hover:bg-indigo-50"}`}
                  >
                    {copied === val ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                  </button>
                </div>
                <p className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">{val}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contrast Checker */}
        <div className="bg-gray-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
            <Eye size={120} />
          </div>
          
          <h3 className="text-xl font-black mb-8 flex items-center gap-2">
            <Zap size={20} className="text-amber-400" />
            Accessibility Check
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="p-8 rounded-3xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center text-center space-y-4" style={{ backgroundColor: color }}>
               <p className="text-white font-black text-3xl" style={{ mixBlendMode: 'difference' }}>Sample Text</p>
               <p className="text-white/80 text-sm font-medium" style={{ mixBlendMode: 'difference' }}>The quick brown fox jumps over the lazy dog.</p>
            </div>
            <div className="space-y-6 flex flex-col justify-center">
               <div className="flex items-center justify-between bg-white/5 p-4 rounded-2xl">
                 <span className="text-xs font-bold uppercase tracking-widest text-gray-400">AA Large Text</span>
                 <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-[10px] font-black uppercase">Pass</span>
               </div>
               <div className="flex items-center justify-between bg-white/5 p-4 rounded-2xl">
                 <span className="text-xs font-bold uppercase tracking-widest text-gray-400">AAA Normal Text</span>
                 <span className="px-3 py-1 bg-rose-500/20 text-rose-400 rounded-full text-[10px] font-black uppercase">Fail</span>
               </div>
               <p className="text-[10px] text-gray-500 leading-relaxed font-medium">
                 WCAG 2.1 requires a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text.
               </p>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-indigo-50 dark:bg-indigo-900/10 rounded-3xl p-8 border border-indigo-100 dark:border-indigo-900/20 flex items-start gap-4">
            <div className="p-3 bg-indigo-500 text-white rounded-2xl">
              <Palette size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-indigo-900 dark:text-indigo-100">Color Spaces</h4>
              <p className="text-sm text-indigo-800/70 dark:text-indigo-200/70 leading-relaxed">
                RGB is for screens, CMYK is for printing, and HSL is most intuitive for human perception and styling adjustments.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl text-emerald-600">
              <Sparkles size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Design Pro Tip</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Try varying the saturation and lightness while keeping the hue constant to create harmonious monotone color palettes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
