"use client";

import React, { useState, useEffect, useMemo } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  Waves, 
  ArrowRightLeft, 
  Copy, 
  Info,
  Zap,
  Trash2,
  Volume2,
  Lightbulb,
  Radio
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MORSE_CODE: Record<string, string> = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
  'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
  'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
  'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--',
  '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
  '9': '----.', '0': '-----', ' ': '/'
};

const REVERSE_MORSE = Object.fromEntries(
  Object.entries(MORSE_CODE).map(([k, v]) => [v, k])
);

export default function MorseCodeConverter() {
  const tool = tools.find((t) => t.id === "morse-code")!;

  // State
  const [text, setText] = useState<string>("SOS");
  const [morse, setMorse] = useState<string>("... --- ...");
  const [isBlinking, setIsBlinking] = useState(false);
  const [blinkIndex, setBlinkIndex] = useState(-1);

  // Conversion Logic
  const toMorse = (t: string) => {
    return t.toUpperCase().split('').map(char => MORSE_CODE[char] || '').join(' ');
  };

  const fromMorse = (m: string) => {
    return m.split(' ').map(code => REVERSE_MORSE[code] || '?').join('');
  };

  const handleTextChange = (val: string) => {
    setText(val);
    setMorse(toMorse(val));
  };

  const handleMorseChange = (val: string) => {
    setMorse(val);
    setText(fromMorse(val));
  };

  // Blink Animation Logic
  const startBlink = () => {
    if (isBlinking) return;
    setIsBlinking(true);
    let i = 0;
    const codes = morse.replace(/\s/g, '').split('');
    
    const runBlink = () => {
      if (i >= codes.length) {
        setIsBlinking(false);
        setBlinkIndex(-1);
        return;
      }
      setBlinkIndex(i);
      const delay = codes[i] === '.' ? 200 : 600;
      setTimeout(() => {
        setBlinkIndex(-1);
        setTimeout(() => {
          i++;
          runBlink();
        }, 200);
      }, delay);
    };
    runBlink();
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Main Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Text Input */}
          <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 md:p-10 border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-2">
                <Radio size={20} className="text-indigo-600" />
                Plain Text
              </h3>
              <button onClick={() => setText("")} className="text-gray-300 hover:text-rose-500 transition-colors"><Trash2 size={18}/></button>
            </div>
            <textarea 
              value={text} onChange={(e) => handleTextChange(e.target.value)}
              className="w-full h-40 p-6 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-600 rounded-2xl outline-none text-xl font-black resize-none"
              placeholder="Type your message..."
            />
          </div>

          {/* Morse Output */}
          <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 md:p-10 border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-2">
                <Waves size={20} className="text-emerald-600" />
                Morse Code
              </h3>
              <div className="flex items-center gap-2">
                <button onClick={() => navigator.clipboard.writeText(morse)} className="p-2 text-gray-300 hover:text-indigo-600"><Copy size={18}/></button>
                <button onClick={() => setMorse("")} className="text-gray-300 hover:text-rose-500 transition-colors"><Trash2 size={18}/></button>
              </div>
            </div>
            <textarea 
              value={morse} onChange={(e) => handleMorseChange(e.target.value)}
              className="w-full h-40 p-6 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-emerald-600 rounded-2xl outline-none text-2xl font-black font-mono tracking-widest resize-none"
              placeholder="... --- ..."
            />
          </div>
        </div>

        {/* Action Bar (Blinker) */}
        <div className="bg-gray-900 rounded-[3rem] p-8 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-100 ${blinkIndex !== -1 ? 'bg-amber-400 shadow-[0_0_40px_rgba(251,191,36,0.5)]' : 'bg-gray-800'}`}>
              <Lightbulb size={32} className={blinkIndex !== -1 ? 'text-white' : 'text-gray-600'} />
            </div>
            <div>
              <h4 className="text-xl font-black">Signal Visualizer</h4>
              <p className="text-gray-400 text-sm">Convert your message into a visual light signal.</p>
            </div>
          </div>
          <button 
            onClick={startBlink}
            disabled={isBlinking || !morse}
            className="px-8 py-4 bg-indigo-600 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
          >
            {isBlinking ? "Blinking..." : "Start Signal"}
          </button>
        </div>

        {/* Morse Chart */}
        <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 md:p-10 border border-gray-100 dark:border-gray-800">
           <h3 className="font-black text-gray-900 dark:text-white flex items-center gap-2 mb-8 uppercase tracking-widest text-xs">
            <Info size={16} className="text-indigo-600" />
            Morse Code Reference Chart
          </h3>
          <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-9 gap-4">
            {Object.entries(MORSE_CODE).slice(0, 36).map(([char, code]) => (
              <div key={char} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 text-center">
                <span className="font-black block mb-1">{char}</span>
                <code className="text-[10px] font-mono font-bold text-indigo-600">{code}</code>
              </div>
            ))}
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-indigo-50 dark:bg-indigo-900/10 rounded-3xl p-8 border border-indigo-100 dark:border-indigo-900/20 flex items-start gap-4">
            <div className="p-3 bg-indigo-500 text-white rounded-2xl">
              <Zap size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-indigo-900 dark:text-indigo-100">Ham Radio Usage</h4>
              <p className="text-sm text-indigo-800/70 dark:text-indigo-200/70 leading-relaxed">
                Morse code is still used today in aviation, maritime signals, and by amateur radio 
                enthusiasts (Ham radio) for low-bandwidth communication.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl text-emerald-600">
              <Volume2 size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Dits & Dahs</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                The "dots" are called **dits** and the "dashes" are called **dahs**. A dah is 
                typically three times the duration of a dit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
