"use client";

import React, { useState, useRef } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  QrCode as QrIcon, 
  Download, 
  RefreshCcw, 
  Trash2, 
  Info,
  Zap,
  CheckCircle2,
  Palette,
  Settings2,
  Share2,
  Globe,
  Maximize
} from "lucide-react";
import { QRCodeSVG, QRCodeCanvas } from "qrcode.react";
import { motion } from "framer-motion";

export default function QRCodeGenerator() {
  const tool = tools.find((t) => t.id === "qr-code")!;

  // State
  const [value, setValue] = useState("https://utilitylab.com");
  const [fgColor, setFgColor] = useState("#4f46e5");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [size, setSize] = useState(256);
  const [level, setLevel] = useState<"L" | "M" | "Q" | "H">("H");
  const [includeMargin, setIncludeMargin] = useState(true);

  const canvasRef = useRef<HTMLDivElement>(null);

  const downloadQR = () => {
    const canvas = document.getElementById("qr-canvas") as HTMLCanvasElement;
    if (canvas) {
      const url = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = url;
      a.download = "utilitylab-qrcode.png";
      a.click();
    }
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Main Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Controls */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-8 md:p-10 border border-gray-100 dark:border-gray-800 shadow-sm space-y-8">
              
              {/* Input Area */}
              <div className="space-y-4">
                <div className="flex items-center justify-between px-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <Globe size={14} className="text-indigo-600" />
                    Content (URL or Text)
                  </label>
                  <button onClick={() => setValue("")} className="text-gray-300 hover:text-rose-500 transition-colors"><Trash2 size={14}/></button>
                </div>
                <textarea 
                  value={value} onChange={(e) => setValue(e.target.value)}
                  className="w-full h-32 p-6 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-600 rounded-[2rem] outline-none text-lg font-bold resize-none transition-all"
                  placeholder="Enter URL or text to encode..."
                />
              </div>

              {/* Settings Interface */}
              <div className="space-y-12">
                {/* Appearance Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-500/10 rounded-xl text-amber-500">
                      <Palette size={18} />
                    </div>
                    <h4 className="text-sm font-black text-white uppercase tracking-widest">Visual Appearance</h4>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="space-y-4 p-8 bg-gray-50 dark:bg-gray-800/30 rounded-[2.5rem] border border-gray-100 dark:border-gray-800">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Foreground Color</span>
                      <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-lg border-2 border-white/10 relative">
                          <input 
                            type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} 
                            className="absolute inset-[-10px] w-[calc(100%+20px)] h-[calc(100%+20px)] cursor-pointer" 
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-black text-white font-mono tracking-tighter">{fgColor.toUpperCase()}</p>
                          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tight">QR Pattern</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 p-8 bg-gray-50 dark:bg-gray-800/30 rounded-[2.5rem] border border-gray-100 dark:border-gray-800">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Background Color</span>
                      <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-lg border-2 border-white/10 relative">
                          <input 
                            type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} 
                            className="absolute inset-[-10px] w-[calc(100%+20px)] h-[calc(100%+20px)] cursor-pointer" 
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-black text-white font-mono tracking-tighter">{bgColor.toUpperCase()}</p>
                          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tight">Canvas BG</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Precision Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-500">
                      <Settings2 size={18} />
                    </div>
                    <h4 className="text-sm font-black text-white uppercase tracking-widest">Technical Precision</h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="space-y-4 p-8 bg-gray-50 dark:bg-gray-800/30 rounded-[2.5rem] border border-gray-100 dark:border-gray-800">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Error Correction</span>
                      <div className="relative">
                        <select 
                          value={level} onChange={(e) => setLevel(e.target.value as any)}
                          className="w-full p-5 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 outline-none text-[10px] font-black focus:ring-2 focus:ring-indigo-600 transition-all appearance-none cursor-pointer pr-10"
                        >
                          <option value="L">LOW (7%) - FAST</option>
                          <option value="M">MEDIUM (15%) - BALANCED</option>
                          <option value="Q">QUARTILE (25%) - SECURE</option>
                          <option value="H">HIGH (30%) - MAXIMUM</option>
                        </select>
                        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                          <Settings2 size={12} />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 p-8 bg-gray-50 dark:bg-gray-800/30 rounded-[2.5rem] border border-gray-100 dark:border-gray-800">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">White Margin</span>
                      <button 
                        onClick={() => setIncludeMargin(!includeMargin)}
                        className={`w-full p-5 rounded-2xl border transition-all text-[11px] font-black flex items-center justify-between group ${includeMargin ? 'bg-indigo-600 border-indigo-600 text-white shadow-xl shadow-indigo-600/30' : 'bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 text-gray-400 hover:border-indigo-500/50'}`}
                      >
                        <span className="uppercase tracking-widest">{includeMargin ? "Active" : "None"}</span>
                        <div className={`w-12 h-6 rounded-full relative transition-colors ${includeMargin ? 'bg-white/20' : 'bg-gray-200 dark:bg-gray-700'}`}>
                          <motion.div 
                            initial={false}
                            animate={{ x: includeMargin ? 24 : 4 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-lg"
                          />
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Result Card */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-10 border border-gray-100 dark:border-gray-800 shadow-xl flex flex-col items-center justify-center flex-1 relative group">
              <div className="bg-white p-6 rounded-3xl shadow-2xl shadow-indigo-600/10 transition-transform group-hover:scale-105 duration-500">
                <QRCodeCanvas 
                  id="qr-canvas"
                  value={value || "UtilityLab"}
                  size={size}
                  fgColor={fgColor}
                  bgColor={bgColor}
                  level={level}
                  includeMargin={includeMargin}
                />
              </div>
              <p className="mt-8 text-[10px] font-black text-gray-300 uppercase tracking-widest animate-pulse">Live Preview</p>
            </div>

            <button 
              onClick={downloadQR}
              disabled={!value}
              className="w-full py-6 bg-indigo-600 text-white rounded-[2rem] font-black uppercase tracking-widest shadow-2xl shadow-indigo-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              <Download size={20} /> Download PNG
            </button>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl text-indigo-600">
              <Zap size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Instant Sync</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Changes to colors, content, and error correction levels reflect instantly on the QR code.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl text-emerald-600">
              <Maximize size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">High Quality</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Generated codes are sharp and scannable by all modern mobile devices and QR readers.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-amber-50 dark:bg-amber-900/30 rounded-2xl text-amber-600">
              <Share2 size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Marketing Ready</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Perfect for menus, business cards, posters, and digital campaign tracking.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
