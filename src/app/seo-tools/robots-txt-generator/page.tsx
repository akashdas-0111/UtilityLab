"use client";

import React, { useState, useMemo } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  FileText, 
  Trash2, 
  Plus, 
  Zap, 
  CheckCircle2, 
  Copy, 
  Terminal,
  Settings2,
  ShieldCheck,
  Search,
  Globe,
  Info
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Rule {
  id: string;
  agent: string;
  type: "Allow" | "Disallow";
  path: string;
}

export default function RobotsTxtGenerator() {
  const tool = tools.find((t) => t.id === "robots-txt-generator")!;

  // State
  const [rules, setRules] = useState<Rule[]>([
    { id: "1", agent: "*", type: "Allow", path: "/" },
    { id: "2", agent: "Googlebot", type: "Disallow", path: "/admin/" }
  ]);
  const [sitemap, setSitemap] = useState("https://utilitylab.com/sitemap.xml");
  const [copied, setCopied] = useState(false);

  const robotsTxt = useMemo(() => {
    let output = "";
    rules.forEach(rule => {
      output += `User-agent: ${rule.agent}\n${rule.type}: ${rule.path}\n\n`;
    });
    if (sitemap) output += `Sitemap: ${sitemap}`;
    return output.trim();
  }, [rules, sitemap]);

  const addRule = () => {
    setRules([...rules, { id: Math.random().toString(), agent: "*", type: "Disallow", path: "/private/" }]);
  };

  const removeRule = (id: string) => {
    setRules(rules.filter(r => r.id !== id));
  };

  const updateRule = (id: string, field: keyof Rule, value: string) => {
    setRules(rules.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Settings Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           
           {/* Rules Side */}
           <div className="lg:col-span-7 space-y-6">
              <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-10 border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform text-indigo-500">
                    <ShieldCheck size={120} />
                 </div>
                 
                 <div className="relative z-10 space-y-8">
                    <div className="flex items-center justify-between">
                       <h3 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
                          <Settings2 size={18} className="text-indigo-600" /> Crawl Rules
                       </h3>
                       <button 
                        onClick={addRule}
                        className="p-3 bg-indigo-600 text-white rounded-xl shadow-xl shadow-indigo-600/20 hover:scale-110 transition-all"
                       >
                         <Plus size={18} />
                       </button>
                    </div>

                    <div className="space-y-4">
                       <AnimatePresence mode="popLayout">
                          {rules.map((rule) => (
                            <motion.div 
                             layout
                             initial={{ opacity: 0, x: -20 }}
                             animate={{ opacity: 1, x: 0 }}
                             exit={{ opacity: 0, x: 20 }}
                             key={rule.id}
                             className="grid grid-cols-12 gap-3 items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 group"
                            >
                               <div className="col-span-3">
                                  <input 
                                   value={rule.agent} onChange={(e) => updateRule(rule.id, "agent", e.target.value)}
                                   placeholder="User-agent"
                                   className="w-full bg-transparent border-none outline-none font-bold text-xs text-gray-700 dark:text-gray-200"
                                  />
                               </div>
                               <div className="col-span-3">
                                  <select 
                                   value={rule.type} onChange={(e) => updateRule(rule.id, "type", e.target.value as any)}
                                   className="w-full bg-white dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-lg py-1 px-2 text-[10px] font-black uppercase"
                                  >
                                    <option value="Allow">Allow</option>
                                    <option value="Disallow">Disallow</option>
                                  </select>
                               </div>
                               <div className="col-span-5">
                                  <input 
                                   value={rule.path} onChange={(e) => updateRule(rule.id, "path", e.target.value)}
                                   placeholder="/path/"
                                   className="w-full bg-transparent border-none outline-none font-mono text-xs text-indigo-600"
                                  />
                               </div>
                               <div className="col-span-1 text-right">
                                  <button onClick={() => removeRule(rule.id)} className="text-gray-300 hover:text-rose-500 transition-colors">
                                     <Trash2 size={16} />
                                  </button>
                               </div>
                            </motion.div>
                          ))}
                       </AnimatePresence>
                    </div>

                    <div className="pt-6 border-t border-gray-100 dark:border-gray-800 space-y-4">
                       <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                          <Globe size={14} className="text-emerald-600" /> Sitemap URL
                       </h3>
                       <input 
                        value={sitemap} onChange={(e) => setSitemap(e.target.value)}
                        placeholder="https://example.com/sitemap.xml"
                        className="w-full px-8 py-4 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-emerald-600 rounded-2xl outline-none text-sm font-bold transition-all shadow-inner"
                       />
                    </div>
                 </div>
              </div>
           </div>

           {/* Result Side */}
           <div className="lg:col-span-5 flex flex-col space-y-6">
              <div className="bg-gray-900 rounded-[3rem] p-10 text-white shadow-xl flex-1 flex flex-col relative overflow-hidden group min-h-[500px]">
                 <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform text-indigo-500">
                    <Terminal size={120} />
                 </div>
                 
                 <div className="flex items-center justify-between mb-8 relative z-10">
                    <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
                       <FileText size={18} className="text-indigo-400" /> robots.txt
                    </h3>
                    <button 
                      onClick={() => { navigator.clipboard.writeText(robotsTxt); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                      className={`p-3 rounded-xl transition-all ${copied ? "bg-emerald-500 text-white" : "bg-white/10 text-gray-400 hover:text-white"}`}
                    >
                       {copied ? <CheckCircle2 size={20} /> : <Copy size={20} />}
                    </button>
                 </div>

                 <pre className="flex-1 bg-black/30 p-8 rounded-3xl font-mono text-sm leading-loose overflow-x-auto text-indigo-200 custom-scrollbar relative z-10 whitespace-pre-wrap">
                    {robotsTxt}
                 </pre>
              </div>
           </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl text-indigo-600">
              <Search size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Crawl Efficiency</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Direct search engines like Google and Bing to prioritize your important pages 
                while preventing them from crawling restricted directories.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl text-emerald-600">
              <ShieldCheck size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Secure Paths</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Add Disallow rules for admin dashboards, private assets, and search results to 
                maintain privacy and prevent duplicate content issues.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-amber-50 dark:bg-amber-900/30 rounded-2xl text-amber-600">
              <Info size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">W3C Standards</h4>
              <p className="text-[11px] text-gray-500 leading-relaxed">
                Generate standard-compliant Robots Exclusion Protocol files that are recognized 
                by all major web crawlers and indexers worldwide.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
