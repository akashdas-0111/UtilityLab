"use client";

import React, { useState, useEffect } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  FileCode, 
  Trash2, 
  Copy, 
  Zap, 
  CheckCircle2, 
  Terminal,
  Settings2,
  RefreshCcw,
  AlertCircle,
  Braces
} from "lucide-react";
import convert from "xml-js";
import { motion, AnimatePresence } from "framer-motion";

export default function XMLToJSONConverter() {
  const tool = tools.find((t) => t.id === "xml-json")!;

  // State
  const [xml, setXml] = useState('<?xml version="1.0" encoding="UTF-8"?>\n<root>\n  <item id="1">\n    <name>UtilityLab</name>\n    <status>Active</status>\n  </item>\n</root>');
  const [json, setJson] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const performConversion = (val: string) => {
    try {
      if (val.trim() === "") {
        setJson("");
        setError(null);
        return;
      }
      const result = convert.xml2json(val, { compact: true, spaces: 2 });
      setJson(result);
      setError(null);
    } catch (e: any) {
      setError(e.message || "Invalid XML format");
    }
  };

  useEffect(() => {
    performConversion(xml);
  }, [xml]);

  const copyJson = () => {
    navigator.clipboard.writeText(json);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Converter Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[600px]">
           
           {/* XML Side */}
           <div className="flex flex-col space-y-4">
              <div className="flex justify-between items-center px-4">
                 <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
                   <FileCode size={18} className="text-indigo-600" /> XML Input
                 </h3>
                 <button onClick={() => setXml("")} className="p-3 bg-white dark:bg-gray-800 rounded-xl hover:text-rose-600 transition-all shadow-sm">
                    <Trash2 size={18} />
                 </button>
              </div>
              <textarea 
                value={xml} onChange={(e) => setXml(e.target.value)}
                className="flex-1 p-10 bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 rounded-[3rem] outline-none focus:border-indigo-600 transition-all font-mono text-xs leading-relaxed resize-none shadow-sm"
                placeholder="Paste XML here..."
              />
           </div>

           {/* JSON Side */}
           <div className="flex flex-col space-y-4">
              <div className="flex justify-between items-center px-4">
                 <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
                   <Braces size={18} className="text-amber-500" /> JSON Result
                 </h3>
                 <button onClick={copyJson} className="p-3 bg-white dark:bg-gray-800 rounded-xl hover:text-amber-600 transition-all shadow-sm">
                    {copied ? <CheckCircle2 size={18} className="text-emerald-500" /> : <Copy size={18} />}
                 </button>
              </div>
              <textarea 
                value={json} readOnly
                className="flex-1 p-10 bg-gray-50 dark:bg-gray-900 border-2 border-transparent rounded-[3rem] outline-none font-mono text-xs leading-relaxed resize-none shadow-inner text-amber-600"
                placeholder="JSON result will appear here..."
              />
           </div>
        </div>

        {/* Status Area */}
        <AnimatePresence>
          {error && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-8 bg-rose-50 dark:bg-rose-900/20 border-2 border-rose-100 dark:border-rose-800 rounded-[2.5rem] flex items-center gap-4 text-rose-600">
               <AlertCircle size={24} />
               <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest">XML Parsing Error</p>
                  <p className="font-bold opacity-80">{error}</p>
               </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-indigo-600/20 flex flex-col justify-between">
            <Zap size={24} className="mb-4 text-indigo-300" />
            <div>
              <h4 className="font-black mb-2">Instant Transformation</h4>
              <p className="text-xs text-indigo-100 opacity-80 leading-relaxed">
                Convert complex XML schemas into lightweight JSON objects instantly as you type, 
                streamlining your data processing workflows.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col justify-between">
            <Settings2 size={24} className="mb-4 text-emerald-600" />
            <div>
              <h4 className="font-black text-gray-900 dark:text-white mb-2">Compact Mapping</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Uses professional-grade compact mapping to preserve attributes, namespaces, and 
                nested structures with 100% data fidelity.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col justify-between">
            <RefreshCcw size={24} className="mb-4 text-amber-600" />
            <div>
              <h4 className="font-black text-gray-900 dark:text-white mb-2">DevOps Ready</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Essential for modernizing legacy APIs, configuring cloud infrastructure, and 
                handling cross-platform data integrations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
