import { useState, useMemo } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Search, X } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';

const defaultLearners = [
    { id: 1, name: 'Maria Owens', email: 'maria.owens@example.com', coursesEnrolled: 3, coursesCompleted: 3, creditsEarned: 8, lastActivity: 'Jul 26' },
    { id: 2, name: 'David Kimani', email: 'david.kimani@example.com', coursesEnrolled: 2, coursesCompleted: 1, creditsEarned: 4, lastActivity: 'Jul 25' },
    { id: 3, name: 'Sofia Bianchi', email: 'sofia.bianchi@example.com', coursesEnrolled: 1, coursesCompleted: 0, creditsEarned: 0, lastActivity: 'Jul 24' },
    { id: 4, name: 'James Okoro', email: 'james.okoro@example.com', coursesEnrolled: 1, coursesCompleted: 0, creditsEarned: 0, lastActivity: 'Jul 26' },
    { id: 5, name: 'Priya Nair', email: 'priya.nair@example.com', coursesEnrolled: 4, coursesCompleted: 4, creditsEarned: 11, lastActivity: 'Jul 25' },
];

const defaultCourseFilterOptions = [
    { id: 1, title: 'Clinical Nutrition Assessment' },
    { id: 2, title: 'Pediatric Feeding Disorders' },
];

export default function Index({ learners = defaultLearners, courseFilterOptions = defaultCourseFilterOptions }) {
    const { url } = usePage();
    const params = new URLSearchParams(url.split('?')[1] ?? '');
    const activeCourseId = params.get('course');
    const activeCourse = courseFilterOptions.find((c) => String(c.id) === activeCourseId);

    const [query, setQuery] = useState('');

    const filtered = useMemo(() => {
        if (!query) return learners;
        const q = query.toLowerCase();
        return learners.filter((l) => l.name.toLowerCase().includes(q) || l.email.toLowerCase().includes(q));
    }, [learners, query]);

    return (
        <AdminLayout title="Learners">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <div>
                    {activeCourse && (
                        <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-[#E4EFEB] px-3 py-1 text-xs text-[#2F6F5E]">
                            Enrolled in {activeCourse.title}
                            <Link href="/admin/learners" className="text-[#2F6F5E] hover:text-[#24564A]">
                                <X size={12} />
                            </Link>
                        </div>
                    )}
                </div>
                <div className="relative">
                    <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#5B6B62]" />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search by name or email"
                        className="w-64 rounded border border-[#D8DDD5] bg-white py-2 pl-9 pr-3 text-sm placeholder:text-[#98A398] focus:border-[#2F6F5E] focus:outline-none focus:ring-2 focus:ring-[#2F6F5E]/20"
                    />
                </div>
            </div>

            {filtered.length === 0 ? (
                <div className="rounded border border-dashed border-[#D8DDD5] bg-white px-6 py-14 text-center">
                    <p className="text-sm text-[#5B6B62]">
                        {query ? `No learners match "${query}".` : 'No learners have enrolled yet.'}
                    </p>
                </div>
            ) : (
                <div className="overflow-hidden rounded border border-[#D8DDD5] bg-white">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-[#D8DDD5] text-[11px] uppercase tracking-[0.1em] text-[#5B6B62]">
                                <th className="px-4 py-3 font-medium">Learner</th>
                                <th className="px-4 py-3 font-medium">Enrolled</th>
                                <th className="px-4 py-3 font-medium">Completed</th>
                                <th className="px-4 py-3 font-medium">Credits earned</th>
                                <th className="px-4 py-3 font-medium">Last activity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((learner) => (
                                <tr key={learner.id} className="border-b border-[#E7EBE3] last:border-0 hover:bg-[#F7F8F5]">
                                    <td className="px-4 py-3">
                                        <Link
                                            href={`/admin/learners/${learner.id}`}
                                            className="font-medium text-[#1F2A24] hover:text-[#2F6F5E]"
                                        >
                                            {learner.name}
                                        </Link>
                                        <p className="text-xs text-[#5B6B62]">{learner.email}</p>
                                    </td>
                                    <td className="px-4 py-3 font-['IBM_Plex_Mono'] tabular-nums">{learner.coursesEnrolled}</td>
                                    <td className="px-4 py-3 font-['IBM_Plex_Mono'] tabular-nums">{learner.coursesCompleted}</td>
                                    <td className="px-4 py-3 font-['IBM_Plex_Mono'] tabular-nums">{learner.creditsEarned}h</td>
                                    <td className="px-4 py-3 text-[#5B6B62]">{learner.lastActivity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </AdminLayout>
    );
}