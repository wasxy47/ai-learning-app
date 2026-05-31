'use client';

import Link from 'next/link';
import { Module } from '@/types';
import { BookOpen, MessageSquare, Trophy } from 'lucide-react';

interface ModuleCardProps {
  module: Module;
  completedLessons: string[];
  quizScore?: number;
}

export default function ModuleCard({ module, completedLessons, quizScore }: ModuleCardProps) {
  const completedCount = module.lessons.filter((l) =>
    completedLessons.includes(l.id)
  ).length;
  const progress = Math.round((completedCount / module.lessons.length) * 100);

  return (
    <article className="surface group rounded-lg p-5 transition hover:-translate-y-0.5 hover:border-primary/30">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${module.color} text-xl shadow-lg shadow-black/20`}
          >
            {module.icon}
          </div>
          <div>
            <h3 className="text-lg font-black text-ink">{module.title}</h3>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
              {module.lessons.length} lessons
            </p>
          </div>
        </div>
        {quizScore !== undefined && (
          <div
            className={`flex items-center gap-1 rounded-lg border px-2 py-1 text-xs font-black ${
              quizScore >= 60
                ? 'border-sage/30 bg-sage/10 text-sage'
                : 'border-danger/30 bg-danger/10 text-danger'
            }`}
          >
            <Trophy className="h-3 w-3" />
            {quizScore}%
          </div>
        )}
      </div>

      <p className="min-h-[48px] text-sm leading-6 text-muted">{module.description}</p>

      <div className="my-5">
        <div className="mb-2 flex items-center justify-between text-xs font-bold">
          <span className="uppercase tracking-[0.16em] text-muted">Progress</span>
          <span className={progress === 100 ? 'text-sage' : 'text-primary'}>
            {completedCount}/{module.lessons.length} lessons - {progress}%
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-line">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${module.color} transition-all duration-700`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <Link
          href="/modules"
          className="flex items-center justify-center gap-2 rounded-lg border border-primary/25 bg-primary/10 px-3 py-2 text-sm font-bold text-primary transition hover:bg-primary/20"
        >
          <BookOpen className="h-3.5 w-3.5" />
          Study
        </Link>
        <Link
          href={`/chat/${module.id}`}
          className="flex items-center justify-center gap-2 rounded-lg border border-line bg-paper-soft px-3 py-2 text-sm font-bold text-ink transition hover:bg-line hover:text-ink"
        >
          <MessageSquare className="h-3.5 w-3.5" />
          Chat
        </Link>
        <Link
          href={`/quiz/${module.id}`}
          className="flex items-center justify-center gap-2 rounded-lg border border-line bg-paper-soft px-3 py-2 text-sm font-bold text-ink transition hover:bg-line hover:text-ink"
        >
          <Trophy className="h-3.5 w-3.5" />
          Quiz
        </Link>
      </div>
    </article>
  );
}
