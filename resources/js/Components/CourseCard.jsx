import React from 'react';
import { Badge } from '../UI';

/**
 * Course/CourseCard
 * --------------------
 * Public catalog card — distinct from the learner dashboard's inline card
 * (which shows progress). This one sells the course: price, credit type,
 * topic, and a short description.
 *
 * Props: course = {
 *   id, slug, title, topic, creditType, creditHours, price, description,
 *   accentColor  // e.g. '#3F5945' — a small identifying wash per topic
 * }
 */
export default function CourseCard({ course }) {
  return (
    <a
      href={`/courses/${course.slug}`}
      className="group flex flex-col border border-line rounded-lg overflow-hidden bg-white/40 hover:border-moss transition-colors"
    >
      <div
        className="h-2"
        style={{ backgroundColor: course.accentColor || '#3F5945' }}
      />
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3">
          <Badge tone="citrus">{course.creditType}</Badge>
          <Badge tone="neutral">{course.creditHours} hrs</Badge>
        </div>

        <div className="font-display text-lg leading-snug mb-2">
          {course.title}
        </div>
        <p className="text-sm text-ink/60 line-clamp-2 mb-5 flex-1">
          {course.description}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-line">
          <span className="font-data text-lg text-ink">${course.price}</span>
          <span className="text-sm text-moss group-hover:underline underline-offset-4">
            View course →
          </span>
        </div>
      </div>
    </a>
  );
}
