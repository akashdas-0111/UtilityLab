"use client";

import React, { useState } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { Copy, RefreshCcw, User, Hash, Settings2, Sparkles, Check } from "lucide-react";

const ADJECTIVES = ["cool", "epic", "swift", "silent", "mighty", "clever", "urban", "cosmic", "stellar", "bold", "fancy", "pixel", "digital", "neon", "retro", "quantum"];
const SUFFIXES = ["expert", "ninja", "master", "hub", "lab", "central", "prime", "pro", "guru", "vibe", "flow", "zone", "nexus", "pulse", "echo", "spirit"];

export default function UsernameGenerator() {
  const [base, setBase] = useState("");
  const [useNumbers, setUseNumbers] = useState(true);
  const [useUnderscores, setUseUnderscores] = useState(false);
  const [results, setResults] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const tool = tools.find(t => t.id === "username-generator")!;

  const generateUsernames = () => {
    if (!base) return;

    const cleanBase = base.trim().toLowerCase().replace(/\s+/g, useUnderscores ? "_" : "");
    const suggestions = new Set<string>();

    while (suggestions.size < 20) {
      const type = Math.floor(Math.random() * 5);
      let name = "";

      switch (type) {
        case 0: // Adjective + Base
          name = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)] + (useUnderscores ? "_" : "") + cleanBase;
          break;
        case 1: // Base + Suffix
          name = cleanBase + (useUnderscores ? "_" : "") + SUFFIXES[Math.floor(Math.random() * SUFFIXES.length)];
          break;
        case 2: // Adjective + Base + Suffix
          name = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)] + cleanBase + SUFFIXES[Math.floor(Math.random() * SUFFIXES.length)];
          break;
        case 3: // Base + Random Word
          name = cleanBase + ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
          break;
        default: // Modified Base
          name = cleanBase + "Official";
      }

      if (useNumbers) {
        name += Math.floor(Math.random() * 99);
      }

      suggestions.add(name.toLowerCase());
    }

    setResults(Array.from(suggestions));
  };

  const handleCopy = (username: string, index: number) => {
    navigator.clipboard.writeText(username);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-8">
        {/* Settings and Input */}
        <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <User size={14} className="text-indigo-600" /> Name or Interest
            </label>
            <input
              type="text"
              placeholder="e.g. John, Gamer, Techie"
              className="w-full px-5 py-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-500 outline-none transition-all text-lg font-medium"
              value={base}
              onChange={(e) => setBase(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && generateUsernames()}
            />
          </div>

          <div className="flex flex-wrap gap-6 items-center">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className={`w-12 h-7 rounded-full transition-all relative ${useNumbers ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'}`}>
                <input 
                  type="checkbox" 
                  className="sr-only" 
                  checked={useNumbers}
                  onChange={() => setUseNumbers(!useNumbers)}
                />
                <div className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${useNumbers ? 'translate-x-5' : ''}`} />
              </div>
              <span className="text-sm font-bold text-gray-700 dark:text-gray-300 group-hover:text-indigo-600">Add Numbers</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer group">
              <div className={`w-12 h-7 rounded-full transition-all relative ${useUnderscores ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'}`}>
                <input 
                  type="checkbox" 
                  className="sr-only" 
                  checked={useUnderscores}
                  onChange={() => setUseUnderscores(!useUnderscores)}
                />
                <div className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${useUnderscores ? 'translate-x-5' : ''}`} />
              </div>
              <span className="text-sm font-bold text-gray-700 dark:text-gray-300 group-hover:text-indigo-600">Use Underscores</span>
            </label>

            <button
              onClick={generateUsernames}
              disabled={!base}
              className="ml-auto px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-600/20 flex items-center gap-3 disabled:opacity-50"
            >
              <RefreshCcw size={20} />
              Generate Usernames
            </button>
          </div>
        </div>

        {/* Results Grid */}
        {results.length > 0 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Sparkles size={24} className="text-amber-500" />
              Suggested Usernames
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {results.map((username, idx) => (
                <button
                  key={idx}
                  onClick={() => handleCopy(username, idx)}
                  className="group relative p-5 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl text-left hover:border-indigo-500 hover:shadow-lg transition-all overflow-hidden"
                >
                  <p className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                    {username}
                  </p>
                  <div className={`absolute inset-y-0 right-0 px-4 flex items-center transition-all ${copiedIndex === idx ? 'bg-emerald-500 text-white' : 'translate-x-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'}`}>
                    {copiedIndex === idx ? <Check size={16} /> : <Copy size={16} />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* SEO Content */}
        <div className="mt-16 pt-12 border-t border-gray-100 dark:border-gray-800">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">
            Find the perfect Username for every platform
          </h2>
          <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 leading-relaxed space-y-6">
            <p>
              In the vast digital world, your username is your first impression. Whether you're starting a new gaming channel, a professional portfolio, or a social media profile, our **Username Generator** is designed to help you stand out from the crowd.
            </p>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Smart Generation Modes:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Personalized Foundation:</strong> Use your real name or a core interest as the starting point for all suggestions.</li>
              <li><strong>Creative Adjectives:</strong> We mix in high-vibe adjectives (like "stellar", "neon", "retro") to give your handle a unique personality.</li>
              <li><strong>Professional Suffixes:</strong> For creators and specialists, we include professional markers like "hub", "lab", and "central".</li>
              <li><strong>Platform Compatibility:</strong> Toggle numbers and underscores to match the character rules of platforms like Instagram, Discord, or Steam.</li>
            </ul>
            <p>
              <strong>Pro Tip:</strong> Shorter usernames are generally better for brand recall, while including numbers or underscores can help you find a variation if your first choice is already taken.
            </p>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
