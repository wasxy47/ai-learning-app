'use client';

import { CheckCircle2, Circle } from 'lucide-react';
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
      className={`group cursor-pointer rounded-lg border transition-all duration-200 ${
        isSelected
          ? 'border-primary/50 bg-primary/10'
          : 'border-line bg-paper-soft hover:border-primary/30 hover:bg-line'
      }`}
      onClick={onSelect}
    >
      <div className="flex items-center gap-3 p-4">
        <div className="shrink-0">
          {isCompleted ? (
            <CheckCircle2 className="h-5 w-5 text-sage" />
          ) : (
            <Circle
              className={`h-5 w-5 ${
                isSelected ? 'fill-primary/20 text-primary' : 'text-muted'
              }`}
            />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <p
            className={`truncate text-sm font-bold ${
              isCompleted
                ? 'text-sage'
                : isSelected
                  ? 'text-primary'
                  : 'text-ink'
            }`}
          >
            {lesson.title}
          </p>
          {isCompleted && <p className="mt-0.5 text-xs text-sage/75">Completed</p>}
        </div>

        {isSelected && !isCompleted && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMarkComplete();
            }}
            disabled={isLoading}
            className="shrink-0 rounded-lg border border-sage/30 bg-sage/10 px-3 py-1.5 text-xs font-black text-sage transition hover:bg-sage/20 disabled:opacity-50"
          >
            {isLoading ? (
              <span className="flex items-center gap-1">
                <span className="h-3 w-3 animate-spin rounded-full border-2 border-sage border-t-transparent" />
                Saving...
              </span>
            ) : (
              'Mark done'
            )}
          </button>
        )}
      </div>
    </div>
  );
}
