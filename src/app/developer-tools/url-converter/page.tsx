"use client";

import React, { useState, useEffect } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  Link, 
  ArrowRightLeft, 
  Copy, 
  Info,
  Zap,
  Trash2,
  Globe,
  Terminal,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Mode = "encode" | "decode";

export default function URLConverter() {
  const tool = tools.find((t) => t.id === "url-encoder")!;

  // State
  const [input, setInput] = useState<string>("https://utilitylab.com/search?q=hello world & symbol=$");
  const [output, setOutput] = useState<string>("");
  const [mode, setMode] = useState<Mode>("encode");
  const [copied, setCopied] = useState(false);

  // Conversion Logic
  const handleConvert = () => {
    try {
      if (mode === "encode") {
        setOutput(encodeURIComponent(input));
      } else {
        setOutput(decodeURIComponent(input));
      }
    } catch (e) {
      setOutput("Error: Invalid URI component");
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

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Main Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[400px]">
          
          {/* Input Panel */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <Terminal size={18} className="text-indigo-600" />
                <h3 className="font-black text-gray-900 dark:text-white uppercase tracking-widest text-xs">
                  {mode === 'encode' ? 'Raw URL' : 'Encoded URL'}
                </h3>
              </div>
              <div className="flex items-center gap-3">
                 <button 
                  onClick={() => setMode(mode === 'encode' ? 'decode' : 'encode')}
                  className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                  title="Switch Mode"
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
            <textarea 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              spellCheck={false}
              className="w-full h-full p-8 bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 rounded-[2.5rem] outline-none focus:border-indigo-600 transition-all font-mono text-sm leading-relaxed resize-none shadow-sm"
              placeholder={mode === 'encode' ? 'Enter URL to encode...' : 'Enter URL to decode...'}
            />
          </div>

          {/* Output Panel */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <Link size={18} className="text-emerald-600" />
                <h3 className="font-black text-gray-900 dark:text-white uppercase tracking-widest text-xs">
                  {mode === 'encode' ? 'Encoded Result' : 'Decoded Result'}
                </h3>
              </div>
              <button 
                onClick={copyToClipboard}
                className={`p-2 rounded-lg transition-all ${copied ? "bg-emerald-500 text-white" : "text-gray-400 hover:text-emerald-600 hover:bg-emerald-50"}`}
              >
                <Copy size={16} />
              </button>
            </div>
            <textarea 
              value={output}
              readOnly
              className="w-full h-full p-8 bg-gray-50 dark:bg-gray-800/50 border-2 border-transparent rounded-[2.5rem] outline-none font-mono text-sm leading-relaxed resize-none"
              placeholder="Result will appear here..."
            />
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-indigo-600 rounded-3xl p-8 text-white shadow-xl shadow-indigo-600/20 flex flex-col justify-between">
            <Globe size={24} className="mb-4 text-indigo-300" />
            <div>
              <h4 className="font-black mb-2">RFC 3986 Standard</h4>
              <p className="text-xs text-indigo-100 opacity-80 leading-relaxed">
                Uses standard percent-encoding to ensure your URLs are compatible across all web servers and browsers.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col justify-between">
            <ShieldCheck size={24} className="mb-4 text-emerald-600" />
            <div>
              <h4 className="font-black text-gray-900 dark:text-white mb-2">Secure Parsing</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Processes all data locally in your browser. No data is sent to the server, keeping your private links secure.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col justify-between">
            <Zap size={24} className="mb-4 text-amber-600" />
            <div>
              <h4 className="font-black text-gray-900 dark:text-white mb-2">Instant Action</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Simply paste and get the result. No buttons to click, real-time conversion as you type.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
