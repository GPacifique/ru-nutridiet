import React, { useMemo, useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import CourseCard from '@/Components/Course/CourseCard';
import Input from '@/Components/UI/Input';
import Select from '@/Components/UI/Select';

/**
 * Courses/Catalog.jsx (public)
 * -------------------------------
 * Props:
 *  - courses: [{
 *      id, slug, title, topic, creditType, creditHours, price,
 *      description, accentColor
 *    }]
 *
 * Filtering happens client-side here for a snappy feel on a course count
 * that's realistically in the dozens/low hundreds. If your catalog grows
 * much larger, move this to server-side query params instead.
 */
export default function Catalog({ courses = MOCK_COURSES }) {
  const [creditType, setCreditType] = useState('all');
  const [topic, setTopic] = useState('all');
  const [search, setSearch] = useState('');

  const creditTypeOptions = useMemo(
    () => uniqueOptions(courses, 'creditType', 'All credit types'),
    [courses]
  );
  const topicOptions = useMemo(
    () => uniqueOptions(courses, 'topic', 'All topics'),
    [courses]
  );

  const filtered = courses.filter((c) => {
    if (creditType !== 'all' && c.creditType !== creditType) return false;
    if (topic !== 'all' && c.topic !== topic) return false;
    if (search && !c.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <GuestLayout>
      <div className="mb-10 max-w-2xl">
        <div className="text-[11px] uppercase tracking-widest text-citrus font-medium mb-2">
          Course catalog
        </div>
        <h1 className="font-display text-3xl mb-3">
          Continuing education built for working nutrition professionals
        </h1>
        <p className="text-ink/60 text-sm">
          Every course is credit-eligible and self-paced — pass the exam,
          download your certificate, keep your accreditation current.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8 items-end">
        <div className="col-span-2">
          <Input
            label="Search"
            id="search"
            placeholder="Search courses…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select
          label="Credit type"
          id="creditType"
          value={creditType}
          onChange={(e) => setCreditType(e.target.value)}
          options={creditTypeOptions}
        />
        <Select
          label="Topic"
          id="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          options={topicOptions}
        />
      </div>

      <div className="text-sm text-ink/50 mb-4">
        {filtered.length} course{filtered.length === 1 ? '' : 's'}
      </div>

      {filtered.length === 0 ? (
        <div className="border border-dashed border-line rounded-lg py-14 text-center">
          <div className="font-display text-lg mb-1">No courses match</div>
          <p className="text-sm text-ink/60">Try clearing a filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-5">
          {filtered.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </GuestLayout>
  );
}

function uniqueOptions(courses, key, allLabel) {
  const values = [...new Set(courses.map((c) => c[key]))];
  return [
    { value: 'all', label: allLabel },
    ...values.map((v) => ({ value: v, label: v })),
  ];
}

const MOCK_COURSES = [
  {
    id: 1,
    slug: 'clinical-foundations-macronutrients',
    title: 'Clinical Foundations of Macronutrients',
    topic: 'Clinical Nutrition',
    creditType: 'CPE',
    creditHours: 4,
    price: 149,
    description:
      'A grounding in carbohydrate, protein, and fat metabolism for practicing dietitians.',
    accentColor: '#3F5945',
  },
  {
    id: 2,
    slug: 'micronutrient-deficiencies-in-practice',
    title: 'Micronutrient Deficiencies in Practice',
    topic: 'Clinical Nutrition',
    creditType: 'CPE',
    creditHours: 3,
    price: 119,
    description:
      'Recognize and address common deficiencies using current lab-reference ranges.',
    accentColor: '#D98E2B',
  },
  {
    id: 3,
    slug: 'behavior-change-counseling',
    title: 'Behavior Change Counseling',
    topic: 'Practice Skills',
    creditType: 'CEU',
    creditHours: 6,
    price: 199,
    description:
      'Motivational interviewing techniques adapted specifically for nutrition counseling.',
    accentColor: '#7A3B3F',
  },
  {
    id: 4,
    slug: 'pediatric-nutrition-essentials',
    title: 'Pediatric Nutrition Essentials',
    topic: 'Life Stages',
    creditType: 'CPE',
    creditHours: 5,
    price: 169,
    description:
      'Growth charts, feeding difficulties, and family-centered planning for young clients.',
    accentColor: '#3F5945',
  },
  {
    id: 5,
    slug: 'sports-nutrition-for-endurance-athletes',
    title: 'Sports Nutrition for Endurance Athletes',
    topic: 'Performance',
    creditType: 'CEU',
    creditHours: 4,
    price: 159,
    description:
      'Fueling strategy, hydration, and periodized nutrition plans for endurance training.',
    accentColor: '#D98E2B',
  },
  {
    id: 6,
    slug: 'intro-to-applied-nutrition',
    title: 'Introduction to Applied Nutrition',
    topic: 'Foundations',
    creditType: 'CPE',
    creditHours: 6,
    price: 129,
    description:
      'The prerequisite course for the full certification track — start here.',
    accentColor: '#7A3B3F',
  },
];