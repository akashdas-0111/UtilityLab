"use client";

import React, { useState } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  Table, 
  Download, 
  FileCode, 
  FileSpreadsheet, 
  RefreshCw,
  Info,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import * as XLSX from "xlsx";

export default function JSONToExcel() {
  const tool = tools.find((t) => t.id === "json-to-excel")!;
  
  const [jsonInput, setJsonInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const convertToExcel = () => {
    setIsProcessing(true);
    setError(null);
    setSuccess(false);

    try {
      const data = JSON.parse(jsonInput);
      const worksheet = XLSX.utils.json_to_sheet(Array.isArray(data) ? data : [data]);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      
      // Generate buffer and download
      XLSX.writeFile(workbook, "utilitylab_data.xlsx");
      setSuccess(true);
    } catch (e: any) {
      setError("Invalid JSON format. Please ensure your input is a valid JSON array or object.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Editor Area */}
        <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-8 md:p-12 border border-gray-100 dark:border-gray-800 shadow-xl space-y-8">
           <div className="flex items-center justify-between px-2">
              <h3 className="text-xs font-black uppercase tracking-widest text-indigo-600 flex items-center gap-2">
                <FileCode size={16} /> JSON Input
              </h3>
              <button 
                onClick={() => setJsonInput("")}
                className="text-[10px] font-black uppercase text-rose-500 hover:underline"
              >
                Clear
              </button>
           </div>

           <textarea 
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder='[{"name": "John", "age": 30}, {"name": "Jane", "age": 25}]'
            className="w-full h-80 p-8 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-500 rounded-[2.5rem] outline-none font-mono text-sm transition-all shadow-inner resize-none"
           />

           <div className="flex flex-col md:flex-row gap-4">
              <button 
                onClick={convertToExcel}
                disabled={!jsonInput || isProcessing}
                className="flex-1 bg-indigo-600 text-white font-black py-5 rounded-2xl shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-3 hover:scale-105 transition-transform disabled:opacity-50"
              >
                {isProcessing ? <RefreshCw className="animate-spin" /> : <FileSpreadsheet size={20} />}
                {isProcessing ? "PROCESSING..." : "CONVERT TO EXCEL (.XLSX)"}
              </button>
           </div>
        </div>

        {/* Feedback Area */}
        <AnimatePresence>
          {error && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-6 bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-800 rounded-2xl flex items-center gap-4 text-rose-600 text-sm font-bold">
               <AlertCircle size={20} />
               {error}
            </motion.div>
          )}
          {success && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-6 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 rounded-2xl flex items-center gap-4 text-emerald-600 text-sm font-bold">
               <CheckCircle2 size={20} />
               Conversion successful! Your Excel file has been downloaded.
            </motion.div>
          )}
        </AnimatePresence>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl text-indigo-600">
              <Table size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white uppercase text-[10px] tracking-widest">Automatic Flattening</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                The tool intelligently flattens nested JSON objects into a clean tabular structure suitable for spreadsheet analysis.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl text-emerald-600">
              <Download size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white uppercase text-[10px] tracking-widest">Instant Download</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Generate and download high-quality .xlsx files in milliseconds, compatible with Microsoft Excel, Google Sheets, and Numbers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
