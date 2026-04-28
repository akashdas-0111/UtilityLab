"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  Copy, 
  Trash2, 
  RefreshCcw, 
  Upload, 
  Download, 
  ArrowRightLeft, 
  Settings2, 
  ShieldCheck, 
  AlertCircle, 
  FileText, 
  Image as ImageIcon,
  Zap,
  Lock,
  Binary,
  Code,
  CheckCircle2,
  Share2,
  MoreVertical
} from "lucide-react";

type Mode = "encode" | "decode";

export default function Base64Converter() {
  const [mode, setMode] = useState<Mode>("encode");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [urlSafe, setUrlSafe] = useState(false);
  const [padding, setPadding] = useState(true);
  const [lineWrap, setLineWrap] = useState(0); // 0 = none
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState<number | null>(null);
  const [mimeType, setMimeType] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [status, setStatus] = useState({ valid: true, message: "" });
  const [metrics, setMetrics] = useState({ inBytes: 0, outBytes: 0, increase: 0 });
  const [hash, setHash] = useState("");

  const tool = tools.find(t => t.id === "base64-encoder")!;
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Core Processing
  const process = useCallback(async (val: string, currentMode: Mode) => {
    if (!val) {
      setOutput("");
      setMetrics({ inBytes: 0, outBytes: 0, increase: 0 });
      setStatus({ valid: true, message: "" });
      setHash("");
      setPreviewUrl(null);
      return;
    }

    try {
      if (currentMode === "encode") {
        // UTF-8 aware encoding
        const encoder = new TextEncoder();
        const bytes = encoder.encode(val);
        let b64 = btoa(String.fromCharCode(...bytes));
        
        if (urlSafe) b64 = b64.replace(/\+/g, '-').replace(/\//g, '_');
        if (!padding) b64 = b64.replace(/=+$/, '');
        
        if (lineWrap > 0) {
          const re = new RegExp(`.{1,${lineWrap}}`, "g");
          b64 = b64.match(re)?.join("\n") || b64;
        }
        
        setOutput(b64);
        setStatus({ valid: true, message: "Encoded successfully" });
        
        // Metrics & Hash
        setMetrics({ inBytes: bytes.length, outBytes: b64.length, increase: bytes.length > 0 ? ((b64.length - bytes.length) / bytes.length) * 100 : 0 });
        const hashBuffer = await crypto.subtle.digest("SHA-256", bytes);
        setHash(Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, "0")).join(""));

      } else {
        // Decoding
        let cleanInput = val.trim().replace(/\s/g, '');
        if (urlSafe) cleanInput = cleanInput.replace(/-/g, '+').replace(/_/g, '/');
        
        // Auto-fix padding
        if (cleanInput.length % 4 !== 0) {
          cleanInput = cleanInput.padEnd(cleanInput.length + (4 - (cleanInput.length % 4)), '=');
        }

        const binaryString = atob(cleanInput);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        
        // Detect Image Magic Numbers
        const header = bytes.slice(0, 4);
        let detectedMime = "";
        if (header[0] === 0x89 && header[1] === 0x50 && header[2] === 0x4E && header[3] === 0x47) detectedMime = "image/png";
        else if (header[0] === 0xFF && header[1] === 0xD8) detectedMime = "image/jpeg";
        else if (header[0] === 0x47 && header[1] === 0x49 && header[2] === 0x46) detectedMime = "image/gif";
        else if (header[0] === 0x3C && header[1] === 0x3F && header[2] === 0x78 && header[3] === 0x6D) detectedMime = "image/svg+xml";
        else if (val.startsWith("data:")) {
          const match = val.match(/^data:([^;]+);/);
          if (match) detectedMime = match[1];
        }

        if (detectedMime.startsWith("image/")) {
          setPreviewUrl(val.startsWith("data:") ? val : `data:${detectedMime};base64,${cleanInput}`);
          setMimeType(detectedMime);
        } else {
          setPreviewUrl(null);
        }

        try {
          const text = new TextDecoder().decode(bytes);
          setOutput(text);
        } catch {
          setOutput("[Binary Data]");
        }
        
        setStatus({ valid: true, message: "Decoded successfully" });
        setMetrics({ inBytes: val.length, outBytes: bytes.length, increase: 0 });
      }
    } catch (e: any) {
      setStatus({ valid: false, message: "Invalid Input: " + e.message });
      setOutput("");
    }
  }, [urlSafe, padding, lineWrap]);

  useEffect(() => {
    process(input, mode);
  }, [input, mode, process]);

  // File Handlers
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setFileSize(file.size);
    setMimeType(file.type);
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const b64 = event.target?.result as string;
      setInput(b64);
      setPreviewUrl(b64);
      setMode("encode");
    };
    reader.readAsDataURL(file);
  };

  const handleDownloadFile = () => {
    if (!input) return;
    const a = document.createElement("a");
    a.href = input.startsWith("data:") ? input : `data:${mimeType || "application/octet-stream"};base64,${input}`;
    a.download = fileName || "downloaded-file";
    a.click();
  };

  const swap = () => {
    const oldOut = output;
    setMode(mode === "encode" ? "decode" : "encode");
    setInput(oldOut);
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-8">
        {/* Mode Toggle & Status */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="flex p-1 bg-gray-100 dark:bg-gray-800 rounded-2xl">
            <button 
              onClick={() => setMode("encode")}
              className={`px-8 py-2.5 rounded-xl text-sm font-bold transition-all ${mode === "encode" ? "bg-white dark:bg-gray-950 text-indigo-600 shadow-sm" : "text-gray-500"}`}
            >
              Encode
            </button>
            <button 
              onClick={() => setMode("decode")}
              className={`px-8 py-2.5 rounded-xl text-sm font-bold transition-all ${mode === "decode" ? "bg-white dark:bg-gray-950 text-indigo-600 shadow-sm" : "text-gray-500"}`}
            >
              Decode
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 ${status.valid ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-red-50 text-red-600 border border-red-100"}`}>
              {status.valid ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
              {status.message || "Ready"}
            </div>
            <button 
              onClick={swap}
              className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-xl transition-all"
              title="Swap Input/Output"
            >
              <ArrowRightLeft size={20} />
            </button>
          </div>
        </div>

        {/* Input/Output Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Panel */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <label className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <FileText size={16} className="text-indigo-600" />
                {mode === "encode" ? "Source Text / File" : "Base64 String"}
              </label>
              <div className="flex gap-4">
                <button onClick={() => setInput("")} className="text-xs text-red-500 hover:underline">Clear</button>
                <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
                <button onClick={() => fileInputRef.current?.click()} className="text-xs text-indigo-600 hover:underline flex items-center gap-1">
                  <Upload size={12} /> Upload File
                </button>
              </div>
            </div>
            <div className="relative group">
              <textarea
                className="w-full h-80 p-6 rounded-3xl bg-gray-50 dark:bg-gray-800/30 border-2 border-gray-100 dark:border-gray-800 focus:border-indigo-500 outline-none transition-all resize-none text-sm font-mono leading-relaxed"
                placeholder={mode === "encode" ? "Enter text to encode..." : "Paste Base64 to decode..."}
                value={input}
                onChange={(e) => setInput(e.target.value)}
              ></textarea>
              {metrics.inBytes > 0 && (
                <div className="absolute bottom-4 right-4 px-3 py-1 bg-white/80 dark:bg-gray-900/80 backdrop-blur rounded-lg text-[10px] font-bold text-gray-500 border border-gray-100 dark:border-gray-800">
                  {metrics.inBytes.toLocaleString()} Bytes
                </div>
              )}
            </div>
          </div>

          {/* Output Panel */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <label className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <Zap size={16} className="text-indigo-600" />
                {mode === "encode" ? "Base64 Result" : "Plain Text Result"}
              </label>
              <div className="flex gap-4">
                {mode === "decode" && input.includes("data:") && (
                  <button onClick={handleDownloadFile} className="text-xs text-emerald-600 hover:underline flex items-center gap-1">
                    <Download size={12} /> Download File
                  </button>
                )}
                <button onClick={() => navigator.clipboard.writeText(output)} className="text-xs text-indigo-600 hover:underline flex items-center gap-1">
                  <Copy size={12} /> Copy Output
                </button>
              </div>
            </div>
            <div className="relative group">
              <textarea
                className="w-full h-80 p-6 rounded-3xl bg-gray-950 text-emerald-400 border-2 border-transparent focus:border-indigo-500 outline-none transition-all resize-none text-sm font-mono leading-relaxed shadow-inner"
                readOnly
                value={output}
                placeholder="Result will appear here..."
              ></textarea>
              {metrics.outBytes > 0 && (
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <div className="px-3 py-1 bg-gray-900/80 backdrop-blur rounded-lg text-[10px] font-bold text-indigo-400 border border-indigo-900/30">
                    {metrics.outBytes.toLocaleString()} Bytes
                  </div>
                  {mode === "encode" && (
                    <div className="px-3 py-1 bg-gray-900/80 backdrop-blur rounded-lg text-[10px] font-bold text-orange-400 border border-orange-900/30">
                      +{metrics.increase.toFixed(1)}%
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Options & Preview Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Options Panel */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 space-y-8">
            <div className="flex items-center gap-2 mb-2">
              <Settings2 size={18} className="text-indigo-600" />
              <h3 className="font-bold text-gray-900 dark:text-white">Advanced Options</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-10 h-5 rounded-full transition-all relative ${urlSafe ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'}`}>
                    <input type="checkbox" className="sr-only" checked={urlSafe} onChange={() => setUrlSafe(!urlSafe)} />
                    <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${urlSafe ? 'translate-x-5' : ''}`} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-700 dark:text-gray-300">URL Safe</p>
                    <p className="text-[10px] text-gray-400">Replace + / with - _</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-10 h-5 rounded-full transition-all relative ${padding ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'}`}>
                    <input type="checkbox" className="sr-only" checked={padding} onChange={() => setPadding(!padding)} />
                    <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${padding ? 'translate-x-5' : ''}`} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-700 dark:text-gray-300">Padding</p>
                    <p className="text-[10px] text-gray-400">Include = at the end</p>
                  </div>
                </label>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Line Wrapping</label>
                  <select 
                    value={lineWrap} 
                    onChange={(e) => setLineWrap(parseInt(e.target.value))}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 text-sm outline-none focus:border-indigo-500"
                  >
                    <option value={0}>None (Single Line)</option>
                    <option value={64}>64 Characters</option>
                    <option value={76}>76 Characters</option>
                  </select>
                </div>
              </div>
            </div>

            {hash && (
              <div className="pt-6 border-t border-gray-50 dark:border-gray-800">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">SHA-256 Hash of Input</label>
                <div className="p-3 bg-gray-50 dark:bg-gray-950 rounded-xl text-[10px] font-mono break-all text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/30">
                  {hash}
                </div>
              </div>
            )}
          </div>

          {/* Preview Panel */}
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 flex flex-col">
            <div className="flex items-center gap-2 mb-6">
              <ImageIcon size={18} className="text-indigo-600" />
              <h3 className="font-bold text-gray-900 dark:text-white">Media Preview</h3>
            </div>
            <div className="flex-grow flex items-center justify-center bg-gray-50 dark:bg-gray-800/50 rounded-2xl border-2 border-dashed border-gray-100 dark:border-gray-800 overflow-hidden min-h-[200px]">
              {previewUrl && mimeType.startsWith("image/") ? (
                <img src={previewUrl} alt="Preview" className="max-w-full max-h-full object-contain p-4 shadow-xl" />
              ) : (
                <div className="text-center p-8">
                  <Binary size={48} className="mx-auto mb-4 opacity-10 text-gray-400" />
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Encoded images or Data URIs will be previewed here.
                  </p>
                </div>
              )}
            </div>
            {fileName && (
              <div className="mt-4 flex items-center justify-between p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-100 dark:border-indigo-900/30">
                <div className="min-w-0">
                  <p className="text-xs font-bold text-gray-900 dark:text-white truncate">{fileName}</p>
                  <p className="text-[10px] text-indigo-600 dark:text-indigo-400 uppercase font-bold">{mimeType || "Unknown Type"}</p>
                </div>
                <ShieldCheck size={20} className="text-emerald-500 flex-shrink-0" />
              </div>
            )}
          </div>
        </div>

        {/* Developer Snippets */}
        {output && mode === "encode" && (
          <div className="bg-gray-950 rounded-3xl p-8 space-y-6">
            <div className="flex items-center gap-2">
              <Code size={18} className="text-indigo-400" />
              <h3 className="font-bold text-white">Developer Code Snippets</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">JavaScript (Data URI)</p>
                <pre className="p-4 bg-gray-900 rounded-xl text-xs text-emerald-400 overflow-x-auto">
                  const base64Data = "{output.substring(0, 30)}...";
                </pre>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Python (base64 module)</p>
                <pre className="p-4 bg-gray-900 rounded-xl text-xs text-emerald-400 overflow-x-auto">
                  import base64{"\n"}
                  encoded = "{output.substring(0, 30)}..."
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* SEO Content */}
        <div className="mt-16 pt-12 border-t border-gray-100 dark:border-gray-800">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">
            Professional Base64 Suite: Fast, Secure, and Client-Side
          </h2>
          <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 leading-relaxed space-y-6">
            <p>
              Base64 is the standard for representing binary data in an ASCII string format. Whether you're embedding images in CSS, transmitting data over URLs, or debugging API payloads, our **Base64 Converter** provides the most comprehensive set of features for developers.
            </p>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Advanced Encoding Features:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>UTF-8 Support:</strong> Unlike basic encoders, we fully support emojis and international character sets using the modern `TextEncoder` API.</li>
              <li><strong>URL-Safe Encoding:</strong> Automatically switch between standard Base64 and the URL-safe variant (replacing `+` and `/`) for safer transmission in query parameters.</li>
              <li><strong>Padding Controls:</strong> Toggle the `=` padding character based on your specific system requirements (common in JWT and token-based systems).</li>
              <li><strong>Line Wrapping:</strong> Wrap your output to 64 or 76 characters to match MIME standards for email and certificate formats.</li>
            </ul>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Intelligent File Handling:</h3>
            <p>
              Transform files into Base64 strings or reconstruct binary files from pasted data. Our tool automatically detects MIME types and provides a **Live Image Preview** for instant verification of your encoded assets.
            </p>
            <p>
              <strong>100% Privacy Guaranteed:</strong> Your files and strings are processed entirely within your browser's local memory. We never upload your data to a server, ensuring that sensitive keys, tokens, and private files remain yours and yours alone.
            </p>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
