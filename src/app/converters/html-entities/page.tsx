"use client";

import React, { useState, useEffect } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  Code, 
  ArrowRightLeft, 
  Copy, 
  Info,
  CheckCircle2,
  Zap,
  Trash2,
  Terminal,
  ShieldCheck,
  ShieldAlert
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Mode = "encode" | "decode";

export default function HTMLEntitiesConverter() {
  const tool = tools.find((t) => t.id === "html-entities")!;

  // State
  const [input, setInput] = useState<string>("<h1>Hello World!</h1> & <p>UtilityLab</p>");
  const [output, setOutput] = useState<string>("");
  const [mode, setMode] = useState<Mode>("encode");
  const [copied, setCopied] = useState(false);

  // Conversion Logic
  const handleConvert = () => {
    if (mode === "encode") {
      const el = document.createElement("div");
      el.innerText = input;
      setOutput(el.innerHTML);
    } else {
      const el = document.createElement("div");
      el.innerHTML = input;
      setOutput(el.innerText);
    }
  };

  useEffect(() => {
    handleConvert();
  }, [input, mode]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Main Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[400px]">
          
          {/* Input Panel */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <Terminal size={18} className="text-indigo-600" />
                <h3 className="font-black text-gray-900 dark:text-white uppercase tracking-widest text-xs">
                  {mode === 'encode' ? 'Raw Text' : 'Encoded Entities'}
                </h3>
              </div>
              <div className="flex items-center gap-3">
                 <button 
                  onClick={() => setMode(mode === 'encode' ? 'decode' : 'encode')}
                  className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                  title="Switch Mode"
                >
                  <ArrowRightLeft size={16} />
                </button>
                <button 
                  onClick={() => setInput("")}
                  className="p-2 text-gray-300 hover:text-rose-500 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <textarea 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              spellCheck={false}
              className="w-full h-full p-8 bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 rounded-[2.5rem] outline-none focus:border-indigo-600 transition-all font-mono text-sm leading-relaxed resize-none shadow-sm"
              placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter entities to decode...'}
            />
          </div>

          {/* Output Panel */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <Code size={18} className="text-emerald-600" />
                <h3 className="font-black text-gray-900 dark:text-white uppercase tracking-widest text-xs">
                  {mode === 'encode' ? 'Encoded Result' : 'Decoded Text'}
                </h3>
              </div>
              <button 
                onClick={copyToClipboard}
                className={`p-2 rounded-lg transition-all ${copied ? "bg-emerald-500 text-white" : "text-gray-400 hover:text-emerald-600 hover:bg-emerald-50"}`}
              >
                <Copy size={16} />
              </button>
            </div>
            <textarea 
              value={output}
              readOnly
              className="w-full h-full p-8 bg-gray-50 dark:bg-gray-800/50 border-2 border-transparent rounded-[2.5rem] outline-none font-mono text-sm leading-relaxed resize-none"
              placeholder="Result will appear here..."
            />
          </div>
        </div>

        {/* Security & Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-indigo-600 rounded-3xl p-8 text-white shadow-xl shadow-indigo-600/20 flex flex-col justify-between">
            <ShieldCheck size={24} className="mb-4 text-indigo-300" />
            <div>
              <h4 className="font-black mb-2">Prevent XSS</h4>
              <p className="text-xs text-indigo-100 opacity-80 leading-relaxed">
                Encoding special characters like &lt; and &gt; is a critical step in preventing Cross-Site Scripting (XSS) attacks.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col justify-between">
            <Zap size={24} className="mb-4 text-emerald-600" />
            <div>
              <h4 className="font-black text-gray-900 dark:text-white mb-2">Instant Sync</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Our tool processes your input in real-time. Just paste and get the encoded or decoded result instantly.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col justify-between">
            <Info size={24} className="mb-4 text-amber-600" />
            <div>
              <h4 className="font-black text-gray-900 dark:text-white mb-2">Full Compatibility</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Works with all standard HTML entities, including named and numeric references.
              </p>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-[2.5rem] p-8 md:p-10 border border-gray-100 dark:border-gray-800">
           <h3 className="font-black text-gray-900 dark:text-white flex items-center gap-2 mb-8 uppercase tracking-widest text-xs">
            <Code size={16} className="text-indigo-600" />
            Common HTML Entities
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { char: '<', entity: '&lt;' },
              { char: '>', entity: '&gt;' },
              { char: '&', entity: '&amp;' },
              { char: '"', entity: '&quot;' },
              { char: "'", entity: '&apos;' },
              { char: '©', entity: '&copy;' },
              { char: '®', entity: '&reg;' },
              { char: '€', entity: '&euro;' },
              { char: '£', entity: '&pound;' },
              { char: '¥', entity: '&yen;' }
            ].map((item, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 text-center">
                <span className="text-2xl mb-2 block">{item.char}</span>
                <code className="text-[10px] font-bold text-indigo-600">{item.entity}</code>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
