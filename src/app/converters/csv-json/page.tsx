"use client";

import React, { useState, useEffect } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  FileJson, 
  Table, 
  ArrowRightLeft, 
  Copy, 
  Download, 
  FileCode,
  Info,
  CheckCircle2,
  AlertCircle,
  Zap,
  Trash2,
  Settings2,
  FileSpreadsheet
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CSVToJSONConverter() {
  const tool = tools.find((t) => t.id === "csv-to-json")!;

  // State
  const [csvInput, setCsvInput] = useState<string>(`id,name,email,city
1,John Doe,john@example.com,New York
2,Jane Smith,jane@example.com,London
3,Bob Wilson,bob@example.com,Sydney`);
  const [jsonOutput, setJsonOutput] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [delimiter, setDelimiter] = useState(",");

  // Conversion Logic
  const convertToJSON = () => {
    try {
      if (!csvInput.trim()) {
        setJsonOutput("");
        setError(null);
        return;
      }

      const lines = csvInput.trim().split(/\r?\n/);
      if (lines.length < 2) {
        throw new Error("CSV must include a header row and at least one data row.");
      }

      // Robust CSV line parser (handles quoted commas)
      const parseLine = (line: string, delim: string) => {
        const result = [];
        let cur = "";
        let inQuotes = false;
        for (let i = 0; i < line.length; i++) {
          const char = line[i];
          if (char === '"' && line[i + 1] === '"') {
            cur += '"';
            i++;
          } else if (char === '"') {
            inQuotes = !inQuotes;
          } else if (char === delim && !inQuotes) {
            result.push(cur);
            cur = "";
          } else {
            cur += char;
          }
        }
        result.push(cur);
        return result;
      };

      const headers = parseLine(lines[0], delimiter).map(h => h.trim());
      const data = lines.slice(1).map((line, lineIdx) => {
        const values = parseLine(line, delimiter);
        const obj: any = {};
        headers.forEach((header, i) => {
          let val = values[i] || "";
          // Try to parse numbers or booleans
          if (val.toLowerCase() === "true") val = true as any;
          else if (val.toLowerCase() === "false") val = false as any;
          else if (!isNaN(Number(val)) && val !== "") val = Number(val) as any;
          
          obj[header] = val;
        });
        return obj;
      });

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
  }, [csvInput, delimiter]);

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
    a.download = "data.json";
    a.click();
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Settings Bar */}
        <div className="bg-white dark:bg-gray-900 p-4 rounded-3xl border border-gray-100 dark:border-gray-800 flex flex-wrap items-center gap-6 shadow-sm">
           <div className="flex items-center gap-3">
             <Settings2 size={16} className="text-indigo-600" />
             <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Parser Settings</span>
           </div>
           <div className="flex items-center gap-2">
             <span className="text-xs font-bold text-gray-500">Delimiter:</span>
             <select 
               value={delimiter} 
               onChange={(e) => setDelimiter(e.target.value)}
               className="bg-gray-50 dark:bg-gray-800 border-none rounded-lg px-3 py-1.5 text-xs font-black outline-none focus:ring-2 ring-indigo-500/20"
             >
               <option value=",">Comma (,)</option>
               <option value=";">Semicolon (;)</option>
               <option value="	">Tab (\t)</option>
               <option value="|">Pipe (|)</option>
             </select>
           </div>
        </div>

        {/* Main Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[550px]">
          
          {/* Input Panel */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <FileSpreadsheet size={18} className="text-indigo-600" />
                <h3 className="font-black text-gray-900 dark:text-white uppercase tracking-widest text-xs">CSV Data</h3>
              </div>
              <button 
                onClick={() => setCsvInput("")}
                className="p-2 text-gray-300 hover:text-rose-500 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
            <textarea 
              value={csvInput}
              onChange={(e) => setCsvInput(e.target.value)}
              spellCheck={false}
              className="w-full h-full p-8 bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 rounded-[2.5rem] outline-none focus:border-indigo-600 transition-all font-mono text-sm leading-relaxed resize-none shadow-sm"
              placeholder="Paste your CSV content here..."
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
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col justify-between">
            <Zap size={24} className="mb-4 text-amber-500" />
            <div>
              <h4 className="font-black text-gray-900 dark:text-white mb-2">Auto-Type Detection</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Automatically detects and converts numbers and booleans from strings to their proper JSON types.
              </p>
            </div>
          </div>
          <div className="bg-indigo-600 rounded-3xl p-8 text-white shadow-xl shadow-indigo-600/20 flex flex-col justify-between">
            <ArrowRightLeft size={24} className="mb-4 text-indigo-300" />
            <div>
              <h4 className="font-black mb-2">Quoted String Support</h4>
              <p className="text-xs text-indigo-100 opacity-80 leading-relaxed">
                Handles complex CSV lines where values containing commas are enclosed in double quotes.
              </p>
            </div>
          </div>
          <div className="bg-emerald-600 rounded-3xl p-8 text-white shadow-xl shadow-emerald-600/20 flex flex-col justify-between">
            <Download size={24} className="mb-4 text-emerald-300" />
            <div>
              <h4 className="font-black mb-2">Bulk Export</h4>
              <p className="text-xs text-emerald-100 opacity-80 leading-relaxed">
                Download your generated JSON directly as a .json file for use in your applications.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
