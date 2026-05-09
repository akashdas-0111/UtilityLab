"use client";

import React, { useState, useMemo } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  FileCode, 
  Trash2, 
  Copy, 
  Zap, 
  CheckCircle2, 
  Terminal,
  Settings2,
  RefreshCcw,
  Eye,
  Download,
  FileText
} from "lucide-react";
import { marked } from "marked";
import { motion, AnimatePresence } from "framer-motion";

export default function MarkdownToHTML() {
  const tool = tools.find((t) => t.id === "markdown-to-html")!;

  // State
  const [md, setMd] = useState("# Welcome to UtilityLab\n\n- Professional tools\n- High performance\n- **100% Client-side**\n\n```javascript\nconsole.log('Hello World');\n```");
  const [copied, setCopied] = useState(false);

  const html = useMemo(() => {
    return marked.parse(md);
  }, [md]);

  const copyHtml = () => {
    navigator.clipboard.writeText(html as string);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadHtml = () => {
    const blob = new Blob([html as string], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "utilitylab-export.html";
    link.click();
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Main Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[600px]">
           
           {/* Editor Side */}
           <div className="flex flex-col space-y-4">
              <div className="flex justify-between items-center px-4">
                 <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
                   <FileText size={18} className="text-indigo-600" /> Markdown Input
                 </h3>
                 <button onClick={() => setMd("")} className="p-3 bg-white dark:bg-gray-800 rounded-xl hover:text-rose-600 transition-all shadow-sm">
                    <Trash2 size={18} />
                 </button>
              </div>
              <textarea 
                value={md} onChange={(e) => setMd(e.target.value)}
                className="flex-1 p-10 bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 rounded-[3rem] outline-none focus:border-indigo-600 transition-all font-mono text-sm leading-relaxed resize-none shadow-sm"
                placeholder="Type your markdown here..."
              />
           </div>

           {/* Preview Side */}
           <div className="flex flex-col space-y-4">
              <div className="flex justify-between items-center px-4">
                 <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
                   <Eye size={18} className="text-emerald-500" /> Live Preview
                 </h3>
                 <div className="flex gap-2">
                    <button onClick={copyHtml} className="p-3 bg-white dark:bg-gray-800 rounded-xl hover:text-indigo-600 transition-all shadow-sm">
                       {copied ? <CheckCircle2 size={18} className="text-emerald-500" /> : <Copy size={18} />}
                    </button>
                    <button onClick={downloadHtml} className="p-3 bg-white dark:bg-gray-800 rounded-xl hover:text-emerald-600 transition-all shadow-sm">
                       <Download size={18} />
                    </button>
                 </div>
              </div>
              <div className="flex-1 p-10 bg-gray-50 dark:bg-gray-900 border-2 border-transparent rounded-[3rem] overflow-y-auto shadow-inner prose dark:prose-invert max-w-none prose-indigo">
                 <div dangerouslySetInnerHTML={{ __html: html }} />
              </div>
           </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-indigo-600/20 flex flex-col justify-between">
            <Zap size={24} className="mb-4 text-indigo-300" />
            <div>
              <h4 className="font-black mb-2">Instant Conversion</h4>
              <p className="text-xs text-indigo-100 opacity-80 leading-relaxed">
                Experience zero-latency transformation from markdown to high-fidelity HTML as 
                you type. Perfect for rapid content creation.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col justify-between">
            <Settings2 size={24} className="mb-4 text-emerald-600" />
            <div>
              <h4 className="font-black text-gray-900 dark:text-white mb-2">Rich Styling</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Support for GitHub-flavored markdown including tables, code blocks, and complex 
                formatting for professional-grade output.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col justify-between">
            <Download size={24} className="mb-4 text-amber-600" />
            <div>
              <h4 className="font-black text-gray-900 dark:text-white mb-2">Export Ready</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Download your results as standalone HTML files or copy the raw code to your 
                clipboard for immediate integration into your CMS or blog.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
