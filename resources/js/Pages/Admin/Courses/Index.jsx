import { useState, useMemo } from 'react';
import { Link, router } from '@inertiajs/react';
import { Plus, Search, AlertTriangle, Eye, Pencil } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';

const defaultCourses = [
    { id: 1, title: 'Clinical Nutrition Assessment', creditType: 'CPEU', hours: 3, price: 89, enrolled: 64, passRate: 94, status: 'published' },
    { id: 2, title: 'Pediatric Feeding Disorders', creditType: 'CPEU', hours: 2, price: 59, enrolled: 41, passRate: 71, status: 'published' },
    { id: 3, title: 'Renal Diet Management', creditType: 'State CE', hours: 4, price: 119, enrolled: 22, passRate: 90, status: 'published' },
    { id: 4, title: 'Sports Nutrition Fundamentals', creditType: 'CPEU', hours: 2, price: 49, enrolled: 0, passRate: null, status: 'draft' },
    { id: 5, title: 'Eating Disorder Screening', creditType: 'State CE', hours: 3, price: 99, enrolled: 18, passRate: 82, status: 'archived' },
];

const PASS_RATE_WARNING_THRESHOLD = 75;
const FILTERS = ['all', 'published', 'draft', 'archived'];

function currency(n) {
    return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
}

function StatusBadge({ status }) {
    const styles = {
        published: 'bg-[#E4EFEB] text-[#2F6F5E]',
        draft: 'bg-[#EEF1EC] text-[#5B6B62]',
        archived: 'bg-[#F4E7E3] text-[#B65C4A]',
    };
    return <span className={`rounded-full px-2 py-0.5 text-xs ${styles[status]}`}>{status}</span>;
}

export default function Index({ courses = defaultCourses }) {
    const [filter, setFilter] = useState('all');
    const [query, setQuery] = useState('');

    const filtered = useMemo(() => {
        return courses.filter((c) => {
            const matchesFilter = filter === 'all' || c.status === filter;
            const matchesQuery = c.title.toLowerCase().includes(query.toLowerCase());
            return matchesFilter && matchesQuery;
        });
    }, [courses, filter, query]);

    return (
        <AdminLayout title="Courses">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-1 rounded border border-[#D8DDD5] bg-white p-1">
                    {FILTERS.map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`rounded px-3 py-1.5 text-sm capitalize transition-colors ${
                                filter === f ? 'bg-[#2F6F5E] text-white' : 'text-[#5B6B62] hover:bg-[#EEF1EC]'
                            }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#5B6B62]" />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search courses"
                            className="w-56 rounded border border-[#D8DDD5] bg-white py-2 pl-9 pr-3 text-sm placeholder:text-[#98A398] focus:border-[#2F6F5E] focus:outline-none focus:ring-2 focus:ring-[#2F6F5E]/20"
                        />
                    </div>
                    <Link
                        href="/admin/courses/create"
                        className="inline-flex items-center gap-1.5 whitespace-nowrap rounded bg-[#2F6F5E] px-4 py-2 text-sm font-medium text-white hover:bg-[#24564A]"
                    >
                        <Plus size={15} strokeWidth={2.5} />
                        New course
                    </Link>
                </div>
            </div>

            {filtered.length === 0 ? (
                <div className="rounded border border-dashed border-[#D8DDD5] bg-white px-6 py-14 text-center">
                    <p className="text-sm text-[#5B6B62]">
                        {query ? `No courses match "${query}".` : 'No courses in this category yet.'}
                    </p>
                </div>
            ) : (
                <div className="overflow-hidden rounded border border-[#D8DDD5] bg-white">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-[#D8DDD5] text-[11px] uppercase tracking-[0.1em] text-[#5B6B62]">
                                <th className="px-4 py-3 font-medium">Course</th>
                                <th className="px-4 py-3 font-medium">Credit</th>
                                <th className="px-4 py-3 font-medium">Price</th>
                                <th className="px-4 py-3 font-medium">Enrolled</th>
                                <th className="px-4 py-3 font-medium">Pass rate</th>
                                <th className="px-4 py-3 font-medium">Status</th>
                                <th className="px-4 py-3 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((course) => {
                                const flagged = course.passRate !== null && course.passRate < PASS_RATE_WARNING_THRESHOLD;
                                return (
                                    <tr
                                        key={course.id}
                                        className={`border-b border-[#E7EBE3] last:border-0 hover:bg-[#F7F8F5] ${
                                            flagged ? 'border-l-2 border-l-[#C98A3B] bg-[#FBF6EE]' : ''
                                        }`}
                                    >
                                        <td className="px-4 py-3">
                                            <Link
                                                href={`/admin/courses/${course.id}`}
                                                className="font-medium text-[#1F2A24] hover:text-[#2F6F5E]"
                                            >
                                                {course.title}
                                            </Link>
                                        </td>
                                        <td className="px-4 py-3 text-[#5B6B62]">
                                            {course.creditType} · {course.hours}h
                                        </td>
                                        <td className="px-4 py-3 font-['IBM_Plex_Mono'] tabular-nums">
                                            {currency(course.price)}
                                        </td>
                                        <td className="px-4 py-3 font-['IBM_Plex_Mono'] tabular-nums">{course.enrolled}</td>
                                        <td className="px-4 py-3">
                                            {course.passRate === null ? (
                                                <span className="text-[#5B6B62]">—</span>
                                            ) : (
                                                <span
                                                    className={`inline-flex items-center gap-1 font-['IBM_Plex_Mono'] tabular-nums ${
                                                        flagged ? 'text-[#C98A3B]' : 'text-[#1F2A24]'
                                                    }`}
                                                >
                                                    {flagged && <AlertTriangle size={13} strokeWidth={2.5} />}
                                                    {course.passRate}%
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3">
                                            <StatusBadge status={course.status} />
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center justify-end gap-1">
                                                <Link
                                                    href={`/admin/courses/${course.id}`}
                                                    className="rounded p-1.5 text-[#5B6B62] hover:bg-[#EEF1EC] hover:text-[#1F2A24]"
                                                    title="View"
                                                >
                                                    <Eye size={15} />
                                                </Link>
                                                <Link
                                                    href={`/admin/courses/${course.id}/edit`}
                                                    className="rounded p-1.5 text-[#5B6B62] hover:bg-[#EEF1EC] hover:text-[#1F2A24]"
                                                    title="Edit"
                                                >
                                                    <Pencil size={15} />
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </AdminLayout>
    );
}