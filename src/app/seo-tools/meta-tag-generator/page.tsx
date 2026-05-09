"use client";

import React, { useState, useMemo } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  Globe, 
  Trash2, 
  Copy, 
  Zap, 
  CheckCircle2, 
  Terminal,
  Settings2,
  Facebook,
  Twitter,
  Search,
  Eye,
  Info
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MetaTagGenerator() {
  const tool = tools.find((t) => t.id === "meta-tag-generator")!;

  // State
  const [data, setData] = useState({
    title: "UtilityLab - All-in-One Professional Tools",
    description: "The ultimate suite of 100+ professional tools for developers, designers, and creators.",
    url: "https://utilitylab.com",
    image: "https://utilitylab.com/og-image.jpg",
    author: "UtilityLab Team"
  });
  const [copied, setCopied] = useState(false);

  const metaHtml = useMemo(() => {
    return `<!-- Primary Meta Tags -->
<title>${data.title}</title>
<meta name="title" content="${data.title}">
<meta name="description" content="${data.description}">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="${data.url}">
<meta property="og:title" content="${data.title}">
<meta property="og:description" content="${data.description}">
<meta property="og:image" content="${data.image}">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="${data.url}">
<meta property="twitter:title" content="${data.title}">
<meta property="twitter:description" content="${data.description}">
<meta property="twitter:image" content="${data.image}">`;
  }, [data]);

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Editor Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           
           {/* Inputs Side */}
           <div className="lg:col-span-5 space-y-6">
              <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-10 border border-gray-100 dark:border-gray-800 shadow-sm space-y-8">
                 <h3 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
                    <Settings2 size={18} className="text-indigo-600" /> Site Details
                 </h3>
                 
                 <div className="space-y-6">
                    <div className="space-y-2">
                       <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Page Title</span>
                       <input 
                        value={data.title} onChange={(e) => setData({...data, title: e.target.value})}
                        className="w-full px-8 py-4 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-600 rounded-2xl outline-none text-sm font-bold transition-all shadow-inner"
                       />
                    </div>
                    <div className="space-y-2">
                       <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Description</span>
                       <textarea 
                        value={data.description} onChange={(e) => setData({...data, description: e.target.value})}
                        className="w-full h-24 px-8 py-4 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-600 rounded-2xl outline-none text-sm font-bold transition-all shadow-inner resize-none"
                       />
                    </div>
                    <div className="space-y-2">
                       <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Site URL</span>
                       <input 
                        value={data.url} onChange={(e) => setData({...data, url: e.target.value})}
                        className="w-full px-8 py-4 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-600 rounded-2xl outline-none text-sm font-bold transition-all shadow-inner"
                       />
                    </div>
                    <div className="space-y-2">
                       <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">OG Image URL</span>
                       <input 
                        value={data.image} onChange={(e) => setData({...data, image: e.target.value})}
                        className="w-full px-8 py-4 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-600 rounded-2xl outline-none text-sm font-bold transition-all shadow-inner"
                       />
                    </div>
                 </div>
              </div>
           </div>

           {/* Result Side */}
           <div className="lg:col-span-7 flex flex-col space-y-6">
              <div className="bg-gray-900 rounded-[3rem] p-10 text-white shadow-xl flex-1 flex flex-col relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform text-indigo-500">
                    <Terminal size={120} />
                 </div>
                 
                 <div className="flex items-center justify-between mb-8 relative z-10">
                    <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
                       <Terminal size={18} className="text-indigo-400" /> Generated Code
                    </h3>
                    <button 
                      onClick={() => { navigator.clipboard.writeText(metaHtml); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                      className={`p-3 rounded-xl transition-all ${copied ? "bg-emerald-500 text-white" : "bg-white/10 text-gray-400 hover:text-white"}`}
                    >
                       {copied ? <CheckCircle2 size={20} /> : <Copy size={20} />}
                    </button>
                 </div>

                 <pre className="flex-1 bg-black/30 p-8 rounded-3xl font-mono text-[11px] leading-relaxed overflow-x-auto text-indigo-200 custom-scrollbar relative z-10">
                    {metaHtml}
                 </pre>
              </div>

              {/* Social Previews */}
              <div className="grid grid-cols-2 gap-4">
                 <div className="bg-white dark:bg-gray-900 p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-xl text-blue-600">
                       <Facebook size={20} />
                    </div>
                    <div>
                       <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Facebook Ready</h4>
                       <p className="text-xs font-bold text-gray-900 dark:text-white">OG Tags Included</p>
                    </div>
                 </div>
                 <div className="bg-white dark:bg-gray-900 p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl text-indigo-600">
                       <Twitter size={20} />
                    </div>
                    <div>
                       <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Twitter Cards</h4>
                       <p className="text-xs font-bold text-gray-900 dark:text-white">Summary Tags Set</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl text-indigo-600">
              <Search size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Search Visibility</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Ensure your website displays correctly in search results with optimized title and 
                description meta tags.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl text-emerald-600">
              <Eye size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Social Engagement</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Control how your content looks when shared. OpenGraph and Twitter tags increase 
                click-through rates and brand awareness.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-amber-50 dark:bg-amber-900/30 rounded-2xl text-amber-600">
              <Info size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Standardized Tags</h4>
              <p className="text-[11px] text-gray-500 leading-relaxed">
                Generate W3C compliant HTML meta tags that are recognized by all major search 
                engines and social platforms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
