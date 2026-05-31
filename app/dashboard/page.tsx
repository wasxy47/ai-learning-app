'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';
import ModuleCard from '@/components/ModuleCard';
import StudyPlanCard from '@/components/StudyPlanCard';
import { useAuth } from '@/components/AuthProvider';
import { useUserData } from '@/hooks/useUserData';
import { MODULES } from '@/lib/modules-data';
import {
  ArrowRight,
  BookOpen,
  Flame,
  RefreshCw,
  Target,
  TrendingUp,
  Trophy,
} from 'lucide-react';

function DashboardContent() {
  const { user } = useAuth();
  const { userData, loading: userLoading } = useUserData();
  const [studyPlan, setStudyPlan] = useState<string[]>([]);
  const [planLoading, setPlanLoading] = useState(false);
  const [planError, setPlanError] = useState('');

  const fetchStudyPlan = useCallback(async () => {
    if (!userData) return;
    setPlanLoading(true);
    setPlanError('');
    try {
      const res = await fetch('/api/study-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          weakAreas: userData.weakAreas || [],
          completedLessons: userData.completedLessons || [],
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setStudyPlan(data.plan || []);
    } catch {
      setPlanError('Could not generate study plan. Please try again.');
    } finally {
      setPlanLoading(false);
    }
  }, [userData]);

  useEffect(() => {
    if (userData && studyPlan.length === 0) {
      const id = window.setTimeout(() => {
        void fetchStudyPlan();
      }, 0);

      return () => window.clearTimeout(id);
    }
  }, [userData, fetchStudyPlan, studyPlan.length]);

  const totalLessons = MODULES.reduce((sum, m) => sum + m.lessons.length, 0);
  const completedCount = userData?.completedLessons?.length || 0;
  const overallProgress = Math.round((completedCount / totalLessons) * 100);
  const quizzesTaken = Object.keys(userData?.quizScores || {}).length;
  const avgScore =
    quizzesTaken > 0
      ? Math.round(
          Object.values(userData?.quizScores || {}).reduce((a, b) => a + b, 0) /
            quizzesTaken
        )
      : 0;

  const stats = [
    {
      label: 'Progress',
      value: `${overallProgress}%`,
      sub: `${completedCount}/${totalLessons} lessons`,
      icon: TrendingUp,
      tone: 'text-sage',
    },
    {
      label: 'Quizzes',
      value: quizzesTaken,
      sub: `of ${MODULES.length} available`,
      icon: Trophy,
      tone: 'text-copper',
    },
    {
      label: 'Avg score',
      value: quizzesTaken > 0 ? `${avgScore}%` : '-',
      sub: quizzesTaken > 0 ? (avgScore >= 60 ? 'Passing' : 'Needs review') : 'No quizzes yet',
      icon: Flame,
      tone: avgScore >= 60 ? 'text-sage' : 'text-danger',
    },
    {
      label: 'Weak areas',
      value: userData?.weakAreas?.length || 0,
      sub:
        (userData?.weakAreas?.length ?? 0) > 0
          ? userData!.weakAreas.join(', ')
          : 'Clear for now',
      icon: Target,
      tone: 'text-blue',
    },
  ];

  const isNewUser = user?.metadata?.creationTime === user?.metadata?.lastSignInTime;
  const greeting = isNewUser ? 'Welcome' : 'Welcome back';
  const displayName = user?.displayName || user?.email?.split('@')[0] || 'Student';

  return (
    <div className="min-h-screen px-4 pb-16 pt-24 sm:px-6 lg:px-8 page-bg">
      <div className="mx-auto max-w-7xl">
        <section className="mb-8 grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="surface rounded-xl p-6 sm:p-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-teal">
              Dashboard
            </p>
            <h1 className="mt-3 max-w-3xl text-3xl font-black leading-tight text-ink md:text-5xl">
              {greeting},{' '}
              <span className="gradient-text">{displayName}</span>
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-muted">
              Your learning workspace is organized around progress, practice, and the next
              useful step.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/modules"
                className="primary-action inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-black transition"
              >
                Continue lessons
                <ArrowRight className="h-4 w-4" />
              </Link>
              <button
                onClick={fetchStudyPlan}
                disabled={planLoading}
                className="secondary-action inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold transition disabled:opacity-60"
              >
                <RefreshCw className={`h-4 w-4 ${planLoading ? 'animate-spin' : ''}`} />
                Refresh plan
              </button>
            </div>
          </div>

          <div className="paper-panel rounded-xl p-6">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-teal">
              Studio pulse
            </p>
            <div className="mt-5 space-y-4">
              <div>
                <div className="mb-2 flex items-center justify-between text-sm font-bold text-ink">
                  <span>Overall completion</span>
                  <span>{overallProgress}%</span>
                </div>
                <div className="h-2 rounded-full bg-line">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-700"
                    style={{ width: `${overallProgress}%` }}
                  />
                </div>
              </div>
              <p className="text-sm leading-6 text-muted">
                Finish one lesson, ask one tutor question, then take one quiz. Small loops
                make the dashboard feel alive.
              </p>
            </div>
          </div>
        </section>

        {userLoading ? (
          <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="surface rounded-lg p-5">
                <div className="mb-3 h-4 w-3/4 animate-pulse rounded bg-line" />
                <div className="mb-2 h-8 w-1/2 animate-pulse rounded bg-line" />
                <div className="h-3 w-full animate-pulse rounded bg-line" />
              </div>
            ))}
          </div>
        ) : (
          <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="surface-soft rounded-lg p-5">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-muted">
                    {stat.label}
                  </p>
                  <stat.icon className={`h-4 w-4 ${stat.tone}`} />
                </div>
                <p className={`mb-1 text-3xl font-black ${stat.tone}`}>{stat.value}</p>
                <p className="truncate text-xs text-muted">{stat.sub}</p>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-teal">
                  Modules
                </p>
                <h2 className="mt-1 text-2xl font-black text-ink">Your tracks</h2>
              </div>
              <Link
                href="/modules"
                className="inline-flex items-center gap-1 text-sm font-bold text-primary transition hover:opacity-80"
              >
                View all
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {MODULES.map((module) => (
                <ModuleCard
                  key={module.id}
                  module={module}
                  completedLessons={userData?.completedLessons || []}
                  quizScore={userData?.quizScores?.[module.title]}
                />
              ))}
            </div>
          </div>

          <aside>
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-copper">
                  Next steps
                </p>
                <h2 className="mt-1 text-2xl font-black text-ink">Study plan</h2>
              </div>
              <button
                onClick={fetchStudyPlan}
                disabled={planLoading}
                className="rounded-lg p-2 text-muted transition hover:bg-line hover:text-ink disabled:opacity-50"
                aria-label="Refresh study plan"
              >
                <RefreshCw className={`h-4 w-4 ${planLoading ? 'animate-spin' : ''}`} />
              </button>
            </div>
            <StudyPlanCard points={studyPlan} loading={planLoading} error={planError} />

            {userData && userData.weakAreas && userData.weakAreas.length > 0 && (
              <div className="mt-4 rounded-lg border border-danger/25 bg-danger/10 p-5">
                <h3 className="mb-3 flex items-center gap-2 text-sm font-black text-danger">
                  <BookOpen className="h-4 w-4" />
                  Areas needing attention
                </h3>
                <div className="flex flex-wrap gap-2">
                  {userData.weakAreas.map((area: string) => (
                    <span
                      key={area}
                      className="rounded-lg border border-danger/30 bg-danger/15 px-2.5 py-1 text-xs font-bold text-danger"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
