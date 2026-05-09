"use client";

import React, { useState, useEffect } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  Thermometer, 
  ArrowRightLeft, 
  Copy, 
  Info,
  Zap,
  Trash2,
  Wind,
  Sun,
  Snowflake,
  CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function TemperatureConverter() {
  const tool = tools.find((t) => t.id === "temperature-conv")!;

  // State
  const [celsius, setCelsius] = useState<string>("25");
  const [fahrenheit, setFahrenheit] = useState<string>("77");
  const [kelvin, setKelvin] = useState<string>("298.15");

  // Sync Logic
  const syncFromCelsius = (val: string) => {
    setCelsius(val);
    const c = parseFloat(val);
    if (isNaN(c)) {
      setFahrenheit(""); setKelvin("");
    } else {
      setFahrenheit((c * 9/5 + 32).toFixed(2));
      setKelvin((c + 273.15).toFixed(2));
    }
  };

  const syncFromFahrenheit = (val: string) => {
    setFahrenheit(val);
    const f = parseFloat(val);
    if (isNaN(f)) {
      setCelsius(""); setKelvin("");
    } else {
      const c = (f - 32) * 5/9;
      setCelsius(c.toFixed(2));
      setKelvin((c + 273.15).toFixed(2));
    }
  };

  const syncFromKelvin = (val: string) => {
    setKelvin(val);
    const k = parseFloat(val);
    if (isNaN(k)) {
      setCelsius(""); setFahrenheit("");
    } else {
      const c = k - 273.15;
      setCelsius(c.toFixed(2));
      setFahrenheit((c * 9/5 + 32).toFixed(2));
    }
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Main Interface */}
        <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-8 md:p-12 border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform text-rose-500">
            <Thermometer size={120} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            
            {/* Celsius */}
            <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Celsius (°C)</label>
                <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-blue-600">
                  <Snowflake size={14} />
                </div>
              </div>
              <input 
                type="number" value={celsius} onChange={(e) => syncFromCelsius(e.target.value)}
                className="w-full px-6 py-6 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-blue-500 rounded-3xl outline-none text-3xl font-black transition-all"
              />
            </div>

            {/* Fahrenheit */}
            <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Fahrenheit (°F)</label>
                <div className="p-2 bg-orange-50 dark:bg-orange-900/30 rounded-lg text-orange-600">
                  <Sun size={14} />
                </div>
              </div>
              <input 
                type="number" value={fahrenheit} onChange={(e) => syncFromFahrenheit(e.target.value)}
                className="w-full px-6 py-6 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-orange-500 rounded-3xl outline-none text-3xl font-black transition-all"
              />
            </div>

            {/* Kelvin */}
            <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Kelvin (K)</label>
                <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg text-indigo-600">
                  <Wind size={14} />
                </div>
              </div>
              <input 
                type="number" value={kelvin} onChange={(e) => syncFromKelvin(e.target.value)}
                className="w-full px-6 py-6 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-600 rounded-3xl outline-none text-3xl font-black transition-all"
              />
            </div>
          </div>
        </div>

        {/* Quick Reference Table */}
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-[2.5rem] p-8 md:p-10 border border-gray-100 dark:border-gray-800">
           <h3 className="font-black text-gray-900 dark:text-white flex items-center gap-2 mb-8 uppercase tracking-widest text-xs">
            <Info size={16} className="text-indigo-600" />
            Standard Reference Points
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Absolute Zero</p>
                <p className="text-xl font-black text-indigo-600">0 K</p>
              </div>
              <div className="text-right text-xs font-bold text-gray-500">
                -273.15 °C<br/>-459.67 °F
              </div>
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Freezing Point</p>
                <p className="text-xl font-black text-blue-600">0 °C</p>
              </div>
              <div className="text-right text-xs font-bold text-gray-500">
                32 °F<br/>273.15 K
              </div>
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Boiling Point</p>
                <p className="text-xl font-black text-orange-600">100 °C</p>
              </div>
              <div className="text-right text-xs font-bold text-gray-500">
                212 °F<br/>373.15 K
              </div>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-indigo-50 dark:bg-indigo-900/10 rounded-3xl p-8 border border-indigo-100 dark:border-indigo-900/20 flex items-start gap-4">
            <div className="p-3 bg-indigo-500 text-white rounded-2xl">
              <Zap size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-indigo-900 dark:text-indigo-100">Why 3 Scales?</h4>
              <p className="text-sm text-indigo-800/70 dark:text-indigo-200/70 leading-relaxed">
                Celsius is for everyday use, Fahrenheit is common in the US, and Kelvin is the 
                primary unit for thermodynamic temperature in scientific research.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl text-emerald-600">
              <CheckCircle2 size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Precision Control</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Our tool provides results rounded to 2 decimal places, perfect for both household 
                cooking and academic physics experiments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
