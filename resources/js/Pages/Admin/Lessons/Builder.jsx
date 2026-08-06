import { useState, useRef } from 'react';
import { Link, router, useForm } from '@inertiajs/react';
import {
    ArrowLeft,
    GripVertical,
    PlayCircle,
    FileText,
    Pencil,
    Trash2,
    Plus,
} from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';

const defaultCourse = { id: 1, title: 'Clinical Nutrition Assessment' };

const defaultLessons = [
    { id: 1, title: 'Anthropometric measurement in practice', type: 'video', duration: '18 min' },
    { id: 2, title: 'Biochemical markers: reading the panel', type: 'video', duration: '24 min' },
    { id: 3, title: 'Clinical assessment interview technique', type: 'text', duration: '12 min read' },
    { id: 4, title: 'Case study: combining the four methods', type: 'video', duration: '15 min' },
];

const TYPE_ICON = { video: PlayCircle, text: FileText };

function LessonRow({ lesson, index, onDragStart, onDragEnter, onDragEnd, isDragging, courseId, onDelete }) {
    const Icon = TYPE_ICON[lesson.type];

    return (
        <li
            draggable
            onDragStart={() => onDragStart(index)}
            onDragEnter={() => onDragEnter(index)}
            onDragEnd={onDragEnd}
            onDragOver={(e) => e.preventDefault()}
            className={`flex items-center gap-3 border-b border-[#E7EBE3] bg-white px-4 py-3 last:border-0 ${
                isDragging ? 'opacity-40' : ''
            }`}
        >
            <span className="cursor-grab text-[#98A398] active:cursor-grabbing">
                <GripVertical size={16} />
            </span>
            <span className="font-['IBM_Plex_Mono'] text-xs tabular-nums text-[#5B6B62]">
                {String(index + 1).padStart(2, '0')}
            </span>
            <Icon size={16} className="shrink-0 text-[#2F6F5E]" />
            <Link
                href={`/admin/courses/${courseId}/lessons/${lesson.id}/edit`}
                className="flex-1 truncate text-sm text-[#1F2A24] hover:text-[#2F6F5E]"
            >
                {lesson.title}
            </Link>
            <span className="shrink-0 text-xs text-[#5B6B62]">{lesson.duration}</span>
            <Link
                href={`/admin/courses/${courseId}/lessons/${lesson.id}/edit`}
                className="shrink-0 rounded p-1.5 text-[#5B6B62] hover:bg-[#EEF1EC] hover:text-[#1F2A24]"
                title="Edit content"
            >
                <Pencil size={14} />
            </Link>
            <button
                type="button"
                onClick={() => onDelete(lesson)}
                className="shrink-0 rounded p-1.5 text-[#5B6B62] hover:bg-[#F4E7E3] hover:text-[#B65C4A]"
                title="Delete"
            >
                <Trash2 size={14} />
            </button>
        </li>
    );
}

