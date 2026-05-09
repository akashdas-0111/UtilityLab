"use client";

import React, { useState, useMemo } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  Calculator, 
  DollarSign, 
  Calendar, 
  Percent, 
  ArrowUpRight, 
  Info,
  ChevronDown,
  ChevronUp,
  PieChart as PieIcon,
  Table as TableIcon
} from "lucide-react";
import { 
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";

export default function EMICalculator() {
  const tool = tools.find((t) => t.id === "emi-calculator")!;

  // State
  const [loanAmount, setLoanAmount] = useState<number>(1000000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [tenure, setTenure] = useState<number>(10);
  const [tenureType, setTenureType] = useState<"years" | "months">("years");
  const [showSchedule, setShowSchedule] = useState(false);

  // Calculations
  const results = useMemo(() => {
    const p = loanAmount;
    const r = interestRate / 12 / 100;
    const n = tenureType === "years" ? tenure * 12 : tenure;
    
    // EMI Formula: E = [P x R x (1+R)^N]/[(1+R)^N-1]
    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - p;

    // Monthly Schedule
    const schedule = [];
    let remainingBalance = p;
    for (let i = 1; i <= Math.min(n, 120); i++) { // Limit table to first 120 months for perf
      const interest = remainingBalance * r;
      const principal = emi - interest;
      remainingBalance -= principal;
      schedule.push({
        month: i,
        emi: Math.round(emi),
        principal: Math.round(principal),
        interest: Math.round(interest),
        balance: Math.max(0, Math.round(remainingBalance)),
      });
    }

    return {
      emi: Math.round(emi),
      totalPayment: Math.round(totalPayment),
      totalInterest: Math.round(totalInterest),
      schedule,
      n
    };
  }, [loanAmount, interestRate, tenure, tenureType]);

  const pieData = [
    { name: "Principal Loan Amount", value: loanAmount, color: "#6366f1" },
    { name: "Total Interest", value: results.totalInterest, color: "#f43f5e" },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Main Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Inputs Section */}
          <div className="space-y-8 bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg text-indigo-600">
                <Calculator size={20} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Loan Details</h3>
            </div>

            {/* Loan Amount */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-gray-600 dark:text-gray-400">Loan Amount</label>
                <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 px-3 py-1.5 rounded-xl border border-gray-100 dark:border-gray-700">
                  <span className="text-xs font-bold text-gray-400">₹</span>
                  <input 
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-28 bg-transparent outline-none text-sm font-black text-indigo-600"
                  />
                </div>
              </div>
              <input 
                type="range"
                min="100000"
                max="10000000"
                step="50000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                <span>₹1L</span>
                <span>₹1Cr</span>
              </div>
            </div>

            {/* Interest Rate */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-gray-600 dark:text-gray-400">Interest Rate (p.a)</label>
                <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 px-3 py-1.5 rounded-xl border border-gray-100 dark:border-gray-700">
                  <input 
                    type="number"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-16 bg-transparent outline-none text-sm font-black text-indigo-600 text-right"
                  />
                  <span className="text-xs font-bold text-gray-400">%</span>
                </div>
              </div>
              <input 
                type="range"
                min="1"
                max="20"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                <span>1%</span>
                <span>20%</span>
              </div>
            </div>

            {/* Tenure */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-gray-600 dark:text-gray-400">Loan Tenure</label>
                <div className="flex items-center gap-1 bg-gray-50 dark:bg-gray-800 p-1 rounded-xl border border-gray-100 dark:border-gray-700">
                  <input 
                    type="number"
                    value={tenure}
                    onChange={(e) => setTenure(Number(e.target.value))}
                    className="w-12 bg-transparent outline-none text-sm font-black text-indigo-600 text-center"
                  />
                  <div className="flex gap-1">
                    <button 
                      onClick={() => setTenureType("years")}
                      className={`px-2 py-1 text-[10px] font-bold rounded-lg transition-colors ${tenureType === "years" ? "bg-white dark:bg-gray-700 shadow-sm text-indigo-600" : "text-gray-400"}`}
                    >
                      Yr
                    </button>
                    <button 
                      onClick={() => setTenureType("months")}
                      className={`px-2 py-1 text-[10px] font-bold rounded-lg transition-colors ${tenureType === "months" ? "bg-white dark:bg-gray-700 shadow-sm text-indigo-600" : "text-gray-400"}`}
                    >
                      Mo
                    </button>
                  </div>
                </div>
              </div>
              <input 
                type="range"
                min="1"
                max={tenureType === "years" ? 30 : 360}
                step="1"
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>
          </div>

          {/* Visualization Section */}
          <div className="space-y-6 flex flex-col justify-center items-center bg-gray-50 dark:bg-gray-800/50 rounded-3xl p-8 border border-gray-100 dark:border-gray-800">
            <div className="text-center space-y-2 mb-8">
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Monthly EMI</p>
              <h2 className="text-5xl font-black text-indigo-600">{formatCurrency(results.emi)}</h2>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full max-w-sm mb-8">
              <div className="p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 text-center">
                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Total Interest</p>
                <p className="text-lg font-black text-rose-500">{formatCurrency(results.totalInterest)}</p>
              </div>
              <div className="p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 text-center">
                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Total Payment</p>
                <p className="text-lg font-black text-gray-900 dark:text-white">{formatCurrency(results.totalPayment)}</p>
              </div>
            </div>

            <div className="w-full h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => formatCurrency(value)}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Amortization Schedule */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
          <button 
            onClick={() => setShowSchedule(!showSchedule)}
            className="w-full flex items-center justify-between p-6 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg text-indigo-600">
                <TableIcon size={20} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Amortization Schedule (First 10 Years)</h3>
            </div>
            {showSchedule ? <ChevronUp /> : <ChevronDown />}
          </button>

          <AnimatePresence>
            {showSchedule && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-6 pt-0 overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-gray-100 dark:border-gray-800">
                        <th className="pb-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Month</th>
                        <th className="pb-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Principal</th>
                        <th className="pb-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Interest</th>
                        <th className="pb-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Balance</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
                      {results.schedule.map((row, idx) => (
                        <tr key={idx} className="group hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                          <td className="py-4 text-sm font-bold text-gray-900 dark:text-white">Month {row.month}</td>
                          <td className="py-4 text-sm text-gray-600 dark:text-gray-400 font-medium">{formatCurrency(row.principal)}</td>
                          <td className="py-4 text-sm text-rose-500 font-bold">{formatCurrency(row.interest)}</td>
                          <td className="py-4 text-sm font-black text-gray-900 dark:text-white">{formatCurrency(row.balance)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {results.n > 120 && (
                    <p className="mt-4 text-xs text-gray-400 italic text-center">Showing only the first 120 months for brevity.</p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Informational Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-rose-50 dark:bg-rose-900/10 rounded-3xl p-8 border border-rose-100 dark:border-rose-900/20">
            <h4 className="text-lg font-black text-rose-900 dark:text-rose-100 mb-4 flex items-center gap-2">
              <Info size={20} />
              How EMI is Calculated?
            </h4>
            <p className="text-rose-800/80 dark:text-rose-200/80 leading-relaxed text-sm">
              EMI is calculated using the formula [P x R x (1+R)^N]/[(1+R)^N-1]. 
              P is the principal amount, R is the monthly interest rate, and N is the number of months. 
              The interest is calculated on a reducing balance basis.
            </p>
          </div>
          <div className="bg-indigo-50 dark:bg-indigo-900/10 rounded-3xl p-8 border border-indigo-100 dark:border-indigo-900/20">
            <h4 className="text-lg font-black text-indigo-900 dark:text-indigo-100 mb-4 flex items-center gap-2">
              <ArrowUpRight size={20} />
              Tips to Reduce Interest
            </h4>
            <p className="text-indigo-800/80 dark:text-indigo-200/80 leading-relaxed text-sm">
              Making prepayments, choosing a shorter tenure, or opting for a lower interest rate through refinancing 
              can significantly reduce the total interest paid over the life of the loan.
            </p>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
