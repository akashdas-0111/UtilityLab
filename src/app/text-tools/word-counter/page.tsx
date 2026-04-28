"use client";

import React, { useState, useEffect } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools";
import { 
  Type, 
  FileText, 
  AlignLeft, 
  Hash, 
  Clock, 
  Copy, 
  Trash2, 
  ArrowRightLeft 
} from "lucide-react";

export default function WordCounter() {
  const [text, setText] = useState("");
  const [stats, setStats] = useState({
    words: 0,
    characters: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: 0,
  });

  const tool = tools.find(t => t.id === "word-counter")!;

  useEffect(() => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const characters = text.length;
    const sentences = text.split(/[.!?]+/).filter(Boolean).length;
    const paragraphs = text.split(/\n+/).filter(Boolean).length;
    const readingTime = Math.ceil(words / 200); // Avg 200 wpm

    setStats({ words, characters, sentences, paragraphs, readingTime });
  }, [text]);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
  };

  const handleClear = () => {
    setText("");
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 text-center">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.words}</p>
            <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Words</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 text-center">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.characters}</p>
            <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Characters</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 text-center">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.sentences}</p>
            <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Sentences</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 text-center">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.paragraphs}</p>
            <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Paragraphs</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 text-center col-span-2 md:col-span-1">
            <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{stats.readingTime}m</p>
            <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Read Time</p>
          </div>
        </div>

        {/* Text Area */}
        <div className="relative group">
          <textarea
            className="w-full h-80 p-6 rounded-3xl bg-gray-50 dark:bg-gray-800/30 border-2 border-gray-100 dark:border-gray-800 focus:border-indigo-500 dark:focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all resize-none text-gray-800 dark:text-gray-200 leading-relaxed"
            placeholder="Paste your text here to start counting..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          
          <div className="absolute bottom-6 right-6 flex gap-2">
            <button 
              onClick={handleCopy}
              className="p-3 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-500 hover:text-indigo-600 hover:border-indigo-500 transition-all shadow-sm"
              title="Copy to clipboard"
            >
              <Copy size={18} />
            </button>
            <button 
              onClick={handleClear}
              className="p-3 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-500 hover:text-red-600 hover:border-red-500 transition-all shadow-sm"
              title="Clear text"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>

        {/* How-to Guide */}
        <div className="mt-16 pt-12 border-t border-gray-100 dark:border-gray-800">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8">
            How to use the Word Counter effectively
          </h2>
          <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 leading-relaxed space-y-6">
            <p>
              In the modern digital age, the ability to quickly and accurately count words, characters, and sentences is more important than ever. Whether you're a student drafting an essay, a professional writer crafting a blog post, or a developer managing metadata, our **Word Counter** is designed to provide you with instant, reliable insights into your content.
            </p>
            <p>
              To get started, simply type or paste your text into the large text area above. As you interact with the input, the statistics grid will update in real-time. You'll see an immediate tally of your word count, total characters (including spaces), the number of sentences, and the overall paragraph structure. We've even included an estimated reading time based on an average reading speed of 200 words per minute, which is invaluable for content creators looking to optimize user engagement.
            </p>
            <p>
              Why does this matter? Many platforms have strict character or word limits. For example, Twitter (now X) has specific character caps, while SEO meta descriptions should ideally stay between 150-160 characters. Academic assignments often require a minimum word count while strictly forbidding you from exceeding a certain limit. Our tool ensures you stay within these boundaries without the need for manual counting or constantly switching between windows.
            </p>
            <p>
              Privacy is a core pillar of UtilityLab. Unlike many online word counters that send your text to their servers for processing, our Word Counter runs **entirely in your browser**. Your text never leaves your device, making it safe for processing sensitive documents, private emails, or proprietary code snippets.
            </p>
            <p>
              Advanced features like the "Copy" and "Clear" buttons help streamline your workflow. Once you've refined your text to the perfect length, a single click copies everything to your clipboard, ready to be pasted into your final document. If you're starting a new project, the "Clear" button resets the workspace instantly.
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12 bg-indigo-50 dark:bg-indigo-900/10 rounded-3xl p-8 md:p-10 border border-indigo-100 dark:border-indigo-900/30">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <h4 className="font-bold text-gray-900 dark:text-white">Is my data secure?</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Yes! All processing happens client-side in your browser. We never upload or store your text.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-gray-900 dark:text-white">Does it count spaces as characters?</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Yes, the character count includes all visible and invisible characters, including spaces and tabs.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-gray-900 dark:text-white">How is reading time calculated?</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">We use an industry-standard average of 200 words per minute to estimate how long it would take an adult to read your text.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-gray-900 dark:text-white">Is there a character limit?</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Our tool can handle very large amounts of text, limited only by your device's memory capacity.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-gray-900 dark:text-white">Can I use this for SEO?</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Absolutely. It's perfect for verifying the length of meta titles, descriptions, and long-form articles.</p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
