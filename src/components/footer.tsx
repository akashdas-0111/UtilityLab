import Link from "next/link";
import { Rocket, Terminal, Globe, Share2, Mail } from "lucide-react";

const footerLinks = {
  categories: [
    { name: "Calculators", href: "/calculators" },
    { name: "Converters", href: "/converters" },
    { name: "Generators", href: "/generators" },
    { name: "Validators", href: "/validators" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Contact", href: "/contact" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand & Socials */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="p-1.5 rounded-lg bg-indigo-600 text-white group-hover:bg-indigo-500 transition-colors">
                <Rocket size={20} />
              </div>
              <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                Utility<span className="text-indigo-600 dark:text-indigo-400">Lab</span>
              </span>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Empowering developers and professionals with high-performance digital tools. Built for speed, precision, and ease of use.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                <Terminal size={20} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                <Globe size={20} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                <Share2 size={20} />
              </Link>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-6">
              Tools & Utilities
            </h3>
            <ul className="space-y-4">
              {footerLinks.categories.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-6">
              Company
            </h3>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-6">
              Newsletter
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Get updates on new tools and features directly in your inbox.
            </p>
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
              <button className="absolute right-1 top-1 bottom-1 px-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 transition-colors">
                <Mail size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="mt-12 md:mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500 dark:text-gray-500 text-center md:text-left">
            © {new Date().getFullYear()} UtilityLab. All rights reserved. Designed for excellence.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-xs text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="text-xs text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
