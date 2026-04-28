import React from "react";

interface AdUnitProps {
  slot?: string;
  className?: string;
  type?: "horizontal" | "vertical" | "rectangle";
}

export function AdUnit({ slot, className = "", type = "rectangle" }: AdUnitProps) {
  const styles = {
    horizontal: "h-[90px] w-full",
    vertical: "h-[600px] w-[300px]",
    rectangle: "h-[250px] w-full",
  };

  return (
    <div 
      className={`bg-gray-100 dark:bg-gray-800/50 border border-dashed border-gray-300 dark:border-gray-700 rounded-xl flex flex-col items-center justify-center text-gray-400 dark:text-gray-600 overflow-hidden ${styles[type]} ${className}`}
    >
      <span className="text-[10px] font-bold uppercase tracking-widest mb-1 opacity-50">Advertisement</span>
      <div className="text-xs italic">Ad Slot: {slot || "General"}</div>
      <div className="mt-2 text-[8px] opacity-30">Google AdSense Placeholder</div>
    </div>
  );
}
