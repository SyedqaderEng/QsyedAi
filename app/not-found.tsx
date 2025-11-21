'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FileQuestion, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center px-6">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-neon-blue/20 to-transparent rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-neon-purple/20 to-transparent rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-lg"
      >
        <div className="glass-strong p-8 rounded-2xl text-center">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-purple-500/20 flex items-center justify-center">
              <FileQuestion className="w-10 h-10 text-purple-400" />
            </div>
          </div>

          {/* 404 */}
          <div className="mb-4">
            <h2 className="text-8xl font-bold bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
              404
            </h2>
          </div>

          {/* Header */}
          <h1 className="text-3xl font-bold mb-3 text-white">
            Page Not Found
          </h1>
          <p className="text-gray-400 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-neon-blue to-neon-purple px-6 py-3 rounded-lg font-semibold hover:shadow-neon-blue transition-all"
            >
              <Home className="w-5 h-5" />
              Go Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="flex items-center justify-center gap-2 glass px-6 py-3 rounded-lg hover:glass-strong transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </button>
          </div>

          {/* Helpful Links */}
          <div className="mt-8 p-4 glass rounded-lg">
            <p className="text-sm text-gray-400 mb-3">Quick Links:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Link
                href="/dashboard"
                className="text-xs text-neon-blue hover:text-neon-purple transition-colors"
              >
                Dashboard
              </Link>
              <span className="text-gray-600">•</span>
              <Link
                href="/security"
                className="text-xs text-neon-blue hover:text-neon-purple transition-colors"
              >
                Security
              </Link>
              <span className="text-gray-600">•</span>
              <Link
                href="/editor"
                className="text-xs text-neon-blue hover:text-neon-purple transition-colors"
              >
                Editor
              </Link>
              <span className="text-gray-600">•</span>
              <Link
                href="/auth/login"
                className="text-xs text-neon-blue hover:text-neon-purple transition-colors"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
