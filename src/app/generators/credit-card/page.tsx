"use client";

import React, { useState } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  CreditCard as CardIcon, 
  ShieldCheck, 
  Copy, 
  RefreshCw, 
  Zap,
  Info,
  Lock
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CreditCardGenerator() {
  const tool = tools.find((t) => t.id === "credit-card")!;
  const [cards, setCards] = useState<any[]>([]);

  const generate = () => {
    const newCards = Array.from({ length: 3 }, () => ({
      number: `4${Math.floor(Math.random() * 1000).toString().padStart(3, '0')} ${Math.floor(Math.random() * 10000).toString().padStart(4, '0')} ${Math.floor(Math.random() * 10000).toString().padStart(4, '0')} ${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
      expiry: `${Math.floor(Math.random() * 12 + 1).toString().padStart(2, '0')}/2${Math.floor(Math.random() * 5 + 5)}`,
      cvv: Math.floor(Math.random() * 900 + 100).toString(),
      name: "TESTING PURPOSE"
    }));
    setCards(newCards);
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-12">
        
        {/* Actions */}
        <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-10 border border-gray-100 dark:border-gray-800 shadow-xl flex flex-col items-center gap-8">
           <div className="p-6 bg-amber-50 dark:bg-amber-900/20 rounded-[2rem] border border-amber-100 dark:border-amber-800/30 flex items-start gap-4 max-w-2xl text-center">
              <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed font-bold uppercase tracking-wider">
                These numbers are for integration testing ONLY. They are not real financial accounts 
                and cannot be used for actual purchases.
              </p>
           </div>
           <button 
            onClick={generate}
            className="bg-indigo-600 text-white font-black px-12 py-5 rounded-2xl shadow-xl shadow-indigo-600/20 flex items-center gap-3 hover:scale-105 transition-transform"
           >
             <RefreshCw size={22} /> GENERATE TEST CARDS
           </button>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           <AnimatePresence>
             {cards.map((card, i) => (
               <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="relative bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[2rem] p-8 text-white shadow-2xl overflow-hidden aspect-[1.586/1]"
               >
                  <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none">
                    <CardIcon size={120} />
                  </div>
                  
                  <div className="relative z-10 h-full flex flex-col justify-between">
                     <div className="flex justify-between items-start">
                        <div className="w-12 h-10 bg-amber-400/80 rounded-lg backdrop-blur-sm shadow-inner" />
                        <span className="font-black italic text-xl tracking-tighter">VISA</span>
                     </div>
                     
                     <div className="space-y-4">
                        <p className="text-2xl font-mono tracking-[0.2em]">{card.number}</p>
                        <div className="flex gap-8">
                           <div>
                              <p className="text-[8px] font-black uppercase tracking-widest opacity-60">Expiry</p>
                              <p className="font-bold">{card.expiry}</p>
                           </div>
                           <div>
                              <p className="text-[8px] font-black uppercase tracking-widest opacity-60">CVV</p>
                              <p className="font-bold">{card.cvv}</p>
                           </div>
                        </div>
                     </div>

                     <div className="flex justify-between items-end">
                        <p className="text-sm font-black tracking-widest opacity-80">{card.name}</p>
                        <button 
                          onClick={() => navigator.clipboard.writeText(card.number)}
                          className="p-3 bg-white/20 hover:bg-white/40 rounded-xl transition-all"
                        >
                          <Copy size={16} />
                        </button>
                     </div>
                  </div>
               </motion.div>
             ))}
           </AnimatePresence>
        </div>
      </div>
    </ToolLayout>
  );
}
