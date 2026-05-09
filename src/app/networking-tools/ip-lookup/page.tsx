"use client";

import React, { useState, useEffect } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  Globe, 
  MapPin, 
  Wifi, 
  ShieldCheck, 
  Zap, 
  Search, 
  RefreshCcw, 
  Trash2,
  Navigation,
  Info,
  Layers,
  Map as MapIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface IPData {
  ip: string;
  city: string;
  region: string;
  country_name: string;
  postal: string;
  latitude: number;
  longitude: number;
  timezone: number;
  org: string;
  asn: string;
}

export default function IPLookup() {
  const tool = tools.find((t) => t.id === "ip-lookup")!;

  // State
  const [query, setQuery] = useState("");
  const [data, setData] = useState<IPData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const performLookup = async (ip: string = "") => {
    setLoading(true);
    setError(null);
    try {
      const url = ip ? `https://ipapi.co/${ip}/json/` : "https://ipapi.co/json/";
      const res = await fetch(url);
      const json = await res.json();
      if (json.error) throw new Error(json.reason || "Invalid IP address");
      setData(json);
      if (!ip) setQuery(json.ip);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    performLookup();
  }, []);

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-10">
        
        {/* Search Bar */}
        <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-8 md:p-12 border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform text-indigo-500">
            <Globe size={120} />
          </div>

          <div className="space-y-6 relative z-10">
            <div className="flex items-center justify-between px-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <Search size={14} className="text-indigo-600" />
                IP Address or Domain
              </label>
              <button onClick={() => setQuery("")} className="text-gray-300 hover:text-rose-500 transition-colors"><Trash2 size={14}/></button>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <input 
                value={query} onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && performLookup(query)}
                className="flex-1 px-8 py-6 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-600 rounded-[2.5rem] outline-none text-2xl font-black transition-all"
                placeholder="e.g. 8.8.8.8"
              />
              <button 
                onClick={() => performLookup(query)}
                disabled={loading}
                className="px-10 py-6 bg-indigo-600 text-white rounded-[2rem] font-black uppercase tracking-widest shadow-xl shadow-indigo-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {loading ? <RefreshCcw size={20} className="animate-spin" /> : <Search size={20} />}
                {loading ? "Searching..." : "Lookup"}
              </button>
            </div>
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           
           {/* Info Cards */}
           <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
              <AnimatePresence mode="wait">
                {data && (
                  <>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-8 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[2.5rem] shadow-sm flex flex-col justify-between">
                       <MapPin size={24} className="text-rose-500 mb-4" />
                       <div>
                          <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Location</p>
                          <h4 className="text-xl font-black text-gray-900 dark:text-white">{data.city}, {data.region}</h4>
                          <p className="text-xs font-bold text-gray-400 mt-1 uppercase">{data.country_name} ({data.postal})</p>
                       </div>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="p-8 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[2.5rem] shadow-sm flex flex-col justify-between">
                       <Wifi size={24} className="text-indigo-600 mb-4" />
                       <div>
                          <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Network Provider</p>
                          <h4 className="text-xl font-black text-gray-900 dark:text-white truncate">{data.org}</h4>
                          <p className="text-xs font-bold text-gray-400 mt-1 uppercase">ASN: {data.asn}</p>
                       </div>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-8 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[2.5rem] shadow-sm flex flex-col justify-between">
                       <Navigation size={24} className="text-emerald-600 mb-4" />
                       <div>
                          <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Coordinates</p>
                          <h4 className="text-xl font-black text-gray-900 dark:text-white">{data.latitude}, {data.longitude}</h4>
                          <p className="text-xs font-bold text-gray-400 mt-1 uppercase">TZ: UTC {data.timezone}</p>
                       </div>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="p-8 bg-gray-900 rounded-[2.5rem] shadow-xl flex flex-col justify-between text-white">
                       <ShieldCheck size={24} className="text-emerald-400 mb-4" />
                       <div>
                          <p className="text-[9px] font-black text-white/50 uppercase tracking-widest mb-1">Security Status</p>
                          <h4 className="text-xl font-black">Connection Secure</h4>
                          <p className="text-xs font-bold text-emerald-400 mt-1 uppercase">Public IP Detected</p>
                       </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
           </div>

           {/* Map Preview Placeholder */}
           <div className="lg:col-span-5 bg-white dark:bg-gray-900 rounded-[3rem] border border-gray-100 dark:border-gray-800 shadow-xl overflow-hidden relative group">
              <div className="absolute inset-0 bg-indigo-50 dark:bg-indigo-900/20 flex flex-col items-center justify-center gap-4 text-indigo-600/30">
                 <MapIcon size={80} className="group-hover:scale-110 transition-transform" />
                 <span className="text-[10px] font-black uppercase tracking-widest">Visual Map Preview</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-t border-gray-100 dark:border-gray-800">
                 <div className="flex justify-between items-center">
                    <div>
                       <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">IP Address</h5>
                       <p className="text-lg font-black text-indigo-600">{data?.ip || "---"}</p>
                    </div>
                    <div className="p-3 bg-indigo-600 text-white rounded-2xl shadow-lg">
                       <Layers size={20} />
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-indigo-600/20 flex items-start gap-4">
            <div className="p-3 bg-indigo-500 rounded-2xl">
              <Zap size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black">Global Database</h4>
              <p className="text-sm text-indigo-100 opacity-80 leading-relaxed">
                Connects to worldwide IP intelligence databases to provide real-time accuracy for 
                geolocation and ASN identification.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl text-emerald-600">
              <Info size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Full Network Context</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Retrieve not just the location, but also the ISP, organization name, and 
                autonomous system number (ASN) for deep network auditing.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-amber-50 dark:bg-amber-900/30 rounded-2xl text-amber-600">
              <ShieldCheck size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-900 dark:text-white">Security Auditing</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Essential for web developers and sysadmins to verify proxy settings, VPN 
                connections, and incoming traffic sources.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
