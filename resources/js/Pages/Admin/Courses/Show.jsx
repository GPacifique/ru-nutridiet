import React from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft,
    BookOpen,
    Clock,
    FolderOpen,
    Pencil,
    Users,
    Wallet,
} from 'lucide-react';

// Change this import if your admin layout lives somewhere else
// (e.g. '@/Layouts/DashboardLayout').
import AdminLayout from '@/Layouts/AdminLayout';

const currency = (value) =>
    Number(value ?? 0).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    });

const formatDate = (value) => {
    if (!value) return '—';

    const date = new Date(value);

    return Number.isNaN(date.getTime())
        ? '—'
        : date.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
          });
};

const statusStyles = {
    draft: 'bg-yellow-100 text-yellow-700',
    published: 'bg-green-100 text-green-700',
    archived: 'bg-gray-200 text-gray-700',
};

// route() throws if a name is missing, so only link to routes that exist.
const hasRoute = (name) => {
    try {
        return route().has(name);
    } catch {
        return false;
    }
};

export default function Show({ course }) {
    // The controller currently loads only `category`. Lessons and enrollments
    // appear automatically if you add them to show() later.
    const lessons = course.lessons ?? null;
    const enrollments = course.enrollments ?? null;

    const lessonsCount = lessons ? lessons.length : course.lessons_count;
    const studentsCount = enrollments
        ? enrollments.length
        : course.enrollments_count;

    const stats = [
        {
            label: 'Price',
            value: Number(course.price) > 0 ? currency(course.price) : 'Free',
            icon: Wallet,
            tone: 'bg-yellow-50 text-yellow-600',
        },
        {
            label: 'Credit Hours',
            value: Number(course.credit_hours || 0),
            icon: Clock,
            tone: 'bg-purple-50 text-purple-600',
        },
        {
            label: 'Category',
            value: course.category?.name ?? 'Uncategorized',
            icon: FolderOpen,
            tone: 'bg-blue-50 text-blue-600',
        },
        ...(lessonsCount !== undefined
            ? [
                  {
                      label: 'Lessons',
                      value: lessonsCount,
                      icon: BookOpen,
                      tone: 'bg-indigo-50 text-indigo-600',
                  },
              ]
            : []),
        ...(studentsCount !== undefined
            ? [
                  {
                      label: 'Students',
                      value: studentsCount,
                      icon: Users,
                      tone: 'bg-green-50 text-green-600',
                  },
              ]
            : []),
    ];

    return (
        <AdminLayout>
            <Head title={`Course: ${course.title}`} />

            <div className="space-y-8">
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <Link
                        href={route('admin.courses.index')}
                        className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Courses
                    </Link>

                    {hasRoute('admin.courses.edit') && (
                        <Link
                            href={route('admin.courses.edit', course.id)}
                            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                        >
                            <Pencil className="h-4 w-4" />
                            Edit Course
                        </Link>
                    )}
                </div>

                {/* Overview */}
                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                    <div className="grid grid-cols-1 lg:grid-cols-3">
                        <div className="min-h-[220px] bg-gray-100">
                            {course.thumbnail ? (
                                <img
                                    src={`/storage/${course.thumbnail}`}
                                    alt={course.title}
                                    className="h-full min-h-[220px] w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-full min-h-[220px] items-center justify-center bg-blue-50">
                                    <BookOpen className="h-16 w-16 text-blue-300" />
                                </div>
                            )}
                        </div>

                        <div className="p-6 lg:col-span-2">
                            <div className="flex flex-wrap gap-2">
                                <span
                                    className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                                        statusStyles[course.status] ??
                                        'bg-gray-100 text-gray-700'
                                    }`}
                                >
                                    {course.status ?? 'unknown'}
                                </span>

                                {course.credit_type && (
                                    <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
                                        {course.credit_type}
                                    </span>
                                )}
                            </div>

                            <h1 className="mt-4 text-2xl font-bold text-gray-900">
                                {course.title}
                            </h1>

                            <p className="mt-1 text-sm text-gray-500">
                                /{course.slug}
                            </p>

                            <p className="mt-4 whitespace-pre-line text-gray-600">
                                {course.description || 'No description yet.'}
                            </p>

                            <dl className="mt-6 grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">
                                <div>
                                    <dt className="text-gray-500">
                                        Instructor
                                    </dt>
                                    <dd className="mt-1 font-semibold text-gray-900">
                                        {course.instructor?.name ?? 'Not assigned'}
                                    </dd>
                                </div>

                                <div>
                                    <dt className="text-gray-500">Published</dt>
                                    <dd className="mt-1 font-semibold text-gray-900">
                                        {formatDate(course.published_at)}
                                    </dd>
                                </div>

                                <div>
                                    <dt className="text-gray-500">Created</dt>
                                    <dd className="mt-1 font-semibold text-gray-900">
                                        {formatDate(course.created_at)}
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
                    {stats.map(({ label, value, icon: Icon, tone }) => (
                        <div
                            key={label}
                            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
                        >
                            <div
                                className={`inline-flex rounded-lg p-2 ${tone}`}
                            >
                                <Icon className="h-5 w-5" />
                            </div>
                            <p className="mt-3 text-xs text-gray-500">{label}</p>
                            <p className="mt-1 truncate text-xl font-bold text-gray-900">
                                {value}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Lessons (only when the controller loads them) */}
                {lessons && (
                    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
                        <div className="border-b border-gray-200 p-5">
                            <h2 className="text-lg font-bold text-gray-900">
                                Lessons ({lessons.length})
                            </h2>
                        </div>

                        <div className="divide-y divide-gray-100">
                            {lessons.length > 0 ? (
                                lessons.map((lesson, index) => (
                                    <div
                                        key={lesson.id}
                                        className="flex items-center gap-4 p-4"
                                    >
                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                                            {index + 1}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate font-medium text-gray-900">
                                                {lesson.title}
                                            </p>
                                            <p className="mt-0.5 text-xs capitalize text-gray-500">
                                                {[
                                                    lesson.type,
                                                    lesson.duration_minutes > 0
                                                        ? `${lesson.duration_minutes} min`
                                                        : null,
                                                ]
                                                    .filter(Boolean)
                                                    .join(' · ') || '—'}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="p-8 text-center text-sm text-gray-500">
                                    No lessons added yet.
                                </p>
                            )}
                        </div>
                    </div>
                )}

                {/* Enrollments (only when the controller loads them) */}
                {enrollments && (
                    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
                        <div className="border-b border-gray-200 p-5">
                            <h2 className="text-lg font-bold text-gray-900">
                                Enrolled Students ({enrollments.length})
                            </h2>
                        </div>

                        {enrollments.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 text-sm">
                                    <thead className="bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500">
                                        <tr>
                                            <th className="px-5 py-3">Student</th>
                                            <th className="px-5 py-3">Email</th>
                                            <th className="px-5 py-3">Enrolled</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {enrollments.map((enrollment) => (
                                            <tr key={enrollment.id}>
                                                <td className="px-5 py-3 font-medium text-gray-900">
                                                    {enrollment.user?.name ?? '—'}
                                                </td>
                                                <td className="px-5 py-3 text-gray-600">
                                                    {enrollment.user?.email ?? '—'}
                                                </td>
                                                <td className="px-5 py-3 text-gray-600">
                                                    {formatDate(
                                                        enrollment.enrolled_at ??
                                                            enrollment.created_at
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="p-8 text-center text-sm text-gray-500">
                                No students have enrolled yet.
                            </p>
                        )}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}