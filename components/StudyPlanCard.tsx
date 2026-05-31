'use client';

import { AlertCircle, CheckCircle2, Sparkles } from 'lucide-react';

interface StudyPlanCardProps {
  points: string[];
  loading?: boolean;
  error?: string;
}

export default function StudyPlanCard({ points, loading, error }: StudyPlanCardProps) {
  if (loading) {
    return (
      <div className="surface rounded-lg p-6">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h3 className="font-black text-ink">Study plan</h3>
            <p className="text-xs text-muted">Personalizing your path...</p>
          </div>
        </div>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="mt-0.5 h-6 w-6 shrink-0 animate-pulse rounded-full bg-line" />
              <div className="flex-1 space-y-2">
                <div className="h-3 animate-pulse rounded bg-line" style={{ width: `${86 - i * 8}%` }} />
                <div className="h-3 animate-pulse rounded bg-line" style={{ width: `${68 - i * 5}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-3 rounded-lg border border-danger/30 bg-danger/10 p-5">
        <AlertCircle className="h-5 w-5 shrink-0 text-danger" />
        <p className="text-sm text-danger">{error}</p>
      </div>
    );
  }

  return (
    <div className="surface rounded-lg p-6">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Sparkles className="h-4 w-4" />
        </div>
        <div>
          <h3 className="font-black text-ink">Study plan</h3>
          <p className="text-xs text-muted">Your next learning loop</p>
        </div>
      </div>

      {points.length > 0 ? (
        <ol className="space-y-4">
          {points.map((point, i) => (
            <li key={i} className="flex items-start gap-3">
              <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-xs font-black text-primary">
                {i + 1}
              </div>
              <p className="text-sm leading-6 text-ink">
                {point.replace(/^\d+\.\s*/, '').replace(/^\*+\s*/, '')}
              </p>
            </li>
          ))}
        </ol>
      ) : (
        <div className="rounded-lg border border-line bg-paper-soft p-4">
          <CheckCircle2 className="mb-3 h-5 w-5 text-sage" />
          <p className="text-sm leading-6 text-ink">
            Complete a lesson or quiz and your study plan will appear here.
          </p>
        </div>
      )}
    </div>
  );
}
