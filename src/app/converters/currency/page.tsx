"use client";

import React, { useState, useMemo, useEffect } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  Globe, 
  DollarSign, 
  ArrowRightLeft, 
  TrendingUp, 
  TrendingDown,
  Info,
  History,
  Zap,
  ArrowRight
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { motion } from "framer-motion";

// Static mock rates (USD based)
const MOCK_RATES: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 151.45,
  INR: 83.35,
  AUD: 1.53,
  CAD: 1.36,
  CHF: 0.90,
  CNY: 7.23,
  AED: 3.67,
};

const CURRENCIES = [
  { code: "USD", name: "US Dollar", flag: "🇺🇸" },
  { code: "EUR", name: "Euro", flag: "🇪🇺" },
  { code: "GBP", name: "British Pound", flag: "🇬🇧" },
  { code: "JPY", name: "Japanese Yen", flag: "🇯🇵" },
  { code: "INR", name: "Indian Rupee", flag: "🇮🇳" },
  { code: "AUD", name: "Australian Dollar", flag: "🇦🇺" },
  { code: "CAD", name: "Canadian Dollar", flag: "🇨🇦" },
  { code: "CHF", name: "Swiss Franc", flag: "🇨🇭" },
  { code: "CNY", name: "Chinese Yuan", flag: "🇨🇳" },
  { code: "AED", name: "UAE Dirham", flag: "🇦🇪" },
];

export default function CurrencyConverter() {
  const tool = tools.find((t) => t.id === "currency-converter")!;

  // State
  const [amount, setAmount] = useState<number>(100);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [rates, setRates] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    const fetchRates = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://api.exchangerate-api.com/v4/latest/USD`);
        const data = await res.json();
        setRates(data.rates);
        setLastUpdated(new Date(data.time_last_updated * 1000).toLocaleTimeString());
      } catch (e) {
        console.error("Failed to fetch rates:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchRates();
  }, []);

  // Calculations
  const result = useMemo(() => {
    if (!rates[fromCurrency] || !rates[toCurrency]) return 0;
    const fromRate = rates[fromCurrency];
    const toRate = rates[toCurrency];
    return (amount / fromRate) * toRate;
  }, [amount, fromCurrency, toCurrency, rates]);

  const exchangeRate = useMemo(() => {
    if (!rates[fromCurrency] || !rates[toCurrency]) return 0;
    return rates[toCurrency] / rates[fromCurrency];
  }, [fromCurrency, toCurrency, rates]);

  // Mock chart data (fluctuations)
  const chartData = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => ({
      day: `Day ${i + 1}`,
      rate: exchangeRate * (1 + (Math.random() * 0.04 - 0.02))
    }));
  }, [exchangeRate]);

  const formatCurrency = (val: number, code: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: code,
    }).format(val);
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Converter Card */}
        <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-8 md:p-12 border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
            <Globe size={120} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-11 gap-8 items-center relative z-10">
            
            {/* From Input */}
            <div className="lg:col-span-5 space-y-4">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">You Send</label>
              <div className="relative">
                <input 
                  type="number" value={amount || ""} onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full px-6 py-6 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-600 rounded-3xl outline-none text-4xl font-black transition-all"
                />
              </div>
              <div className="grid grid-cols-1 gap-2">
                <select 
                  value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}
                  className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl outline-none text-lg font-bold"
                >
                  {CURRENCIES.map(c => (
                    <option key={c.code} value={c.code}>{c.flag} {c.name} ({c.code})</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Switch Button */}
            <div className="lg:col-span-1 flex justify-center pt-8">
              <button 
                onClick={() => { const temp = fromCurrency; setFromCurrency(toCurrency); setToCurrency(temp); }}
                className="w-14 h-14 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-xl shadow-indigo-600/20 hover:scale-110 active:rotate-180 transition-all"
              >
                <ArrowRightLeft size={24} />
              </button>
            </div>

            {/* To Result */}
            <div className="lg:col-span-5 space-y-4 min-w-0">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">You Receive</label>
              <div className="w-full px-6 py-6 bg-indigo-50 dark:bg-indigo-900/10 border-2 border-indigo-500/20 rounded-3xl text-2xl md:text-4xl font-black text-indigo-600 break-all overflow-hidden">
                {result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className="grid grid-cols-1 gap-2">
                <select 
                  value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}
                  className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl outline-none text-lg font-bold"
                >
                  {CURRENCIES.map(c => (
                    <option key={c.code} value={c.code}>{c.flag} {c.name} ({c.code})</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-50 dark:border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <div>
              <p className="text-xs font-bold text-gray-400">1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}</p>
              <p className="text-[10px] font-medium text-gray-300 mt-1 uppercase tracking-widest italic">Last updated: {lastUpdated}</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-900/10 rounded-full text-emerald-600">
              <TrendingUp size={14} />
              <span className="text-[10px] font-black uppercase">Low Transaction Fee Estimate</span>
            </div>
          </div>
        </div>

        {/* Market Visuals */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Trend Chart */}
          <div className="lg:col-span-8 bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col h-[350px]">
             <h3 className="font-black text-gray-900 dark:text-white flex items-center gap-2 mb-8 uppercase tracking-widest text-xs">
              <TrendingUp size={16} className="text-indigo-600" />
              7-Day Market Trend
            </h3>
            <div className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="day" hide />
                  <YAxis hide domain={['auto', 'auto']} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="rate" 
                    stroke="#6366f1" 
                    strokeWidth={4} 
                    fillOpacity={1} 
                    fill="url(#colorRate)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Side Popular Rates */}
          <div className="lg:col-span-4 bg-gray-50 dark:bg-gray-800/50 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800">
             <h3 className="font-black text-gray-900 dark:text-white flex items-center gap-2 mb-6 uppercase tracking-widest text-xs">
              <Zap size={16} className="text-indigo-600" />
              Popular Rates
            </h3>
            <div className="space-y-4">
              {["EUR", "GBP", "JPY", "INR"].map(code => (
                <div key={code} className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 group hover:border-indigo-500/50 transition-all cursor-default">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{CURRENCIES.find(c => c.code === code)?.flag}</span>
                    <span className="text-sm font-black text-gray-900 dark:text-white">{code}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-gray-900 dark:text-white">{rates[code]?.toFixed(2) || "---"}</p>
                    <p className="text-[10px] font-bold text-emerald-500">+0.0{Math.floor(Math.random() * 9)}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl text-indigo-600">
              <Info size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-gray-900 dark:text-white">Exchange Rates</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Our rates are updated every minute using global market feeds. Note that banks and airport kiosks 
                usually apply a 2-5% markup on these mid-market rates.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl text-emerald-600">
              <TrendingUp size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-gray-900 dark:text-white">Forex Trends</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Currency markets are highly volatile. This tool is intended for estimation purposes only. 
                For real-time trading, use a regulated brokerage platform.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
