"use client";

import React, { useState, useEffect } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  Calculator, 
  History, 
  Trash2, 
  Delete,
  Delete as Backspace,
  Settings,
  Info,
  Maximize2,
  Minimize2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ScientificCalculator() {
  const tool = tools.find((t) => t.id === "scientific-calc")!;

  // State
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [memory, setMemory] = useState(0);

  const handleNumber = (num: string) => {
    if (display === "0" || display === "Error") setDisplay(num);
    else setDisplay(display + num);
  };

  const handleOperator = (op: string) => {
    setExpression(display + " " + op + " ");
    setDisplay("0");
  };

  const handleScientific = (func: string) => {
    try {
      const val = parseFloat(display);
      let res = 0;
      switch (func) {
        case "sin": res = Math.sin(val * Math.PI / 180); break;
        case "cos": res = Math.cos(val * Math.PI / 180); break;
        case "tan": res = Math.tan(val * Math.PI / 180); break;
        case "sqrt": res = Math.sqrt(val); break;
        case "log": res = Math.log10(val); break;
        case "ln": res = Math.log(val); break;
        case "pow": res = Math.pow(val, 2); break;
        case "pi": res = Math.PI; break;
        case "e": res = Math.E; break;
      }
      setDisplay(res.toString());
      setHistory([`${func}(${val}) = ${res}`, ...history.slice(0, 9)]);
    } catch (e) {
      setDisplay("Error");
    }
  };

  const calculate = () => {
    try {
      const fullExpr = expression + display;
      // Note: In a production environment, use a proper math parser like mathjs.
      // For this demo, we use a simple replacement for safe basic eval.
      // We only allow numbers and basic operators.
      const sanitized = fullExpr.replace(/[^-+*/%0-9.]/g, '');
      const res = eval(sanitized);
      setHistory([`${fullExpr} = ${res}`, ...history.slice(0, 9)]);
      setDisplay(res.toString());
      setExpression("");
    } catch (e) {
      setDisplay("Error");
    }
  };

  const clear = () => {
    setDisplay("0");
    setExpression("");
  };

  const backspace = () => {
    if (display.length > 1) setDisplay(display.slice(0, -1));
    else setDisplay("0");
  };

  return (
    <ToolLayout tool={tool}>
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Calculator */}
        <div className="lg:col-span-8 bg-gray-900 rounded-[3rem] p-6 md:p-10 shadow-2xl border border-gray-800 relative overflow-hidden">
          {/* Internal Glow */}
          <div className="absolute top-0 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
          
          {/* Display */}
          <div className="bg-black/40 rounded-3xl p-8 mb-8 border border-white/5 text-right space-y-2 h-[160px] flex flex-col justify-end overflow-hidden group">
            <p className="text-indigo-400 font-mono text-sm h-6 opacity-60 transition-opacity group-hover:opacity-100">{expression}</p>
            <h2 className="text-white font-mono text-5xl md:text-6xl font-black truncate tracking-tighter">
              {display}
            </h2>
          </div>

          {/* Keypad */}
          <div className="grid grid-cols-4 md:grid-cols-5 gap-3 md:gap-4">
            
            {/* Scientific Functions (Desktop/Large only or top rows) */}
            <div className="col-span-4 md:col-span-5 grid grid-cols-4 md:grid-cols-5 gap-3 mb-4">
              {["sin", "cos", "tan", "sqrt", "log"].map(f => (
                <button key={f} onClick={() => handleScientific(f)} className="py-3 bg-gray-800/50 hover:bg-gray-700 rounded-xl text-indigo-400 font-black text-[10px] uppercase tracking-widest transition-all">
                  {f}
                </button>
              ))}
               {["ln", "pow", "pi", "e", "abs"].map(f => (
                <button key={f} onClick={() => handleScientific(f)} className="py-3 bg-gray-800/50 hover:bg-gray-700 rounded-xl text-indigo-400 font-black text-[10px] uppercase tracking-widest transition-all">
                  {f === 'pow' ? 'x²' : f}
                </button>
              ))}
            </div>

            {/* Main Keypad */}
            <button onClick={clear} className="py-6 bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white rounded-2xl font-black text-xl transition-all">C</button>
            <button onClick={backspace} className="py-6 bg-gray-800 text-white hover:bg-gray-700 rounded-2xl flex items-center justify-center transition-all">
              <Backspace size={24} />
            </button>
            <button onClick={() => handleOperator("%")} className="py-6 bg-gray-800 text-white hover:bg-gray-700 rounded-2xl font-black text-xl transition-all">%</button>
            <button onClick={() => handleOperator("/")} className="py-6 bg-indigo-600 text-white hover:bg-indigo-500 rounded-2xl font-black text-xl transition-all">÷</button>
            <button onClick={() => handleScientific("pi")} className="hidden md:block py-6 bg-gray-800 text-indigo-300 rounded-2xl font-black text-xl">π</button>

            {[7, 8, 9].map(n => (
              <button key={n} onClick={() => handleNumber(n.toString())} className="py-6 bg-gray-800 text-white hover:bg-gray-700 rounded-2xl font-black text-2xl transition-all">{n}</button>
            ))}
            <button onClick={() => handleOperator("*")} className="py-6 bg-indigo-600 text-white hover:bg-indigo-500 rounded-2xl font-black text-xl transition-all">×</button>
            <button onClick={() => handleScientific("e")} className="hidden md:block py-6 bg-gray-800 text-indigo-300 rounded-2xl font-black text-xl">e</button>

            {[4, 5, 6].map(n => (
              <button key={n} onClick={() => handleNumber(n.toString())} className="py-6 bg-gray-800 text-white hover:bg-gray-700 rounded-2xl font-black text-2xl transition-all">{n}</button>
            ))}
            <button onClick={() => handleOperator("-")} className="py-6 bg-indigo-600 text-white hover:bg-indigo-500 rounded-2xl font-black text-xl transition-all">-</button>
            <button onClick={() => handleScientific("log")} className="hidden md:block py-6 bg-gray-800 text-indigo-300 rounded-2xl font-black text-sm uppercase tracking-widest">Log</button>

            {[1, 2, 3].map(n => (
              <button key={n} onClick={() => handleNumber(n.toString())} className="py-6 bg-gray-800 text-white hover:bg-gray-700 rounded-2xl font-black text-2xl transition-all">{n}</button>
            ))}
            <button onClick={() => handleOperator("+")} className="py-6 bg-indigo-600 text-white hover:bg-indigo-500 rounded-2xl font-black text-xl transition-all">+</button>
            <button onClick={() => handleScientific("ln")} className="hidden md:block py-6 bg-gray-800 text-indigo-300 rounded-2xl font-black text-sm uppercase tracking-widest">Ln</button>

            <button onClick={() => handleNumber("0")} className="col-span-1 py-6 bg-gray-800 text-white hover:bg-gray-700 rounded-2xl font-black text-2xl transition-all">0</button>
            <button onClick={() => handleNumber(".")} className="py-6 bg-gray-800 text-white hover:bg-gray-700 rounded-2xl font-black text-2xl transition-all">.</button>
            <button onClick={calculate} className="col-span-2 md:col-span-2 py-6 bg-emerald-600 text-white hover:bg-emerald-500 rounded-2xl font-black text-3xl shadow-lg shadow-emerald-600/20 transition-all">=</button>
            <button onClick={() => handleScientific("sqrt")} className="hidden md:block py-6 bg-gray-800 text-indigo-300 rounded-2xl font-black text-xl">√</button>
          </div>
        </div>

        {/* History Sidebar */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm flex-1">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-black text-gray-900 dark:text-white flex items-center gap-2">
                <History size={18} className="text-indigo-600" />
                History
              </h3>
              <button onClick={() => setHistory([])} className="text-gray-300 hover:text-rose-500 transition-colors">
                <Trash2 size={16} />
              </button>
            </div>
            
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              <AnimatePresence initial={false}>
                {history.length === 0 ? (
                  <p className="text-xs font-bold text-gray-300 text-center py-10 uppercase tracking-widest">No calculations yet</p>
                ) : (
                  history.map((item, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 group cursor-pointer hover:border-indigo-500/50 transition-all"
                      onClick={() => setDisplay(item.split(" = ")[1])}
                    >
                      <p className="text-[10px] font-mono text-gray-400 group-hover:text-indigo-600 transition-colors">{item.split(" = ")[0]}</p>
                      <p className="text-lg font-black text-gray-900 dark:text-white mt-1">{item.split(" = ")[1]}</p>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-indigo-600/20">
            <h4 className="font-black flex items-center gap-2 mb-4">
              <Info size={18} />
              Math Tips
            </h4>
            <p className="text-sm text-indigo-100 leading-relaxed opacity-80">
              Trigonometric functions (sin, cos, tan) currently operate in **Degrees**.
            </p>
            <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-widest">Unit Mode</span>
              <span className="px-3 py-1 bg-white/20 rounded-full text-[10px] font-black uppercase">Degrees</span>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
