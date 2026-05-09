"use client";

import React, { useState, useEffect } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  Code, 
  ArrowRightLeft, 
  Copy, 
  Download, 
  FileCode,
  Info,
  CheckCircle2,
  AlertCircle,
  Zap,
  Trash2,
  FileText,
  Upload,
  Lock,
  Unlock
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Mode = "encode" | "decode";

export default function Base64Converter() {
  const tool = tools.find((t) => t.id === "base64-encoder")!;

  // State
  const [input, setInput] = useState<string>("Hello, UtilityLab!");
  const [output, setOutput] = useState<string>("");
  const [mode, setMode] = useState<Mode>("encode");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Logic
  const handleConvert = () => {
    try {
      if (mode === "encode") {
        setOutput(btoa(input));
      } else {
        setOutput(atob(input));
      }
      setError(null);
    } catch (e: any) {
      setError("Invalid input for " + mode + " mode.");
      setOutput("");
    }
  };

  useEffect(() => {
    handleConvert();
  }, [input, mode]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (mode === "encode") {
        // For files, we usually want the base64 part only
        const base64 = result.split(',')[1] || result;
        setInput(base64);
      } else {
        setInput(result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Main Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Input Panel */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                {mode === 'encode' ? <Lock size={18} className="text-indigo-600" /> : <Unlock size={18} className="text-emerald-600" />}
                <h3 className="font-black text-gray-900 dark:text-white uppercase tracking-widest text-xs">
                  {mode === 'encode' ? 'Plain Text' : 'Base64 Input'}
                </h3>
              </div>
              <div className="flex items-center gap-3">
                 <button 
                  onClick={() => setMode(mode === 'encode' ? 'decode' : 'encode')}
                  className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                >
                  <ArrowRightLeft size={16} />
                </button>
                <button 
                  onClick={() => setInput("")}
                  className="p-2 text-gray-300 hover:text-rose-500 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <div className="relative group h-[400px]">
              <textarea 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                spellCheck={false}
                placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter base64 to decode...'}
                className="w-full h-full p-8 bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 rounded-[2.5rem] outline-none focus:border-indigo-600 transition-all font-mono text-sm leading-relaxed resize-none shadow-sm"
              />
              <div className="absolute bottom-6 right-6">
                <label className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl cursor-pointer hover:border-indigo-500 transition-all">
                  <Upload size={14} className="text-indigo-600" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Upload File</span>
                  <input type="file" className="hidden" onChange={handleFileUpload} />
                </label>
              </div>
            </div>
          </div>

          {/* Output Panel */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <FileCode size={18} className="text-indigo-600" />
                <h3 className="font-black text-gray-900 dark:text-white uppercase tracking-widest text-xs">
                  {mode === 'encode' ? 'Base64 Result' : 'Plain Result'}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={copyToClipboard}
                  className={`p-2 rounded-lg transition-all ${copied ? "bg-emerald-500 text-white" : "text-gray-400 hover:text-emerald-600 hover:bg-emerald-50"}`}
                >
                  <Copy size={16} />
                </button>
              </div>
            </div>
            <div className="relative h-[400px]">
              <textarea 
                value={output}
                readOnly
                placeholder="Result will appear here..."
                className="w-full h-full p-8 bg-gray-50 dark:bg-gray-800/50 border-2 border-transparent rounded-[2.5rem] outline-none font-mono text-sm leading-relaxed resize-none"
              />
              {error && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-[2.5rem]">
                  <AlertCircle size={48} className="text-rose-500 mb-4" />
                  <p className="text-sm font-black text-rose-500 uppercase tracking-widest">{error}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-indigo-50 dark:bg-indigo-900/10 rounded-3xl p-8 border border-indigo-100 dark:border-indigo-900/20 flex items-start gap-4">
            <div className="p-3 bg-indigo-500 text-white rounded-2xl">
              <Code size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-indigo-900 dark:text-indigo-100">Web Standards</h4>
              <p className="text-sm text-indigo-800/70 dark:text-indigo-200/70 leading-relaxed">
                Base64 is commonly used for embedding images in HTML/CSS, encoding binary data for JSON APIs, 
                and basic data obfuscation.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl text-emerald-600">
              <Zap size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Security Note</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Base64 is **not encryption**. It is an encoding scheme. Any data encoded in Base64 can be 
                easily decoded by anyone. Never use it for sensitive passwords.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
