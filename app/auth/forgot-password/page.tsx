'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // TODO: Integrate with Firebase Auth
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock success
      setSuccess(true);
    } catch (err) {
      setError('Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
        className="relative z-10 w-full max-w-md"
      >
        <div className="glass-strong p-8 rounded-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
              Reset Password
            </h1>
            <p className="text-gray-400">Enter your email to receive a reset link</p>
          </div>

          {/* Success message */}
          {success && (
            <div className="mb-6 p-4 glass rounded-lg border border-green-500/50 bg-green-500/10">
              <p className="text-green-400 text-sm text-center">
                Password reset link sent! Check your email.
              </p>
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="mb-6 p-4 glass rounded-lg border border-red-500/50 bg-red-500/10">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {!success ? (
            <>
              {/* Reset form */}
              <form onSubmit={handleResetPassword} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full glass px-4 py-3 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-neon-blue transition-all outline-none"
                    placeholder="you@example.com"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-neon-blue to-neon-purple py-3 rounded-lg font-semibold hover:shadow-neon-blue transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </form>

              {/* Back to login */}
              <p className="mt-6 text-center text-sm text-gray-400">
                Remember your password?{' '}
                <Link href="/auth/login" className="text-neon-blue hover:text-neon-purple transition-colors font-semibold">
                  Sign in
                </Link>
              </p>
            </>
          ) : (
            <div className="text-center">
              <Link
                href="/auth/login"
                className="inline-block bg-gradient-to-r from-neon-blue to-neon-purple px-6 py-3 rounded-lg font-semibold hover:shadow-neon-blue transition-all"
              >
                Back to Login
              </Link>
            </div>
          )}
        </div>

        {/* Back to home */}
        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">
            ← Back to home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
