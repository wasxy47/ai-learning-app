'use client';

import { CheckCircle2, Circle, Lock } from 'lucide-react';
import { Lesson } from '@/types';

interface LessonItemProps {
  lesson: Lesson;
  isCompleted: boolean;
  isSelected: boolean;
  onSelect: () => void;
  onMarkComplete: () => void;
  isLoading?: boolean;
}

export default function LessonItem({
  lesson,
  isCompleted,
  isSelected,
  onSelect,
  onMarkComplete,
  isLoading,
}: LessonItemProps) {
  return (
    <div
      className={`group cursor-pointer rounded-xl border transition-all duration-200 ${
        isSelected
          ? 'border-violet-500/50 bg-violet-500/10'
          : 'border-white/10 bg-slate-900/40 hover:border-white/20 hover:bg-slate-900/60'
      }`}
      onClick={onSelect}
    >
      <div className="flex items-center gap-3 p-4">
        {/* Status Icon */}
        <div className="flex-shrink-0">
          {isCompleted ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          ) : (
            <Circle className={`w-5 h-5 ${isSelected ? 'text-violet-400' : 'text-slate-600 group-hover:text-slate-400'}`} />
          )}
        </div>

        {/* Lesson Title */}
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-medium truncate ${
            isCompleted ? 'text-emerald-300' : isSelected ? 'text-violet-200' : 'text-slate-300'
          }`}>
            {lesson.title}
          </p>
          {isCompleted && (
            <p className="text-xs text-emerald-500/70 mt-0.5">Completed</p>
          )}
        </div>

        {/* Mark Complete Button */}
        {isSelected && !isCompleted && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMarkComplete();
            }}
            disabled={isLoading}
            className="flex-shrink-0 px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 text-xs font-semibold border border-emerald-500/30 hover:border-emerald-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin" />
                Saving...
              </span>
            ) : (
              '✓ Mark Complete'
            )}
          </button>
        )}
      </div>
    </div>
  );
}
