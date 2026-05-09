"use client";

import React, { useState, useMemo } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  Network, 
  Trash2, 
  Copy, 
  Zap, 
  CheckCircle2, 
  Terminal,
  Settings2,
  FileCode,
  Globe,
  Plus,
  RefreshCcw,
  Info
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Page {
  id: string;
  url: string;
  priority: string;
  changefreq: string;
}

export default function SitemapGenerator() {
  const tool = tools.find((t) => t.id === "sitemap-generator")!;

  // State
  const [pages, setPages] = useState<Page[]>([
    { id: "1", url: "https://utilitylab.com/", priority: "1.0", changefreq: "daily" },
    { id: "2", url: "https://utilitylab.com/about", priority: "0.8", changefreq: "monthly" }
  ]);
  const [copied, setCopied] = useState(false);

  const sitemapXml = useMemo(() => {
    let output = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    pages.forEach(p => {
      output += `  <url>\n    <loc>${p.url}</loc>\n    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n    <changefreq>${p.changefreq}</changefreq>\n    <priority>${p.priority}</priority>\n  </url>\n`;
    });
    output += `</urlset>`;
    return output;
  }, [pages]);

  const addPage = () => {
    setPages([...pages, { id: Math.random().toString(), url: "https://utilitylab.com/new-page", priority: "0.5", changefreq: "weekly" }]);
  };

  const removePage = (id: string) => {
    setPages(pages.filter(p => p.id !== id));
  };

  const updatePage = (id: string, field: keyof Page, value: string) => {
    setPages(pages.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Editor Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           
           {/* Page Config Side */}
           <div className="lg:col-span-7 space-y-6">
              <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-10 border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform text-indigo-500">
                    <Globe size={120} />
                 </div>
                 
                 <div className="relative z-10 space-y-8">
                    <div className="flex items-center justify-between">
                       <h3 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
                          <Settings2 size={18} className="text-indigo-600" /> URL Architecture
                       </h3>
                       <button 
                        onClick={addPage}
                        className="p-3 bg-indigo-600 text-white rounded-xl shadow-xl shadow-indigo-600/20 hover:scale-110 transition-all"
                       >
                         <Plus size={18} />
                       </button>
                    </div>

                    <div className="space-y-4">
                       <AnimatePresence mode="popLayout">
                          {pages.map((page) => (
                            <motion.div 
                             layout
                             initial={{ opacity: 0, x: -20 }}
                             animate={{ opacity: 1, x: 0 }}
                             exit={{ opacity: 0, x: 20 }}
                             key={page.id}
                             className="grid grid-cols-12 gap-3 items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 group"
                            >
                               <div className="col-span-6">
                                  <input 
                                   value={page.url} onChange={(e) => updatePage(page.id, "url", e.target.value)}
                                   placeholder="Full URL"
                                   className="w-full bg-transparent border-none outline-none font-bold text-xs text-indigo-600 truncate"
                                  />
                               </div>
                               <div className="col-span-2">
                                  <select 
                                   value={page.priority} onChange={(e) => updatePage(page.id, "priority", e.target.value)}
                                   className="w-full bg-white dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-lg py-1 px-1 text-[9px] font-black"
                                  >
                                    {["1.0", "0.9", "0.8", "0.7", "0.6", "0.5"].map(v => <option key={v} value={v}>{v}</option>)}
                                  </select>
                               </div>
                               <div className="col-span-3">
                                  <select 
                                   value={page.changefreq} onChange={(e) => updatePage(page.id, "changefreq", e.target.value)}
                                   className="w-full bg-white dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-lg py-1 px-1 text-[9px] font-black uppercase"
                                  >
                                    {["always", "hourly", "daily", "weekly", "monthly", "yearly"].map(v => <option key={v} value={v}>{v}</option>)}
                                  </select>
                               </div>
                               <div className="col-span-1 text-right">
                                  <button onClick={() => removePage(page.id)} className="text-gray-300 hover:text-rose-500 transition-colors">
                                     <Trash2 size={16} />
                                  </button>
                               </div>
                            </motion.div>
                          ))}
                       </AnimatePresence>
                    </div>
                 </div>
              </div>
           </div>

           {/* XML Side */}
           <div className="lg:col-span-5 flex flex-col space-y-6">
              <div className="bg-gray-900 rounded-[3rem] p-10 text-white shadow-xl flex-1 flex flex-col relative overflow-hidden group min-h-[500px]">
                 <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform text-emerald-500">
                    <FileCode size={120} />
                 </div>
                 
                 <div className="flex items-center justify-between mb-8 relative z-10">
                    <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
                       <FileCode size={18} className="text-emerald-400" /> sitemap.xml
                    </h3>
                    <button 
                      onClick={() => { navigator.clipboard.writeText(sitemapXml); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                      className={`p-3 rounded-xl transition-all ${copied ? "bg-emerald-500 text-white" : "bg-white/10 text-gray-400 hover:text-white"}`}
                    >
                       {copied ? <CheckCircle2 size={20} /> : <Copy size={20} />}
                    </button>
                 </div>

                 <pre className="flex-1 bg-black/30 p-8 rounded-3xl font-mono text-[11px] leading-relaxed overflow-x-auto text-emerald-200 custom-scrollbar relative z-10">
                    {sitemapXml}
                 </pre>
              </div>
           </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl text-indigo-600">
              <RefreshCcw size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Index Efficiency</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Provide search engine crawlers with a direct map of your website's architecture, 
                ensuring all pages are discovered and indexed quickly.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl text-emerald-600">
              <CheckCircle2 size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Priority Controls</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Set custom priorities and update frequencies for each page to tell search 
                engines which content is most important for your brand.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-amber-50 dark:bg-amber-900/30 rounded-2xl text-amber-600">
              <Info size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">W3C Compliant</h4>
              <p className="text-[11px] text-gray-500 leading-relaxed">
                Generates sitemaps following the official sitemaps.org protocol, fully compatible 
                with Google Search Console and Bing Webmaster Tools.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
