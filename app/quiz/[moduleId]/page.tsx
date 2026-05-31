'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/components/AuthProvider';
import { useUserData } from '@/hooks/useUserData';
import { getModuleById } from '@/lib/modules-data';
import {
  ArrowLeft,
  CheckCircle2,
  MessageSquare,
  RotateCcw,
  Trophy,
  XCircle,
} from 'lucide-react';

function QuizContent({ moduleId }: { moduleId: string }) {
  const { user } = useAuth();
  const { userData, setUserData, refetch } = useUserData();
  const learningModule = getModuleById(moduleId);

  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState('');

  if (!learningModule) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-24 page-bg">
        <div className="text-center">
          <h2 className="mb-2 text-xl font-black text-ink">Module not found</h2>
          <Link href="/modules" className="text-primary hover:underline">
            Back
          </Link>
        </div>
      </div>
    );
  }

  const handleSelect = (questionId: string, optionIndex: number) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmit = async () => {
    if (Object.keys(selectedAnswers).length < learningModule.quiz.length) return;
    setSubmitting(true);

    const correctCount = learningModule.quiz.filter(
      (q) => selectedAnswers[q.id] === q.correctIndex
    ).length;
    const percentage = Math.round((correctCount / learningModule.quiz.length) * 100);
    setScore(percentage);
    setSubmitted(true);

    // Optimistic UI Update
    if (userData) {
      setUserData({
        ...userData,
        quizScores: {
          ...userData.quizScores,
          [learningModule.title]: percentage,
        }
      });
    }

    try {
      const res = await fetch('/api/quiz-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.uid,
          moduleName: learningModule.title,
          score: percentage,
        }),
      });
      const data = await res.json();
      setFeedback(data.message || '');
      void refetch(); // Refresh quietly in background
    } catch {
      console.error('Failed to save quiz result');
    } finally {
      setSubmitting(false);
    }
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    setScore(0);
    setFeedback('');
  };

  const isPassing = score >= 60;
  const allAnswered = Object.keys(selectedAnswers).length === learningModule.quiz.length;

  return (
    <div className="min-h-screen px-4 pb-16 pt-24 sm:px-6 page-bg">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex flex-col justify-between gap-5 border-b border-line pb-6 sm:flex-row sm:items-end">
          <div>
            <Link
              href="/modules"
              className="mb-4 inline-flex items-center gap-1.5 text-sm font-bold text-muted transition hover:text-ink"
            >
              <ArrowLeft className="h-4 w-4" />
              Modules
            </Link>
            <div className="flex items-center gap-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${learningModule.color} text-lg`}
              >
                {learningModule.icon}
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-teal">
                  Quiz
                </p>
                <h1 className="text-2xl font-black text-ink">{learningModule.title}</h1>
              </div>
            </div>
          </div>
          <div className="surface-soft rounded-lg px-4 py-3 border border-line">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
              Questions
            </p>
            <p className="text-lg font-black text-ink">{learningModule.quiz.length}</p>
          </div>
        </div>

        {userData?.quizScores?.[learningModule.title] !== undefined && !submitted && (
          <div className="mb-6 flex items-center gap-3 rounded-lg border border-line bg-paper-soft p-4">
            <Trophy className="h-4 w-4 text-copper" />
            <span className="text-sm text-ink">
              Previous score:{' '}
              <span
                className={`font-black ${
                  userData.quizScores[learningModule.title] >= 60 ? 'text-sage' : 'text-danger'
                }`}
              >
                {userData.quizScores[learningModule.title]}%
              </span>
            </span>
          </div>
        )}

        {submitted && (
          <div
            className={`mb-8 rounded-lg border p-6 animate-fade-in ${
              isPassing
                ? 'border-sage/30 bg-sage/10'
                : 'border-danger/30 bg-danger/10'
            }`}
          >
            <div className="mb-3 flex items-center gap-4">
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-lg ${
                  isPassing ? 'bg-sage/15 text-sage' : 'bg-danger/15 text-danger'
                }`}
              >
                {isPassing ? <CheckCircle2 className="h-7 w-7" /> : <XCircle className="h-7 w-7" />}
              </div>
              <div>
                <p className={`text-3xl font-black ${isPassing ? 'text-sage' : 'text-danger'}`}>
                  {score}%
                </p>
                <p className={`text-sm font-bold ${isPassing ? 'text-sage' : 'text-danger'}`}>
                  {isPassing ? 'Passed. Nice work.' : 'Keep practicing. You can recover this.'}
                </p>
              </div>
            </div>
            <p className="text-sm leading-6 text-muted">{feedback}</p>
            {!isPassing && (
              <p className="mt-2 text-xs text-danger">
                {learningModule.title} has been added to weak areas for your next study plan.
              </p>
            )}
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                onClick={resetQuiz}
                className="secondary-action flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition"
              >
                <RotateCcw className="h-4 w-4" />
                Retry
              </button>
              <Link
                href={`/chat/${moduleId}`}
                className="flex items-center gap-2 rounded-lg border border-primary/25 bg-primary/10 px-4 py-2 text-sm font-black text-primary transition hover:bg-primary/20"
              >
                <MessageSquare className="h-4 w-4" />
                Study with tutor
              </Link>
              <Link
                href="/dashboard"
                className="rounded-lg border border-line bg-paper px-4 py-2 text-sm font-bold text-ink transition hover:bg-line"
              >
                Dashboard
              </Link>
            </div>
          </div>
        )}

        <div className="space-y-5">
          {learningModule.quiz.map((question, qIndex) => {
            const selected = selectedAnswers[question.id];
            const isCorrect = submitted && selected === question.correctIndex;
            const isWrong = submitted && selected !== undefined && selected !== question.correctIndex;

            return (
              <div
                key={question.id}
                className={`rounded-lg border p-6 transition-all ${
                  submitted
                    ? isCorrect
                      ? 'border-sage/40 bg-sage/10'
                      : isWrong
                        ? 'border-danger/40 bg-danger/10'
                        : 'border-line bg-paper-soft'
                    : 'surface hover:border-primary/30'
                }`}
              >
                <div className="mb-5 flex items-start gap-3">
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-black ${
                      submitted && isCorrect
                        ? 'bg-sage/15 text-sage'
                        : submitted && isWrong
                          ? 'bg-danger/15 text-danger'
                          : 'bg-primary/10 text-primary'
                    }`}
                  >
                    {qIndex + 1}
                  </span>
                  <h3 className="text-base font-black leading-snug text-ink">
                    {question.question}
                  </h3>
                </div>

                <div className="space-y-2">
                  {question.options.map((option, oIndex) => {
                    const isSelected = selected === oIndex;
                    const isCorrectOption = submitted && oIndex === question.correctIndex;
                    const isWrongSelected = submitted && isSelected && oIndex !== question.correctIndex;

                    return (
                      <button
                        key={oIndex}
                        onClick={() => handleSelect(question.id, oIndex)}
                        disabled={submitted}
                        className={`flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-all ${
                          isCorrectOption
                            ? 'border-sage/50 bg-sage/15 text-sage'
                            : isWrongSelected
                              ? 'border-danger/50 bg-danger/15 text-danger'
                              : isSelected
                                ? 'border-primary/50 bg-primary/10 text-primary'
                                : 'border-line text-ink hover:border-primary/30 hover:bg-primary/5 disabled:hover:border-line disabled:hover:bg-transparent'
                        }`}
                      >
                        <span
                          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs font-black ${
                            isCorrectOption
                              ? 'border-sage bg-sage/20 text-sage'
                              : isWrongSelected
                                ? 'border-danger bg-danger/20 text-danger'
                                : isSelected
                                  ? 'border-primary bg-primary/20 text-primary'
                                  : 'border-muted text-muted'
                          }`}
                        >
                          {String.fromCharCode(65 + oIndex)}
                        </span>
                        <span className="min-w-0 flex-1">{option}</span>
                        {isCorrectOption && <CheckCircle2 className="ml-auto h-4 w-4 text-sage" />}
                        {isWrongSelected && <XCircle className="ml-auto h-4 w-4 text-danger" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {!submitted && (
          <div className="mt-8 flex items-center justify-between gap-4">
            <p className="text-sm font-bold text-muted">
              {Object.keys(selectedAnswers).length}/{learningModule.quiz.length} answered
            </p>
            <button
              id="submit-quiz-btn"
              onClick={handleSubmit}
              disabled={!allAnswered || submitting}
              className="primary-action flex items-center gap-2 rounded-lg px-8 py-3 text-sm font-black transition disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-text border-t-transparent" />
                  Submitting...
                </>
              ) : (
                <>
                  <Trophy className="h-4 w-4" />
                  Submit quiz
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function QuizPage({ params }: { params: Promise<{ moduleId: string }> }) {
  const { moduleId } = use(params);
  return (
    <ProtectedRoute>
      <QuizContent moduleId={moduleId} />
    </ProtectedRoute>
  );
}
