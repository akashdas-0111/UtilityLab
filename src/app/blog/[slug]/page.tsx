"use client";

import React from "react";
import { useParams, notFound } from "next/navigation";
import { blogPosts } from "@/lib/blog-data";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Clock, Share2, Tag } from "lucide-react";
import { AdUnit } from "@/components/ad-unit";
import { motion } from "framer-motion";

export default function BlogPostPage() {
  const params = useParams();
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-950 pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <AdUnit slot="blog_post_top" className="mb-16" />

        <Link 
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-black text-indigo-500 uppercase tracking-widest mb-12 hover:gap-3 transition-all"
        >
          <ArrowLeft size={16} /> Back to Blog
        </Link>

        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="px-4 py-1 bg-indigo-500/10 text-indigo-400 rounded-full text-xs font-black uppercase tracking-widest">
              {post.category}
            </span>
            <div className="flex items-center gap-2 text-xs text-gray-500 font-bold">
              <Clock size={14} /> {post.readTime}
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500 font-bold">
              <Calendar size={14} /> {post.date}
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center justify-between py-8 border-y border-gray-800">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gray-900 border border-gray-800 flex items-center justify-center text-indigo-500">
                <User size={24} />
              </div>
              <div>
                <p className="text-sm font-black text-white">{post.author}</p>
                <p className="text-xs text-gray-500 font-bold">Senior Content Strategist</p>
              </div>
            </div>
            <button className="p-3 bg-gray-900 border border-gray-800 rounded-xl text-gray-400 hover:text-white transition-colors">
              <Share2 size={20} />
            </button>
          </div>
        </motion.header>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="prose prose-invert prose-indigo max-w-none 
            prose-headings:font-black prose-headings:tracking-tighter prose-headings:text-white
            prose-p:text-gray-400 prose-p:text-lg prose-p:leading-relaxed
            prose-li:text-gray-400 prose-strong:text-indigo-400 prose-strong:font-black
            prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-8
            prose-h3:text-xl prose-h3:mt-10 prose-h3:mb-4
            prose-ul:my-8 prose-li:my-2"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Footer Info */}
        <footer className="mt-20 pt-12 border-t border-gray-800 flex flex-col md:row items-center justify-between gap-8">
           <div className="flex items-center gap-4">
              <Tag size={18} className="text-indigo-500" />
              <div className="flex gap-2">
                 {["Security", "Privacy", "Masterclass", "2026"].map(tag => (
                   <span key={tag} className="text-xs font-bold text-gray-500 hover:text-indigo-400 cursor-pointer transition-colors">#{tag}</span>
                 ))}
              </div>
           </div>
           <p className="text-sm text-gray-500 font-bold italic">
             Found this helpful? Share it with your team!
           </p>
        </footer>
      </div>
    </div>
  );
}
