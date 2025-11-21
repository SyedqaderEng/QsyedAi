'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FileText } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8">
          ← Back to Home
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-strong rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-8 h-8 text-purple-400" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
              Terms of Service
            </h1>
          </div>

          <p className="text-gray-400 mb-8">Last updated: January 2024</p>

          <div className="space-y-6 text-gray-300">
            <section>
              <h2 className="text-2xl font-bold text-white mb-3">1. Acceptance of Terms</h2>
              <p>By accessing and using Syed.AI ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">2. Description of Service</h2>
              <p>Syed.AI provides security scanning, vulnerability detection, and application security testing services. The Service uses artificial intelligence and automated scanning tools to identify potential security issues in your code and applications.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">3. User Accounts</h2>
              <p>You must create an account to use certain features of the Service. You are responsible for:</p>
              <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                <li>Maintaining the confidentiality of your account credentials</li>
                <li>All activities that occur under your account</li>
                <li>Notifying us immediately of any unauthorized access</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">4. Acceptable Use</h2>
              <p>You agree not to:</p>
              <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                <li>Use the Service for any illegal purpose</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with or disrupt the Service</li>
                <li>Upload malicious code or content</li>
                <li>Violate any applicable laws or regulations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">5. Data and Privacy</h2>
              <p>Your use of the Service is also governed by our Privacy Policy. We collect and process data as described in our Privacy Policy to provide and improve the Service.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">6. Intellectual Property</h2>
              <p>The Service and its original content, features, and functionality are owned by Syed.AI and are protected by international copyright, trademark, and other intellectual property laws.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">7. Limitation of Liability</h2>
              <p>To the maximum extent permitted by law, Syed.AI shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the Service.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">8. Changes to Terms</h2>
              <p>We reserve the right to modify these terms at any time. We will notify users of any material changes via email or through the Service.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">9. Contact</h2>
              <p>If you have any questions about these Terms, please contact us at:</p>
              <p className="mt-2">Email: legal@syed.ai</p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
