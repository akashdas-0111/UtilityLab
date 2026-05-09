"use client";

import React, { useState, useEffect, useMemo } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  Database, 
  Plus, 
  Trash2, 
  Copy, 
  CheckCircle2, 
  RefreshCcw, 
  Settings2,
  FileCode,
  Table as TableIcon,
  Columns,
  Zap
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Dialect = "mysql" | "postgres" | "sqlite";

interface Column {
  id: string;
  name: string;
  type: string;
  nullable: boolean;
  primary: boolean;
}

export default function SQLGenerator() {
  const tool = tools.find((t) => t.id === "sql")!;

  // State
  const [tableName, setTableName] = useState("users");
  const [dialect, setDialect] = useState<Dialect>("mysql");
  const [columns, setColumns] = useState<Column[]>([
    { id: "1", name: "id", type: "INT", nullable: false, primary: true },
    { id: "2", name: "username", type: "VARCHAR(255)", nullable: false, primary: false },
    { id: "3", name: "email", type: "VARCHAR(255)", nullable: true, primary: false },
    { id: "4", name: "created_at", type: "TIMESTAMP", nullable: false, primary: false },
  ]);
  const [copied, setCopied] = useState(false);

  const addColumn = () => {
    const newCol: Column = {
      id: Math.random().toString(36).substr(2, 9),
      name: `col_${columns.length + 1}`,
      type: "VARCHAR(255)",
      nullable: true,
      primary: false
    };
    setColumns([...columns, newCol]);
  };

  const removeColumn = (id: string) => {
    setColumns(columns.filter(c => c.id !== id));
  };

  const updateColumn = (id: string, field: keyof Column, value: any) => {
    setColumns(columns.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const sqlOutput = useMemo(() => {
    let sql = `CREATE TABLE ${tableName} (\n`;
    const colLines = columns.map(c => {
      let line = `  ${c.name} ${c.type}`;
      if (!c.nullable) line += " NOT NULL";
      if (c.primary) line += " PRIMARY KEY";
      return line;
    });
    sql += colLines.join(",\n");
    sql += "\n);";
    return sql;
  }, [tableName, columns, dialect]);

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Visual Builder Card */}
        <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-8 md:p-12 border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform text-indigo-500">
            <Database size={120} />
          </div>

          <div className="space-y-8 relative z-10">
            {/* Table Name & Dialect */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Table Name</label>
                <input 
                  value={tableName} onChange={(e) => setTableName(e.target.value)}
                  className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-600 rounded-2xl outline-none text-xl font-bold transition-all"
                />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">SQL Dialect</label>
                <div className="flex bg-gray-50 dark:bg-gray-800 p-2 rounded-2xl border border-gray-100 dark:border-gray-700">
                  {(["mysql", "postgres", "sqlite"] as Dialect[]).map(d => (
                    <button 
                      key={d}
                      onClick={() => setDialect(d)}
                      className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${dialect === d ? 'bg-white dark:bg-gray-700 shadow-lg text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Columns List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                 <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                   <Columns size={14} className="text-indigo-600" /> Table Columns
                 </h3>
                 <button 
                  onClick={addColumn}
                  className="p-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 rounded-xl hover:scale-110 transition-all"
                 >
                   <Plus size={16} />
                 </button>
              </div>
              
              <div className="space-y-3">
                {columns.map((c) => (
                  <div key={c.id} className="flex flex-col md:flex-row items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700 group">
                    <input 
                      value={c.name} onChange={(e) => updateColumn(c.id, "name", e.target.value)}
                      placeholder="Column Name"
                      className="w-full md:w-1/4 bg-transparent font-bold text-gray-900 dark:text-white outline-none"
                    />
                    <select 
                      value={c.type} onChange={(e) => updateColumn(c.id, "type", e.target.value)}
                      className="w-full md:w-1/4 bg-transparent font-black text-indigo-600 outline-none cursor-pointer"
                    >
                      <option value="INT">INT</option>
                      <option value="VARCHAR(255)">VARCHAR(255)</option>
                      <option value="TEXT">TEXT</option>
                      <option value="BOOLEAN">BOOLEAN</option>
                      <option value="TIMESTAMP">TIMESTAMP</option>
                      <option value="DECIMAL(10,2)">DECIMAL</option>
                    </select>
                    <div className="flex-1 flex items-center gap-4">
                       <label className="flex items-center gap-2 cursor-pointer">
                         <input type="checkbox" checked={!c.nullable} onChange={(e) => updateColumn(c.id, "nullable", !e.target.checked)} className="accent-indigo-600" />
                         <span className="text-[10px] font-black uppercase text-gray-400">Not Null</span>
                       </label>
                       <label className="flex items-center gap-2 cursor-pointer">
                         <input type="checkbox" checked={c.primary} onChange={(e) => updateColumn(c.id, "primary", e.target.checked)} className="accent-amber-500" />
                         <span className="text-[10px] font-black uppercase text-gray-400">PK</span>
                       </label>
                    </div>
                    <button 
                      onClick={() => removeColumn(c.id)}
                      className="p-2 text-gray-300 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SQL Output Card */}
        <div className="relative group">
          <div className="absolute top-6 right-6 z-10">
            <button 
              onClick={() => { navigator.clipboard.writeText(sqlOutput); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
              className={`p-4 rounded-2xl transition-all shadow-xl ${copied ? "bg-emerald-500 text-white" : "bg-white dark:bg-gray-700 text-gray-400 hover:text-indigo-600"}`}
            >
              {copied ? <CheckCircle2 size={24}/> : <Copy size={24}/>}
            </button>
          </div>
          <pre className="w-full min-h-[300px] p-12 bg-gray-900 text-emerald-400 border-2 border-transparent rounded-[3rem] shadow-2xl font-mono text-lg overflow-x-auto">
            {sqlOutput}
          </pre>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-indigo-600/20 flex flex-col justify-between">
            <Zap size={24} className="mb-4 text-indigo-300" />
            <div>
              <h4 className="font-black mb-2">Visual Mapping</h4>
              <p className="text-xs text-indigo-100 opacity-80 leading-relaxed">
                Design your database structure visually without writing a single line of SQL.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col justify-between">
            <FileCode size={24} className="mb-4 text-emerald-600" />
            <div>
              <h4 className="font-black text-gray-900 dark:text-white mb-2">Clean Syntax</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Generates properly indented and standardized SQL code ready for production databases.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col justify-between">
            <TableIcon size={24} className="mb-4 text-amber-600" />
            <div>
              <h4 className="font-black text-gray-900 dark:text-white mb-2">Dialect Support</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Switch between MySQL, Postgres, and SQLite to get the exact syntax for your project.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
