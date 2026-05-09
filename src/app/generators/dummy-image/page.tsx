"use client";

import React, { useState, useEffect, useRef, useCallback, Suspense } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  Image as ImageIcon, Download, Copy, RefreshCcw, Link as LinkIcon, 
  Settings2, Type, Layers, Maximize, Share2, Archive, CheckCircle2
} from "lucide-react";
import JSZip from "jszip";

type Format = "png" | "jpeg" | "webp" | "svg";
type BgType = "solid" | "gradient";

const PRESETS = [
  { name: "Full HD", w: 1920, h: 1080 },
  { name: "HD", w: 1280, h: 720 },
  { name: "Instagram Square", w: 1080, h: 1080 },
  { name: "Instagram Story", w: 1080, h: 1920 },
  { name: "Medium Rectangle (Ad)", w: 300, h: 250 },
  { name: "Leaderboard (Ad)", w: 728, h: 90 },
  { name: "Avatar", w: 256, h: 256 },
];

function DummyImageGeneratorCore() {
  const tool = tools.find(t => t.id === "dummy-image")!;
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // State
  const [width, setWidth] = useState(parseInt(searchParams.get("w") || "800"));
  const [height, setHeight] = useState(parseInt(searchParams.get("h") || "600"));
  const [bgType, setBgType] = useState<BgType>((searchParams.get("bgt") as BgType) || "solid");
  const [bgColor, setBgColor] = useState(searchParams.get("bg") || "#e2e8f0");
  const [bgGradEnd, setBgGradEnd] = useState(searchParams.get("bg2") || "#94a3b8");
  const [textMode, setTextMode] = useState<"dimensions" | "custom">((searchParams.get("tm") as any) || "dimensions");
  const [customText, setCustomText] = useState(searchParams.get("txt") || "Placeholder");
  const [textColor, setTextColor] = useState(searchParams.get("tc") || "#475569");
  const [format, setFormat] = useState<Format>("png");
  
  const [addNoise, setAddNoise] = useState(searchParams.get("noise") === "true");
  const [isCopied, setIsCopied] = useState(false);
  const [isZipLoading, setIsZipLoading] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync state to URL (debounced slightly)
  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams();
      params.set("w", width.toString());
      params.set("h", height.toString());
      params.set("bgt", bgType);
      params.set("bg", bgColor);
      if (bgType === "gradient") params.set("bg2", bgGradEnd);
      params.set("tm", textMode);
      if (textMode === "custom") params.set("txt", customText);
      params.set("tc", textColor);
      if (addNoise) params.set("noise", "true");
      
      const newUrl = `${pathname}?${params.toString()}`;
      // Use replace so we don't spam browser history
      window.history.replaceState({}, '', newUrl);
    }, 500);
    return () => clearTimeout(timeout);
  }, [width, height, bgType, bgColor, bgGradEnd, textMode, customText, textColor, addNoise, pathname]);

  const generateSvgContent = useCallback(() => {
    const text = textMode === "dimensions" ? `${width} × ${height}` : customText;
    let defs = '';
    let fill = bgColor;

    if (bgType === "gradient") {
      defs = `
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${bgColor};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${bgGradEnd};stop-opacity:1" />
          </linearGradient>
          ${addNoise ? `
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
            <feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.1 0" />
          </filter>
          ` : ''}
        </defs>`;
      fill = "url(#grad)";
    } else if (addNoise) {
      defs = `
        <defs>
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
            <feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.1 0" />
          </filter>
        </defs>`;
    }

    const fontSize = Math.max(12, Math.min(width, height) * 0.1);

    return `
      <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
        ${defs}
        <rect width="${width}" height="${height}" fill="${fill}" />
        ${addNoise ? `<rect width="${width}" height="${height}" style="pointer-events:none;" filter="url(#noise)" opacity="0.4" />` : ''}
        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="${textColor}" font-family="system-ui, sans-serif" font-weight="bold" font-size="${fontSize}px">
          ${text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}
        </text>
      </svg>
    `.trim();
  }, [width, height, bgType, bgColor, bgGradEnd, textMode, customText, textColor, addNoise]);

  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = width;
    canvas.height = height;

    // Background
    if (bgType === "gradient") {
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, bgColor);
      grad.addColorStop(1, bgGradEnd);
      ctx.fillStyle = grad;
    } else {
      ctx.fillStyle = bgColor;
    }
    ctx.fillRect(0, 0, width, height);

    // Noise
    if (addNoise) {
      const imgData = ctx.getImageData(0, 0, width, height);
      const data = imgData.data;
      for (let i = 0; i < data.length; i += 4) {
        const noise = Math.random() * 25 - 12.5; // subtle noise
        data[i] = Math.min(255, Math.max(0, data[i] + noise));
        data[i+1] = Math.min(255, Math.max(0, data[i+1] + noise));
        data[i+2] = Math.min(255, Math.max(0, data[i+2] + noise));
      }
      ctx.putImageData(imgData, 0, 0);
    }

    // Text
    const text = textMode === "dimensions" ? `${width} × ${height}` : customText;
    const fontSize = Math.max(12, Math.min(width, height) * 0.1);
    ctx.fillStyle = textColor;
    ctx.font = `bold ${fontSize}px system-ui, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, width / 2, height / 2);
  }, [width, height, bgType, bgColor, bgGradEnd, textMode, customText, textColor, addNoise]);

  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  const handleDownload = () => {
    if (format === "svg") {
      const svg = generateSvgContent();
      const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `dummy-${width}x${height}.svg`;
      a.click();
    } else {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const url = canvas.toDataURL(`image/${format}`);
      const a = document.createElement("a");
      a.href = url;
      a.download = `dummy-${width}x${height}.${format}`;
      a.click();
    }
  };

  const handleCopyClipboard = async () => {
    if (format === "svg") {
      const svg = generateSvgContent();
      navigator.clipboard.writeText(svg);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob(async (blob) => {
      if (!blob) return;
      try {
        await navigator.clipboard.write([
          new ClipboardItem({ [blob.type]: blob })
        ]);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (err) {
        console.error("Copy failed", err);
        alert("Clipboard copy failed or not supported in this browser.");
      }
    }, "image/png");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Shareable link copied to clipboard!");
  };

  const downloadBatch = async () => {
    setIsZipLoading(true);
    try {
      const zip = new JSZip();
      
      for (const preset of PRESETS) {
        // We temporarily render each onto a hidden canvas/svg purely in memory
        const w = preset.w;
        const h = preset.h;
        const c = document.createElement("canvas");
        c.width = w;
        c.height = h;
        const ctx = c.getContext("2d")!;
        
        ctx.fillStyle = bgColor;
        if (bgType === "gradient") {
          const grad = ctx.createLinearGradient(0, 0, w, h);
          grad.addColorStop(0, bgColor);
          grad.addColorStop(1, bgGradEnd);
          ctx.fillStyle = grad;
        }
        ctx.fillRect(0, 0, w, h);

        const txt = textMode === "dimensions" ? `${w} × ${h}` : customText;
        const fSize = Math.max(12, Math.min(w, h) * 0.1);
        ctx.fillStyle = textColor;
        ctx.font = `bold ${fSize}px system-ui, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(txt, w / 2, h / 2);

        const dataUrl = c.toDataURL("image/png");
        const base64Data = dataUrl.split(',')[1];
        zip.file(`${preset.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_${w}x${h}.png`, base64Data, {base64: true});
      }

      const content = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(content);
      const a = document.createElement("a");
      a.href = url;
      a.download = "dummy_images_batch.zip";
      a.click();
    } catch (e) {
      console.error(e);
      alert("Failed to generate ZIP");
    }
    setIsZipLoading(false);
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Controls */}
          <div className="lg:col-span-1 space-y-6 bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
            
            <div className="flex items-center gap-2 mb-4">
              <Settings2 size={18} className="text-indigo-600" />
              <h3 className="font-bold text-gray-900 dark:text-white">Image Configuration</h3>
            </div>

            {/* Dimensions */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2"><Maximize size={14}/> Dimensions</label>
              <div className="flex items-center gap-2">
                <input 
                  type="number" 
                  min="1" max="4096"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-bold"
                  value={width}
                  onChange={(e) => setWidth(Math.min(4096, Math.max(1, parseInt(e.target.value) || 1)))}
                  placeholder="Width"
                />
                <span className="text-gray-400 font-bold">×</span>
                <input 
                  type="number" 
                  min="1" max="4096"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-bold"
                  value={height}
                  onChange={(e) => setHeight(Math.min(4096, Math.max(1, parseInt(e.target.value) || 1)))}
                  placeholder="Height"
                />
              </div>
            </div>

            {/* Presets */}
            <div className="flex flex-wrap gap-2">
              {PRESETS.slice(0, 4).map(p => (
                <button 
                  key={p.name}
                  onClick={() => { setWidth(p.w); setHeight(p.h); }}
                  className="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg text-[10px] font-bold hover:bg-indigo-100 transition-colors"
                >
                  {p.w}x{p.h}
                </button>
              ))}
            </div>

            {/* Background */}
            <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-800">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2"><Layers size={14}/> Background</label>
              
              <div className="flex bg-gray-50 dark:bg-gray-800 p-1 rounded-xl">
                <button 
                  onClick={() => setBgType("solid")}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${bgType === "solid" ? "bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white" : "text-gray-500"}`}
                >
                  Solid Color
                </button>
                <button 
                  onClick={() => setBgType("gradient")}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${bgType === "gradient" ? "bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white" : "text-gray-500"}`}
                >
                  Gradient
                </button>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-6 h-6 rounded cursor-pointer" />
                  <input type="text" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-full bg-transparent outline-none text-xs font-mono" />
                </div>
                {bgType === "gradient" && (
                  <>
                    <span className="text-gray-400">→</span>
                    <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-xl">
                      <input type="color" value={bgGradEnd} onChange={e => setBgGradEnd(e.target.value)} className="w-6 h-6 rounded cursor-pointer" />
                      <input type="text" value={bgGradEnd} onChange={e => setBgGradEnd(e.target.value)} className="w-full bg-transparent outline-none text-xs font-mono" />
                    </div>
                  </>
                )}
              </div>
              
              <label className="flex items-center gap-2 cursor-pointer mt-2">
                <input type="checkbox" checked={addNoise} onChange={e => setAddNoise(e.target.checked)} className="rounded text-indigo-600 focus:ring-indigo-500" />
                <span className="text-sm font-bold text-gray-700 dark:text-gray-300">Add Noise Texture</span>
              </label>
            </div>

            {/* Text Overlay */}
            <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-800">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2"><Type size={14}/> Text Overlay</label>
              
              <div className="flex bg-gray-50 dark:bg-gray-800 p-1 rounded-xl">
                <button 
                  onClick={() => setTextMode("dimensions")}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${textMode === "dimensions" ? "bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white" : "text-gray-500"}`}
                >
                  Dimensions
                </button>
                <button 
                  onClick={() => setTextMode("custom")}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${textMode === "custom" ? "bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white" : "text-gray-500"}`}
                >
                  Custom Text
                </button>
              </div>

              {textMode === "custom" && (
                <input 
                  type="text" 
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-bold"
                  placeholder="Enter placeholder text..."
                />
              )}

              <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-xl w-1/2">
                <span className="text-xs font-bold text-gray-400">Color:</span>
                <input type="color" value={textColor} onChange={e => setTextColor(e.target.value)} className="w-6 h-6 rounded cursor-pointer" />
                <input type="text" value={textColor} onChange={e => setTextColor(e.target.value)} className="w-full bg-transparent outline-none text-xs font-mono" />
              </div>
            </div>

          </div>

          {/* Preview & Export */}
          <div className="lg:col-span-2 space-y-6 flex flex-col">
            
            <div className="bg-gray-50 dark:bg-gray-950 rounded-3xl p-4 border border-gray-200 dark:border-gray-800 shadow-inner flex-grow flex items-center justify-center overflow-hidden min-h-[400px] relative pattern-grid-lg">
              <div 
                ref={containerRef}
                className="relative max-w-full max-h-full flex items-center justify-center"
                style={{ aspectRatio: `${width} / ${height}` }}
              >
                {/* Visual Preview uses Canvas scaled down via CSS to fit container */}
                <canvas 
                  ref={canvasRef} 
                  className="shadow-xl max-w-full max-h-full object-contain"
                  style={{ borderRadius: "8px" }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-4">
                <h4 className="font-bold text-sm text-gray-900 dark:text-white flex items-center gap-2"><Download size={16}/> Export Image</h4>
                <div className="flex flex-col sm:flex-row gap-2">
                  <select 
                    value={format} 
                    onChange={e => setFormat(e.target.value as Format)}
                    className="px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg outline-none text-sm font-bold flex-1"
                  >
                    <option value="png">PNG</option>
                    <option value="jpeg">JPG</option>
                    <option value="webp">WebP</option>
                    <option value="svg">SVG (Vector)</option>
                  </select>
                  <button 
                    onClick={handleDownload} 
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-bold text-sm hover:bg-indigo-500 transition-colors whitespace-nowrap"
                  >
                    Download
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={handleCopyClipboard} className="px-3 py-2 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-bold hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex justify-center items-center gap-1">
                    {isCopied ? <CheckCircle2 size={14} className="text-emerald-500" /> : <Copy size={14} />} 
                    {isCopied ? "Copied!" : "Copy Image"}
                  </button>
                  <button onClick={handleCopyLink} className="px-3 py-2 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-bold hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex justify-center items-center gap-1">
                    <LinkIcon size={14} /> Copy URL State
                  </button>
                </div>
              </div>

              <div className="bg-indigo-50 dark:bg-indigo-900/10 p-4 rounded-2xl border border-indigo-100 dark:border-indigo-900/20 shadow-sm flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-sm text-indigo-900 dark:text-indigo-100 flex items-center gap-2"><Archive size={16}/> Batch Export</h4>
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-1">Download a ZIP file containing this design in 7 standard ad and social media sizes.</p>
                </div>
                <button 
                  onClick={downloadBatch} 
                  disabled={isZipLoading}
                  className="mt-4 w-full px-4 py-2 bg-indigo-600 text-white rounded-lg font-bold text-sm hover:bg-indigo-500 transition-colors flex justify-center items-center gap-2 disabled:opacity-50"
                >
                  {isZipLoading ? <RefreshCcw size={14} className="animate-spin" /> : <Archive size={14} />} 
                  Download Preset Bundle ZIP
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </ToolLayout>
  );
}

export default function DummyImageGenerator() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center p-20"><div className="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full"></div></div>}>
      <DummyImageGeneratorCore />
    </Suspense>
  );
}
