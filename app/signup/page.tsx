'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';
import { createUserDoc } from '@/lib/firestore';
import { useAuth } from '@/components/AuthProvider';
import {
  AlertCircle,
  ArrowRight,
  Brain,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
} from 'lucide-react';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && user) router.push('/dashboard');
  }, [user, authLoading, router]);

  const passwordStrength = () => {
    if (password.length === 0) return 0;
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const strengthLabels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  const strengthColors = ['', 'text-danger', 'text-copper', 'text-teal', 'text-sage'];
  const strengthBars = ['', 'bg-danger', 'bg-copper', 'bg-teal', 'bg-sage'];
  const strength = passwordStrength();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name.trim()) { setError('Please enter your full name.'); return; }
    if (password !== confirmPassword) { setError('Passwords do not match.'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }

    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(cred.user, { displayName: name });
      await createUserDoc(cred.user.uid, email);
      router.push('/dashboard');
    } catch (err: unknown) {
      const firebaseError = err as { code: string; message: string };
      switch (firebaseError.code) {
        case 'auth/email-already-in-use': setError('An account with this email already exists.'); break;
        case 'auth/invalid-email': setError('Please enter a valid email address.'); break;
        case 'auth/weak-password': setError('Password must be at least 6 characters.'); break;
        default: setError(`Signup failed: ${firebaseError.message || 'Please try again.'}`);
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
    <div className="grid min-h-screen items-center px-5 py-12 sm:px-8 lg:grid-cols-[0.9fr_1fr] page-bg">
      {/* Left panel */}
      <aside className="hidden min-h-[78vh] border-r border-line px-10 py-12 lg:block">
        <div className="sticky top-24">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-teal">Start clean</p>
          <h2 className="mt-4 max-w-md text-4xl font-black leading-tight text-ink">
            Your first dashboard should feel ready, not generated.
          </h2>
          <div className="mt-8 grid max-w-md grid-cols-2 gap-3">
            {[['Lessons', '9'], ['Tracks', '3'], ['Plan', 'AI'], ['Tutor', 'Live']].map(([label, value]) => (
              <div key={label} className="surface-soft rounded-xl p-4">
                <p className="text-3xl font-black text-ink">{value}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-muted">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </aside>

      <section className="mx-auto w-full max-w-xl py-10 lg:pl-10">
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
          <p className="text-xs font-black uppercase tracking-[0.2em] text-teal">Create account</p>
          <h1 className="mt-3 text-3xl font-black text-ink">Build your study space</h1>
          <p className="mt-2 text-sm leading-6 text-muted">
            Start with modules, quizzes, and a study plan that updates as you learn.
          </p>

          {/* Error */}
          {error && (
            <div className="mt-5 flex items-center gap-3 rounded-lg border border-danger/30 bg-danger/10 p-3">
              <AlertCircle className="h-4 w-4 shrink-0 text-danger" />
              <p className="text-sm text-danger">{error}</p>
            </div>
          )}

          {/* ── Form ── */}
          <form onSubmit={handleSignup} className="mt-6 space-y-4">
            {/* Full Name */}
            <div>
              <label htmlFor="signup-name" className="mb-1.5 block text-sm font-bold text-ink">
                Full Name
              </label>
              <div className="relative">
                <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                <input
                  id="signup-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                  autoComplete="name"
                  style={{ '--input-pl': '2.5rem' } as React.CSSProperties}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="signup-email" className="mb-1.5 block text-sm font-bold text-ink">
                Email address
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                <input
                  id="signup-email"
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
              <label htmlFor="signup-password" className="mb-1.5 block text-sm font-bold text-ink">
                Password
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                <input
                  id="signup-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a strong password"
                  required
                  autoComplete="new-password"
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
              {password.length > 0 && (
                <div className="mt-2">
                  <div className="mb-1 flex gap-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all ${i <= strength ? strengthBars[strength] : 'bg-line'}`}
                      />
                    ))}
                  </div>
                  <p className={`text-xs font-bold ${strengthColors[strength]}`}>{strengthLabels[strength]}</p>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirm-password" className="mb-1.5 block text-sm font-bold text-ink">
                Confirm password
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                <input
                  id="confirm-password"
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat your password"
                  required
                  autoComplete="new-password"
                  style={{ '--input-pl': '2.5rem', paddingRight: '2.75rem' } as React.CSSProperties}
                />
                {confirmPassword && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {password === confirmPassword
                      ? <CheckCircle2 className="h-4 w-4 text-sage" />
                      : <AlertCircle className="h-4 w-4 text-danger" />}
                  </div>
                )}
              </div>
            </div>

            {/* Create Account Button */}
            <button
              id="signup-submit-btn"
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-black text-primary-text transition hover:opacity-90 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-text border-t-transparent" />
                  Creating account...
                </>
              ) : (
                <>
                  Create account
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

          {/* Sign In Link */}
          <div className="mt-5 border-t border-line pt-5">
            <Link
              href="/login"
              className="flex items-center justify-center rounded-xl border border-line px-6 py-3 text-sm font-bold text-ink transition hover:bg-line"
            >
              Sign in instead
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
