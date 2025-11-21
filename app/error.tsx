'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

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
            <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center">
              <AlertTriangle className="w-10 h-10 text-red-400" />
            </div>
          </div>

          {/* Header */}
          <h1 className="text-3xl font-bold mb-3 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
            Something Went Wrong
          </h1>
          <p className="text-gray-400 mb-6">
            We encountered an unexpected error. Don't worry, we're on it!
          </p>

          {/* Error Details (only in development) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mb-6 p-4 glass rounded-lg text-left">
              <p className="text-xs font-mono text-red-400 break-all">
                {error.message}
              </p>
              {error.digest && (
                <p className="text-xs text-gray-500 mt-2">
                  Error ID: {error.digest}
                </p>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={reset}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-neon-blue to-neon-purple px-6 py-3 rounded-lg font-semibold hover:shadow-neon-blue transition-all"
            >
              <RefreshCw className="w-5 h-5" />
              Try Again
            </button>
            <Link
              href="/"
              className="flex items-center justify-center gap-2 glass px-6 py-3 rounded-lg hover:glass-strong transition-all"
            >
              <Home className="w-5 h-5" />
              Go Home
            </Link>
          </div>

          {/* Support */}
          <div className="mt-8 p-4 glass rounded-lg">
            <p className="text-sm text-gray-400">
              If this problem persists, please contact our{' '}
              <a href="mailto:support@syed.ai" className="text-neon-blue hover:text-neon-purple">
                support team
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
