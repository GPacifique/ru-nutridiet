import React, { useState } from "react";
import { Link, router } from "@inertiajs/react";
import { Search, ChevronRight, BookOpen } from "lucide-react";
import PublicNavigation from "@/Components/PublicNavigation";

/* ------------------------------------------------------------------ */
/*  Courses/Index.jsx — public course catalog                         */
/*                                                                     */
/*  Reuses RUNUTRIDIET's established "clinical readout" language from  */
/*  Home.jsx: Space Grotesk display, IBM Plex Mono for metrics/prices, */
/*  emerald + slate palette. No new design system introduced here —   */
/*  this page needs to feel like the same product as the homepage.    */
/* ------------------------------------------------------------------ */

function CourseCard({ course }) {
  const identifier = course.slug ?? course.id;

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-900/5 transition-all hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-44 overflow-hidden bg-slate-100">
        {course.thumbnail ? (
          <img
            src={course.thumbnail}
            alt={`Illustration for the ${course.title} course`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-slate-300">
            <BookOpen className="h-10 w-10" aria-hidden="true" />
          </div>
        )}
        {course.credit_hours && (
          <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 font-mono text-[11px] font-semibold text-emerald-800 shadow-sm">
            {course.credit_hours} CPD credits
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-base font-semibold leading-snug text-slate-900">
          {course.title}
        </h3>
        {course.instructor?.name && (
          <p className="mt-1 text-sm text-slate-500">{course.instructor.name}</p>
        )}
        {course.description && (
          <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-slate-600">
            {course.description}
          </p>
        )}

        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
          <span className="font-mono text-lg font-semibold text-slate-900">
            {course.price ? `$${course.price}` : "Free"}
          </span>
          <Link
            href={`/courses/${identifier}`}
            className="inline-flex items-center gap-1 rounded-full bg-emerald-700 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-emerald-800"
          >
            View course
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function Pagination({ courses }) {
  if (!courses.links || courses.last_page <= 1) return null;

  return (
    <nav
      aria-label="Course pages"
      className="mt-12 flex flex-wrap items-center justify-center gap-1.5"
    >
      {courses.links.map((link, i) => {
        const label = link.label
          .replace("&laquo; Previous", "Prev")
          .replace("Next &raquo;", "Next");

        if (!link.url) {
          return (
            <span
              key={i}
              className="rounded-full px-3.5 py-2 text-sm text-slate-300"
              dangerouslySetInnerHTML={{ __html: label }}
            />
          );
        }

        return (
          <Link
            key={i}
            href={link.url}
            preserveScroll
            className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
              link.active
                ? "bg-emerald-700 text-white"
                : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-700"
            }`}
            dangerouslySetInnerHTML={{ __html: label }}
          />
        );
      })}
    </nav>
  );
}

/**
 * Props from CourseController@index:
 *   courses: paginator { data: [...], links: [...], current_page, last_page, ... }
 *   filters: { search, status }
 */
export default function Index({ courses, filters = {} }) {
  const [search, setSearch] = useState(filters.search ?? "");
  const list = courses?.data ?? [];

  function submitSearch(e) {
    e.preventDefault();
    router.get(
      "/courses",
      { search, status: filters.status },
      { preserveState: true, preserveScroll: true, replace: true }
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 antialiased">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
        .font-display { font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif; }
        .font-sans { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
        .font-mono { font-family: 'IBM Plex Mono', ui-monospace, monospace; }
      `}</style>

      <PublicNavigation courses={courses} />

      <header className="border-b border-slate-100 bg-slate-50/60">
        <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-700">
            CPD Academy
          </span>
          <h1 className="mt-3 max-w-2xl font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Browse accredited nutrition courses.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600">
            Every course is reviewed by our accreditation board and ends in a
            certificate you can publicly verify.
          </p>

          <form onSubmit={submitSearch} className="mt-8 flex max-w-md gap-2">
            <label htmlFor="course-search" className="sr-only">
              Search courses
            </label>
            <div className="relative flex-1">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />
              <input
                id="course-search"
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search courses…"
                className="w-full rounded-full border border-slate-300 bg-white py-3 pl-11 pr-4 text-sm text-slate-800 shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              />
            </div>
            <button
              type="submit"
              className="rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-800"
            >
              Search
            </button>
          </form>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-16">
        {list.length > 0 ? (
          <>
            <p className="mb-6 font-mono text-xs uppercase tracking-wide text-slate-400">
              {courses.total ?? list.length} course{(courses.total ?? list.length) === 1 ? "" : "s"}
              {filters.search ? ` matching "${filters.search}"` : ""}
            </p>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((course) => (
                <CourseCard key={course.id ?? course.slug} course={course} />
              ))}
            </div>
            <Pagination courses={courses} />
          </>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-200 py-20 text-center">
            <BookOpen className="mx-auto h-8 w-8 text-slate-300" aria-hidden="true" />
            <p className="mt-4 text-sm text-slate-500">
              {filters.search
                ? `No courses match "${filters.search}".`
                : "No courses are published yet."}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}