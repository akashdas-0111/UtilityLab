import React from "react";
import { Rocket, Zap, Heart, Globe, Users } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-indigo-600 text-white mb-6 shadow-xl shadow-indigo-600/20">
            <Rocket size={32} />
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-6">
            Empowering Your <span className="text-indigo-600">Digital Workflow</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            UtilityLab is a collection of high-performance, privacy-focused tools designed for developers, 
            designers, and professionals who value speed and simplicity.
          </p>
        </div>

        {/* Stats/Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 text-center">
            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center mx-auto mb-4">
              <Zap size={24} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Incredible Speed</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Built with Next.js 14 and Tailwind CSS for near-instant load times and zero lag.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 text-center">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <Heart size={24} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Privacy First</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Most tools process data client-side. Your sensitive information never leaves your browser.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 text-center">
            <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-900/30 text-purple-600 flex items-center justify-center mx-auto mb-4">
              <Globe size={24} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">100+ Tools</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              A comprehensive suite ranging from financial calculators to complex data converters.
            </p>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="bg-indigo-600 rounded-3xl p-10 md:p-16 text-white text-center shadow-2xl shadow-indigo-600/30">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg text-indigo-100 max-w-2xl mx-auto mb-8 leading-relaxed">
            We believe that professional tools should be accessible to everyone, without compromising 
            on privacy or user experience. UtilityLab is our contribution to a faster, safer, 
            and more productive web.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/" className="px-8 py-3 bg-white text-indigo-600 rounded-xl font-bold hover:bg-indigo-50 transition-colors">
              Explore Tools
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
