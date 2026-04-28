"use client";

import React, { useState, useEffect, useMemo } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  Copy, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  Code, 
  Braces, 
  ChevronRight, 
  ChevronDown, 
  Search, 
  Download, 
  FileType, 
  Eye, 
  Settings2,
  RefreshCcw,
  Zap,
  ArrowRightLeft,
  FileCode,
  Lock,
  Scissors,
  Table,
  FileJson
} from "lucide-react";

type Tab = "editor" | "tree" | "convert" | "query";

export default function JsonValidator() {
  const [input, setInput] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("editor");
  const [indent, setIndent] = useState(2);
  const [sortKeys, setSortKeys] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [query, setQuery] = useState("$");
  const [status, setStatus] = useState<"idle" | "valid" | "invalid">("idle");
  const [errorDetails, setErrorDetails] = useState<{ message: string; line?: number; col?: number } | null>(null);
  const [isMaskingEnabled, setIsMaskingEnabled] = useState(false);
  const [pruneKey, setPruneKey] = useState("");
  
  const tool = tools.find(t => t.id === "json-validator")!;

  // Validation Logic
  useEffect(() => {
    if (!input.trim()) {
      setStatus("idle");
      setErrorDetails(null);
      return;
    }

    try {
      JSON.parse(input);
      setStatus("valid");
      setErrorDetails(null);
    } catch (e: any) {
      setStatus("invalid");
      const match = e.message.match(/at line (\d+) column (\d+)/);
      setErrorDetails({
        message: e.message,
        line: match ? parseInt(match[1]) : undefined,
        col: match ? parseInt(match[2]) : undefined
      });
    }
  }, [input]);

  const parsedJson = useMemo(() => {
    try {
      let data = JSON.parse(input);
      if (isMaskingEnabled) data = maskSensitive(data);
      return data;
    } catch {
      return null;
    }
  }, [input, isMaskingEnabled]);

  // Recursively mask sensitive fields
  const maskSensitive = (obj: any): any => {
    if (obj === null || typeof obj !== 'object') return obj;
    if (Array.isArray(obj)) return obj.map(maskSensitive);
    
    const sensitiveKeys = ["password", "token", "secret", "apikey", "key", "auth", "credential"];
    return Object.keys(obj).reduce((result: any, key) => {
      const lowerKey = key.toLowerCase();
      if (sensitiveKeys.some(sk => lowerKey.includes(sk))) {
        result[key] = "********";
      } else {
        result[key] = maskSensitive(obj[key]);
      }
      return result;
    }, {});
  };

  const handlePrune = () => {
    if (!parsedJson || !pruneKey) return;
    const prune = (obj: any): any => {
      if (obj === null || typeof obj !== 'object') return obj;
      if (Array.isArray(obj)) return obj.map(prune);
      return Object.keys(obj).reduce((result: any, key) => {
        if (key !== pruneKey) result[key] = prune(obj[key]);
        return result;
      }, {});
    };
    setInput(JSON.stringify(prune(parsedJson), null, indent));
    setPruneKey("");
  };

  const handleFormat = () => {
    if (!parsedJson) return;
    let data = parsedJson;
    if (sortKeys) data = sortObject(data);
    setInput(JSON.stringify(data, null, indent));
  };

  const handleMinify = () => {
    if (!parsedJson) return;
    setInput(JSON.stringify(parsedJson));
  };

  const sortObject = (obj: any): any => {
    if (obj === null || typeof obj !== 'object') return obj;
    if (Array.isArray(obj)) return obj.map(sortObject);
    return Object.keys(obj).sort().reduce((result: any, key) => {
      result[key] = sortObject(obj[key]);
      return result;
    }, {});
  };

  const handleAutoFix = () => {
    let fixed = input
      .replace(/'/g, '"')
      .replace(/([{,]\s*)(\w+):/g, '$1"$2":')
      .replace(/,\s*([}\]])/g, '$1');
    setInput(fixed);
  };

  const handleDownload = (format: "json" | "txt" | "csv" | "xml" | "yaml") => {
    let content = input;
    if (!parsedJson) return;

    switch (format) {
      case "csv":
        content = jsonToCsv(parsedJson);
        break;
      case "xml":
        content = jsonToXml(parsedJson);
        break;
      case "yaml":
        content = jsonToYaml(parsedJson);
        break;
    }

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `utilitylab-export.${format}`;
    a.click();
  };

  // Conversion Logic
  const jsonToCsv = (obj: any) => {
    const array = Array.isArray(obj) ? obj : [obj];
    if (array.length === 0) return "";
    const keys = Object.keys(array[0]);
    const header = keys.join(",");
    const rows = array.map(item => 
      keys.map(key => JSON.stringify(item[key])).join(",")
    );
    return [header, ...rows].join("\n");
  };

  const jsonToXml = (obj: any, root = "root"): string => {
    const toXml = (v: any, k: string): string => {
      if (v === null || v === undefined) return `<${k} />`;
      if (Array.isArray(v)) return v.map(item => toXml(item, k)).join("");
      if (typeof v === "object") {
        return `<${k}>${Object.entries(v).map(([childKey, childValue]) => toXml(childValue, childKey)).join("")}</${k}>`;
      }
      return `<${k}>${v}</${k}>`;
    };
    return `<?xml version="1.0" encoding="UTF-8"?>\n${toXml(obj, root)}`;
  };

  const jsonToYaml = (obj: any, depth = 0): string => {
    const indentStr = "  ".repeat(depth);
    if (obj === null) return "null";
    if (typeof obj !== "object") return String(obj);
    
    if (Array.isArray(obj)) {
      return obj.map(item => `${indentStr}- ${jsonToYaml(item, depth + 1).trim()}`).join("\n");
    }
    
    return Object.entries(obj).map(([key, value]) => {
      const valueStr = typeof value === "object" && value !== null 
        ? `\n${jsonToYaml(value, depth + 1)}` 
        : ` ${jsonToYaml(value, depth)}`;
      return `${indentStr}${key}:${valueStr}`;
    }).join("\n");
  };

  // Tree View Node
  const JsonNode = ({ data, name, depth = 0 }: { data: any, name?: string, depth?: number }) => {
    const [isExpanded, setIsExpanded] = useState(depth < 2);
    const type = typeof data;
    const isObject = data !== null && type === "object";

    const isMatch = useMemo(() => {
      if (!searchQuery) return true;
      const str = JSON.stringify({ [name || ""]: data }).toLowerCase();
      return str.includes(searchQuery.toLowerCase());
    }, [data, name, searchQuery]);

    if (!isMatch) return null;

    return (
      <div className="ml-6 font-mono text-sm">
        <div className="flex items-center gap-2 py-0.5 group">
          {isObject && (
            <button onClick={() => setIsExpanded(!isExpanded)} className="text-gray-400 hover:text-indigo-600 transition-colors">
              {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </button>
          )}
          {!isObject && <div className="w-3.5" />}
          
          {name && <span className="text-indigo-600 dark:text-indigo-400 font-bold">{name}:</span>}
          
          {!isObject ? (
            <span className={`
              ${type === "string" ? "text-emerald-600" : 
                type === "number" ? "text-blue-600" : 
                type === "boolean" ? "text-orange-600" : "text-gray-400"}
              ${searchQuery && String(data).toLowerCase().includes(searchQuery.toLowerCase()) ? "bg-yellow-100 dark:bg-yellow-900/40" : ""}
            `}>
              {type === "string" ? `"${data}"` : String(data)}
              <span className="ml-2 text-[10px] opacity-40 uppercase font-bold">{type}</span>
            </span>
          ) : (
            <span className="text-gray-400 text-xs">
              {Array.isArray(data) ? `[${data.length}]` : `{${Object.keys(data).length}}`}
            </span>
          )}
        </div>
        
        {isObject && isExpanded && (
          <div className="border-l border-gray-100 dark:border-gray-800 ml-1.5">
            {Object.entries(data).map(([key, value]) => (
              <JsonNode key={key} name={key} data={value} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-6">
        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 p-1.5 bg-gray-100 dark:bg-gray-800/50 rounded-2xl w-fit">
          {[
            { id: "editor", name: "Editor & Validator", icon: Code },
            { id: "tree", name: "Tree Viewer", icon: Eye },
            { id: "convert", name: "Conversion", icon: ArrowRightLeft },
            { id: "query", name: "JSONPath Query", icon: Search },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as Tab)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === t.id 
                  ? "bg-white dark:bg-gray-900 text-indigo-600 shadow-sm" 
                  : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              <t.icon size={16} />
              {t.name}
            </button>
          ))}
        </div>

        {/* Global Status Banner */}
        <div className={`p-5 rounded-2xl border flex items-center justify-between gap-4 transition-all ${
          status === "idle" ? "bg-gray-50 border-gray-100 text-gray-500" :
          status === "valid" ? "bg-emerald-50 border-emerald-100 text-emerald-700" :
          "bg-red-50 border-red-100 text-red-700"
        }`}>
          <div className="flex items-center gap-4">
            {status === "idle" && <Braces size={20} />}
            {status === "valid" && <CheckCircle2 size={20} className="text-emerald-500" />}
            {status === "invalid" && <AlertCircle size={20} className="text-red-500" />}
            
            <div>
              <p className="font-bold">
                {status === "idle" ? "Enter your JSON code to begin" : 
                 status === "valid" ? "Valid JSON" : "Invalid JSON"}
              </p>
              {errorDetails && (
                <p className="text-xs font-mono mt-0.5 opacity-80">
                  {errorDetails.message} {errorDetails.line && `at Line ${errorDetails.line}`}
                </p>
              )}
            </div>
          </div>
          
          {status === "invalid" && (
            <button 
              onClick={handleAutoFix}
              className="px-4 py-2 bg-red-100 text-red-700 rounded-xl text-xs font-bold hover:bg-red-200 transition-all flex items-center gap-2"
            >
              <Zap size={14} /> Quick Fix
            </button>
          )}
        </div>

        {/* Tab Content */}
        <div className="min-h-[600px] flex flex-col">
          {activeTab === "editor" && (
            <div className="space-y-4 flex-grow flex flex-col">
              {/* Editor Controls */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-gray-400 uppercase">Indent:</span>
                    <select 
                      value={indent} 
                      onChange={(e) => setIndent(parseInt(e.target.value))}
                      className="text-xs font-bold bg-gray-50 dark:bg-gray-800 px-3 py-1.5 rounded-lg border border-gray-100 dark:border-gray-700 outline-none"
                    >
                      <option value={2}>2 Spaces</option>
                      <option value={4}>4 Spaces</option>
                    </select>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={sortKeys} 
                      onChange={() => setSortKeys(!sortKeys)} 
                      className="sr-only"
                    />
                    <div className={`w-8 h-4 rounded-full transition-all relative ${sortKeys ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'}`}>
                      <div className={`absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full transition-transform ${sortKeys ? 'translate-x-4' : ''}`} />
                    </div>
                    <span className="text-xs font-bold text-gray-500 group-hover:text-indigo-600">Sort Keys (A-Z)</span>
                  </label>
                </div>
                
                <div className="flex items-center gap-2">
                  <button onClick={handleFormat} className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-500 transition-all">
                    Format JSON
                  </button>
                  <button onClick={handleMinify} className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-xl text-xs font-bold hover:bg-gray-200 transition-all">
                    Minify
                  </button>
                  <div className="w-px h-6 bg-gray-100 dark:border-gray-800 mx-2" />
                  <button onClick={() => handleDownload("json")} className="p-2 text-gray-400 hover:text-indigo-600 transition-colors" title="Download .json">
                    <Download size={18} />
                  </button>
                  <button onClick={() => setInput("")} className="p-2 text-gray-400 hover:text-red-500 transition-colors" title="Clear">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <textarea
                className="w-full flex-grow p-8 rounded-3xl bg-gray-50 dark:bg-gray-800/30 border-2 border-gray-100 dark:border-gray-800 focus:border-indigo-500 outline-none transition-all resize-none text-sm font-mono leading-relaxed"
                placeholder="Paste your JSON here..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              ></textarea>
            </div>
          )}

          {activeTab === "tree" && (
            <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-8 flex-grow">
              <div className="flex items-center justify-between mb-8">
                <div className="relative w-full max-w-md">
                  <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search keys or values..."
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="overflow-auto max-h-[600px] custom-scrollbar">
                {parsedJson ? (
                  <JsonNode data={parsedJson} />
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                    <AlertCircle size={48} className="mb-4 opacity-20" />
                    <p>Invalid JSON or empty input. Switch to Editor to fix it.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "convert" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "JSON → CSV", desc: "Best for spreadsheet analysis", icon: Table, action: () => handleDownload("csv") },
                { name: "JSON → XML", desc: "Classic markup format", icon: FileCode, action: () => handleDownload("xml") },
                { name: "JSON → YAML", desc: "Human-readable config", icon: Settings2, action: () => handleDownload("yaml") },
              ].map((c) => (
                <div 
                  key={c.name} 
                  onClick={c.action}
                  className="p-6 rounded-3xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-indigo-500 transition-all group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-400 group-hover:bg-indigo-600 group-hover:text-white transition-all mb-4">
                    <c.icon size={24} />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">{c.name}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{c.desc}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "query" && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600">
                    <Search size={24} />
                  </div>
                  <div className="flex-grow">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 block">JSONPath Selector</label>
                    <input
                      type="text"
                      className="w-full text-lg font-mono bg-transparent border-b-2 border-gray-100 dark:border-gray-800 focus:border-indigo-500 outline-none transition-all py-1"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gray-950 rounded-3xl p-8 min-h-[300px] border-2 border-indigo-600/20">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Query Result</span>
                </div>
                <pre className="text-sm font-mono text-emerald-400 overflow-auto">
                  {parsedJson ? "// JSONPath Query Engine is being optimized" : "// Enter valid JSON first"}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Security & Cleanup Panel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 bg-indigo-50/50 dark:bg-indigo-900/10 rounded-3xl border border-indigo-100 dark:border-indigo-900/30">
          <div className="flex gap-4">
            <div className="p-3 rounded-xl bg-white dark:bg-gray-900 text-indigo-600 h-fit">
              <Lock size={24} />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-1">Privacy Shield</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Automatically mask sensitive fields like 'password' or 'token' in the viewer.</p>
              <button 
                onClick={() => setIsMaskingEnabled(!isMaskingEnabled)}
                className={`px-4 py-2 border rounded-xl text-xs font-bold transition-all ${
                  isMaskingEnabled 
                    ? "bg-indigo-600 text-white border-indigo-600" 
                    : "bg-white dark:bg-gray-900 text-indigo-600 border-indigo-200 dark:border-indigo-900 hover:bg-indigo-600 hover:text-white"
                }`}
              >
                {isMaskingEnabled ? "Shield Active" : "Enable Masking"}
              </button>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="p-3 rounded-xl bg-white dark:bg-gray-900 text-indigo-600 h-fit">
              <Scissors size={24} />
            </div>
            <div className="flex-grow">
              <h4 className="font-bold text-gray-900 dark:text-white mb-1">Global Cleanup</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Remove all occurrences of specific keys across the entire JSON object.</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Key to remove..."
                  className="px-4 py-2 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-xs flex-grow focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={pruneKey}
                  onChange={(e) => setPruneKey(e.target.value)}
                />
                <button 
                  onClick={handlePrune}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-500 transition-all"
                >
                  Prune
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
