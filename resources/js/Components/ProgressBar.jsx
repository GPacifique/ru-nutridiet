import React from 'react';

/**
 * Course/ProgressBar
 * ---------------------
 * Slim linear complement to PlateProgress (the ring) — for contexts where a
 * ring is too heavy: table rows, compact list items, admin views. Same
 * color logic (citrus while in progress, moss when complete).
 *
 * Props: percent (0–100), showLabel (default true), size ('sm' | 'md')
 */
export default function ProgressBar({ percent = 0, showLabel = true, size = 'md' }) {
  const clamped = Math.max(0, Math.min(100, percent));
  const isComplete = clamped >= 100;
  const height = size === 'sm' ? 'h-1.5' : 'h-2.5';

  return (
    <div className="flex items-center gap-3 w-full">
      <div className={`flex-1 ${height} rounded-full bg-line/60 overflow-hidden`}>
        <div
          className={`${height} rounded-full transition-all duration-500`}
          style={{
            width: `${clamped}%`,
            backgroundColor: isComplete ? '#3F5945' : '#D98E2B',
          }}
        />
      </div>
      {showLabel && (
        <span className="font-data text-xs text-ink/60 w-9 text-right shrink-0">
          {clamped}%
        </span>
      )}
    </div>
  );
}
