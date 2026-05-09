"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  Type, 
  RefreshCcw, 
  Copy, 
  CheckCircle2, 
  Settings2,
  FileCode,
  List,
  AlignLeft,
  Trash2,
  Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const LOREM_WORDS = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud", "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo", "consequat", "duis", "aute", "irure", "dolor", "in", "reprehenderit", "in", "voluptate", "velit", "esse", "cillum", "dolore", "eu", "fugiat", "nulla", "pariatur", "excepteur", "sint", "occaecat", "cupidatat", "non", "proident", "sunt", "in", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id", "est", "laborum"
];

export default function LoremIpsumGenerator() {
  const tool = tools.find((t) => t.id === "lorem-ipsum")!;

  // State
  const [type, setType] = useState<"paragraphs" | "words" | "lists">("paragraphs");
  const [count, setCount] = useState(3);
  const [result, setResult] = useState("");
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [includeHTML, setIncludeHTML] = useState(false);
  const [copied, setCopied] = useState(false);

  const generate = useCallback(() => {
    let output = "";
    
    const getRandomWord = () => LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)];
    
    const generateSentence = () => {
      const length = Math.floor(Math.random() * 10) + 5;
      let s = Array.from({ length }, getRandomWord).join(" ");
      return s.charAt(0).toUpperCase() + s.slice(1) + ".";
    };

    const generateParagraph = () => {
      const length = Math.floor(Math.random() * 5) + 3;
      return Array.from({ length }, generateSentence).join(" ");
    };

    if (type === "paragraphs") {
      let paras = Array.from({ length: count }, generateParagraph);
      if (startWithLorem && paras.length > 0) {
        paras[0] = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " + paras[0].split(". ").slice(1).join(". ");
      }
      output = includeHTML ? paras.map(p => `<p>${p}</p>`).join("\n\n") : paras.join("\n\n");
    } else if (type === "words") {
      let words = Array.from({ length: count }, getRandomWord);
      if (startWithLorem && words.length > 0) {
        words.splice(0, 5, "lorem", "ipsum", "dolor", "sit", "amet");
      }
      output = words.join(" ");
    } else if (type === "lists") {
      let items = Array.from({ length: count }, () => {
        const s = generateSentence();
        return s.endsWith(".") ? s.slice(0, -1) : s;
      });
      output = includeHTML ? `<ul>\n${items.map(i => `  <li>${i}</li>`).join("\n")}\n</ul>` : items.map(i => `• ${i}`).join("\n");
    }

    setResult(output);
  }, [type, count, startWithLorem, includeHTML]);

  useEffect(() => {
    generate();
  }, [generate]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Controls Bar */}
        <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-8">
           <div className="flex flex-wrap items-center gap-4">
             <div className="flex bg-gray-50 dark:bg-gray-800 p-2 rounded-2xl border border-gray-100 dark:border-gray-700">
               {[
                 { id: "paragraphs", icon: AlignLeft },
                 { id: "words", icon: Type },
                 { id: "lists", icon: List }
               ].map(opt => (
                 <button 
                  key={opt.id}
                  onClick={() => setType(opt.id as any)}
                  className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${type === opt.id ? 'bg-white dark:bg-gray-700 shadow-lg text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
                 >
                   <opt.icon size={14} /> {opt.id}
                 </button>
               ))}
             </div>

             <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 px-4 py-2 rounded-2xl border border-gray-100 dark:border-gray-700">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Amount</span>
                <input 
                  type="number" min="1" max="100" value={count} onChange={(e) => setCount(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
                  className="w-12 bg-transparent text-center font-black text-indigo-600 outline-none"
                />
             </div>
           </div>

           <div className="flex flex-wrap items-center gap-4">
             <label className="flex items-center gap-2 cursor-pointer group">
               <div className={`w-10 h-6 rounded-full transition-all relative ${startWithLorem ? 'bg-indigo-600' : 'bg-gray-200'}`}>
                 <input type="checkbox" className="hidden" checked={startWithLorem} onChange={() => setStartWithLorem(!startWithLorem)} />
                 <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${startWithLorem ? 'left-5' : 'left-1'}`} />
               </div>
               <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Start with Lorem</span>
             </label>

             <label className="flex items-center gap-2 cursor-pointer group">
               <div className={`w-10 h-6 rounded-full transition-all relative ${includeHTML ? 'bg-indigo-600' : 'bg-gray-200'}`}>
                 <input type="checkbox" className="hidden" checked={includeHTML} onChange={() => setIncludeHTML(!includeHTML)} />
                 <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${includeHTML ? 'left-5' : 'left-1'}`} />
               </div>
               <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Include HTML</span>
             </label>

             <button 
              onClick={generate}
              className="p-3 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 rounded-2xl hover:scale-110 active:rotate-180 transition-all"
             >
               <RefreshCcw size={18} />
             </button>
           </div>
        </div>

        {/* Result Area */}
        <div className="relative group">
          <div className="absolute top-6 right-6 z-10 flex gap-2">
            <button 
              onClick={copyToClipboard}
              className={`p-4 rounded-2xl transition-all shadow-xl ${copied ? "bg-emerald-500 text-white" : "bg-white dark:bg-gray-700 text-gray-400 hover:text-indigo-600"}`}
            >
              {copied ? <CheckCircle2 size={24}/> : <Copy size={24}/>}
            </button>
            <button 
              onClick={() => setResult("")}
              className="p-4 bg-white dark:bg-gray-700 text-gray-400 hover:text-rose-600 rounded-2xl shadow-xl transition-all"
            >
              <Trash2 size={24} />
            </button>
          </div>
          <div className="w-full min-h-[500px] p-12 bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 rounded-[3rem] shadow-sm font-serif text-xl leading-relaxed text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
            {result || "Generated text will appear here..."}
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-indigo-600/20 flex flex-col justify-between">
            <Sparkles size={24} className="mb-4 text-indigo-300" />
            <div>
              <h4 className="font-black mb-2">Design Ready</h4>
              <p className="text-xs text-indigo-100 opacity-80 leading-relaxed">
                Perfect for mocking up layouts in Figma, Sketch, or directly in your frontend code.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col justify-between">
            <FileCode size={24} className="mb-4 text-emerald-600" />
            <div>
              <h4 className="font-black text-gray-900 dark:text-white mb-2">HTML Export</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Enable HTML mode to get pre-wrapped &lt;p&gt; or &lt;li&gt; tags for quick integration.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col justify-between">
            <Settings2 size={24} className="mb-4 text-amber-600" />
            <div>
              <h4 className="font-black text-gray-900 dark:text-white mb-2">Fully Random</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Generates unique sentences every time, avoiding repetitive patterns in large blocks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
