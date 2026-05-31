'use client';

import { useState } from 'react';
import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';
import LessonItem from '@/components/LessonItem';
import { useAuth } from '@/components/AuthProvider';
import { useUserData } from '@/hooks/useUserData';
import { markLessonComplete } from '@/lib/firestore';
import { MODULES } from '@/lib/modules-data';
import { Module, Lesson } from '@/types';
import { BookOpen, CheckCircle2, ChevronRight, MessageSquare, Trophy } from 'lucide-react';

function renderContent(content: string) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let codeBlock: string[] = [];
  let inCode = false;
  let codeKey = 0;

  lines.forEach((line, i) => {
    if (line.startsWith('```')) {
      if (inCode) {
        elements.push(
          <pre key={`code-${codeKey++}`} className="my-3 overflow-x-auto rounded-lg border border-line bg-paper-soft p-4">
            <code className="font-mono text-xs text-sage">{codeBlock.join('\n')}</code>
          </pre>
        );
        codeBlock = [];
        inCode = false;
      } else {
        inCode = true;
      }
      return;
    }
    if (inCode) {
      codeBlock.push(line);
      return;
    }

    const formatInlineCode = (value: string) =>
      value.split('`').map((part, j) =>
      j % 2 === 1 ? (
        <code key={j} className="rounded bg-primary/10 px-1 py-0.5 font-mono text-xs text-primary">
          {part}
        </code>
      ) : (
        part
      )
    );
    const inlineCode = formatInlineCode(line);

    if (line.startsWith('**') && line.endsWith('**') && line.length > 4) {
      elements.push(
        <p key={i} className="mb-1 mt-4 font-black text-primary">
          {line.replace(/\*\*/g, '')}
        </p>
      );
    } else if (line.startsWith('- ')) {
      elements.push(
        <li key={i} className="ml-4 list-disc text-ink">
          {formatInlineCode(line.slice(2))}
        </li>
      );
    } else if (line.trim() === '') {
      elements.push(<div key={i} className="h-2" />);
    } else {
      elements.push(
        <p key={i} className="text-sm leading-7 text-ink">
          {inlineCode}
        </p>
      );
    }
  });

  return <div className="space-y-1">{elements}</div>;
}

