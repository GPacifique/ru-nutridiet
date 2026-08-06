import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import {
    Award,
    BookOpen,
    Clock,
    Search,
    SlidersHorizontal,
    User,
    X,
} from 'lucide-react';

export default function Catalog({
    courses,
    filters = {},
    creditTypes = [],
}) {
    const [search, setSearch] = useState(filters.search || '');
    const [creditType, setCreditType] = useState(
        filters.credit_type || ''
    );

    const courseData = courses?.data || courses || [];

    const submitSearch = (e) => {
        e.preventDefault();

        router.get(
            route('courses.catalog'),
            {
                search,
                credit_type: creditType,
            },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    const clearFilters = () => {
        setSearch('');
        setCreditType('');

        router.get(route('courses.catalog'));
    };

    const formatPrice = (price) => {
        if (price === null || price === undefined) {
            return 'Free';
        }

        if (Number(price) === 0) {
            return 'Free';
        }

        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(Number(price));
    };

    return (
        <GuestLayout>
            <Head title="Course Catalog" />

            <div className="space-y-8">
                {/* Header */}
                <div className="text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100">
                        <BookOpen className="h-8 w-8 text-blue-600" />
                    </div>

                    <h1 className="mt-5 text-3xl font-bold text-gray-900">
                        Professional Course Catalog
                    </h1>

                    <p className="mx-auto mt-3 max-w-2xl text-gray-600">
                        Learn from professional courses, earn credit hours,
                        pass assessments, and receive verified certificates.
                    </p>
                </div>

                {/* Search and Filters */}
                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                    <form
                        onSubmit={submitSearch}
                        className="flex flex-col gap-4 lg:flex-row"
                    >
                        <div className="relative flex-1">
                            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                            <input
                                type="text"
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                placeholder="Search courses..."
                                className="w-full rounded-xl border-gray-300 py-3 pl-12 pr-4 focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>

                        <div className="relative">
                            <SlidersHorizontal className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                            <select
                                value={creditType}
                                onChange={(e) =>
                                    setCreditType(e.target.value)
                                }
                                className="w-full min-w-[220px] rounded-xl border-gray-300 py-3 pl-12 pr-10 focus:border-blue-500 focus:ring-blue-500"
                            >
                                <option value="">
                                    All Credit Types
                                </option>

                                {creditTypes.map((type) => (
                                    <option
                                        key={type}
                                        value={type}
                                    >
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
                        >
                            Search Courses
                        </button>

                        {(search || creditType) && (
                            <button
                                type="button"
                                onClick={clearFilters}
                                className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-5 py-3 font-medium text-gray-700 hover:bg-gray-50"
                            >
                                <X className="h-4 w-4" />
                                Clear
                            </button>
                        )}
                    </form>
                </div>

                {/* Results Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">
                            Available Courses
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            {courses?.total ??
                                courseData.length}{' '}
                            courses available
                        </p>
                    </div>
                </div>

                {/* Courses */}
                {courseData.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {courseData.map((course) => (
                            <div
                                key={course.id}
                                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                            >
                                {/* Thumbnail */}
                                <div className="relative h-52 overflow-hidden bg-gray-100">
                                    {course.thumbnail ? (
                                        <img
                                            src={`/storage/${course.thumbnail}`}
                                            alt={course.title}
                                            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center bg-blue-50">
                                            <BookOpen className="h-16 w-16 text-blue-300" />
                                        </div>
                                    )}

                                    {course.credit_type && (
                                        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-blue-700 shadow">
                                            {course.credit_type}
                                        </span>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h3 className="line-clamp-2 text-xl font-bold text-gray-900">
                                        {course.title}
                                    </h3>

                                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
                                        {course.description}
                                    </p>

                                    {/* Instructor */}
                                    {course.instructor && (
                                        <div className="mt-5 flex items-center gap-2 text-sm text-gray-500">
                                            <User className="h-4 w-4" />

                                            <span>
                                                {course.instructor.name}
                                            </span>
                                        </div>
                                    )}

                                    {/* Course Meta */}
                                    <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-5">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Clock className="h-4 w-4 text-blue-600" />

                                            <span>
                                                {course.credit_hours || 0}{' '}
                                                Credit Hours
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Award className="h-4 w-4 text-yellow-600" />

                                            <span>
                                                {course.lessons_count || 0}{' '}
                                                Lessons
                                            </span>
                                        </div>
                                    </div>

                                    {/* Price and Action */}
                                    <div className="mt-6 flex items-center justify-between">
                                        <div>
                                            <p className="text-xs text-gray-500">
                                                Course Price
                                            </p>

                                            <p className="text-xl font-bold text-gray-900">
                                                {formatPrice(course.price)}
                                            </p>
                                        </div>

                                        <Link
                                            href={route(
                                                'courses.show',
                                                course.slug
                                            )}
                                            className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
                                        >
                                            View Course
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center shadow-sm">
                        <Search className="mx-auto h-14 w-14 text-gray-300" />

                        <h3 className="mt-5 text-xl font-bold text-gray-900">
                            No Courses Found
                        </h3>

                        <p className="mt-2 text-gray-500">
                            Try adjusting your search or filters.
                        </p>

                        <button
                            type="button"
                            onClick={clearFilters}
                            className="mt-6 rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700"
                        >
                            View All Courses
                        </button>
                    </div>
                )}

                {/* Pagination */}
                {courses?.links && courses.links.length > 3 && (
                    <div className="flex flex-wrap justify-center gap-2">
                        {courses.links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.url || '#'}
                                className={`rounded-lg px-4 py-2 text-sm ${
                                    link.active
                                        ? 'bg-blue-600 text-white'
                                        : link.url
                                          ? 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                                          : 'cursor-not-allowed bg-gray-100 text-gray-400'
                                }`}
                                dangerouslySetInnerHTML={{
                                    __html: link.label,
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </GuestLayout>
    );
}