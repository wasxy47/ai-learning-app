'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';
import {
  ArrowRight,
  BookOpen,
  Brain,
  CheckCircle2,
  ChevronRight,
  Circle,
  MessageSquare,
  NotebookPen,
  Play,
  Trophy,
} from 'lucide-react';

const features = [
  {
    icon: NotebookPen,
    title: 'Guided lesson flow',
    description: 'Short modules keep each topic readable, trackable, and easy to resume.',
  },
  {
    icon: MessageSquare,
    title: 'Tutor in context',
    description: 'Ask questions from inside a module without losing your current path.',
  },
  {
    icon: Trophy,
    title: 'Quizzes that adapt',
    description: 'Scores highlight weak areas so the study plan stays useful.',
  },
];

const lessonRows = [
  ['Variables & Data Types', 'Complete'],
  ['Loops & Control Flow',   'In progress'],
  ['Functions & Modules',   'Next'],
];

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) router.push('/dashboard');
  }, [user, loading, router]);

  if (!loading && user) return null;

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: 'var(--background)' }}>

      {/* ── Header ── */}
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-6 sm:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl"
            style={{ background: 'var(--primary)', color: 'var(--primary-text)' }}
          >
            <Brain className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em]" style={{ color: 'var(--ink)' }}>
              LearnAI
            </p>
            <p className="text-xs" style={{ color: 'var(--muted)' }}>Focused learning studio</p>
          </div>
        </Link>

        <nav className="flex shrink-0 items-center gap-2">
          <Link
            href="/login"
            className="hidden rounded-xl px-4 py-2 text-sm font-semibold transition hover:opacity-80 sm:inline-flex"
            style={{ color: 'var(--muted)' }}
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            className="primary-action inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-extrabold transition"
          >
            Start free
            <ArrowRight className="h-4 w-4" />
          </Link>
        </nav>
      </header>

      {/* ── Hero ── */}
      <section className="mx-auto grid min-h-[calc(100vh-88px)] max-w-7xl items-center gap-12 px-5 pb-14 pt-8 sm:px-8 lg:grid-cols-[1.03fr_0.97fr]">
        <div className="min-w-0 max-w-3xl">

          {/* Badge */}
          <div
            className="mb-6 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-[0.2em]"
            style={{
              background: 'color-mix(in srgb, var(--primary) 10%, transparent)',
              color: 'var(--primary)',
              border: '1px solid color-mix(in srgb, var(--primary) 20%, transparent)',
            }}
          >
            Study plan + tutor + quiz
          </div>

          <h1
            className="max-w-4xl text-[3.15rem] font-black leading-[1.05] max-[430px]:text-[2.65rem] sm:text-6xl lg:text-7xl"
            style={{ color: 'var(--ink)' }}
          >
            Learn code like you are inside a real studio.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8" style={{ color: 'var(--muted)' }}>
            A focused learning studio for Python, Web Dev, AI, React, DSA, SQL, Git, and TypeScript.
            Lessons, AI chat with memory, quizzes, and progress — all in one place.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/signup"
              id="get-started-btn"
              className="primary-action inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-black transition"
            >
              Open your studio
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/login"
              id="login-btn"
              className="secondary-action inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold transition"
            >
              <Play className="h-4 w-4" />
              Continue learning
            </Link>
          </div>

          {/* Stats row */}
          <div
            className="mt-12 grid grid-cols-1 divide-y border-y py-3 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:py-5"
            style={{ borderColor: 'var(--line)', color: 'var(--line)' }}
          >
            {[['8', 'courses'], ['24', 'bite-size lessons'], ['1', 'AI tutor with memory']].map(([value, label]) => (
              <div key={label} className="px-0 py-3 sm:px-5 sm:py-0 sm:first:pl-0">
                <p className="text-3xl font-black" style={{ color: 'var(--ink)' }}>{value}</p>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color: 'var(--muted)' }}>
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Preview Card ── */}
        <div className="relative min-w-0">
          <div
            className="surface w-full overflow-hidden rounded-2xl"
          >
            {/* Fake window chrome */}
            <div
              className="flex items-center justify-between px-4 py-3 border-b"
              style={{ background: 'var(--paper-soft)', borderColor: 'var(--line)' }}
            >
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: 'var(--danger)' }} />
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: 'var(--copper)' }} />
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: 'var(--sage)' }} />
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--muted)' }}>
                Studio preview
              </p>
            </div>

            <div className="grid gap-4 p-4 sm:grid-cols-[0.86fr_1.14fr]">
              {/* Left column */}
              <aside className="space-y-3">
                <div className="paper-panel rounded-xl p-4">
                  <div className="mb-4 flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-xl"
                      style={{ background: 'color-mix(in srgb, var(--primary) 10%, transparent)', color: 'var(--primary)' }}
                    >
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-black" style={{ color: 'var(--ink)' }}>Python Basics</p>
                      <p className="text-xs" style={{ color: 'var(--muted)' }}>2 of 3 complete</p>
                    </div>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full" style={{ background: 'var(--line)' }}>
                    <div className="h-full w-2/3 rounded-full" style={{ background: 'var(--primary)' }} />
                  </div>
                </div>

                {lessonRows.map(([title, state]) => (
                  <div
                    key={title}
                    className="flex items-center gap-3 rounded-xl p-3"
                    style={{ background: 'var(--paper-soft)', border: '1px solid var(--line)' }}
                  >
                    {state === 'Complete' ? (
                      <CheckCircle2 className="h-5 w-5 shrink-0" style={{ color: 'var(--sage)' }} />
                    ) : state === 'In progress' ? (
                      <Circle className="h-5 w-5 shrink-0" style={{ color: 'var(--primary)' }} />
                    ) : (
                      <Circle className="h-5 w-5 shrink-0" style={{ color: 'var(--muted)' }} />
                    )}
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold" style={{ color: 'var(--ink)' }}>{title}</p>
                      <p className="text-xs" style={{ color: 'var(--muted)' }}>{state}</p>
                    </div>
                  </div>
                ))}
              </aside>

              {/* Right column */}
              <div className="space-y-4">
                <div className="paper-panel rounded-xl p-5">
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.18em]" style={{ color: 'var(--teal)' }}>
                        Today
                      </p>
                      <h2 className="mt-1 text-2xl font-black" style={{ color: 'var(--ink)' }}>Control Flow</h2>
                    </div>
                    <span
                      className="rounded-xl px-3 py-1 text-xs font-bold"
                      style={{ background: 'color-mix(in srgb, var(--primary) 10%, transparent)', color: 'var(--primary)' }}
                    >
                      18 min
                    </span>
                  </div>
                  <div className="space-y-2">
                    {['100%', '90%', '66%'].map((w, i) => (
                      <div
                        key={i}
                        className="h-2.5 rounded-full"
                        style={{ width: w, background: 'var(--line)' }}
                      />
                    ))}
                  </div>
                  <button
                    className="mt-6 inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold primary-action"
                  >
                    Start lesson
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="surface-soft rounded-xl p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.14em]" style={{ color: 'var(--teal)' }}>
                      Tutor note
                    </p>
                    <p className="mt-2 text-sm leading-6" style={{ color: 'var(--ink)' }}>
                      Review loops before the quiz.
                    </p>
                  </div>
                  <div className="surface-soft rounded-xl p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.14em]" style={{ color: 'var(--copper)' }}>
                      Quiz score
                    </p>
                    <p className="mt-2 text-3xl font-black" style={{ color: 'var(--ink)' }}>82%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features Section ── */}
      <section className="border-t px-5 py-16 sm:px-8" style={{ borderColor: 'var(--line)', background: 'var(--paper-soft)' }}>
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="surface-soft rounded-2xl p-6">
              <feature.icon className="mb-5 h-6 w-6" style={{ color: 'var(--primary)' }} />
              <h2 className="text-lg font-black" style={{ color: 'var(--ink)' }}>{feature.title}</h2>
              <p className="mt-3 text-sm leading-6" style={{ color: 'var(--muted)' }}>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
