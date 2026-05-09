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
  Settings2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function JSONToCSVConverter() {
  const tool = tools.find((t) => t.id === "json-to-csv")!;

  // State
  const [jsonInput, setJsonInput] = useState<string>(JSON.stringify([
    { id: 1, name: "John Doe", email: "john@example.com", address: { city: "New York", country: "USA" } },
    { id: 2, name: "Jane Smith", email: "jane@example.com", address: { city: "London", country: "UK" } }
  ], null, 2));
  const [csvOutput, setCsvOutput] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Conversion Logic
  const convertToCSV = () => {
    try {
      const data = JSON.parse(jsonInput);
      const array = Array.isArray(data) ? data : [data];
      
      if (array.length === 0) {
        setCsvOutput("");
        return;
      }

      // Flatten object function
      const flatten = (obj: any, prefix = "") => {
        let result: any = {};
        for (const key in obj) {
          const name = prefix ? `${prefix}.${key}` : key;
          if (typeof obj[key] === "object" && obj[key] !== null && !Array.isArray(obj[key])) {
            Object.assign(result, flatten(obj[key], name));
          } else {
            result[name] = obj[key];
          }
        }
        return result;
      };

      const flattenedArray = array.map(item => flatten(item));
      const headers = Array.from(new Set(flattenedArray.flatMap(item => Object.keys(item))));
      
      const csvRows = [
        headers.join(","), // header row
        ...flattenedArray.map(row => 
          headers.map(header => {
            const val = row[header] === undefined || row[header] === null ? "" : row[header];
            const escaped = String(val).replace(/"/g, '""');
            return `"${escaped}"`;
          }).join(",")
        )
      ];

      setCsvOutput(csvRows.join("\n"));
      setError(null);
    } catch (e: any) {
      setError(e.message);
      setCsvOutput("");
    }
  };

  useEffect(() => {
    const timer = setTimeout(convertToCSV, 500);
    return () => clearTimeout(timer);
  }, [jsonInput]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(csvOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadCSV = () => {
    const blob = new Blob([csvOutput], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.csv";
    a.click();
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Main Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Input Panel */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <FileJson size={18} className="text-indigo-600" />
                <h3 className="font-black text-gray-900 dark:text-white uppercase tracking-widest text-xs">JSON Input</h3>
              </div>
              <button 
                onClick={() => setJsonInput("")}
                className="p-2 text-gray-300 hover:text-rose-500 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
            <div className="relative group h-[500px]">
              <textarea 
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                spellCheck={false}
                placeholder='[{"id": 1, "name": "example"}]'
                className="w-full h-full p-8 bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 rounded-[2.5rem] outline-none focus:border-indigo-600 transition-all font-mono text-sm leading-relaxed resize-none shadow-sm"
              />
              {error && (
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-rose-50 dark:bg-rose-900/30 border border-rose-200 dark:border-rose-800 rounded-2xl flex items-center gap-3">
                  <AlertCircle size={18} className="text-rose-600" />
                  <p className="text-xs font-bold text-rose-600 truncate">{error}</p>
                </div>
              )}
            </div>
          </div>

          {/* Output Panel */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <Table size={18} className="text-emerald-600" />
                <h3 className="font-black text-gray-900 dark:text-white uppercase tracking-widest text-xs">CSV Output</h3>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={copyToClipboard}
                  className={`p-2 rounded-lg transition-all ${copied ? "bg-emerald-500 text-white" : "text-gray-400 hover:text-emerald-600 hover:bg-emerald-50"}`}
                >
                  <Copy size={16} />
                </button>
                <button 
                  onClick={downloadCSV}
                  disabled={!csvOutput}
                  className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all disabled:opacity-30"
                >
                  <Download size={16} />
                </button>
              </div>
            </div>
            <div className="relative h-[500px]">
              <textarea 
                value={csvOutput}
                readOnly
                placeholder="CSV result will appear here..."
                className="w-full h-full p-8 bg-gray-50 dark:bg-gray-800/50 border-2 border-transparent rounded-[2.5rem] outline-none font-mono text-sm leading-relaxed resize-none"
              />
              {!csvOutput && !error && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-300 gap-4">
                  <FileCode size={48} className="opacity-20" />
                  <p className="text-sm font-bold uppercase tracking-widest opacity-50">Ready to convert</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-indigo-600 rounded-3xl p-8 text-white shadow-xl shadow-indigo-600/20 flex flex-col justify-between">
            <Zap size={24} className="mb-4 text-indigo-300" />
            <div>
              <h4 className="font-black mb-2">Smart Flattening</h4>
              <p className="text-xs text-indigo-100 opacity-80 leading-relaxed">
                Our algorithm automatically handles nested objects and converts them into dot-notation headers.
              </p>
            </div>
          </div>
          <div className="bg-emerald-600 rounded-3xl p-8 text-white shadow-xl shadow-emerald-600/20 flex flex-col justify-between">
            <CheckCircle2 size={24} className="mb-4 text-emerald-300" />
            <div>
              <h4 className="font-black mb-2">Valid CSV Export</h4>
              <p className="text-xs text-emerald-100 opacity-80 leading-relaxed">
                Generates industry-standard CSV with proper escaping for quotes and commas.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col justify-between">
             <Settings2 size={24} className="mb-4 text-indigo-600" />
             <div>
              <h4 className="font-black text-gray-900 dark:text-white mb-2">Private & Secure</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                All data is processed locally in your browser. Nothing is ever sent to our servers.
              </p>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 flex items-start gap-4">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl text-indigo-600">
              <Info size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-gray-900 dark:text-white">Supported Formats</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Supports arrays of objects, single objects, and nested data structures. 
                Values can include strings, numbers, booleans, and nulls.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl text-emerald-600">
              <Table size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-gray-900 dark:text-white">Excel Ready</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                The downloaded CSV is fully compatible with Microsoft Excel, Google Sheets, 
                and other major spreadsheet software.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
