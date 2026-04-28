"use client";

import React, { useState } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { Copy, Hash, RefreshCcw, MapPin, Globe, Users, PlayCircle, Camera, Video, Share2 } from "lucide-react";

type Platform = "Instagram" | "TikTok" | "Twitter" | "LinkedIn" | "YouTube";

const PLATFORM_CONFIG = {
  Instagram: { count: 28, icon: Camera },
  TikTok: { count: 8, icon: PlayCircle },
  Twitter: { count: 3, icon: Globe },
  LinkedIn: { count: 4, icon: Share2 },
  YouTube: { count: 6, icon: Video },
};

const MODIFIERS = {
  Trending: ["viral", "trending", "explorepage", "fyp", "reels", "shorts", "explore", "popular"],
  Medium: ["community", "tips", "tricks", "hacks", "guide", "tutorial", "lifestyle", "daily"],
  Niche: ["experts", "pro", "mastery", "learning", "innovation", "specialist", "creative", "studio"],
};

export default function HashtagGenerator() {
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState<Platform>("Instagram");
  const [audience, setAudience] = useState("Professionals");
  const [contentType, setContentType] = useState("Educational");
  const [location, setLocation] = useState("");
  const [results, setResults] = useState<{ category: string; tags: string[] }[]>([]);

  const tool = tools.find(t => t.id === "hashtag-generator")!;

  const generateHashtags = () => {
    if (!topic) return;

    const cleanTopic = topic.trim().toLowerCase().replace(/\s+/g, "");
    const totalCount = PLATFORM_CONFIG[platform].count;
    
    // Distribution: 30% Trending, 40% Medium, 30% Niche
    const trendingCount = Math.max(1, Math.floor(totalCount * 0.3));
    const mediumCount = Math.max(1, Math.floor(totalCount * 0.4));
    const nicheCount = totalCount - trendingCount - mediumCount;

    const generateGroup = (mods: string[], count: number) => {
      const groupTags = new Set<string>();
      while (groupTags.size < count) {
        const mod = mods[Math.floor(Math.random() * mods.length)];
        const loc = location ? location.trim().toLowerCase().replace(/\s+/g, "") : "";
        
        const patterns = [
          `#${cleanTopic}${mod}`,
          `#${mod}${cleanTopic}`,
          `#${cleanTopic}`,
          loc ? `#${cleanTopic}${loc}` : `#${cleanTopic}life`,
          `#${cleanTopic}${platform.toLowerCase()}`,
        ];
        
        groupTags.add(patterns[Math.floor(Math.random() * patterns.length)]);
      }
      return Array.from(groupTags);
    };

    setResults([
      { category: "Trending (High Popularity)", tags: generateGroup(MODIFIERS.Trending, trendingCount) },
      { category: "Medium Competition", tags: generateGroup(MODIFIERS.Medium, mediumCount) },
      { category: "Niche (Low Competition)", tags: generateGroup(MODIFIERS.Niche, nicheCount) },
    ]);
  };

  const handleCopy = (tags: string[]) => {
    navigator.clipboard.writeText(tags.join(" "));
  };

  const handleCopyAll = () => {
    const allTags = results.flatMap(r => r.tags).join(" ");
    navigator.clipboard.writeText(allTags);
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-8">
        {/* Input Form */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <Hash size={14} className="text-indigo-600" /> Topic / Keyword
              </label>
              <input
                type="text"
                placeholder="e.g. Digital Marketing, Cooking, Tech"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <Share2 size={14} className="text-indigo-600" /> Platform
              </label>
              <select
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-bold"
                value={platform}
                onChange={(e) => setPlatform(e.target.value as Platform)}
              >
                {Object.keys(PLATFORM_CONFIG).map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                <Users size={14} /> Audience
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                <PlayCircle size={14} /> Content Type
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                value={contentType}
                onChange={(e) => setContentType(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                <MapPin size={14} /> Location (Optional)
              </label>
              <input
                type="text"
                placeholder="Global"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>

          <button
            onClick={generateHashtags}
            disabled={!topic}
            className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-3 disabled:opacity-50"
          >
            <RefreshCcw size={20} />
            Generate Optimized Hashtags
          </button>
        </div>

        {/* Results Area */}
        {results.length > 0 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Generated Hashtags for {platform}</h2>
              <button 
                onClick={handleCopyAll}
                className="text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-2"
              >
                <Copy size={16} /> Copy All Tags
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {results.map((res, idx) => (
                <div key={idx} className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      idx === 0 ? "bg-red-50 text-red-600" : idx === 1 ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-emerald-600"
                    }`}>
                      {res.category}
                    </span>
                    <button 
                      onClick={() => handleCopy(res.tags)}
                      className="text-xs text-gray-400 hover:text-indigo-600 transition-colors"
                    >
                      Copy Category
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {res.tags.map(tag => (
                      <span key={tag} className="px-3 py-1.5 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm font-mono text-gray-700 dark:text-gray-300 border border-gray-100 dark:border-gray-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SEO Content */}
        <div className="mt-16 pt-12 border-t border-gray-100 dark:border-gray-800">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">
            Master Social Media with Smart Hashtags
          </h2>
          <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 leading-relaxed space-y-6">
            <p>
              Using the right hashtags can be the difference between a post that goes viral and one that disappears into the void. Our **Hashtag Generator** is built on a sophisticated algorithm that understands the unique requirements of each major social platform.
            </p>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Platform-Specific Strategies:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Instagram:</strong> We provide up to 30 tags across three categories to maximize your reach while maintaining relevance.</li>
              <li><strong>TikTok:</strong> Focused on a mix of high-trending FYP tags and niche topic tags for maximum algorithmic impact.</li>
              <li><strong>LinkedIn:</strong> Professional, clean tags focused on industry keywords and community visibility.</li>
              <li><strong>Twitter:</strong> Concise selection of 2-3 high-impact tags to preserve character count and focus.</li>
            </ul>
            <p>
              <strong>Pro Tip:</strong> Always mix high-competition "Trending" tags with "Niche" tags. High-competition tags get you initial views, but niche tags help you rank and find your actual target audience.
            </p>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
