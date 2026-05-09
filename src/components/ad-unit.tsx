"use client";

import React from "react";

interface AdUnitProps {
  slot: string;
  className?: string;
  type?: "horizontal" | "vertical" | "rectangle";
}

export function AdUnit({ slot, className = "", type = "horizontal" }: AdUnitProps) {
  // This is a placeholder for Google AdSense
  // In production, replace with real AdSense code
  return (
    <div className={`bg-gray-900/50 border border-gray-800 rounded-2xl flex items-center justify-center overflow-hidden min-h-[100px] ${className}`}>
      <div className="text-center">
        <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-1">Advertisement</p>
        <div className="text-xs font-bold text-gray-500 italic">
          Google AdSense Slot: {slot} ({type})
        </div>
      </div>
    </div>
  );
}
