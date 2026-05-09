"use client";

import React, { useState, useMemo } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  Palmtree, 
  DollarSign, 
  Calendar, 
  TrendingUp, 
  TrendingDown,
  Info,
  ChevronDown,
  ChevronUp,
  Target,
  Zap,
  Briefcase,
  Heart
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";

export default function RetirementPlanner() {
  const tool = tools.find((t) => t.id === "retirement-planner")!;

  // State
  const [currentAge, setCurrentAge] = useState<number>(30);
  const [retirementAge, setRetirementAge] = useState<number>(60);
  const [lifeExpectancy, setLifeExpectancy] = useState<number>(85);
  const [currentSavings, setCurrentSavings] = useState<number>(50000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(1000);
  const [desiredMonthlyIncome, setDesiredMonthlyIncome] = useState<number>(5000);
  const [inflationRate, setInflationRate] = useState<number>(3);
  const [preReturnRate, setPreReturnRate] = useState<number>(10);
  const [postReturnRate, setPostReturnRate] = useState<number>(6);

  const [showAdvanced, setShowAdvanced] = useState(false);

  // Calculations
  const results = useMemo(() => {
    const yearsToRetirement = retirementAge - currentAge;
    const yearsInRetirement = lifeExpectancy - retirementAge;
    
    // Inflation adjusted income needed at start of retirement
    const incomeNeededAtRetirement = desiredMonthlyIncome * Math.pow(1 + inflationRate / 100, yearsToRetirement);
    
    // Corpus needed (using PV of Annuity Due)
    const rPost = (postReturnRate - inflationRate) / 100 / 12;
    const nPost = yearsInRetirement * 12;
    const corpusNeeded = incomeNeededAtRetirement * ((1 - Math.pow(1 + rPost, -nPost)) / rPost) * (1 + rPost);

    // Projected Corpus
    const rPre = preReturnRate / 100 / 12;
    const nPre = yearsToRetirement * 12;
    const projectedFromSavings = currentSavings * Math.pow(1 + rPre, nPre);
    const projectedFromContributions = monthlyContribution * ((Math.pow(1 + rPre, nPre) - 1) / rPre) * (1 + rPre);
    const projectedCorpus = projectedFromSavings + projectedFromContributions;

    // Chart Data
    const chartData = [];
    let currentBalance = currentSavings;
    for (let age = currentAge; age <= lifeExpectancy; age++) {
      if (age < retirementAge) {
        // Accumulation Phase (Yearly approximation)
        for (let m = 1; m <= 12; m++) {
          currentBalance += monthlyContribution;
          currentBalance *= (1 + rPre);
        }
      } else if (age >= retirementAge) {
        // Withdrawal Phase
        const annualWithdrawal = incomeNeededAtRetirement * 12 * Math.pow(1 + inflationRate / 100, age - retirementAge);
        const monthlyWithdrawal = annualWithdrawal / 12;
        for (let m = 1; m <= 12; m++) {
          currentBalance -= monthlyWithdrawal;
          currentBalance *= (1 + postReturnRate / 100 / 12);
        }
      }
      chartData.push({
        age: age,
        balance: Math.max(0, Math.round(currentBalance)),
        type: age < retirementAge ? 'Accumulation' : 'Retirement'
      });
    }

    return {
      corpusNeeded,
      projectedCorpus,
      incomeNeededAtRetirement,
      onTrack: projectedCorpus >= corpusNeeded,
      chartData,
      shortfall: Math.max(0, corpusNeeded - projectedCorpus)
    };
  }, [currentAge, retirementAge, lifeExpectancy, currentSavings, monthlyContribution, desiredMonthlyIncome, inflationRate, preReturnRate, postReturnRate]);

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
        
        {/* Main Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Inputs Panel */}
          <div className="lg:col-span-5 space-y-8 bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg text-indigo-600">
                <Briefcase size={20} />
              </div>
              <h3 className="text-xl font-black text-gray-900 dark:text-white">Profile & Savings</h3>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Current Age</label>
                <input type="number" value={currentAge} onChange={(e) => setCurrentAge(Number(e.target.value))} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl outline-none text-sm font-bold" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Retire Age</label>
                <input type="number" value={retirementAge} onChange={(e) => setRetirementAge(Number(e.target.value))} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl outline-none text-sm font-bold" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Current Savings</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</div>
                <input type="number" value={currentSavings} onChange={(e) => setCurrentSavings(Number(e.target.value))} className="w-full pl-8 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl outline-none text-sm font-bold" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Monthly Contribution</label>
                <span className="text-sm font-black text-indigo-600">{formatCurrency(monthlyContribution)}</span>
              </div>
              <input type="range" min="0" max="20000" step="100" value={monthlyContribution} onChange={(e) => setMonthlyContribution(Number(e.target.value))} className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Desired Retirement Income (Today's $)</label>
                <span className="text-sm font-black text-indigo-600">{formatCurrency(desiredMonthlyIncome)}</span>
              </div>
              <input type="range" min="1000" max="50000" step="500" value={desiredMonthlyIncome} onChange={(e) => setDesiredMonthlyIncome(Number(e.target.value))} className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
            </div>

            <button 
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-2 text-indigo-600 text-xs font-black uppercase tracking-widest hover:underline"
            >
              Advanced Assumptions
              {showAdvanced ? <ChevronUp size={14}/> : <ChevronDown size={14}/>}
            </button>

            <AnimatePresence>
              {showAdvanced && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="space-y-6 pt-6 border-t border-gray-100 dark:border-gray-800 overflow-hidden"
                >
                   <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Life Expectancy</label>
                      <input type="number" value={lifeExpectancy} onChange={(e) => setLifeExpectancy(Number(e.target.value))} className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl outline-none text-sm font-bold" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Inflation (%)</label>
                      <input type="number" step="0.1" value={inflationRate} onChange={(e) => setInflationRate(Number(e.target.value))} className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl outline-none text-sm font-bold" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Pre-Retire Return (%)</label>
                      <input type="number" step="0.1" value={preReturnRate} onChange={(e) => setPreReturnRate(Number(e.target.value))} className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl outline-none text-sm font-bold" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Post-Retire Return (%)</label>
                      <input type="number" step="0.1" value={postReturnRate} onChange={(e) => setPostReturnRate(Number(e.target.value))} className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl outline-none text-sm font-bold" />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Results Visuals Panel */}
          <div className="lg:col-span-7 space-y-8">
            {/* Summary Cards */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`p-8 rounded-[2.5rem] text-white shadow-xl min-w-0 ${results.onTrack ? 'bg-emerald-600 shadow-emerald-600/20' : 'bg-rose-500 shadow-rose-500/20'}`}>
                 <p className="text-xs font-black uppercase tracking-widest opacity-80 mb-2">
                   {results.onTrack ? 'Target Reached!' : 'Corpus Shortfall'}
                 </p>
                 <h4 className="text-2xl md:text-4xl font-black break-all">{results.onTrack ? 'On Track' : formatCurrency(results.shortfall)}</h4>
                 <p className="text-xs mt-4 opacity-70 font-medium">
                   {results.onTrack 
                     ? 'Your projected savings exceed your needs.' 
                     : 'Increase contributions or retire later.'}
                 </p>
               </div>
               <div className="p-8 rounded-[2.5rem] bg-indigo-600 text-white shadow-xl shadow-indigo-600/20 min-w-0">
                 <p className="text-xs font-black uppercase tracking-widest opacity-80 mb-2 text-indigo-100">Projected Corpus</p>
                 <h4 className="text-2xl md:text-4xl font-black break-all">{formatCurrency(results.projectedCorpus)}</h4>
                 <p className="text-xs mt-4 opacity-70 font-medium text-indigo-100">
                   Target: {formatCurrency(results.corpusNeeded)}
                 </p>
               </div>
             </div>

            {/* Projection Chart */}
            <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col h-[400px]">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-black text-gray-900 dark:text-white flex items-center gap-2">
                  <TrendingUp size={20} className="text-indigo-600" />
                  Wealth & Withdrawal Timeline
                </h3>
              </div>
              <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={results.chartData}>
                    <defs>
                      <linearGradient id="colorAcc" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorRet" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="age" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 700 }} dy={10} />
                    <YAxis hide />
                    <Tooltip 
                      contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                      formatter={(value: number) => formatCurrency(value)}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="balance" 
                      stroke="#6366f1" 
                      strokeWidth={4} 
                      fillOpacity={1} 
                      fill="url(#colorAcc)" 
                      name="Portfolio Balance"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 flex justify-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-indigo-600 rounded-full" />
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Accumulation Phase</span>
                </div>
                <div className="flex items-center gap-2 text-indigo-600">
                  <div className="w-3 h-3 bg-indigo-600 opacity-30 rounded-full" />
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Withdrawal Phase</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
            <h4 className="font-bold text-amber-500 flex items-center gap-2 mb-4">
              <Zap size={18} />
              The 4% Rule
            </h4>
            <p className="text-sm text-gray-500 leading-relaxed">
              A common rule of thumb for withdrawal. If you withdraw 4% of your starting corpus annually (adjusted for inflation), 
              your money is likely to last 30+ years.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
            <h4 className="font-bold text-indigo-600 flex items-center gap-2 mb-4">
              <Target size={18} />
              Inflation Impact
            </h4>
            <p className="text-sm text-gray-500 leading-relaxed">
              In 30 years, $5,000 will only buy what about $2,000 buys today. Our planner accounts for this by 
              calculating your "Required Income" in future dollars.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
            <h4 className="font-bold text-rose-500 flex items-center gap-2 mb-4">
              <Heart size={18} />
              Life Expectancy
            </h4>
            <p className="text-sm text-gray-500 leading-relaxed">
              Planning for a long life (85-90+) is safer than assuming a shorter one. It's better to have 
              surplus wealth than to run out of money in your later years.
            </p>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
