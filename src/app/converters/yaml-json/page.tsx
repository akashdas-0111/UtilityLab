"use client";

import React, { useState, useEffect } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  FileJson, 
  Settings, 
  ArrowRightLeft, 
  Copy, 
  Download, 
  FileCode,
  Info,
  CheckCircle2,
  AlertCircle,
  Zap,
  Trash2,
  FileText
} from "lucide-react";
import yaml from "js-yaml";
import { motion, AnimatePresence } from "framer-motion";

export default function YAMLToJSONConverter() {
  const tool = tools.find((t) => t.id === "yaml-to-json")!;

  // State
  const [yamlInput, setYamlInput] = useState<string>(`server:
  port: 8080
  host: localhost
database:
  name: main_db
  users:
    - admin
    - developer
features:
  caching: true
  logging: false`);
  const [jsonOutput, setJsonOutput] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Conversion Logic
  const convertToJSON = () => {
    try {
      if (!yamlInput.trim()) {
        setJsonOutput("");
        setError(null);
        return;
      }
      const data = yaml.load(yamlInput);
      setJsonOutput(JSON.stringify(data, null, 2));
      setError(null);
    } catch (e: any) {
      setError(e.message);
      setJsonOutput("");
    }
  };

  useEffect(() => {
    const timer = setTimeout(convertToJSON, 500);
    return () => clearTimeout(timer);
  }, [yamlInput]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(jsonOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadJSON = () => {
    const blob = new Blob([jsonOutput], { type: "application/json" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "config.json";
    a.click();
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Main Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[550px]">
          
          {/* Input Panel */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <Settings size={18} className="text-amber-500" />
                <h3 className="font-black text-gray-900 dark:text-white uppercase tracking-widest text-xs">YAML Input</h3>
              </div>
              <button 
                onClick={() => setYamlInput("")}
                className="p-2 text-gray-300 hover:text-rose-500 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
            <textarea 
              value={yamlInput}
              onChange={(e) => setYamlInput(e.target.value)}
              spellCheck={false}
              className="w-full h-full p-8 bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 rounded-[2.5rem] outline-none focus:border-amber-500 transition-all font-mono text-sm leading-relaxed resize-none shadow-sm"
              placeholder="Paste your YAML config here..."
            />
          </div>

          {/* Output Panel */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <FileJson size={18} className="text-emerald-600" />
                <h3 className="font-black text-gray-900 dark:text-white uppercase tracking-widest text-xs">JSON Output</h3>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={copyToClipboard}
                  className={`p-2 rounded-lg transition-all ${copied ? "bg-emerald-500 text-white" : "text-gray-400 hover:text-emerald-600 hover:bg-emerald-50"}`}
                >
                  <Copy size={16} />
                </button>
                <button 
                  onClick={downloadJSON}
                  disabled={!jsonOutput}
                  className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all disabled:opacity-30"
                >
                  <Download size={16} />
                </button>
              </div>
            </div>
            <div className="relative h-full">
              <textarea 
                value={jsonOutput}
                readOnly
                placeholder="JSON result will appear here..."
                className="w-full h-full p-8 bg-gray-50 dark:bg-gray-800/50 border-2 border-transparent rounded-[2.5rem] outline-none font-mono text-sm leading-relaxed resize-none"
              />
              {error && (
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-rose-50 dark:bg-rose-900/30 border border-rose-200 dark:border-rose-800 rounded-2xl flex items-center gap-3">
                  <AlertCircle size={18} className="text-rose-600" />
                  <p className="text-xs font-bold text-rose-600 truncate">{error}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-amber-500 rounded-3xl p-8 text-white shadow-xl shadow-amber-500/20 flex flex-col justify-between">
            <Zap size={24} className="mb-4 text-amber-200" />
            <div>
              <h4 className="font-black mb-2">YAML 1.2 Support</h4>
              <p className="text-xs text-amber-100 opacity-80 leading-relaxed">
                Supports the latest YAML standards including complex structures, aliases, and anchors.
              </p>
            </div>
          </div>
          <div className="bg-indigo-600 rounded-3xl p-8 text-white shadow-xl shadow-indigo-600/20 flex flex-col justify-between">
            <ArrowRightLeft size={24} className="mb-4 text-indigo-300" />
            <div>
              <h4 className="font-black mb-2">Config Migration</h4>
              <p className="text-xs text-indigo-100 opacity-80 leading-relaxed">
                Perfect for migrating Kubernetes, Docker Compose, or CI/CD configs to JSON-based tools.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col justify-between">
            <FileCode size={24} className="mb-4 text-emerald-600" />
            <div>
              <h4 className="font-black text-gray-900 dark:text-white mb-2">Clean Formatting</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Generates perfectly indented JSON with a 2-space structure for maximum readability.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
