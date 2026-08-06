import { Link } from '@inertiajs/react';
import { ArrowLeft, Pencil, GripVertical, FileText, PlayCircle, ClipboardCheck } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';

const defaultCourse = {
    id: 1,
    title: 'Clinical Nutrition Assessment',
    creditType: 'CPEU',
    hours: 3,
    price: 89,
    status: 'published',
    enrolled: 64,
    revenue: 5696,
    passRate: 94,
};

const defaultLessons = [
    { id: 1, title: 'Anthropometric measurement in practice', type: 'video', duration: '18 min' },
    { id: 2, title: 'Biochemical markers: reading the panel', type: 'video', duration: '24 min' },
    { id: 3, title: 'Clinical assessment interview technique', type: 'text', duration: '12 min read' },
    { id: 4, title: 'Case study: combining the four methods', type: 'video', duration: '15 min' },
];

const defaultExam = { questionCount: 20, passingScore: 80, timeLimitMinutes: 45, maxAttempts: 2 };

const defaultEnrollments = [
    { id: 1, learner: 'Maria Owens', status: 'certified', enrolledAt: 'Jul 12' },
    { id: 2, learner: 'David Kimani', status: 'exam_passed', enrolledAt: 'Jul 15' },
    { id: 3, learner: 'Sofia Bianchi', status: 'in_progress', enrolledAt: 'Jul 21' },
    { id: 4, learner: 'James Okoro', status: 'purchased', enrolledAt: 'Jul 26' },
];

function currency(n) {
    return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
}

const ENROLLMENT_LABELS = {
    purchased: { label: 'Purchased', style: 'bg-[#EEF1EC] text-[#5B6B62]' },
    in_progress: { label: 'In progress', style: 'bg-[#EAF0EC] text-[#3C4A42]' },
    exam_passed: { label: 'Exam passed', style: 'bg-[#E4EFEB] text-[#2F6F5E]' },
    certified: { label: 'Certified', style: 'bg-[#2F6F5E] text-white' },
};

function Stat({ label, value }) {
    return (
        <div className="px-6 py-4 first:pl-0 last:pr-0">
            <p className="text-[11px] uppercase tracking-[0.14em] text-[#5B6B62]">{label}</p>
            <p className="mt-1 font-['IBM_Plex_Mono'] text-xl tabular-nums text-[#1F2A24]">{value}</p>
        </div>
    );
}

