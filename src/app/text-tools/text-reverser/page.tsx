"use client";

import React, { useState } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  RefreshCcw, 
  Copy, 
  CheckCircle2, 
  Trash2, 
  Zap, 
  ArrowRightLeft,
  Settings2,
  Undo2,
  FlipVertical,
  FlipHorizontal
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const UPSIDE_DOWN_MAP: Record<string, string> = {
  a: "ɐ", b: "q", c: "ɔ", d: "p", e: "ǝ", f: "ɟ", g: "ƃ", h: "ɥ", i: "ᴉ", j: "ɾ", k: "ʞ", l: "l", m: "ɯ", n: "u", o: "o", p: "d", q: "b", r: "ɹ", s: "s", t: "ʇ", u: "n", v: "ʌ", w: "ʍ", x: "x", y: "ʎ", z: "z",
  A: "∀", B: "ᗺ", C: "Ɔ", D: "ᗡ", E: "Ǝ", F: "Ⅎ", G: "⅁", H: "H", I: "I", J: "ᒋ", K: "⋊", L: "˥", M: "W", N: "N", O: "O", P: "Ԁ", Q: "Ό", R: "ᴚ", S: "S", T: "⊥", U: "∩", V: "Λ", W: "M", X: "X", Y: "⅄", Z: "Z",
  "1": "⇂", "2": "ᄅ", "3": "Ɛ", "4": "ㄣ", "5": "ϛ", "6": "9", "7": "ㄥ", "8": "8", "9": "6", "0": "0",
  ".": "˙", ",": "'", "'": ",", "\"": "„", "?": "¿", "!": "¡", "(": ")", ")": "(", "[": "]", "]": "[", "{": "}", "}": "{", "<": ">", ">": "<", "&": "⅋", "_": "‾"
};

export default function TextReverser() {
  const tool = tools.find((t) => t.id === "text-reverser")!;

  // State
  const [input, setInput] = useState("Hello UtilityLab!");
  const [copied, setCopied] = useState(false);

  const reverseText = () => setInput(input.split("").reverse().join(""));
  const reverseWords = () => setInput(input.split(" ").reverse().join(" "));
  const flipUpsideDown = () => {
    const flipped = input.split("").map(c => UPSIDE_DOWN_MAP[c] || c).reverse().join("");
    setInput(flipped);
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Main Interface */}
        <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-8 md:p-12 border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform text-indigo-500">
            <Undo2 size={120} />
          </div>

          <div className="space-y-8 relative z-10">
            {/* Input Area */}
            <div className="relative">
              <div className="absolute top-6 right-6 z-10 flex gap-2">
                <button 
                  onClick={() => { navigator.clipboard.writeText(input); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                  className={`p-4 rounded-2xl transition-all shadow-xl ${copied ? "bg-emerald-500 text-white" : "bg-white dark:bg-gray-700 text-gray-400 hover:text-indigo-600"}`}
                >
                  {copied ? <CheckCircle2 size={24}/> : <Copy size={24}/>}
                </button>
                <button 
                  onClick={() => setInput("")}
                  className="p-4 bg-white dark:bg-gray-700 text-gray-400 hover:text-rose-600 rounded-2xl shadow-xl transition-all"
                >
                  <Trash2 size={24} />
                </button>
              </div>
              <textarea 
                value={input} onChange={(e) => setInput(e.target.value)}
                spellCheck={false}
                className="w-full min-h-[400px] p-12 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-600 rounded-[3rem] outline-none text-3xl font-black leading-relaxed resize-none transition-all shadow-inner text-center"
                placeholder="Type something to flip..."
              />
            </div>
          </div>
        </div>

        {/* Action Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button 
            onClick={reverseText}
            className="p-8 bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm hover:border-indigo-600 hover:shadow-xl hover:shadow-indigo-600/10 transition-all group flex flex-col items-center gap-4"
          >
            <div className="p-4 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 rounded-2xl group-hover:scale-110 transition-transform">
              <FlipHorizontal size={32} />
            </div>
            <div className="text-center">
              <h4 className="font-black text-gray-900 dark:text-white uppercase tracking-widest text-xs">Reverse Characters</h4>
              <p className="text-[10px] text-gray-400 font-bold mt-1">"abc" → "cba"</p>
            </div>
          </button>

          <button 
            onClick={reverseWords}
            className="p-8 bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm hover:border-emerald-600 hover:shadow-xl hover:shadow-emerald-600/10 transition-all group flex flex-col items-center gap-4"
          >
            <div className="p-4 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 rounded-2xl group-hover:scale-110 transition-transform">
              <ArrowRightLeft size={32} />
            </div>
            <div className="text-center">
              <h4 className="font-black text-gray-900 dark:text-white uppercase tracking-widest text-xs">Reverse Words</h4>
              <p className="text-[10px] text-gray-400 font-bold mt-1">"one two" → "two one"</p>
            </div>
          </button>

          <button 
            onClick={flipUpsideDown}
            className="p-8 bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm hover:border-rose-600 hover:shadow-xl hover:shadow-rose-600/10 transition-all group flex flex-col items-center gap-4"
          >
            <div className="p-4 bg-rose-50 dark:bg-rose-900/30 text-rose-600 rounded-2xl group-hover:scale-110 transition-transform">
              <FlipVertical size={32} />
            </div>
            <div className="text-center">
              <h4 className="font-black text-gray-900 dark:text-white uppercase tracking-widest text-xs">Upside Down</h4>
              <p className="text-[10px] text-gray-400 font-bold mt-1">"hello" → "ollǝɥ"</p>
            </div>
          </button>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-indigo-600/20 flex items-start gap-4">
            <div className="p-3 bg-indigo-500 rounded-2xl">
              <Zap size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black">Instant Manipulation</h4>
              <p className="text-sm text-indigo-100 opacity-80 leading-relaxed">
                Process entire paragraphs or individual sentences instantly. Our algorithms 
                handle special characters and mixed cases with ease.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl text-emerald-600">
              <Settings2 size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Creative Coding</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Use reversed text for creative social media posts, simple puzzles, or as part of 
                your development testing for string handling.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
