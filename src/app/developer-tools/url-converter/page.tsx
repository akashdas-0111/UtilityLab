"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  Copy, 
  Trash2, 
  RefreshCcw, 
  ArrowRightLeft, 
  Globe, 
  Settings2, 
  ShieldCheck, 
  AlertCircle, 
  Plus, 
  Table, 
  ChevronDown, 
  ChevronRight,
  Code,
  FileText,
  ShieldAlert,
  Zap,
  Info,
  Download,
  SortAsc
} from "lucide-react";

type Mode = "encode" | "decode";

interface QueryParam {
  id: string;
  key: string;
  value: string;
}

export default function UrlConverter() {
  const [mode, setMode] = useState<Mode>("encode");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [useComponent, setUseComponent] = useState(false);
  const [plusSpaces, setPlusSpaces] = useState(false);
  const [queryParams, setQueryParams] = useState<QueryParam[]>([]);
  const [parsedUrl, setParsedUrl] = useState<URL | null>(null);
  const [status, setStatus] = useState({ valid: true, message: "" });
  const [securityScore, setSecurityScore] = useState<{ level: "safe" | "warning" | "danger", message: string }>({ level: "safe", message: "URL looks safe" });
  const [removeTrailingSlash, setRemoveTrailingSlash] = useState(true);

  const tool = tools.find(t => t.id === "url-encoder")!;

  // Core Processing
  const process = useCallback((val: string, currentMode: Mode) => {
    if (!val.trim()) {
      setOutput("");
      setParsedUrl(null);
      setQueryParams([]);
      setStatus({ valid: true, message: "" });
      return;
    }

    try {
      if (currentMode === "encode") {
        let result = useComponent ? encodeURIComponent(val) : encodeURI(val);
        if (plusSpaces) result = result.replace(/%20/g, "+");
        setOutput(result);
        setStatus({ valid: true, message: "Encoded successfully" });
      } else {
        // Validation: Detect broken % sequences
        if (/%[^0-9a-fA-F]|%[0-9a-fA-F]$/.test(val)) {
          throw new Error("Malformed URI: Broken % sequence detected");
        }
        let result = decodeURIComponent(val.replace(/\+/g, " "));
        setOutput(result);
        setStatus({ valid: true, message: "Decoded successfully" });
      }

      // Smart Parsing
      try {
        const testUrl = val.includes("://") ? val : `https://${val}`;
        const url = new URL(testUrl);
        setParsedUrl(url);
        
        const params: QueryParam[] = [];
        url.searchParams.forEach((v, k) => {
          params.push({ id: Math.random().toString(36).substr(2, 9), key: k, value: v });
        });
        setQueryParams(params);
        checkSecurity(url);
      } catch {
        setParsedUrl(null);
        setQueryParams([]);
      }
    } catch (e: any) {
      setStatus({ valid: false, message: e.message });
      setOutput("");
    }
  }, [useComponent, plusSpaces]);

  const checkSecurity = (url: URL) => {
    if (url.protocol === "http:") {
      setSecurityScore({ level: "warning", message: "Insecure Protocol (HTTP)" });
    } else if (url.hostname.includes("@")) {
      setSecurityScore({ level: "danger", message: "Potential Phishing (User-info in hostname)" });
    } else if (url.hostname.split(".").length > 4) {
      setSecurityScore({ level: "warning", message: "Suspicious subdomain depth" });
    } else {
      setSecurityScore({ level: "safe", message: "URL looks safe" });
    }
  };

  useEffect(() => {
    process(input, mode);
  }, [input, mode, process]);

  // Handlers
  const handleNormalization = () => {
    if (!parsedUrl) return;
    const url = new URL(parsedUrl.href);
    url.hostname = url.hostname.toLowerCase();
    
    // Remove tracking params
    const tracking = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "fbclid", "gclid"];
    tracking.forEach(p => url.searchParams.delete(p));
    
    // Remove default ports
    if ((url.protocol === "http:" && url.port === "80") || (url.protocol === "https:" && url.port === "443")) {
      url.port = "";
    }

    let final = url.href;
    if (removeTrailingSlash && final.endsWith("/") && url.pathname === "/") {
      final = final.slice(0, -1);
    }
    
    setInput(final);
  };

  const handleAutoFix = () => {
    // Fix common encoding errors like unescaped chars or loose %
    let fixed = input.replace(/%([^0-9a-fA-F])/gi, "%25$1");
    if (fixed.endsWith("%")) fixed += "25";
    setInput(fixed);
  };

  const updateUrlFromParams = (params: QueryParam[]) => {
    if (!parsedUrl) return;
    const url = new URL(parsedUrl.href);
    url.search = "";
    params.forEach(p => {
      if (p.key) url.searchParams.append(p.key, p.value);
    });
    setInput(url.href);
  };

  const sortParams = () => {
    const sorted = [...queryParams].sort((a, b) => a.key.localeCompare(b.key));
    setQueryParams(sorted);
    updateUrlFromParams(sorted);
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "url-converter-output.txt";
    a.click();
  };

  const partialEncode = (type: "path" | "query") => {
    if (!parsedUrl) return;
    if (type === "path") setInput(encodeURIComponent(parsedUrl.pathname));
    else setInput(encodeURIComponent(parsedUrl.search));
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-8">
        {/* Input/Output Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <div className="flex p-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
                <button onClick={() => setMode("encode")} className={`px-6 py-1.5 rounded-lg text-xs font-bold transition-all ${mode === "encode" ? "bg-white dark:bg-gray-950 text-indigo-600 shadow-sm" : "text-gray-500"}`}>Encode</button>
                <button onClick={() => setMode("decode")} className={`px-6 py-1.5 rounded-lg text-xs font-bold transition-all ${mode === "decode" ? "bg-white dark:bg-gray-950 text-indigo-600 shadow-sm" : "text-gray-500"}`}>Decode</button>
              </div>
              <span className="text-[10px] font-bold text-gray-400">{input.length} Chars</span>
            </div>
            <textarea
              className="w-full h-48 p-6 rounded-3xl bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 focus:border-indigo-500 outline-none transition-all resize-none text-sm font-mono leading-relaxed"
              placeholder="Paste URL or text here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            ></textarea>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Result</span>
              <span className="text-[10px] font-bold text-gray-400">{output.length} Chars</span>
            </div>
            <div className="relative group">
              <textarea
                className="w-full h-48 p-6 rounded-3xl bg-gray-50 dark:bg-gray-800/50 border-2 border-transparent focus:border-indigo-500 outline-none transition-all resize-none text-sm font-mono leading-relaxed"
                readOnly
                value={output}
                placeholder="Result will appear here..."
              ></textarea>
              <div className="absolute bottom-4 right-4 flex gap-2">
                <button onClick={() => navigator.clipboard.writeText(output)} className="p-2 bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800 text-indigo-600 hover:text-indigo-500 transition-colors" title="Copy"><Copy size={16} /></button>
                <button onClick={handleDownload} className="p-2 bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800 text-indigo-600 hover:text-indigo-500 transition-colors" title="Download"><Download size={16} /></button>
              </div>
            </div>
          </div>
        </div>

        {/* Status & Smart Parsing */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-4">
            <div className={`p-5 rounded-3xl border flex flex-col gap-3 transition-all ${
              securityScore.level === "safe" ? "bg-emerald-50 border-emerald-100 text-emerald-700" :
              securityScore.level === "warning" ? "bg-amber-50 border-amber-100 text-amber-700" :
              "bg-red-50 border-red-100 text-red-700"
            }`}>
              <div className="flex items-center gap-3">
                {securityScore.level === "safe" ? <ShieldCheck size={20} /> : <ShieldAlert size={20} />}
                <p className="text-sm font-bold">{securityScore.message}</p>
              </div>
              {!status.valid && (
                <div className="flex items-center justify-between gap-2 mt-2 pt-2 border-t border-current/10">
                  <p className="text-xs italic">{status.message}</p>
                  <button onClick={handleAutoFix} className="px-3 py-1 bg-white/50 rounded-lg text-[10px] font-bold uppercase hover:bg-white transition-all">Auto-Fix</button>
                </div>
              )}
            </div>

            <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 space-y-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <Settings2 size={14} className="text-indigo-600" /> Settings
              </h3>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" checked={useComponent} onChange={() => setUseComponent(!useComponent)} className="sr-only" />
                <div className={`w-8 h-4 rounded-full transition-all relative ${useComponent ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'}`}><div className={`absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full transition-transform ${useComponent ? 'translate-x-4' : ''}`} /></div>
                <span className="text-xs font-bold text-gray-600 dark:text-gray-400">encodeURIComponent</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" checked={plusSpaces} onChange={() => setPlusSpaces(!plusSpaces)} className="sr-only" />
                <div className={`w-8 h-4 rounded-full transition-all relative ${plusSpaces ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'}`}><div className={`absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full transition-transform ${plusSpaces ? 'translate-x-4' : ''}`} /></div>
                <span className="text-xs font-bold text-gray-600 dark:text-gray-400">Space as +</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" checked={removeTrailingSlash} onChange={() => setRemoveTrailingSlash(!removeTrailingSlash)} className="sr-only" />
                <div className={`w-8 h-4 rounded-full transition-all relative ${removeTrailingSlash ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'}`}><div className={`absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full transition-transform ${removeTrailingSlash ? 'translate-x-4' : ''}`} /></div>
                <span className="text-xs font-bold text-gray-600 dark:text-gray-400">Remove Trailing Slash</span>
              </label>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2"><Globe size={18} className="text-indigo-600" /> Smart Parsing</h3>
              {parsedUrl && (
                <div className="flex gap-2">
                  <button onClick={() => partialEncode("path")} className="px-3 py-1 bg-gray-50 dark:bg-gray-800 rounded-lg text-[10px] font-bold text-indigo-600 hover:bg-indigo-50 transition-all">Path Only</button>
                  <button onClick={() => partialEncode("query")} className="px-3 py-1 bg-gray-50 dark:bg-gray-800 rounded-lg text-[10px] font-bold text-indigo-600 hover:bg-indigo-50 transition-all">Query Only</button>
                  <button onClick={handleNormalization} className="px-3 py-1 bg-indigo-600 text-white rounded-lg text-[10px] font-bold flex items-center gap-1 hover:bg-indigo-500 transition-all"><Zap size={10} /> Normalize</button>
                </div>
              )}
            </div>
            {parsedUrl ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { label: "Protocol", value: parsedUrl.protocol },
                  { label: "Hostname", value: parsedUrl.hostname },
                  { label: "Port", value: parsedUrl.port || "(default)" },
                  { label: "Path", value: parsedUrl.pathname },
                  { label: "Query", value: parsedUrl.search || "(none)" },
                  { label: "Hash", value: parsedUrl.hash || "(none)" },
                ].map((item) => (
                  <div key={item.label} className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700">
                    <span className="text-[10px] font-bold text-gray-400 uppercase block mb-1">{item.label}</span>
                    <span className="text-xs font-mono text-indigo-600 truncate block">{item.value}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-2xl text-gray-400 text-xs italic">
                <Info size={32} className="mb-2 opacity-10" />
                Paste a full URL to analyze components
              </div>
            )}
          </div>
        </div>

        {/* Query Parameter Editor */}
        <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2"><Table size={18} className="text-indigo-600" /> Query Parameter Tool</h3>
            <div className="flex gap-4">
              <button onClick={sortParams} className="text-xs font-bold text-indigo-600 flex items-center gap-1 hover:underline"><SortAsc size={14} /> Sort A-Z</button>
              <button onClick={() => navigator.clipboard.writeText(JSON.stringify(Object.fromEntries(queryParams.map(p => [p.key, p.value])), null, 2))} className="text-xs font-bold text-indigo-600 flex items-center gap-1 hover:underline"><Code size={14} /> Copy JSON</button>
              <button onClick={() => setQueryParams([...queryParams, { id: Math.random().toString(36).substr(2, 9), key: "", value: "" }])} className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold flex items-center gap-2"><Plus size={14} /> Add New</button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b border-gray-100 dark:border-gray-800 text-left"><th className="pb-4 text-[10px] font-bold text-gray-400 uppercase px-2">Key</th><th className="pb-4 text-[10px] font-bold text-gray-400 uppercase px-2">Value</th><th className="pb-4 w-10"></th></tr></thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
                {queryParams.length > 0 ? queryParams.map((p) => (
                  <tr key={p.id} className="group">
                    <td className="py-3 px-2"><input type="text" value={p.key} onChange={(e) => { const n = queryParams.map(i => i.id === p.id ? {...i, key: e.target.value} : i); setQueryParams(n); updateUrlFromParams(n); }} className="w-full bg-transparent outline-none text-sm font-mono focus:text-indigo-600" /></td>
                    <td className="py-3 px-2"><input type="text" value={p.value} onChange={(e) => { const n = queryParams.map(i => i.id === p.id ? {...i, value: e.target.value} : i); setQueryParams(n); updateUrlFromParams(n); }} className="w-full bg-transparent outline-none text-sm font-mono focus:text-indigo-600" /></td>
                    <td className="py-3 px-2"><button onClick={() => { const n = queryParams.filter(i => i.id !== p.id); setQueryParams(n); updateUrlFromParams(n); }} className="p-2 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100"><Trash2 size={14} /></button></td>
                  </tr>
                )) : <tr><td colSpan={3} className="py-12 text-center text-gray-400 text-sm italic">No parameters detected</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
