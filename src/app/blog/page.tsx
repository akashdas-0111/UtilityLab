"use client";

import React from "react";
import Link from "next/link";
import { blogPosts } from "@/lib/blog-data";
import { Calendar, User, Clock, ChevronRight, BookOpen } from "lucide-react";
import { AdUnit } from "@/components/ad-unit";
import { motion } from "framer-motion";

export default function BlogIndex() {
  return (
    <div className="min-h-screen bg-gray-950 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-20 text-center">
          <AdUnit slot="blog_index_top" className="mb-12" />
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white mb-6 tracking-tighter">
            Utility<span className="text-indigo-500">Blog</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-medium px-4">
            Expert insights, tool guides, and professional tips to master your digital workflow.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogPosts.map((post, index) => (
            <motion.article 
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-gray-900 rounded-[3rem] border border-gray-800 overflow-hidden hover:border-indigo-500 transition-all flex flex-col h-full shadow-2xl hover:shadow-indigo-500/10"
            >
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-4 mb-4 text-xs text-gray-500 font-bold">
                  <Clock size={14} /> {post.readTime}
                </div>

                <h2 className="text-2xl font-black text-white mb-4 group-hover:text-indigo-400 transition-colors leading-tight">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                
                <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-grow line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="pt-8 border-t border-gray-800 flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-indigo-400">
                      <User size={16} />
                    </div>
                    <span className="text-xs font-bold text-gray-300">{post.author}</span>
                  </div>
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="flex items-center gap-2 text-xs font-black text-indigo-500 uppercase tracking-widest hover:gap-3 transition-all"
                  >
                    Read Post <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Newsletter / CTA */}
        <div className="mt-32 bg-indigo-600 rounded-[4rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-20 opacity-10 rotate-12">
            <BookOpen size={200} />
          </div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Master Your Workflow</h2>
            <p className="text-indigo-100 text-lg mb-10 max-w-xl mx-auto font-medium">
              Join 10,000+ professionals who get our best tool tips and digital productivity guides.
            </p>
            <div className="flex flex-col sm:row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-grow bg-white/10 border-none rounded-2xl py-4 px-6 text-white placeholder:text-indigo-200 outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-white text-indigo-600 font-black px-8 py-4 rounded-2xl hover:scale-105 transition-transform">
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
