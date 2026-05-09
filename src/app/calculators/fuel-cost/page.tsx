"use client";

import React, { useState, useMemo } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  Fuel, 
  Navigation, 
  DollarSign, 
  Zap, 
  Info,
  Car,
  TrendingUp,
  MapPin,
  Leaf,
  ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";

type UnitSystem = "imperial" | "metric";

export default function FuelCostCalculator() {
  const tool = tools.find((t) => t.id === "fuel-cost")!;

  // State
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("imperial");
  const [distance, setDistance] = useState<number>(100);
  const [efficiency, setEfficiency] = useState<number>(25); // MPG or L/100km
  const [price, setPrice] = useState<number>(3.50); // Price per gallon or liter

  // Calculations
  const results = useMemo(() => {
    let fuelNeeded = 0;
    let cost = 0;

    if (unitSystem === "imperial") {
      // distance (miles) / efficiency (mpg) = gallons
      fuelNeeded = distance / efficiency;
      cost = fuelNeeded * price;
    } else {
      // (distance (km) / 100) * efficiency (L/100km) = liters
      fuelNeeded = (distance / 100) * efficiency;
      cost = fuelNeeded * price;
    }

    return { fuelNeeded, cost };
  }, [distance, efficiency, price, unitSystem]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(val);
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Inputs Section */}
          <div className="space-y-8 bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 md:p-10 border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
              <Fuel size={120} />
            </div>

            <div className="flex bg-gray-50 dark:bg-gray-800 p-1.5 rounded-2xl border border-gray-100 dark:border-gray-700 relative z-10">
              <button 
                onClick={() => setUnitSystem("imperial")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-black text-xs transition-all ${unitSystem === "imperial" ? "bg-white dark:bg-gray-700 shadow-lg text-indigo-600" : "text-gray-400"}`}
              >
                Imperial (MPG, Miles)
              </button>
              <button 
                onClick={() => setUnitSystem("metric")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-black text-xs transition-all ${unitSystem === "metric" ? "bg-white dark:bg-gray-700 shadow-lg text-emerald-600" : "text-gray-400"}`}
              >
                Metric (L/100km, KM)
              </button>
            </div>

            <div className="space-y-6 relative z-10">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Trip Distance ({unitSystem === "imperial" ? "Miles" : "KM"})</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <MapPin size={18} />
                  </div>
                  <input type="number" value={distance} onChange={(e) => setDistance(Number(e.target.value))} className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-600 rounded-2xl outline-none text-xl font-black" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Fuel Efficiency ({unitSystem === "imperial" ? "MPG" : "L/100km"})</label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <Zap size={18} />
                    </div>
                    <input type="number" value={efficiency} onChange={(e) => setEfficiency(Number(e.target.value))} className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 rounded-2xl outline-none text-xl font-black" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Price per {unitSystem === "imperial" ? "Gal" : "L"}</label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</div>
                    <input type="number" step="0.01" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="w-full pl-8 pr-4 py-4 bg-gray-50 dark:bg-gray-800 rounded-2xl outline-none text-xl font-black" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className={`rounded-[2.5rem] p-10 text-white shadow-2xl flex flex-col justify-center items-center text-center space-y-8 transition-colors ${unitSystem === 'imperial' ? 'bg-indigo-600 shadow-indigo-600/20' : 'bg-emerald-600 shadow-emerald-600/20'}`}>
            <div>
              <p className="text-xs font-bold opacity-80 uppercase tracking-widest mb-2">Estimated Trip Cost</p>
              <h2 className="text-7xl font-black tracking-tight">{formatCurrency(results.cost)}</h2>
            </div>
            
            <div className="w-full grid grid-cols-1 gap-4 pt-8 border-t border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest opacity-80">Fuel Required</span>
                <span className="text-2xl font-black">{results.fuelNeeded.toFixed(2)} {unitSystem === 'imperial' ? 'Gals' : 'Liters'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest opacity-80">Cost per {unitSystem === 'imperial' ? 'Mile' : 'KM'}</span>
                <span className="text-xl font-black">{formatCurrency(results.cost / distance)}</span>
              </div>
            </div>

            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="px-6 py-3 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/10 flex items-center gap-3"
            >
              <Leaf size={20} className="text-emerald-300" />
              <p className="text-xs font-bold">Try to maintain steady speeds for better efficiency!</p>
            </motion.div>
          </div>
        </div>

        {/* Savings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl text-indigo-600">
              <Car size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-gray-900 dark:text-white">Efficiency Matters</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                A small difference in fuel efficiency can add up to hundreds of dollars in savings annually 
                for regular commuters. Check your car's tire pressure regularly to stay efficient.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl text-emerald-600">
              <TrendingUp size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-gray-900 dark:text-white">Price Sensitivity</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Fuel prices fluctuate based on global markets. Use this tool to see how a $0.50 price jump 
                affects your monthly commuting budget.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
