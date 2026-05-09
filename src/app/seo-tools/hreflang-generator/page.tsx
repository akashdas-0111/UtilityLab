"use client";

import React, { useState, useMemo } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  Languages, 
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

interface LangTag {
  id: string;
  lang: string;
  region: string;
  url: string;
}

export default function HreflangGenerator() {
  const tool = tools.find((t) => t.id === "hreflang-generator")!;

  // State
  const [tags, setTags] = useState<LangTag[]>([
    { id: "1", lang: "en", region: "us", url: "https://utilitylab.com/en-us/" },
    { id: "2", lang: "es", region: "es", url: "https://utilitylab.com/es-es/" }
  ]);
  const [copied, setCopied] = useState(false);

  const hreflangHtml = useMemo(() => {
    return tags.map(t => `<link rel="alternate" hreflang="${t.lang}${t.region ? `-${t.region}` : ""}" href="${t.url}" />`).join("\n");
  }, [tags]);

  const addTag = () => {
    setTags([...tags, { id: Math.random().toString(), lang: "fr", region: "fr", url: "https://utilitylab.com/fr-fr/" }]);
  };

  const removeTag = (id: string) => {
    setTags(tags.filter(t => t.id !== id));
  };

  const updateTag = (id: string, field: keyof LangTag, value: string) => {
    setTags(tags.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Editor Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           
           {/* Config Side */}
           <div className="lg:col-span-7 space-y-6">
              <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-10 border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform text-indigo-500">
                    <Languages size={120} />
                 </div>
                 
                 <div className="relative z-10 space-y-8">
                    <div className="flex items-center justify-between">
                       <h3 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
                          <Settings2 size={18} className="text-indigo-600" /> Language Mapping
                       </h3>
                       <button 
                        onClick={addTag}
                        className="p-3 bg-indigo-600 text-white rounded-xl shadow-xl shadow-indigo-600/20 hover:scale-110 transition-all"
                       >
                         <Plus size={18} />
                       </button>
                    </div>

                    <div className="space-y-4">
                       <AnimatePresence mode="popLayout">
                          {tags.map((tag) => (
                            <motion.div 
                             layout
                             initial={{ opacity: 0, x: -20 }}
                             animate={{ opacity: 1, x: 0 }}
                             exit={{ opacity: 0, x: 20 }}
                             key={tag.id}
                             className="grid grid-cols-12 gap-3 items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 group"
                            >
                               <div className="col-span-2">
                                  <input 
                                   value={tag.lang} onChange={(e) => updateTag(tag.id, "lang", e.target.value)}
                                   placeholder="en"
                                   className="w-full bg-white dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-lg py-1 px-2 text-xs font-black text-center uppercase"
                                  />
                               </div>
                               <div className="col-span-2">
                                  <input 
                                   value={tag.region} onChange={(e) => updateTag(tag.id, "region", e.target.value)}
                                   placeholder="us"
                                   className="w-full bg-white dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-lg py-1 px-2 text-xs font-black text-center uppercase"
                                  />
                               </div>
                               <div className="col-span-7">
                                  <input 
                                   value={tag.url} onChange={(e) => updateTag(tag.id, "url", e.target.value)}
                                   placeholder="URL"
                                   className="w-full bg-transparent border-none outline-none font-bold text-xs text-indigo-600 truncate"
                                  />
                               </div>
                               <div className="col-span-1 text-right">
                                  <button onClick={() => removeTag(tag.id)} className="text-gray-300 hover:text-rose-500 transition-colors">
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

           {/* Result Side */}
           <div className="lg:col-span-5 flex flex-col space-y-6">
              <div className="bg-gray-900 rounded-[3rem] p-10 text-white shadow-xl flex-1 flex flex-col relative overflow-hidden group min-h-[500px]">
                 <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform text-indigo-500">
                    <Terminal size={120} />
                 </div>
                 
                 <div className="flex items-center justify-between mb-8 relative z-10">
                    <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
                       <Terminal size={18} className="text-indigo-400" /> Hreflang Tags
                    </h3>
                    <button 
                      onClick={() => { navigator.clipboard.writeText(hreflangHtml); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                      className={`p-3 rounded-xl transition-all ${copied ? "bg-emerald-500 text-white" : "bg-white/10 text-gray-400 hover:text-white"}`}
                    >
                       {copied ? <CheckCircle2 size={20} /> : <Copy size={20} />}
                    </button>
                 </div>

                 <pre className="flex-1 bg-black/30 p-8 rounded-3xl font-mono text-[11px] leading-relaxed overflow-x-auto text-indigo-200 custom-scrollbar relative z-10 whitespace-pre-wrap">
                    {hreflangHtml}
                 </pre>
              </div>
           </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl text-indigo-600">
              <Languages size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Localization</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Ensure search engines serve the correct language version of your content to users 
                based on their geographical location and browser settings.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl text-emerald-600">
              <CheckCircle2 size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">SEO Health</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Prevent duplicate content issues across multiple regional domains or 
                subdirectories by explicitly defining language relationships.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-amber-50 dark:bg-amber-900/30 rounded-2xl text-amber-600">
              <Globe size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Global Scale</h4>
              <p className="text-[11px] text-gray-500 leading-relaxed">
                Support for all standard ISO 639-1 language codes and ISO 3166-1 alpha-2 
                region codes for comprehensive international SEO management.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