export default function Show({
    course = defaultCourse,
    lessons = defaultLessons,
    exam = defaultExam,
    enrollments = defaultEnrollments,
}) {
    return (
        <AdminLayout>
            <Link
                href="/admin/courses"
                className="mb-6 inline-flex items-center gap-1.5 text-sm text-[#5B6B62] hover:text-[#1F2A24]"
            >
                <ArrowLeft size={15} />
                Back to courses
            </Link>

            {/* Header */}
            <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
                <div>
                    <p className="text-[11px] uppercase tracking-[0.14em] text-[#5B6B62]">
                        {course.creditType} · {course.hours}h · {course.status}
                    </p>
                    <h1 className="mt-1 font-['Fraunces'] text-2xl font-medium text-[#1F2A24]">{course.title}</h1>
                </div>
                <Link
                    href={`/admin/courses/${course.id}/edit`}
                    className="inline-flex items-center gap-1.5 rounded border border-[#D8DDD5] bg-white px-4 py-2 text-sm font-medium text-[#1F2A24] hover:bg-[#F7F8F5]"
                >
                    <Pencil size={14} />
                    Edit details
                </Link>
            </div>

            {/* Stats strip */}
            <div className="mb-10 flex flex-wrap divide-x divide-[#E7EBE3] rounded border border-[#D8DDD5] bg-white px-6">
                <Stat label="Enrolled" value={course.enrolled} />
                <Stat label="Revenue" value={currency(course.revenue)} />
                <Stat label="Pass rate" value={course.passRate !== null ? `${course.passRate}%` : '—'} />
                <Stat label="Price" value={currency(course.price)} />
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Lessons */}
                <div className="lg:col-span-2">
                    <div className="mb-3 flex items-center justify-between">
                        <h2 className="font-['Fraunces'] text-lg font-medium">Lessons</h2>
                        <Link href={`/admin/courses/${course.id}/lessons/create`} className="text-sm text-[#2F6F5E] hover:underline">
                            Add lesson
                        </Link>
                    </div>

                    {lessons.length === 0 ? (
                        <div className="rounded border border-dashed border-[#D8DDD5] bg-white px-6 py-10 text-center">
                            <p className="text-sm text-[#5B6B62]">
                                No lessons yet — add one to start building this course.
                            </p>
                        </div>
                    ) : (
                        <ul className="divide-y divide-[#E7EBE3] rounded border border-[#D8DDD5] bg-white">
                            {lessons.map((lesson, i) => (
                                <li key={lesson.id} className="flex items-center gap-3 px-4 py-3">
                                    <GripVertical size={15} className="shrink-0 cursor-grab text-[#98A398]" />
                                    <span className="font-['IBM_Plex_Mono'] text-xs tabular-nums text-[#5B6B62]">
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                    {lesson.type === 'video' ? (
                                        <PlayCircle size={16} className="shrink-0 text-[#2F6F5E]" />
                                    ) : (
                                        <FileText size={16} className="shrink-0 text-[#2F6F5E]" />
                                    )}
                                    <Link
                                        href={`/admin/courses/${course.id}/lessons/${lesson.id}/edit`}
                                        className="flex-1 truncate text-sm text-[#1F2A24] hover:text-[#2F6F5E]"
                                    >
                                        {lesson.title}
                                    </Link>
                                    <span className="shrink-0 text-xs text-[#5B6B62]">{lesson.duration}</span>
                                </li>
                            ))}
                        </ul>
                    )}

                    {/* Exam summary */}
                    <div className="mb-3 mt-8 flex items-center justify-between">
                        <h2 className="font-['Fraunces'] text-lg font-medium">Exam</h2>
                        <Link href={`/admin/courses/${course.id}/exam/edit`} className="text-sm text-[#2F6F5E] hover:underline">
                            Edit exam
                        </Link>
                    </div>
                    <div className="flex items-center gap-3 rounded border border-[#D8DDD5] bg-white px-4 py-4">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E4EFEB] text-[#2F6F5E]">
                            <ClipboardCheck size={17} />
                        </span>
                        <div className="grid flex-1 grid-cols-4 gap-4">
                            <div>
                                <p className="text-[11px] uppercase tracking-[0.14em] text-[#5B6B62]">Questions</p>
                                <p className="font-['IBM_Plex_Mono'] text-sm tabular-nums">{exam.questionCount}</p>
                            </div>
                            <div>
                                <p className="text-[11px] uppercase tracking-[0.14em] text-[#5B6B62]">Passing score</p>
                                <p className="font-['IBM_Plex_Mono'] text-sm tabular-nums">{exam.passingScore}%</p>
                            </div>
                            <div>
                                <p className="text-[11px] uppercase tracking-[0.14em] text-[#5B6B62]">Time limit</p>
                                <p className="font-['IBM_Plex_Mono'] text-sm tabular-nums">{exam.timeLimitMinutes} min</p>
                            </div>
                            <div>
                                <p className="text-[11px] uppercase tracking-[0.14em] text-[#5B6B62]">Max attempts</p>
                                <p className="font-['IBM_Plex_Mono'] text-sm tabular-nums">{exam.maxAttempts}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent enrollments */}
                <div>
                    <div className="mb-3 flex items-center justify-between">
                        <h2 className="font-['Fraunces'] text-lg font-medium">Recent enrollments</h2>
                        <Link
                            href={`/admin/learners?course=${course.id}`}
                            className="text-sm text-[#2F6F5E] hover:underline"
                        >
                            View all
                        </Link>
                    </div>

                    {enrollments.length === 0 ? (
                        <div className="rounded border border-dashed border-[#D8DDD5] bg-white px-6 py-10 text-center">
                            <p className="text-sm text-[#5B6B62]">No one has enrolled yet.</p>
                        </div>
                    ) : (
                        <ul className="divide-y divide-[#E7EBE3] rounded border border-[#D8DDD5] bg-white">
                            {enrollments.map((e) => (
                                <li key={e.id} className="flex items-center justify-between gap-3 px-4 py-3">
                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-medium text-[#1F2A24]">{e.learner}</p>
                                        <p className="text-xs text-[#5B6B62]">Enrolled {e.enrolledAt}</p>
                                    </div>
                                    <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs ${ENROLLMENT_LABELS[e.status].style}`}>
                                        {ENROLLMENT_LABELS[e.status].label}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}