function ModulesContent() {
  const { user } = useAuth();
  const { userData, setUserData, refetch } = useUserData();
  const [selectedModule, setSelectedModule] = useState<Module>(MODULES[0]);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [markingComplete, setMarkingComplete] = useState<string | null>(null);

  const handleMarkComplete = async (lessonId: string) => {
    if (!user) return;
    setMarkingComplete(lessonId);
    
    // Optimistic UI Update
    if (userData) {
      setUserData({
        ...userData,
        completedLessons: [...(userData.completedLessons || []), lessonId],
      });
    }

    try {
      await markLessonComplete(user.uid, lessonId);
      // We don't necessarily need to refetch immediately, but it's safe to do so in background
      void refetch();
    } finally {
      setMarkingComplete(null);
    }
  };

  const completedLessons = userData?.completedLessons || [];
  const moduleProgress = selectedModule.lessons.filter((l) =>
    completedLessons.includes(l.id)
  ).length;
  const moduleProgressPercent = Math.round((moduleProgress / selectedModule.lessons.length) * 100);

  return (
    <div className="min-h-screen px-4 pb-16 pt-24 sm:px-6 lg:px-8 page-bg">
      <div className="mx-auto max-w-7xl">
        <section className="mb-8 flex flex-col justify-between gap-5 border-b border-line pb-7 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-teal">
              Curriculum
            </p>
            <h1 className="mt-3 text-4xl font-black text-ink">Learning modules</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
              Choose a track, read the lesson, ask the tutor, then check retention with a quiz.
            </p>
          </div>
          <div className="surface-soft rounded-lg px-4 py-3 border border-line">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
              Active track
            </p>
            <p className="mt-1 text-sm font-black text-ink">
              {selectedModule.title} - {moduleProgressPercent}%
            </p>
          </div>
        </section>

        <div className="mb-8 flex gap-3 overflow-x-auto pb-2">
          {MODULES.map((module) => {
            const completed = module.lessons.filter((l) => completedLessons.includes(l.id)).length;
            const progress = Math.round((completed / module.lessons.length) * 100);
            const isActive = selectedModule.id === module.id;
            return (
              <button
                key={module.id}
                onClick={() => {
                  setSelectedModule(module);
                  setSelectedLesson(null);
                }}
                className={`flex items-center gap-3 rounded-lg border px-5 py-3 text-sm font-bold whitespace-nowrap transition ${
                  isActive
                    ? 'border-primary/50 bg-primary/10 text-primary'
                    : 'border-line bg-paper-soft text-muted hover:border-primary/30 hover:bg-line'
                }`}
              >
                <span className="text-lg">{module.icon}</span>
                <span>{module.title}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs ${
                    progress === 100
                      ? 'bg-sage/15 text-sage'
                      : 'bg-line text-muted'
                  }`}
                >
                  {progress}%
                </span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <aside className="lg:col-span-1">
            <div className="surface rounded-lg p-5">
              <div className="mb-4 flex items-center gap-3 border-b border-line pb-4">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${selectedModule.color} text-xl`}
                >
                  {selectedModule.icon}
                </div>
                <div>
                  <h2 className="font-black text-ink">{selectedModule.title}</h2>
                  <p className="text-xs text-muted">
                    {moduleProgress}/{selectedModule.lessons.length} lessons complete
                  </p>
                </div>
              </div>

              <div className="mb-5 h-2 overflow-hidden rounded-full bg-line">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${selectedModule.color} transition-all duration-700`}
                  style={{ width: `${moduleProgressPercent}%` }}
                />
              </div>

              <div className="mb-5 space-y-2">
                {selectedModule.lessons.map((lesson) => (
                  <LessonItem
                    key={lesson.id}
                    lesson={lesson}
                    isCompleted={completedLessons.includes(lesson.id)}
                    isSelected={selectedLesson?.id === lesson.id}
                    onSelect={() => setSelectedLesson(lesson)}
                    onMarkComplete={() => handleMarkComplete(lesson.id)}
                    isLoading={markingComplete === lesson.id}
                  />
                ))}
              </div>

              <div className="space-y-2 border-t border-line pt-4">
                <Link
                  href={`/chat/${selectedModule.id}`}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-primary/25 bg-primary/10 py-2.5 text-sm font-black text-primary transition hover:bg-primary/20"
                >
                  <MessageSquare className="h-4 w-4" />
                  Ask tutor
                </Link>
                <Link
                  href={`/quiz/${selectedModule.id}`}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-line bg-paper py-2.5 text-sm font-bold text-ink transition hover:bg-line"
                >
                  <Trophy className="h-4 w-4" />
                  Take quiz
                </Link>
              </div>
            </div>
          </aside>

          <section className="lg:col-span-2">
            {selectedLesson ? (
              <div className="surface rounded-lg p-6 animate-fade-in">
                <div className="mb-6 flex flex-col justify-between gap-4 border-b border-line pb-5 sm:flex-row sm:items-start">
                  <div>
                    <div className="mb-2 flex items-center gap-2 text-xs text-muted">
                      <BookOpen className="h-3.5 w-3.5" />
                      <span>{selectedModule.title}</span>
                      <ChevronRight className="h-3 w-3" />
                      <span>{selectedLesson.title}</span>
                    </div>
                    <h2 className="text-2xl font-black text-ink">{selectedLesson.title}</h2>
                  </div>
                  {completedLessons.includes(selectedLesson.id) ? (
                    <span className="inline-flex items-center gap-1.5 rounded-lg border border-sage/30 bg-sage/10 px-3 py-1.5 text-xs font-black text-sage">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Completed
                    </span>
                  ) : (
                    <button
                      onClick={() => handleMarkComplete(selectedLesson.id)}
                      disabled={markingComplete === selectedLesson.id}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-sage/30 bg-sage/10 px-3 py-1.5 text-xs font-black text-sage transition hover:bg-sage/20 disabled:opacity-50"
                    >
                      {markingComplete === selectedLesson.id ? (
                        <>
                          <span className="h-3 w-3 animate-spin rounded-full border-2 border-sage border-t-transparent" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Mark done
                        </>
                      )}
                    </button>
                  )}
                </div>
                <div className="lesson-content">{renderContent(selectedLesson.content)}</div>
              </div>
            ) : (
              <div className="surface rounded-lg p-8 text-center md:p-12">
                <div
                  className={`mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-br ${selectedModule.color} text-3xl`}
                >
                  {selectedModule.icon}
                </div>
                <h3 className="text-2xl font-black text-ink">{selectedModule.title}</h3>
                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted">
                  {selectedModule.description}
                </p>
                <button
                  onClick={() => setSelectedLesson(selectedModule.lessons[0])}
                  className="primary-action mt-6 inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-black transition"
                >
                  <BookOpen className="h-4 w-4" />
                  Start first lesson
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default function ModulesPage() {
  return (
    <ProtectedRoute>
      <ModulesContent />
    </ProtectedRoute>
  );
}
