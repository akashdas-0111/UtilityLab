import React from "react";
import { Mail, MessageSquare, Terminal, Globe, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
            Get in <span className="text-indigo-600">Touch</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Have a question, feedback, or a tool request? We'd love to hear from you. 
            Our team usually responds within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-10 border border-gray-200 dark:border-gray-800 shadow-sm">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-900 dark:text-white">Full Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-900 dark:text-white">Email Address</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-900 dark:text-white">Subject</label>
                <select className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all">
                  <option>General Inquiry</option>
                  <option>Tool Request</option>
                  <option>Bug Report</option>
                  <option>Partnership</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-900 dark:text-white">Message</label>
                <textarea
                  placeholder="How can we help you?"
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                ></textarea>
              </div>
              <button className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/20">
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info & Socials */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 mb-4 flex items-center justify-center">
                  <Mail size={20} />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">Email Us</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">hello@utilitylab.com</p>
              </div>
              <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 mb-4 flex items-center justify-center">
                  <MessageSquare size={20} />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">Live Chat</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Available Mon-Fri, 9-5</p>
              </div>
            </div>

            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-8 rounded-3xl border border-indigo-100 dark:border-indigo-900/30">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Connect on Social</h3>
              <div className="flex gap-4">
                <a href="#" className="p-3 bg-white dark:bg-gray-800 rounded-xl text-gray-400 hover:text-indigo-600 transition-colors shadow-sm">
                  <Globe size={20} />
                </a>
                <a href="#" className="p-3 bg-white dark:bg-gray-800 rounded-xl text-gray-400 hover:text-indigo-600 transition-colors shadow-sm">
                  <Terminal size={20} />
                </a>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-200 dark:border-gray-800">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-600 flex flex-shrink-0 items-center justify-center">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">Our Location</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    Innovation Hub, 42 Digital Way,<br />
                    Tech District, SF 94103
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
