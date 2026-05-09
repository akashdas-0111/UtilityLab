"use client";

import React, { useState, useEffect } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  Fingerprint, 
  RefreshCcw, 
  Copy, 
  CheckCircle2, 
  Zap, 
  ShieldCheck, 
  Trash2,
  Lock,
  Terminal,
  Settings2
} from "lucide-react";
import CryptoJS from "crypto-js";
import { motion, AnimatePresence } from "framer-motion";

export default function HashGenerator() {
  const tool = tools.find((t) => t.id === "hash")!;

  // State
  const [input, setInput] = useState("UtilityLab Security");
  const [hashes, setHashes] = useState({
    md5: "",
    sha1: "",
    sha256: "",
    sha512: ""
  });
  const [copied, setCopied] = useState<string | null>(null);

  const generateHashes = () => {
    if (!input.trim()) {
      setHashes({ md5: "", sha1: "", sha256: "", sha512: "" });
      return;
    }
    setHashes({
      md5: CryptoJS.MD5(input).toString(),
      sha1: CryptoJS.SHA1(input).toString(),
      sha256: CryptoJS.SHA256(input).toString(),
      sha512: CryptoJS.SHA512(input).toString()
    });
  };

  useEffect(() => {
    generateHashes();
  }, [input]);

  const copyToClipboard = (val: string, key: string) => {
    navigator.clipboard.writeText(val);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Input Card */}
        <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-8 md:p-12 border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform text-indigo-500">
            <Lock size={120} />
          </div>

          <div className="space-y-6 relative z-10">
            <div className="flex items-center justify-between px-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <Terminal size={14} className="text-indigo-600" />
                Input String
              </label>
              <button onClick={() => setInput("")} className="text-gray-300 hover:text-rose-500 transition-colors"><Trash2 size={14}/></button>
            </div>
            <textarea 
              value={input} onChange={(e) => setInput(e.target.value)}
              className="w-full h-32 p-8 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-600 rounded-[2.5rem] outline-none text-xl font-black resize-none transition-all"
              placeholder="Paste text to hash..."
            />
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 gap-6">
          {Object.entries(hashes).map(([key, val]) => (
            <div key={key} className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 group hover:border-indigo-600/50 transition-all">
              <div className="flex-1 w-full md:w-auto overflow-hidden">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-[10px] font-black text-gray-500 uppercase tracking-widest rounded-lg">
                    {key.toUpperCase()}
                  </span>
                </div>
                <code className="text-xs md:text-sm font-black font-mono text-gray-900 dark:text-white break-all block p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
                  {val || "Awaiting input..."}
                </code>
              </div>
              <button 
                onClick={() => copyToClipboard(val, key)}
                disabled={!val}
                className={`p-4 rounded-2xl transition-all shadow-lg ${copied === key ? "bg-emerald-500 text-white" : "bg-white dark:bg-gray-700 text-gray-400 hover:text-indigo-600 border border-gray-100 dark:border-gray-600 disabled:opacity-30"}`}
              >
                {copied === key ? <CheckCircle2 size={24}/> : <Copy size={24}/>}
              </button>
            </div>
          ))}
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-indigo-600/20 flex items-start gap-4">
            <div className="p-3 bg-indigo-500 rounded-2xl">
              <ShieldCheck size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black">Cryptographic Security</h4>
              <p className="text-sm text-indigo-100 opacity-80 leading-relaxed">
                Uses industry-standard algorithms from `crypto-js` to ensure reliable and 
                consistent hashing results for all your security needs.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl text-emerald-600">
              <Fingerprint size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Data Privacy</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                All hashing happens locally in your browser. Your sensitive data never leaves 
                your machine, ensuring 100% privacy and local-only processing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
