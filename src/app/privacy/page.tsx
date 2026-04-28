import React from "react";
import { Shield, Lock, Eye, FileText } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12 border border-gray-200 dark:border-gray-800 shadow-sm">
          <header className="mb-12 text-center">
            <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 mb-6">
              <Shield size={32} />
            </div>
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
              Privacy Policy
            </h1>
            <p className="text-gray-500 dark:text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>
          </header>

          <div className="prose dark:prose-invert max-w-none space-y-8 text-gray-600 dark:text-gray-400 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Lock size={20} className="text-indigo-600" />
                Privacy by Design
              </h2>
              <p>
                At <strong>UtilityLab</strong>, your privacy is our top priority. We believe that your data belongs to you. 
                Most of our tools, including calculators, text converters, and image optimizers, process your data 
                <strong> entirely within your web browser</strong>. This means your files and inputs never leave your computer 
                and are never uploaded to our servers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Information We Collect</h2>
              <p>
                Like most websites, UtilityLab uses log files. These files merely log visitors to the site – usually a standard procedure for hosting companies and a part of hosting services' analytics. The information inside the log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date/time stamp, referring/exit pages, and possibly the number of clicks.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Eye size={20} className="text-indigo-600" />
                Google DoubleClick DART Cookie
              </h2>
              <p>
                Google is one of the third-party vendors on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.website.com and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – <a href="https://policies.google.com/technologies/ads" className="text-indigo-600 hover:underline">https://policies.google.com/technologies/ads</a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Advertising Partners</h2>
              <p>
                Some of the advertisers on our site may use cookies and web beacons. Our advertising partners include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Google AdSense</li>
              </ul>
              <p>
                Each of our advertising partners has its own Privacy Policy for its policies on user data. For easier access, we have hyperlinked to their Privacy Policies above.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">GDPR Compliance</h2>
              <p>
                We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>The right to access</strong> – You have the right to request copies of your personal data.</li>
                <li><strong>The right to rectification</strong> – You have the right to request that we correct any information you believe is inaccurate.</li>
                <li><strong>The right to erasure</strong> – You have the right to request that we erase your personal data, under certain conditions.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Consent</h2>
              <p>
                By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
