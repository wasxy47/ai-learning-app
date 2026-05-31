'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';
import { createUserDoc } from '@/lib/firestore';
import { useAuth } from '@/components/AuthProvider';
import {
  AlertCircle,
  ArrowRight,
  Brain,
  Eye,
  EyeOff,
  Lock,
  Mail,
} from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && user) router.push('/dashboard');
  }, [user, authLoading, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch (err: unknown) {
      const firebaseError = err as { code: string };
      switch (firebaseError.code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
          setError('Invalid email or password. Please try again.');
          break;
        case 'auth/too-many-requests':
          setError('Too many failed attempts. Please try again later.');
          break;
        default:
          setError('Login failed. Please check your credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await createUserDoc(result.user.uid, result.user.email || '');
      router.push('/dashboard');
    } catch (err: unknown) {
      const firebaseError = err as { code: string };
      if (firebaseError.code !== 'auth/popup-closed-by-user') {
        setError('Google Sign-In failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center page-bg">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-t-transparent" style={{ borderColor: 'var(--primary)', borderTopColor: 'transparent' }} />
      </div>
    );
  }

  return (
    <div className="grid min-h-screen items-center px-5 py-12 sm:px-8 lg:grid-cols-[1fr_0.86fr] page-bg">
      <section className="mx-auto w-full max-w-xl py-10">
        {/* Logo */}
        <Link href="/" className="mb-10 inline-flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl"
            style={{ background: 'var(--primary)', color: 'var(--primary-text)' }}
          >
            <Brain className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em]" style={{ color: 'var(--ink)' }}>LearnAI</p>
            <p className="text-xs" style={{ color: 'var(--muted)' }}>Focused learning studio</p>
          </div>
        </Link>

        <div className="paper-panel rounded-xl p-6 sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-teal">Welcome back</p>
          <h1 className="mt-3 text-3xl font-black text-ink">Continue your path</h1>
          <p className="mt-2 text-sm leading-6 text-muted">
            Sign in to open your lessons, tutor history, quizzes, and current study plan.
          </p>

          {/* Error */}
          {error && (
            <div className="mt-5 flex items-center gap-3 rounded-lg border border-danger/30 bg-danger/10 p-3">
              <AlertCircle className="h-4 w-4 shrink-0 text-danger" />
              <p className="text-sm text-danger">{error}</p>
            </div>
          )}

          {/* ── Email / Password Form ── */}
          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-bold text-ink">
                Email address
              </label>
              <div className="relative">
                <Mail
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
                />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  autoComplete="email"
                  style={{ '--input-pl': '2.5rem' } as React.CSSProperties}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-bold text-ink">
                Password
              </label>
              <div className="relative">
                <Lock
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
                />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                  style={{ '--input-pl': '2.5rem', paddingRight: '2.75rem' } as React.CSSProperties}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted transition hover:text-ink"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Sign In Button */}
            <button
              id="login-submit-btn"
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-black text-primary-text transition hover:opacity-90 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-text border-t-transparent" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign in
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* ── Divider ── */}
          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-line" />
            <span className="text-xs font-semibold uppercase tracking-wider text-muted">Or continue with</span>
            <div className="h-px flex-1 bg-line" />
          </div>

          {/* ── Google Sign-In (BOTTOM) ── */}
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-line bg-paper-soft px-6 py-3 text-sm font-bold text-ink transition hover:bg-line disabled:opacity-60"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continue with Google
          </button>

          {/* Create Account Link */}
          <div className="mt-5 border-t border-line pt-5">
            <Link
              href="/signup"
              className="flex items-center justify-center rounded-xl border border-line px-6 py-3 text-sm font-bold text-ink transition hover:bg-line"
            >
              Create an account
            </Link>
          </div>
        </div>
      </section>

      {/* Right panel */}
      <aside className="hidden min-h-[78vh] border-l border-line px-10 py-12 lg:block">
        <div className="sticky top-24">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-copper">Studio rhythm</p>
          <h2 className="mt-4 max-w-md text-4xl font-black leading-tight text-ink">
            Pick up exactly where you left off.
          </h2>
          <div className="mt-8 space-y-3">
            {['Review weak areas', 'Ask focused tutor questions', 'Retake quizzes when ready'].map((item) => (
              <div key={item} className="surface-soft flex items-center gap-3 rounded-xl p-4">
                <span className="h-2 w-2 rounded-full" style={{ background: 'var(--sage)' }} />
                <p className="text-sm font-semibold text-ink">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
