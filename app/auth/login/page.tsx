'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check if email is verified
      if (!user.emailVerified) {
        // Create session but redirect to verification page
        const userData = { email: user.email, uid: user.uid, emailVerified: false };
        await fetch('/api/auth/session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData),
        });

        localStorage.setItem('user', JSON.stringify(userData));
        router.push('/auth/verify-email');
        return;
      }

      // Create secure session via API
      const userData = { email: user.email, uid: user.uid, emailVerified: true };
      const sessionResponse = await fetch('/api/auth/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (!sessionResponse.ok) {
        throw new Error('Failed to create session');
      }

      // Store user data in localStorage for client-side access (non-sensitive)
      localStorage.setItem('user', JSON.stringify(userData));

      // Redirect to original destination or dashboard
      const urlParams = new URLSearchParams(window.location.search);
      const redirect = urlParams.get('redirect') || '/dashboard';
      router.push(redirect);
    } catch (err: any) {
      const errorCode = err.code;
      if (errorCode === 'auth/user-not-found') {
        setError('No account found with this email.');
      } else if (errorCode === 'auth/wrong-password') {
        setError('Incorrect password. Please try again.');
      } else if (errorCode === 'auth/invalid-email') {
        setError('Invalid email address.');
      } else if (errorCode === 'auth/too-many-requests') {
        setError('Too many failed attempts. Please try again later.');
      } else {
        setError('Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Create secure session via API
      const userData = { email: user.email, uid: user.uid, name: user.displayName };
      const sessionResponse = await fetch('/api/auth/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (!sessionResponse.ok) {
        throw new Error('Failed to create session');
      }

      localStorage.setItem('user', JSON.stringify(userData));
      router.push('/dashboard');
    } catch (err: any) {
      setError('Google sign-in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGithubLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const provider = new GithubAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Create secure session via API
      const userData = { email: user.email, uid: user.uid, name: user.displayName };
      const sessionResponse = await fetch('/api/auth/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (!sessionResponse.ok) {
        throw new Error('Failed to create session');
      }

      localStorage.setItem('user', JSON.stringify(userData));
      router.push('/dashboard');
    } catch (err: any) {
      setError('GitHub sign-in failed. Please try again.');
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
              Welcome Back
            </h1>
            <p className="text-gray-400">Sign in to continue to Syed.AI</p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-6 p-4 glass rounded-lg border border-red-500/50 bg-red-500/10">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Login form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
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

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full glass px-4 py-3 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-neon-blue transition-all outline-none"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded bg-gray-700 border-gray-600 text-neon-blue" />
                <span className="text-sm text-gray-400">Remember me</span>
              </label>
              <Link href="/auth/forgot-password" className="text-sm text-neon-blue hover:text-neon-purple transition-colors">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-neon-blue to-neon-purple py-3 rounded-lg font-semibold hover:shadow-neon-blue transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Social login */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-900/50 text-gray-400">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <button
                onClick={handleGoogleLogin}
                disabled={loading}
                className="glass px-4 py-3 rounded-lg hover:glass-strong transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
                </svg>
                Google
              </button>
              <button
                onClick={handleGithubLogin}
                disabled={loading}
                className="glass px-4 py-3 rounded-lg hover:glass-strong transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </button>
            </div>
          </div>

          {/* Sign up link */}
          <p className="mt-8 text-center text-sm text-gray-400">
            Don&apos;t have an account?{' '}
            <Link href="/auth/signup" className="text-neon-blue hover:text-neon-purple transition-colors font-semibold">
              Sign up
            </Link>
          </p>
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
