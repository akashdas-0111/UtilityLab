"use client";

import React, { useState, useMemo } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  Lock, 
  ShieldCheck, 
  Copy, 
  Braces, 
  Fingerprint,
  RefreshCw,
  Zap,
  Eye,
  EyeOff
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function JWTGenerator() {
  const tool = tools.find((t) => t.id === "jwt-gen")!;
  
  const [header, setHeader] = useState('{\n  "alg": "HS256",\n  "typ": "JWT"\n}');
  const [payload, setPayload] = useState('{\n  "sub": "1234567890",\n  "name": "John Doe",\n  "iat": 1516239022\n}');
  const [secret, setSecret] = useState("your-256-bit-secret");
  const [showSecret, setShowSecret] = useState(false);

  const jwt = useMemo(() => {
    try {
      const h = btoa(JSON.stringify(JSON.parse(header)));
      const p = btoa(JSON.stringify(JSON.parse(payload)));
      const s = "mock_signature_" + Math.random().toString(36).substring(7);
      return `${h}.${p}.${s}`;
    } catch (e) {
      return "Invalid JSON Structure";
    }
  }, [header, payload, secret]);

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Editor */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-10 border border-gray-100 dark:border-gray-800 shadow-xl space-y-6">
              <div className="flex items-center gap-4 mb-4">
                 <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl text-indigo-600">
                    <Braces size={20} />
                 </div>
                 <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Header / Payload</h3>
              </div>
              
              <div className="space-y-6">
                <textarea 
                  value={header} onChange={(e) => setHeader(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-xs h-32"
                  placeholder="Header JSON"
                />
                <textarea 
                  value={payload} onChange={(e) => setPayload(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-xs h-48"
                  placeholder="Payload JSON"
                />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-xl">
               <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 mb-2 block">Secret Key</span>
               <div className="relative">
                 <input 
                  type={showSecret ? "text" : "password"}
                  value={secret} onChange={(e) => setSecret(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl py-4 pl-6 pr-12 outline-none focus:ring-2 focus:ring-indigo-500 font-bold"
                 />
                 <button 
                  onClick={() => setShowSecret(!showSecret)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition-colors"
                 >
                   {showSecret ? <EyeOff size={18} /> : <Eye size={18} />}
                 </button>
               </div>
            </div>
          </div>

          {/* Token Result */}
          <div className="bg-indigo-600 rounded-[3rem] p-10 shadow-2xl space-y-8 relative overflow-hidden flex flex-col justify-center">
             <div className="absolute top-0 right-0 p-12 opacity-10 text-white pointer-events-none">
                <Fingerprint size={200} />
             </div>
             
             <div className="relative z-10 text-center space-y-6">
                <h3 className="text-sm font-black uppercase tracking-widest text-indigo-200">Generated Token</h3>
                <div className="w-full bg-white/10 backdrop-blur-md p-8 rounded-[2rem] border border-white/20 text-white font-mono text-sm break-all leading-relaxed shadow-xl">
                  {jwt}
                </div>
                <button 
                  onClick={() => navigator.clipboard.writeText(jwt)}
                  className="mx-auto bg-white text-indigo-600 font-black px-10 py-4 rounded-2xl shadow-xl hover:scale-105 transition-transform flex items-center gap-3"
                >
                  <Copy size={20} /> COPY TOKEN
                </button>
             </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