export default function Builder({ course = defaultCourse, lessons: initialLessons = defaultLessons }) {
    const [lessons, setLessons] = useState(initialLessons);
    const dragIndex = useRef(null);
    const [draggingIndex, setDraggingIndex] = useState(null);
    const [showQuickAdd, setShowQuickAdd] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        type: 'video',
    });

    function onDragStart(index) {
        dragIndex.current = index;
        setDraggingIndex(index);
    }

    function onDragEnter(index) {
        if (dragIndex.current === null || dragIndex.current === index) return;
        setLessons((prev) => {
            const next = [...prev];
            const [moved] = next.splice(dragIndex.current, 1);
            next.splice(index, 0, moved);
            dragIndex.current = index;
            return next;
        });
        setDraggingIndex(index);
    }

    function onDragEnd() {
        dragIndex.current = null;
        setDraggingIndex(null);
        // Persist new order — controller expects an ordered array of lesson ids.
        router.post(
            `/admin/courses/${course.id}/lessons/reorder`,
            { order: lessons.map((l) => l.id) },
            { preserveScroll: true, preserveState: true },
        );
    }

    function onDelete(lesson) {
        if (confirm(`Delete "${lesson.title}"? Learners already enrolled will lose access to this lesson.`)) {
            router.delete(`/admin/courses/${course.id}/lessons/${lesson.id}`, { preserveScroll: true });
        }
    }

    function submitQuickAdd(e) {
        e.preventDefault();
        post(`/admin/courses/${course.id}/lessons`, {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setShowQuickAdd(false);
            },
        });
    }

    return (
        <AdminLayout title="Lesson builder">
            <Link
                href={`/admin/courses/${course.id}`}
                className="mb-2 inline-flex items-center gap-1.5 text-sm text-[#5B6B62] hover:text-[#1F2A24]"
            >
                <ArrowLeft size={15} />
                Back to {course.title}
            </Link>
            <p className="mb-6 text-sm text-[#5B6B62]">
                Drag rows to set the order learners move through. Content is edited on each lesson's own page.
            </p>

            {lessons.length === 0 && !showQuickAdd ? (
                <div className="rounded border border-dashed border-[#D8DDD5] bg-white px-6 py-14 text-center">
                    <p className="mb-4 text-sm text-[#5B6B62]">
                        No lessons yet — add the first one to start building this course.
                    </p>
                    <button
                        onClick={() => setShowQuickAdd(true)}
                        className="inline-flex items-center gap-1.5 rounded bg-[#2F6F5E] px-4 py-2 text-sm font-medium text-white hover:bg-[#24564A]"
                    >
                        <Plus size={15} strokeWidth={2.5} />
                        Add lesson
                    </button>
                </div>
            ) : (
                <div className="overflow-hidden rounded border border-[#D8DDD5]">
                    <ul>
                        {lessons.map((lesson, index) => (
                            <LessonRow
                                key={lesson.id}
                                lesson={lesson}
                                index={index}
                                courseId={course.id}
                                onDragStart={onDragStart}
                                onDragEnter={onDragEnter}
                                onDragEnd={onDragEnd}
                                isDragging={draggingIndex === index}
                                onDelete={onDelete}
                            />
                        ))}
                    </ul>

                    {showQuickAdd ? (
                        <form onSubmit={submitQuickAdd} className="flex items-start gap-3 border-t border-[#E7EBE3] bg-[#F7F8F5] px-4 py-3">
                            <div className="flex-1">
                                <input
                                    autoFocus
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="Lesson title"
                                    className="w-full rounded border border-[#D8DDD5] bg-white px-3 py-2 text-sm placeholder:text-[#98A398] focus:border-[#2F6F5E] focus:outline-none focus:ring-2 focus:ring-[#2F6F5E]/20"
                                />
                                {errors.title && <p className="mt-1 text-xs text-[#B65C4A]">{errors.title}</p>}
                            </div>
                            <select
                                value={data.type}
                                onChange={(e) => setData('type', e.target.value)}
                                className="rounded border border-[#D8DDD5] bg-white px-3 py-2 text-sm focus:border-[#2F6F5E] focus:outline-none focus:ring-2 focus:ring-[#2F6F5E]/20"
                            >
                                <option value="video">Video</option>
                                <option value="text">Text</option>
                            </select>
                            <button
                                type="submit"
                                disabled={processing || !data.title}
                                className="rounded bg-[#2F6F5E] px-4 py-2 text-sm font-medium text-white hover:bg-[#24564A] disabled:opacity-50"
                            >
                                Add
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setShowQuickAdd(false);
                                    reset();
                                }}
                                className="rounded px-3 py-2 text-sm text-[#5B6B62] hover:bg-[#EEF1EC]"
                            >
                                Cancel
                            </button>
                        </form>
                    ) : (
                        <button
                            onClick={() => setShowQuickAdd(true)}
                            className="flex w-full items-center justify-center gap-1.5 border-t border-[#E7EBE3] bg-[#F7F8F5] px-4 py-3 text-sm font-medium text-[#2F6F5E] hover:bg-[#EEF1EC]"
                        >
                            <Plus size={15} strokeWidth={2.5} />
                            Add lesson
                        </button>
                    )}
                </div>
            )}
        </AdminLayout>
    );
}