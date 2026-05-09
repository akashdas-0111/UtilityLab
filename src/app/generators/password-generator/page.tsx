"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { Copy, RefreshCcw, ShieldCheck, ShieldAlert, Lock, Settings2 } from "lucide-react";

export default function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [strength, setStrength] = useState({ score: 0, label: "Very Weak", color: "bg-red-500" });

  const tool = tools.find(t => t.id === "password-generator")!;

  const generatePassword = useCallback(() => {
    let charset = "";
    if (includeLower) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeUpper) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    if (!charset) {
      setPassword("");
      return;
    }

    let generated = "";
    for (let i = 0; i < length; i++) {
      generated += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(generated);
  }, [length, includeUpper, includeLower, includeNumbers, includeSymbols]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  useEffect(() => {
    let score = 0;
    if (password.length > 8) score += 1;
    if (password.length > 12) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    const config = [
      { label: "Very Weak", color: "bg-red-500" },
      { label: "Weak", color: "bg-orange-500" },
      { label: "Medium", color: "bg-yellow-500" },
      { label: "Strong", color: "bg-emerald-500" },
      { label: "Very Strong", color: "bg-indigo-600" },
    ];

    setStrength({ score, ...config[Math.min(score, 4)] });
  }, [password]);

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-8">
        {/* Output Display */}
        <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-xl shadow-gray-200/50 dark:shadow-none relative group overflow-hidden">
          <div className="flex flex-col md:row gap-6 items-center justify-between relative z-10">
            <div className="w-full text-center md:text-left overflow-x-auto whitespace-nowrap scrollbar-hide">
              <span className="text-3xl md:text-4xl font-mono font-bold text-gray-900 dark:text-white tracking-wider">
                {password || <span className="text-gray-200 dark:text-gray-800">Select Options</span>}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={handleCopy}
                disabled={!password}
                className="p-4 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-2xl hover:bg-indigo-600 hover:text-white transition-all disabled:opacity-50"
                title="Copy Password"
              >
                <Copy size={24} />
              </button>
              <button 
                onClick={generatePassword}
                className="p-4 bg-gray-50 dark:bg-gray-800 text-gray-500 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                title="Generate New"
              >
                <RefreshCcw size={24} />
              </button>
            </div>
          </div>

          {/* Strength Indicator */}
          <div className="mt-8 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest">
              <span className="text-gray-400">Password Strength</span>
              <span className={strength.color.replace("bg-", "text-")}>{strength.label}</span>
            </div>
            <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i} 
                  className={`h-full flex-grow transition-all duration-500 ${i < strength.score ? strength.color : "bg-transparent"}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <Settings2 size={18} className="text-indigo-600" />
              <h3 className="font-bold text-gray-900 dark:text-white">Length: {length}</h3>
            </div>
            <input 
              type="range" 
              min="8" 
              max="64" 
              value={length} 
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="flex justify-between text-xs text-gray-400 font-mono">
              <span>8</span>
              <span>32</span>
              <span>64</span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 grid grid-cols-2 gap-4">
            {[
              { label: "Uppercase", state: includeUpper, setter: setIncludeUpper },
              { label: "Lowercase", state: includeLower, setter: setIncludeLower },
              { label: "Numbers", state: includeNumbers, setter: setIncludeNumbers },
              { label: "Symbols", state: includeSymbols, setter: setIncludeSymbols },
            ].map((opt) => (
              <label key={opt.label} className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-10 h-6 rounded-full transition-all relative ${opt.state ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'}`}>
                  <input type="checkbox" className="sr-only" checked={opt.state} onChange={() => opt.setter(!opt.state)} />
                  <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${opt.state ? 'translate-x-4' : ''}`} />
                </div>
                <span className="text-sm font-bold text-gray-700 dark:text-gray-300 group-hover:text-indigo-600">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-16 pt-12 border-t border-gray-100 dark:border-gray-800">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">
            Generate Military-Grade Secure Passwords
          </h2>
          <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 leading-relaxed space-y-6">
            <p>
              In an era of increasing cyber threats, using a unique and complex password for every account is your first line of defense. Our **Password Generator** uses cryptographically secure randomization to create strings that are virtually impossible to crack with modern brute-force techniques.
            </p>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Why Use a Generator?</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Zero Bias:</strong> Human-created passwords often follow predictable patterns (birthdays, names, common words). Our generator has zero bias, ensuring true randomness.</li>
              <li><strong>High Entropy:</strong> By mixing uppercase, lowercase, numbers, and special symbols, we maximize the complexity of each string.</li>
              <li><strong>Privacy Centric:</strong> Your generated passwords never leave your device. All calculations are done locally in your browser, so even we can't see them.</li>
            </ul>
            <p>
              <strong>Security Recommendation:</strong> We recommend a minimum length of 16 characters including at least one symbol and number for all sensitive accounts (Banking, Email, Social Media). Use a password manager to store these complex strings securely.
            </p>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
