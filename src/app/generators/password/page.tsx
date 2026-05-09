"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  Lock, 
  RefreshCcw, 
  Copy, 
  CheckCircle2, 
  ShieldCheck, 
  ShieldAlert,
  Settings2,
  Zap,
  Eye,
  EyeOff,
  History
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PasswordGenerator() {
  const tool = tools.find((t) => t.id === "password-generator")!;

  // State
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    excludeConfusing: true
  });
  const [copied, setCopied] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

  const generatePassword = useCallback(() => {
    let charset = "";
    if (options.lowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (options.uppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (options.numbers) charset += "0123456789";
    if (options.symbols) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    if (options.excludeConfusing) {
      charset = charset.replace(/[ilLIoO01]/g, "");
    }

    if (charset === "") {
      setPassword("Select at least one option");
      return;
    }

    let generated = "";
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);

    for (let i = 0; i < length; i++) {
      generated += charset[array[i] % charset.length];
    }
    setPassword(generated);
  }, [length, options]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  const getStrength = () => {
    if (password.length < 8) return { label: "Weak", color: "bg-rose-500", percent: 25 };
    if (password.length < 12) return { label: "Moderate", color: "bg-amber-500", percent: 50 };
    if (password.length < 16) return { label: "Strong", color: "bg-emerald-500", percent: 75 };
    return { label: "Secure", color: "bg-indigo-500", percent: 100 };
  };

  const strength = getStrength();

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Main Display */}
        <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-8 md:p-12 border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
            <Lock size={120} />
          </div>

          <div className="space-y-8 relative z-10">
            {/* Password Result */}
            <div className="relative">
              <div className={`w-full px-8 py-10 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus-within:border-indigo-600 rounded-[2.5rem] flex items-center justify-between transition-all shadow-inner ${!showPassword ? 'blur-sm select-none' : ''}`}>
                <span className="text-3xl md:text-5xl font-black font-mono tracking-tight text-gray-900 dark:text-white break-all">
                  {password}
                </span>
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 right-6 flex items-center gap-2">
                <button 
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-3 text-gray-400 hover:text-indigo-600 hover:bg-white dark:hover:bg-gray-700 rounded-2xl transition-all"
                >
                  {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                </button>
                <button 
                  onClick={() => { navigator.clipboard.writeText(password); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                  className={`p-4 rounded-2xl transition-all ${copied ? "bg-emerald-500 text-white" : "bg-white dark:bg-gray-700 text-gray-400 hover:text-indigo-600 shadow-lg border border-gray-100 dark:border-gray-600"}`}
                >
                  {copied ? <CheckCircle2 size={24}/> : <Copy size={24}/>}
                </button>
              </div>
            </div>

            {/* Strength Meter */}
            <div className="space-y-3 px-2">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Security Level</span>
                <span className={`text-[10px] font-black uppercase tracking-widest ${strength.color.replace('bg-', 'text-')}`}>{strength.label}</span>
              </div>
              <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${strength.percent}%` }}
                  className={`h-full ${strength.color} transition-all duration-500 shadow-[0_0_10px_rgba(0,0,0,0.1)]`}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              {/* Length Control */}
              <div className="space-y-4">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Length</label>
                  <span className="text-sm font-black text-indigo-600">{length} Chars</span>
                </div>
                <input 
                  type="range" min="8" max="64" value={length} onChange={(e) => setLength(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-end">
                <button 
                  onClick={generatePassword}
                  className="w-full py-4 bg-indigo-600 text-white rounded-[1.5rem] font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-600/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <RefreshCcw size={16} /> New Password
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { id: "lowercase", label: "abc", name: "Lowercase" },
            { id: "uppercase", label: "ABC", name: "Uppercase" },
            { id: "numbers", label: "123", name: "Numbers" },
            { id: "symbols", label: "#$!", name: "Symbols" },
            { id: "excludeConfusing", label: "iI1", name: "No Ambiguous" }
          ].map(opt => (
            <button 
              key={opt.id}
              onClick={() => setOptions(prev => ({ ...prev, [opt.id]: !prev[opt.id as keyof typeof prev] }))}
              className={`p-6 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-2 ${options[opt.id as keyof typeof options] ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-600 text-indigo-600' : 'bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 text-gray-400 hover:border-gray-200'}`}
            >
              <span className="text-xl font-black">{opt.label}</span>
              <span className="text-[10px] font-black uppercase tracking-widest">{opt.name}</span>
            </button>
          ))}
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl text-indigo-600">
              <ShieldCheck size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Crypto Secure</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                We use the Web Crypto API's `getRandomValues()` for true cryptographic entropy, 
                not just standard pseudo-random numbers.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl text-emerald-600">
              <History size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Local Privacy</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Passwords are never stored or transmitted. They are generated instantly in your 
                browser and disappear as soon as you close the tab.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
