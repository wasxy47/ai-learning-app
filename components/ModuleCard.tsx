'use client';

import Link from 'next/link';
import { Module } from '@/types';
import { BookOpen, MessageSquare, Trophy, ChevronRight } from 'lucide-react';

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
    <div className="group relative bg-slate-900/60 border border-white/10 rounded-2xl p-6 hover:border-violet-500/40 hover:bg-slate-900/80 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/10 hover:-translate-y-1">
      {/* Gradient glow */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${module.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${module.color} flex items-center justify-center text-2xl shadow-lg`}>
          {module.icon}
        </div>
        {quizScore !== undefined && (
          <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold ${
            quizScore >= 60
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'bg-red-500/20 text-red-400 border border-red-500/30'
          }`}>
            <Trophy className="w-3 h-3" />
            {quizScore}%
          </div>
        )}
      </div>

      {/* Title & Description */}
      <h3 className="font-bold text-white text-lg mb-1 group-hover:text-violet-200 transition-colors">
        {module.title}
      </h3>
      <p className="text-slate-400 text-sm mb-5 leading-relaxed">{module.description}</p>

      {/* Progress Bar */}
      <div className="mb-5">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="text-slate-400">Progress</span>
          <span className={`font-semibold ${progress === 100 ? 'text-emerald-400' : 'text-violet-400'}`}>
            {completedCount}/{module.lessons.length} lessons · {progress}%
          </span>
        </div>
        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${module.color} rounded-full transition-all duration-700`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Link
          href={`/modules`}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-violet-500/10 hover:bg-violet-500/20 text-violet-300 text-sm font-medium border border-violet-500/20 hover:border-violet-500/40 transition-all"
        >
          <BookOpen className="w-3.5 h-3.5" />
          Study
        </Link>
        <Link
          href={`/chat/${module.id}`}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-sm font-medium border border-white/10 hover:border-white/20 transition-all"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          Chat
        </Link>
        <Link
          href={`/quiz/${module.id}`}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-sm font-medium border border-white/10 hover:border-white/20 transition-all"
        >
          <Trophy className="w-3.5 h-3.5" />
          Quiz
        </Link>
      </div>
    </div>
  );
}
