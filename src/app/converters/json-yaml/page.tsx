"use client";

import React, { useState, useEffect } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  FileCode, 
  ArrowRightLeft, 
  Copy, 
  CheckCircle2, 
  Trash2, 
  Zap, 
  Terminal,
  Settings2,
  RefreshCcw,
  AlertCircle
} from "lucide-react";
import yaml from "js-yaml";
import { motion, AnimatePresence } from "framer-motion";

export default function JSONYAMLConverter() {
  const tool = tools.find((t) => t.id === "json-yaml-conv")!;

  // State
  const [json, setJson] = useState('{\n  "name": "UtilityLab",\n  "version": "2.0",\n  "features": ["conversion", "generation"]\n}');
  const [yamlText, setYamlText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [direction, setDirection] = useState<"json2yaml" | "yaml2json">("json2yaml");
  const [copied, setCopied] = useState<"json" | "yaml" | null>(null);

  const convert = (val: string, dir: "json2yaml" | "yaml2json") => {
    try {
      if (val.trim() === "") {
        setError(null);
        return;
      }
      if (dir === "json2yaml") {
        const obj = JSON.parse(val);
        setYamlText(yaml.dump(obj));
      } else {
        const obj = yaml.load(val);
        setJson(JSON.stringify(obj, null, 2));
      }
      setError(null);
    } catch (e: any) {
      setError(e.message);
    }
  };

  useEffect(() => {
    convert(direction === "json2yaml" ? json : yamlText, direction);
  }, [json, yamlText, direction]);

  const copy = (type: "json" | "yaml") => {
    navigator.clipboard.writeText(type === "json" ? json : yamlText);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Converter Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[600px]">
          
          {/* JSON Side */}
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between items-center px-4">
               <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
                 <FileCode size={18} className="text-indigo-600" /> JSON
               </h3>
               <div className="flex gap-2">
                 <button onClick={() => copy("json")} className="p-3 bg-white dark:bg-gray-800 rounded-xl hover:text-indigo-600 transition-all shadow-sm">
                    {copied === "json" ? <CheckCircle2 size={18} className="text-emerald-500" /> : <Copy size={18} />}
                 </button>
                 <button onClick={() => setJson("")} className="p-3 bg-white dark:bg-gray-800 rounded-xl hover:text-rose-600 transition-all shadow-sm">
                    <Trash2 size={18} />
                 </button>
               </div>
            </div>
            <textarea 
              value={json} onChange={(e) => { setJson(e.target.value); setDirection("json2yaml"); }}
              className="flex-1 p-10 bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 rounded-[3rem] outline-none focus:border-indigo-600 transition-all font-mono text-sm leading-relaxed resize-none shadow-sm"
              placeholder="Paste JSON here..."
            />
          </div>

          {/* YAML Side */}
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between items-center px-4">
               <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
                 <Terminal size={18} className="text-amber-500" /> YAML
               </h3>
               <div className="flex gap-2">
                 <button onClick={() => copy("yaml")} className="p-3 bg-white dark:bg-gray-800 rounded-xl hover:text-amber-600 transition-all shadow-sm">
                    {copied === "yaml" ? <CheckCircle2 size={18} className="text-emerald-500" /> : <Copy size={18} />}
                 </button>
                 <button onClick={() => setYamlText("")} className="p-3 bg-white dark:bg-gray-800 rounded-xl hover:text-rose-600 transition-all shadow-sm">
                    <Trash2 size={18} />
                 </button>
               </div>
            </div>
            <textarea 
              value={yamlText} onChange={(e) => { setYamlText(e.target.value); setDirection("yaml2json"); }}
              className="flex-1 p-10 bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 rounded-[3rem] outline-none focus:border-amber-600 transition-all font-mono text-sm leading-relaxed resize-none shadow-sm"
              placeholder="Paste YAML here..."
            />
          </div>
        </div>

        {/* Status Area */}
        <AnimatePresence>
          {error && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-6 bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 rounded-[2.5rem] flex items-center gap-4 text-rose-600">
               <AlertCircle size={20} />
               <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest">Parsing Error</p>
                  <p className="text-xs font-mono font-bold opacity-80">{error}</p>
               </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-indigo-600/20 flex flex-col justify-between">
            <Zap size={24} className="mb-4 text-indigo-300" />
            <div>
              <h4 className="font-black mb-2">Bi-directional Mapping</h4>
              <p className="text-xs text-indigo-100 opacity-80 leading-relaxed">
                Seamlessly convert in both directions. Editing one side automatically updates the 
                other with validated syntax.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col justify-between">
            <Settings2 size={24} className="mb-4 text-emerald-600" />
            <div>
              <h4 className="font-black text-gray-900 dark:text-white mb-2">Structure Preserved</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Maintains nested objects, arrays, and complex data types throughout the 
                transformation process with 100% fidelity.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col justify-between">
            <RefreshCcw size={24} className="mb-4 text-amber-600" />
            <div>
              <h4 className="font-black text-gray-900 dark:text-white mb-2">DevOps Optimized</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Essential for converting between Kubernetes manifests, Docker Compose files, 
                and standard JSON application configurations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
