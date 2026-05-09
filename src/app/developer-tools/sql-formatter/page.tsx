"use client";

import React, { useState } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  Database, 
  Trash2, 
  Copy, 
  CheckCircle2, 
  Zap, 
  RefreshCcw, 
  Settings2,
  Terminal,
  FileCode,
  ArrowRightLeft
} from "lucide-react";
import { format } from "sql-formatter";
import { motion } from "framer-motion";

export default function SQLFormatter() {
  const tool = tools.find((t) => t.id === "sql-formatter")!;

  // State
  const [sql, setSql] = useState("SELECT * FROM users WHERE id = 1 AND status = 'active' ORDER BY created_at DESC LIMIT 10;");
  const [dialect, setDialect] = useState<any>("mysql");
  const [copied, setCopied] = useState(false);

  const beautify = () => {
    try {
      const result = format(sql, { language: dialect });
      setSql(result);
    } catch (e) {}
  };

  const minify = () => {
    try {
      const result = sql.replace(/\s+/g, ' ').trim();
      setSql(result);
    } catch (e) {}
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Controls Bar */}
        <div className="flex flex-col lg:flex-row items-center justify-between px-4 gap-8">
           <div className="flex bg-gray-50 dark:bg-gray-800 p-2 rounded-2xl border border-gray-100 dark:border-gray-700 w-full lg:w-auto overflow-x-auto whitespace-nowrap">
             {[
               { id: "mysql", label: "MySQL" },
               { id: "postgresql", label: "Postgres" },
               { id: "sql", label: "SQL Server" },
               { id: "sqlite", label: "SQLite" },
               { id: "bigquery", label: "BigQuery" }
             ].map(opt => (
               <button 
                key={opt.id}
                onClick={() => setDialect(opt.id)}
                className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${dialect === opt.id ? 'bg-white dark:bg-gray-700 shadow-lg text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
               >
                 {opt.label}
               </button>
             ))}
           </div>
           
           <div className="flex items-center gap-3 w-full lg:w-auto">
             <button 
              onClick={beautify}
              className="flex-1 lg:flex-none px-8 py-3 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-indigo-600/20 hover:scale-105 transition-all flex items-center justify-center gap-2"
             >
               <FileCode size={14} /> Beautify
             </button>
             <button 
              onClick={minify}
              className="flex-1 lg:flex-none px-8 py-3 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-50 hover:text-emerald-600 transition-all flex items-center justify-center gap-2"
             >
               <ArrowRightLeft size={14} /> Minify
             </button>
           </div>
        </div>

        {/* Editor Area */}
        <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-8 md:p-12 border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform text-indigo-500">
            <Database size={120} />
          </div>

          <div className="space-y-8 relative z-10">
            <div className="relative">
              <div className="absolute top-6 right-6 z-10 flex gap-2">
                <button 
                  onClick={() => { navigator.clipboard.writeText(sql); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                  className={`p-4 rounded-2xl transition-all shadow-xl ${copied ? "bg-emerald-500 text-white" : "bg-white dark:bg-gray-700 text-gray-400 hover:text-indigo-600"}`}
                >
                  {copied ? <CheckCircle2 size={24}/> : <Copy size={24}/>}
                </button>
                <button 
                  onClick={() => setSql("")}
                  className="p-4 bg-white dark:bg-gray-700 text-gray-400 hover:text-rose-600 rounded-2xl shadow-xl transition-all"
                >
                  <Trash2 size={24} />
                </button>
              </div>
              <textarea 
                value={sql} onChange={(e) => setSql(e.target.value)}
                spellCheck={false}
                className="w-full min-h-[500px] p-12 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-600 rounded-[3rem] outline-none font-mono text-sm leading-relaxed resize-none transition-all shadow-inner"
                placeholder="Paste your SQL query here..."
              />
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-indigo-600/20 flex items-start gap-4">
            <div className="p-3 bg-indigo-500 rounded-2xl">
              <Zap size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black">Deep Parsing</h4>
              <p className="text-sm text-indigo-100 opacity-80 leading-relaxed">
                Powered by `sql-formatter`, our tool understands complex join logic, subqueries, 
                and nested clauses to produce perfectly indented results.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl text-emerald-600">
              <Settings2 size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Multi-Dialect</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Whether you're working with MySQL, PostgreSQL, or Google BigQuery, we provide 
                dialect-specific formatting that respects unique syntax rules.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
