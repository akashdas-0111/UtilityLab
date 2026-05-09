"use client";

import React, { useState, useMemo } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  Home, 
  DollarSign, 
  Calendar, 
  Percent, 
  ShieldCheck, 
  Info,
  ChevronDown,
  ChevronUp,
  PieChart as PieIcon,
  BarChart as BarIcon,
  Briefcase
} from "lucide-react";
import { 
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";

export default function MortgageCalculator() {
  const tool = tools.find((t) => t.id === "mortgage-calculator")!;

  // State
  const [homePrice, setHomePrice] = useState<number>(300000);
  const [downPayment, setDownPayment] = useState<number>(60000); // 20%
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(6.5);
  const [loanTerm, setLoanTerm] = useState<number>(30);
  const [propertyTax, setPropertyTax] = useState<number>(1.2); // annual %
  const [insurance, setInsurance] = useState<number>(1200); // annual $
  const [hoa, setHoa] = useState<number>(0); // monthly $

  const [showAdvanced, setShowAdvanced] = useState(false);

  // Sync Down Payment
  const updateDownPayment = (value: number, type: 'amount' | 'percent') => {
    if (type === 'amount') {
      setDownPayment(value);
      setDownPaymentPercent(Math.round((value / homePrice) * 100));
    } else {
      setDownPaymentPercent(value);
      setDownPayment(Math.round((value / 100) * homePrice));
    }
  };

  // Calculations
  const results = useMemo(() => {
    const loanAmount = homePrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const totalMonths = loanTerm * 12;
    
    // Principal & Interest
    const pi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
    
    // Taxes & Insurance
    const monthlyTax = (homePrice * (propertyTax / 100)) / 12;
    const monthlyInsurance = insurance / 12;
    
    const totalMonthly = pi + monthlyTax + monthlyInsurance + hoa;

    // Charts
    const pieData = [
      { name: "Principal & Interest", value: pi, color: "#6366f1" },
      { name: "Property Taxes", value: monthlyTax, color: "#f59e0b" },
      { name: "Home Insurance", value: monthlyInsurance, color: "#10b981" },
      { name: "HOA Fees", value: hoa, color: "#f43f5e" },
    ].filter(d => d.value > 0);

    return {
      loanAmount,
      pi,
      monthlyTax,
      monthlyInsurance,
      totalMonthly,
      pieData,
      totalInterest: (pi * totalMonths) - loanAmount
    };
  }, [homePrice, downPayment, interestRate, loanTerm, propertyTax, insurance, hoa]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Inputs Section */}
          <div className="space-y-8 bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg text-indigo-600">
                <Home size={20} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Home Details</h3>
            </div>

            {/* Home Price */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-gray-600 dark:text-gray-400">Home Price</label>
                <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 px-3 py-1.5 rounded-xl border border-gray-100 dark:border-gray-700">
                  <span className="text-xs font-bold text-gray-400">$</span>
                  <input 
                    type="number"
                    value={homePrice}
                    onChange={(e) => setHomePrice(Number(e.target.value))}
                    className="w-24 bg-transparent outline-none text-sm font-black text-indigo-600"
                  />
                </div>
              </div>
              <input 
                type="range"
                min="50000"
                max="2000000"
                step="5000"
                value={homePrice}
                onChange={(e) => setHomePrice(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>

            {/* Down Payment */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-gray-600 dark:text-gray-400">Down Payment</label>
                <div className="flex items-center gap-2">
                   <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 px-3 py-1.5 rounded-xl border border-gray-100 dark:border-gray-700">
                    <span className="text-xs font-bold text-gray-400">$</span>
                    <input 
                      type="number"
                      value={downPayment}
                      onChange={(e) => updateDownPayment(Number(e.target.value), 'amount')}
                      className="w-24 bg-transparent outline-none text-sm font-black text-indigo-600"
                    />
                  </div>
                  <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 px-3 py-1.5 rounded-xl border border-gray-100 dark:border-gray-700">
                    <input 
                      type="number"
                      value={downPaymentPercent}
                      onChange={(e) => updateDownPayment(Number(e.target.value), 'percent')}
                      className="w-10 bg-transparent outline-none text-sm font-black text-indigo-600 text-right"
                    />
                    <span className="text-xs font-bold text-gray-400">%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Basic Grid */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Loan Term (Yrs)</label>
                <select 
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl outline-none text-sm font-bold"
                >
                  {[10, 15, 20, 30].map(yr => <option key={yr} value={yr}>{yr} Years</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Interest Rate (%)</label>
                <input 
                  type="number"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl outline-none text-sm font-bold"
                />
              </div>
            </div>

            {/* Advanced Toggle */}
            <button 
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-2 text-indigo-600 text-sm font-bold hover:underline"
            >
              {showAdvanced ? "Hide Advanced" : "Show Advanced Options (Taxes, Insurance)"}
              {showAdvanced ? <ChevronUp size={14}/> : <ChevronDown size={14}/>}
            </button>

            <AnimatePresence>
              {showAdvanced && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="space-y-6 pt-4 border-t border-gray-100 dark:border-gray-800 overflow-hidden"
                >
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Property Tax (%)</label>
                      <input 
                        type="number" step="0.01" value={propertyTax} onChange={(e) => setPropertyTax(Number(e.target.value))}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl outline-none text-sm font-bold"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Insurance ($/yr)</label>
                      <input 
                        type="number" value={insurance} onChange={(e) => setInsurance(Number(e.target.value))}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl outline-none text-sm font-bold"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">HOA Fees ($/mo)</label>
                    <input 
                      type="number" value={hoa} onChange={(e) => setHoa(Number(e.target.value))}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl outline-none text-sm font-bold"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Results Summary */}
          <div className="flex flex-col bg-indigo-600 rounded-3xl p-8 md:p-10 text-white shadow-xl shadow-indigo-600/20">
            <div className="text-center space-y-2 mb-10">
              <p className="text-xs font-bold text-indigo-200 uppercase tracking-widest">Est. Monthly Payment</p>
              <h2 className="text-6xl font-black">{formatCurrency(results.totalMonthly)}</h2>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="space-y-1 border-l-2 border-white/20 pl-4">
                <p className="text-[10px] font-bold text-indigo-100 uppercase">Loan Amount</p>
                <p className="text-xl font-black">{formatCurrency(results.loanAmount)}</p>
              </div>
              <div className="space-y-1 border-l-2 border-white/20 pl-4">
                <p className="text-[10px] font-bold text-indigo-100 uppercase">Total Interest</p>
                <p className="text-xl font-black">{formatCurrency(results.totalInterest)}</p>
              </div>
            </div>

            {/* Pie Chart */}
            <div className="flex-1 min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={results.pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {results.pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', color: '#000' }}
                    formatter={(value: number) => formatCurrency(value)}
                  />
                  <Legend verticalAlign="bottom" wrapperStyle={{ paddingTop: '20px', color: '#fff' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Informational Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800">
            <h4 className="font-bold text-indigo-600 flex items-center gap-2 mb-4">
              <Briefcase size={18} />
              P&I Payment
            </h4>
            <p className="text-sm text-gray-500 leading-relaxed">
              Principal and Interest is the base of your mortgage. Over time, more of your payment goes towards the principal as the balance decreases.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800">
            <h4 className="font-bold text-amber-500 flex items-center gap-2 mb-4">
              <Percent size={18} />
              The 28% Rule
            </h4>
            <p className="text-sm text-gray-500 leading-relaxed">
              Lenders generally prefer that your mortgage payment doesn't exceed 28% of your gross monthly income to ensure affordability.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800">
            <h4 className="font-bold text-emerald-500 flex items-center gap-2 mb-4">
              <ShieldCheck size={18} />
              PMI Insurance
            </h4>
            <p className="text-sm text-gray-500 leading-relaxed">
              If your down payment is less than 20%, you might have to pay Private Mortgage Insurance (PMI), which adds to your monthly cost.
            </p>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
