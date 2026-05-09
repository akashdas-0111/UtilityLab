"use client";

import React, { useState, useEffect, useMemo } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  ShieldCheck, 
  Lock, 
  Trash2, 
  Copy, 
  CheckCircle2, 
  Zap, 
  RefreshCcw, 
  FileCode,
  Terminal,
  AlertCircle,
  Eye,
  Settings2
} from "lucide-react";
import { jwtDecode } from "jwt-decode";
import { motion, AnimatePresence } from "framer-motion";

export default function JWTDebugger() {
  const tool = tools.find((t) => t.id === "jwt-debugger")!;

  // State
  const [token, setToken] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c");
  const [copied, setCopied] = useState(false);

  const decoded = useMemo(() => {
    try {
      const header = JSON.parse(atob(token.split('.')[0]));
      const payload = jwtDecode(token);
      return { header, payload, error: null };
    } catch (e: any) {
      return { header: null, payload: null, error: e.message };
    }
  }, [token]);

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Main Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Input Side */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm flex-1 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform text-indigo-500">
                <Lock size={120} />
              </div>
              
              <div className="space-y-6 relative z-10 h-full flex flex-col">
                <div className="flex items-center justify-between px-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <Terminal size={14} className="text-indigo-600" />
                    Encoded JWT
                  </label>
                  <button onClick={() => setToken("")} className="text-gray-300 hover:text-rose-500 transition-colors"><Trash2 size={14}/></button>
                </div>
                <textarea 
                  value={token} onChange={(e) => setToken(e.target.value)}
                  spellCheck={false}
                  className="w-full flex-1 p-8 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-600 rounded-[2.5rem] outline-none font-mono text-xs leading-loose resize-none transition-all shadow-inner text-indigo-600 dark:text-indigo-400"
                  placeholder="Paste your JWT here..."
                />
              </div>
            </div>
          </div>

          {/* Decoded Side */}
          <div className="lg:col-span-7 space-y-6">
             <AnimatePresence mode="wait">
                {decoded.error ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-8 bg-rose-50 dark:bg-rose-900/20 border-2 border-rose-100 dark:border-rose-800 rounded-[2.5rem] flex items-center gap-4 text-rose-600"
                  >
                    <AlertCircle size={24} />
                    <div className="space-y-1">
                       <h4 className="font-black uppercase tracking-widest text-xs">Invalid Token</h4>
                       <p className="text-xs font-bold font-mono opacity-80">{decoded.error}</p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    {/* Header */}
                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-4">
                       <h4 className="text-[10px] font-black text-rose-500 uppercase tracking-widest ml-1">Header (Algorithm & Token Type)</h4>
                       <pre className="p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl font-mono text-xs text-rose-600 dark:text-rose-400 overflow-x-auto">
                         {JSON.stringify(decoded.header, null, 2)}
                       </pre>
                    </div>

                    {/* Payload */}
                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-4">
                       <h4 className="text-[10px] font-black text-emerald-500 uppercase tracking-widest ml-1">Payload (Data & Claims)</h4>
                       <pre className="p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl font-mono text-xs text-emerald-600 dark:text-emerald-400 overflow-x-auto">
                         {JSON.stringify(decoded.payload, null, 2)}
                       </pre>
                    </div>
                  </motion.div>
                )}
             </AnimatePresence>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-indigo-600/20 flex flex-col justify-between">
            <Zap size={24} className="mb-4 text-indigo-300" />
            <div>
              <h4 className="font-black mb-2">Instant Decode</h4>
              <p className="text-xs text-indigo-100 opacity-80 leading-relaxed">
                Automatically split and base64-decode the three parts of your JWT. Header and 
                Payload are formatted for perfect readability.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col justify-between">
            <ShieldCheck size={24} className="mb-4 text-emerald-600" />
            <div>
              <h4 className="font-black text-gray-900 dark:text-white mb-2">Security Auditing</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Easily inspect issuer (iss), expiration (exp), and other critical claims to 
                verify your auth implementation is secure.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col justify-between">
            <Eye size={24} className="mb-4 text-amber-600" />
            <div>
              <h4 className="font-black text-gray-900 dark:text-white mb-2">Private Debugging</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                All decoding happens in your browser memory. Your sensitive tokens are never 
                sent to any server, keeping your keys private.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
