import React from 'react';
import { Link } from '@inertiajs/react';

const CourseCard = ({
    course,
    showInstructor = true,
    showStats = true,
    href = null,
}) => {
    const courseUrl = href || route('courses.show', course.id);

    return (
        <div className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            {/* Course Thumbnail */}
            <Link href={courseUrl}>
                <div className="relative aspect-video overflow-hidden bg-gray-100">
                    {course.thumbnail ? (
                        <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
                            <span className="text-5xl font-bold text-white">
                                {course.title?.charAt(0)}
                            </span>
                        </div>
                    )}

                    {/* Course Status */}
                    {course.status && (
                        <span
                            className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${
                                course.status === 'published'
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-yellow-100 text-yellow-700'
                            }`}
                        >
                            {course.status}
                        </span>
                    )}

                    {/* Price */}
                    <div className="absolute bottom-3 right-3 rounded-lg bg-white px-3 py-1.5 text-sm font-bold text-gray-900 shadow-md">
                        {course.price > 0
                            ? `$${Number(course.price).toLocaleString()}`
                            : 'Free'}
                    </div>
                </div>
            </Link>

            {/* Course Content */}
            <div className="p-5">
                {/* Category */}
                {course.category && (
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-600">
                        {course.category.name}
                    </p>
                )}

                {/* Title */}
                <Link href={courseUrl}>
                    <h3 className="line-clamp-2 text-lg font-bold text-gray-900 transition-colors hover:text-indigo-600">
                        {course.title}
                    </h3>
                </Link>

                {/* Description */}
                {course.description && (
                    <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                        {course.description}
                    </p>
                )}

                {/* Instructor */}
                {showInstructor && course.instructor && (
                    <div className="mt-4 flex items-center gap-3">
                        {course.instructor.avatar ? (
                            <img
                                src={course.instructor.avatar}
                                alt={course.instructor.name}
                                className="h-9 w-9 rounded-full object-cover"
                            />
                        ) : (
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-600">
                                {course.instructor.name?.charAt(0)}
                            </div>
                        )}

                        <div>
                            <p className="text-xs text-gray-500">
                                Instructor
                            </p>

                            <p className="text-sm font-medium text-gray-900">
                                {course.instructor.name}
                            </p>
                        </div>
                    </div>
                )}

                {/* Stats */}
                {showStats && (
                    <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                            <span>📚</span>
                            <span>
                                {course.lessons_count ?? course.lessons?.length ?? 0}{' '}
                                Lessons
                            </span>
                        </div>

                        <div className="flex items-center gap-1">
                            <span>👥</span>
                            <span>
                                {course.enrollments_count ?? 0} Students
                            </span>
                        </div>
                    </div>
                )}

                {/* Action */}
                <Link
                    href={courseUrl}
                    className="mt-5 block w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-indigo-700"
                >
                    View Course
                </Link>
            </div>
        </div>
    );
};

export default CourseCard;