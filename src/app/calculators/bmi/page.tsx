"use client";

import React, { useState, useMemo } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  Activity, 
  Info,
  Scale,
  Ruler,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  Zap
} from "lucide-react";
import { motion } from "framer-motion";

type UnitSystem = "metric" | "imperial";

export default function BMICalculator() {
  const tool = tools.find((t) => t.id === "bmi-calculator")!;

  // State
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("metric");
  const [weight, setWeight] = useState<number>(70);
  const [heightCm, setHeightCm] = useState<number>(170);
  const [heightFt, setHeightFt] = useState<number>(5);
  const [heightIn, setHeightIn] = useState<number>(7);
  const [weightLbs, setWeightLbs] = useState<number>(154);

  // Calculations
  const bmi = useMemo(() => {
    let weightKg = weight;
    let heightM = heightCm / 100;

    if (unitSystem === "imperial") {
      weightKg = weightLbs * 0.453592;
      heightM = ((heightFt * 12) + heightIn) * 0.0254;
    }

    if (heightM === 0) return 0;
    return weightKg / (heightM * heightM);
  }, [unitSystem, weight, heightCm, heightFt, heightIn, weightLbs]);

  const category = useMemo(() => {
    if (bmi < 18.5) return { label: "Underweight", color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/10", border: "border-blue-100", info: "You may need to gain some weight. Consult a healthcare provider." };
    if (bmi < 25) return { label: "Normal Weight", color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-900/10", border: "border-emerald-100", info: "You have a healthy body weight. Keep it up!" };
    if (bmi < 30) return { label: "Overweight", color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-900/10", border: "border-orange-100", info: "You are slightly above the healthy range. Focus on diet and exercise." };
    return { label: "Obese", color: "text-rose-500", bg: "bg-rose-50 dark:bg-rose-900/10", border: "border-rose-100", info: "Your health may be at risk. We recommend consulting a doctor." };
  }, [bmi]);

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Inputs Section */}
          <div className="space-y-8 bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg text-indigo-600">
                  <Activity size={20} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Your Measurements</h3>
              </div>
              <div className="flex bg-gray-50 dark:bg-gray-800 p-1 rounded-xl border border-gray-100 dark:border-gray-700">
                <button 
                  onClick={() => setUnitSystem("metric")}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${unitSystem === "metric" ? "bg-white dark:bg-gray-700 shadow-sm text-indigo-600" : "text-gray-400"}`}
                >
                  Metric
                </button>
                <button 
                  onClick={() => setUnitSystem("imperial")}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${unitSystem === "imperial" ? "bg-white dark:bg-gray-700 shadow-sm text-indigo-600" : "text-gray-400"}`}
                >
                  Imperial
                </button>
              </div>
            </div>

            {/* Weight Input */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-gray-600 dark:text-gray-400 flex items-center gap-2">
                  <Scale size={16} /> Weight
                </label>
                <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 px-3 py-1.5 rounded-xl border border-gray-100 dark:border-gray-700">
                  <input 
                    type="number"
                    value={unitSystem === "metric" ? weight : weightLbs}
                    onChange={(e) => unitSystem === "metric" ? setWeight(Number(e.target.value)) : setWeightLbs(Number(e.target.value))}
                    className="w-16 bg-transparent outline-none text-sm font-black text-indigo-600 text-right"
                  />
                  <span className="text-xs font-bold text-gray-400">{unitSystem === "metric" ? "kg" : "lbs"}</span>
                </div>
              </div>
              <input 
                type="range"
                min={unitSystem === "metric" ? 20 : 50}
                max={unitSystem === "metric" ? 200 : 450}
                value={unitSystem === "metric" ? weight : weightLbs}
                onChange={(e) => unitSystem === "metric" ? setWeight(Number(e.target.value)) : setWeightLbs(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>

            {/* Height Input */}
            {unitSystem === "metric" ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-gray-600 dark:text-gray-400 flex items-center gap-2">
                    <Ruler size={16} /> Height
                  </label>
                  <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 px-3 py-1.5 rounded-xl border border-gray-100 dark:border-gray-700">
                    <input 
                      type="number"
                      value={heightCm}
                      onChange={(e) => setHeightCm(Number(e.target.value))}
                      className="w-16 bg-transparent outline-none text-sm font-black text-indigo-600 text-right"
                    />
                    <span className="text-xs font-bold text-gray-400">cm</span>
                  </div>
                </div>
                <input 
                  type="range"
                  min="50"
                  max="250"
                  value={heightCm}
                  onChange={(e) => setHeightCm(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Feet</label>
                  <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded-xl border border-gray-100 dark:border-gray-700">
                    <input 
                      type="number"
                      value={heightFt}
                      onChange={(e) => setHeightFt(Number(e.target.value))}
                      className="w-full bg-transparent outline-none text-sm font-black text-indigo-600"
                    />
                    <span className="text-xs font-bold text-gray-400">ft</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Inches</label>
                  <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded-xl border border-gray-100 dark:border-gray-700">
                    <input 
                      type="number"
                      value={heightIn}
                      onChange={(e) => setHeightIn(Number(e.target.value))}
                      className="w-full bg-transparent outline-none text-sm font-black text-indigo-600"
                    />
                    <span className="text-xs font-bold text-gray-400">in</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Result Section */}
          <div className="flex flex-col justify-center bg-gray-50 dark:bg-gray-800/50 rounded-3xl p-8 md:p-10 border border-gray-100 dark:border-gray-800 text-center space-y-6">
            <div className="space-y-2">
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Your BMI Result</p>
              <h2 className="text-7xl font-black text-gray-900 dark:text-white leading-none">
                {bmi > 0 ? bmi.toFixed(1) : "0.0"}
              </h2>
            </div>

            <motion.div 
              key={category.label}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`inline-block mx-auto px-6 py-2 rounded-2xl border ${category.bg} ${category.border} ${category.color} font-black text-lg`}
            >
              {category.label}
            </motion.div>

            {/* Gauge Placeholder / Range Bar */}
            <div className="relative pt-6">
              <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full flex overflow-hidden">
                <div className="h-full bg-blue-400 w-[18.5%]" />
                <div className="h-full bg-emerald-400 w-[25%]" />
                <div className="h-full bg-orange-400 w-[25%]" />
                <div className="h-full bg-rose-400 w-[31.5%]" />
              </div>
              <motion.div 
                animate={{ left: `${Math.min(100, (bmi / 40) * 100)}%` }}
                className="absolute top-4 w-4 h-8 bg-gray-900 dark:bg-white rounded-full border-4 border-white dark:border-gray-900 shadow-xl -ml-2"
              />
              <div className="flex justify-between mt-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                <span>Under</span>
                <span>Normal</span>
                <span>Over</span>
                <span>Obese</span>
              </div>
            </div>

            <div className="pt-4 flex items-start gap-3 text-left">
              <div className={`p-2 rounded-lg ${category.bg} ${category.color}`}>
                <Info size={18} />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed italic">
                {category.info}
              </p>
            </div>
          </div>
        </div>

        {/* Informational Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
            <h4 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-3">
              <CheckCircle2 size={18} className="text-emerald-500" />
              Healthy Range
            </h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              For most adults, a BMI between 18.5 and 24.9 is considered the healthy weight range.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
            <h4 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-3">
              <AlertCircle size={18} className="text-rose-500" />
              Limitations
            </h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              BMI doesn't measure body fat directly. It doesn't account for muscle mass, bone density, or overall body composition.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
            <h4 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-3">
              <HelpCircle size={18} className="text-indigo-500" />
              Who is it for?
            </h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              BMI is used as a screening tool for adults (20+ years). It shouldn't be used for children, athletes, or pregnant women.
            </p>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
