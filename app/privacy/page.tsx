'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Shield } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8">
          ← Back to Home
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-strong rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-8 h-8 text-purple-400" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
              Privacy Policy
            </h1>
          </div>

          <p className="text-gray-400 mb-8">Last updated: January 2024</p>

          <div className="space-y-6 text-gray-300">
            <section>
              <h2 className="text-2xl font-bold text-white mb-3">1. Information We Collect</h2>
              <p>We collect information that you provide directly to us, including:</p>
              <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                <li>Account information (name, email, password)</li>
                <li>Profile information</li>
                <li>Source code and application data you submit for scanning</li>
                <li>Usage data and analytics</li>
                <li>Communications with our support team</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">2. How We Use Your Information</h2>
              <p>We use the collected information to:</p>
              <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                <li>Provide, maintain, and improve our services</li>
                <li>Perform security scanning and vulnerability detection</li>
                <li>Send you technical notices and security alerts</li>
                <li>Respond to your comments and questions</li>
                <li>Analyze usage patterns and trends</li>
                <li>Detect and prevent fraud and abuse</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">3. Data Security</h2>
              <p>We implement appropriate technical and organizational measures to protect your data, including:</p>
              <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                <li>Encryption of data in transit and at rest (AES-256)</li>
                <li>Regular security audits and penetration testing</li>
                <li>Access controls and authentication</li>
                <li>Secure data centers with SOC 2 Type II certification</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">4. Data Sharing</h2>
              <p>We do not sell your personal information. We may share your information with:</p>
              <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                <li>Service providers who assist in our operations</li>
                <li>Law enforcement when required by law</li>
                <li>Other parties with your explicit consent</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">5. Data Retention</h2>
              <p>We retain your data for as long as your account is active or as needed to provide services. You can configure retention periods in your account settings. Default retention is 90 days for scan data.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">6. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Export your data</li>
                <li>Opt-out of marketing communications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">7. Cookies and Tracking</h2>
              <p>We use cookies and similar technologies to provide functionality, analyze usage, and improve our services. You can control cookie preferences through your browser settings.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">8. International Transfers</h2>
              <p>Your data may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place for such transfers.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">9. Children's Privacy</h2>
              <p>Our service is not intended for children under 13. We do not knowingly collect personal information from children under 13.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">10. Changes to Privacy Policy</h2>
              <p>We may update this Privacy Policy from time to time. We will notify you of any material changes via email or through the Service.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">11. Contact Us</h2>
              <p>If you have questions about this Privacy Policy, please contact us at:</p>
              <p className="mt-2">Email: privacy@syed.ai</p>
              <p>Address: [Your Company Address]</p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
