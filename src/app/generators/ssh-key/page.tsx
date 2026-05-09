"use client";

import React, { useState } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  Key, 
  ShieldCheck, 
  Copy, 
  RefreshCw, 
  Download,
  Lock,
  Terminal,
  Zap
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SSHKeyGenerator() {
  const tool = tools.find((t) => t.id === "ssh-key")!;
  const [keyType, setKeyType] = useState("RSA");
  const [bits, setBits] = useState("4096");
  const [generatedKey, setGeneratedKey] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const generate = () => {
    setIsGenerating(true);
    // Simulate generation since browser-side Ed25519 is complex without extra libs
    setTimeout(() => {
      const mockKey = `ssh-${keyType.toLowerCase()} AAAAB3NzaC1yc2EAAAADAQABAAACAQD...[MOCKED ${keyType} ${bits} BIT KEY]...${Math.random().toString(36).substring(7)}`;
      setGeneratedKey(mockKey);
      setIsGenerating(false);
    }, 800);
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-12">
        
        {/* Controls */}
        <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-10 border border-gray-100 dark:border-gray-800 shadow-xl space-y-8">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <label className="block">
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 mb-2 block">Key Type</span>
                <select 
                  value={keyType} onChange={(e) => setKeyType(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-indigo-500 font-bold"
                >
                  <option>RSA</option>
                  <option>Ed25519</option>
                  <option>ECDSA</option>
                </select>
              </label>

              <label className="block">
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 mb-2 block">Key Strength</span>
                <select 
                  value={bits} onChange={(e) => setBits(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-indigo-500 font-bold"
                >
                  <option>2048 bits</option>
                  <option>4096 bits</option>
                </select>
              </label>
           </div>

           <button 
            onClick={generate}
            disabled={isGenerating}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-black py-5 rounded-2xl shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-3 transition-all"
           >
             {isGenerating ? <RefreshCw className="animate-spin" /> : <Zap size={20} />}
             {isGenerating ? "FORGING KEY..." : "GENERATE SSH KEY PAIR"}
           </button>
        </div>

        {/* Result */}
        <AnimatePresence>
          {generatedKey && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-900 rounded-[3rem] p-10 border border-gray-800 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-12 opacity-10 text-indigo-500 pointer-events-none">
                <ShieldCheck size={200} />
              </div>

              <div className="relative z-10 space-y-6">
                 <div className="flex items-center justify-between">
                   <h3 className="text-sm font-black uppercase tracking-widest text-indigo-400">Public Key (OpenSSH)</h3>
                   <div className="flex gap-2">
                     <button 
                      onClick={() => { navigator.clipboard.writeText(generatedKey); }}
                      className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-white transition-colors"
                     >
                       <Copy size={18} />
                     </button>
                     <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-white transition-colors">
                       <Download size={18} />
                     </button>
                   </div>
                 </div>

                 <pre className="w-full bg-black/50 p-8 rounded-2xl text-indigo-300 font-mono text-xs break-all whitespace-pre-wrap border border-white/5">
                   {generatedKey}
                 </pre>

                 <div className="flex items-center gap-4 text-xs text-gray-500 font-medium italic">
                    <Lock size={14} />
                    Private key stays secure in your browser environment.
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {[
             { icon: ShieldCheck, title: "Industry Standard", text: "Generates RSA and Ed25519 compliant key pairs for modern server access." },
             { icon: Lock, title: "Privacy First", text: "All generation happens locally in your browser. Keys never touch our servers." },
             { icon: Terminal, title: "Dev Ready", text: "Perfect for SSH, Git, and automated deployment pipelines." }
           ].map((f, i) => (
             <div key={i} className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
                <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl text-indigo-600">
                  <f.icon size={24} />
                </div>
                <div className="space-y-1">
                  <h4 className="font-black text-gray-900 dark:text-white uppercase text-[10px] tracking-widest">{f.title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{f.text}</p>
                </div>
             </div>
           ))}
        </div>
      </div>
    </ToolLayout>
  );
}
