"use client";

import React, { useState, useMemo } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  Home, 
  DollarSign, 
  Briefcase, 
  Percent, 
  Info,
  ShieldCheck,
  AlertTriangle,
  PieChart as PieIcon,
  TrendingUp,
  ArrowRight
} from "lucide-react";
import { 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts";
import { motion } from "framer-motion";

export default function LoanAffordabilityCalculator() {
  const tool = tools.find((t) => t.id === "loan-affordability")!;

  // State
  const [grossIncome, setGrossIncome] = useState<number>(8000);
  const [monthlyDebts, setMonthlyDebts] = useState<number>(500);
  const [dtiLimit, setDtiLimit] = useState<number>(36);
  const [interestRate, setInterestRate] = useState<number>(7);
  const [loanTerm, setLoanTerm] = useState<number>(30); // years

  // Calculations
  const results = useMemo(() => {
    const maxMonthlyPaymentAllowed = (grossIncome * dtiLimit / 100) - monthlyDebts;
    const monthlyRate = interestRate / 100 / 12;
    const totalMonths = loanTerm * 12;

    // Loan Amount Formula: PV = PMT * [(1 - (1+r)^-n) / r]
    let maxLoanAmount = 0;
    if (maxMonthlyPaymentAllowed > 0) {
      if (monthlyRate === 0) {
        maxLoanAmount = maxMonthlyPaymentAllowed * totalMonths;
      } else {
        maxLoanAmount = maxMonthlyPaymentAllowed * ((1 - Math.pow(1 + monthlyRate, -totalMonths)) / monthlyRate);
      }
    }

    const currentDTI = (monthlyDebts / grossIncome) * 100;

    const pieData = [
      { name: "Allowable Loan Payment", value: Math.max(0, maxMonthlyPaymentAllowed), color: "#6366f1" },
      { name: "Current Debts", value: monthlyDebts, color: "#f43f5e" },
      { name: "Remaining Income", value: Math.max(0, grossIncome - (Math.max(0, maxMonthlyPaymentAllowed) + monthlyDebts)), color: "#f1f5f9" },
    ];

    return {
      maxMonthlyPaymentAllowed,
      maxLoanAmount: Math.max(0, maxLoanAmount),
      currentDTI,
      pieData
    };
  }, [grossIncome, monthlyDebts, dtiLimit, interestRate, loanTerm]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Inputs Panel */}
          <div className="lg:col-span-5 space-y-8 bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
              <Home size={120} />
            </div>

            <div className="flex items-center gap-3 mb-2 relative z-10">
              <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg text-indigo-600">
                <Briefcase size={20} />
              </div>
              <h3 className="text-xl font-black text-gray-900 dark:text-white">Financial Profile</h3>
            </div>

            <div className="space-y-6 relative z-10">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Gross Monthly Income</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</div>
                  <input type="number" value={grossIncome} onChange={(e) => setGrossIncome(Number(e.target.value))} className="w-full pl-8 pr-4 py-4 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-600 rounded-2xl outline-none text-xl font-black" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Existing Monthly Debts</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</div>
                  <input type="number" value={monthlyDebts} onChange={(e) => setMonthlyDebts(Number(e.target.value))} className="w-full pl-8 pr-4 py-4 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-600 rounded-2xl outline-none text-xl font-black" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Interest Rate (%)</label>
                  <input type="number" step="0.1" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-800 rounded-2xl outline-none text-lg font-bold" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Loan Term (Yrs)</label>
                  <input type="number" value={loanTerm} onChange={(e) => setLoanTerm(Number(e.target.value))} className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-800 rounded-2xl outline-none text-lg font-bold" />
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Target DTI Ratio</label>
                  <span className="text-sm font-black text-indigo-600">{dtiLimit}%</span>
                </div>
                <input type="range" min="20" max="50" value={dtiLimit} onChange={(e) => setDtiLimit(Number(e.target.value))} className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
                <div className="flex justify-between text-[10px] font-bold text-gray-400">
                  <span>Conservative (28%)</span>
                  <span>Aggressive (45%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-indigo-600 rounded-[3rem] p-10 text-white shadow-2xl shadow-indigo-600/20 text-center relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                <TrendingUp size={120} />
              </div>
              
              <p className="text-xs font-bold text-indigo-200 uppercase tracking-widest mb-4">Max Loan Amount Estimate</p>
              <h2 className="text-7xl font-black mb-12">{formatCurrency(results.maxLoanAmount)}</h2>
              
              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10 relative z-10">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-indigo-200 uppercase tracking-widest">Max Monthly P&I</p>
                  <p className="text-2xl font-black">{formatCurrency(results.maxMonthlyPaymentAllowed)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-indigo-200 uppercase tracking-widest">Current DTI</p>
                  <p className="text-2xl font-black">{results.currentDTI.toFixed(1)}%</p>
                </div>
              </div>
            </div>

            {/* Income Allocation Chart */}
            <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col md:flex-row items-center gap-10">
              <div className="w-full md:w-1/2 h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={results.pieData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                      {results.pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-full md:w-1/2 space-y-4">
                <h4 className="font-black text-gray-900 dark:text-white uppercase tracking-widest text-xs flex items-center gap-2">
                  <PieIcon size={16} className="text-indigo-600" />
                  Monthly Income Allocation
                </h4>
                <div className="space-y-3">
                  {results.pieData.map(item => (
                    <div key={item.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-xs font-bold text-gray-500">{item.name}</span>
                      </div>
                      <span className="text-xs font-black text-gray-900 dark:text-white">{formatCurrency(item.value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Advisory Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-amber-50 dark:bg-amber-900/10 rounded-3xl p-8 border border-amber-100 dark:border-amber-900/20 flex items-start gap-4">
            <div className="p-3 bg-amber-500 text-white rounded-2xl">
              <AlertTriangle size={24} />
            </div>
            <div>
              <h4 className="font-black text-amber-900 dark:text-amber-100 mb-1">DTI Guidelines</h4>
              <p className="text-sm text-amber-800/70 dark:text-amber-200/70 leading-relaxed">
                Lenders generally prefer a total Debt-to-Income (DTI) ratio of 36% or less. Going up to 45% or 50% 
                may be possible with some loan programs but increases your financial risk.
              </p>
            </div>
          </div>
          <div className="bg-indigo-50 dark:bg-indigo-900/10 rounded-3xl p-8 border border-indigo-100 dark:border-indigo-900/20 flex items-start gap-4">
            <div className="p-3 bg-indigo-500 text-white rounded-2xl">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 className="font-black text-indigo-900 dark:text-indigo-100 mb-1">Mortgage vs Auto</h4>
              <p className="text-sm text-indigo-800/70 dark:text-indigo-200/70 leading-relaxed">
                This calculation works for any installment loan. Keep in mind that for mortgages, 
                you'll also need to account for taxes, insurance, and maintenance costs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
