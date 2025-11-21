'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, CheckCircle, RefreshCw } from 'lucide-react';
import { auth } from '@/lib/firebase/config';
import { sendEmailVerification, onAuthStateChanged } from 'firebase/auth';

export default function VerifyEmailPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [error, setError] = useState('');
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    // Check if user is logged in and get their email
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user.email || '');

        // If email is already verified, redirect to dashboard
        if (user.emailVerified) {
          router.push('/dashboard');
        }
      } else {
        // No user logged in, redirect to login
        router.push('/auth/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleResendEmail = async () => {
    setLoading(true);
    setError('');
    setResendSuccess(false);

    try {
      const user = auth.currentUser;
      if (!user) {
        setError('No user logged in');
        return;
      }

      await sendEmailVerification(user);
      setResendSuccess(true);
    } catch (err: any) {
      if (err.code === 'auth/too-many-requests') {
        setError('Too many requests. Please try again later.');
      } else {
        setError('Failed to resend verification email. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCheckVerification = async () => {
    setChecking(true);
    setError('');

    try {
      const user = auth.currentUser;
      if (!user) {
        setError('No user logged in');
        setChecking(false);
        return;
      }

      // Reload user to get updated emailVerified status
      await user.reload();

      if (user.emailVerified) {
        // Update session with verified status
        const userData = {
          email: user.email,
          uid: user.uid,
          name: user.displayName,
          emailVerified: true
        };

        await fetch('/api/auth/session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData),
        });

        localStorage.setItem('user', JSON.stringify(userData));
        router.push('/dashboard');
      } else {
        setError('Email not verified yet. Please check your inbox and click the verification link.');
      }
    } catch (err) {
      setError('Failed to check verification status. Please try again.');
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center px-6 py-12">
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
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple flex items-center justify-center">
              <Mail className="w-10 h-10 text-white" />
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
              Verify Your Email
            </h1>
            <p className="text-gray-400">
              We've sent a verification link to
            </p>
            <p className="text-white font-semibold mt-1">{email}</p>
          </div>

          {/* Success message */}
          {resendSuccess && (
            <div className="mb-6 p-4 glass rounded-lg border border-green-500/50 bg-green-500/10">
              <div className="flex items-center gap-2 text-green-400">
                <CheckCircle className="w-5 h-5" />
                <p className="text-sm">Verification email sent successfully!</p>
              </div>
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="mb-6 p-4 glass rounded-lg border border-red-500/50 bg-red-500/10">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Instructions */}
          <div className="mb-6 space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-neon-blue/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-neon-blue text-sm font-bold">1</span>
              </div>
              <p className="text-gray-300 text-sm">
                Check your email inbox for a message from Syed.AI
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-neon-blue/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-neon-blue text-sm font-bold">2</span>
              </div>
              <p className="text-gray-300 text-sm">
                Click the verification link in the email
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-neon-blue/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-neon-blue text-sm font-bold">3</span>
              </div>
              <p className="text-gray-300 text-sm">
                Come back here and click "I've Verified My Email"
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={handleCheckVerification}
              disabled={checking}
              className="w-full bg-gradient-to-r from-neon-blue to-neon-purple py-3 rounded-lg font-semibold hover:shadow-neon-blue transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {checking ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Checking...
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  I've Verified My Email
                </>
              )}
            </button>

            <button
              onClick={handleResendEmail}
              disabled={loading}
              className="w-full glass px-4 py-3 rounded-lg hover:glass-strong transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending...' : 'Resend Verification Email'}
            </button>
          </div>

          {/* Help text */}
          <div className="mt-6 p-4 glass rounded-lg">
            <p className="text-xs text-gray-400">
              <strong className="text-gray-300">Didn't receive the email?</strong>
              <br />
              Check your spam folder, or click "Resend Verification Email" to try again.
            </p>
          </div>

          {/* Skip link (temporary - for testing) */}
          <div className="mt-6 text-center">
            <Link
              href="/dashboard"
              className="text-sm text-gray-500 hover:text-gray-400 transition-colors"
            >
              Skip for now (not recommended)
            </Link>
          </div>
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
