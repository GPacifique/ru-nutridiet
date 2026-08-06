import { Link, useForm } from '@inertiajs/react';
import { ArrowLeft, PlayCircle, FileText, ExternalLink } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';

const defaultCourse = { id: 1, title: 'Clinical Nutrition Assessment' };

const defaultLesson = {
    id: 1,
    title: 'Anthropometric measurement in practice',
    type: 'video',
    video_url: 'https://vimeo.com/000000000',
    content: '',
    duration_minutes: 18,
    is_free_preview: false,
};

function Field({ label, htmlFor, error, hint, children }) {
    return (
        <div>
            <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-[#1F2A24]">
                {label}
            </label>
            {children}
            {hint && !error && <p className="mt-1 text-xs text-[#5B6B62]">{hint}</p>}
            {error && <p className="mt-1 text-xs text-[#B65C4A]">{error}</p>}
        </div>
    );
}

const inputClass =
    'w-full rounded border border-[#D8DDD5] bg-white px-3 py-2 text-sm text-[#1F2A24] placeholder:text-[#98A398] focus:border-[#2F6F5E] focus:outline-none focus:ring-2 focus:ring-[#2F6F5E]/20';

// Assumes video lessons are embedded from a host like Vimeo/YouTube rather than
// self-hosted — simplest path to ship, no transcoding pipeline to build or pay for.
// If you'd rather host files directly (e.g. via S3 + a signed upload), swap the
// video_url text field below for a file input posting to a dedicated upload route,
// and store the resulting path instead of a URL.

export default function Edit({ course = defaultCourse, lesson = defaultLesson }) {
    const { data, setData, put, processing, errors, isDirty } = useForm({
        title: lesson.title,
        type: lesson.type,
        video_url: lesson.video_url ?? '',
        content: lesson.content ?? '',
        duration_minutes: lesson.duration_minutes ?? '',
        is_free_preview: lesson.is_free_preview,
    });

    function submit(e) {
        e.preventDefault();
        put(`/admin/courses/${course.id}/lessons/${lesson.id}`);
    }

    return (
        <AdminLayout title="Edit lesson">
            <Link
                href={`/admin/courses/${course.id}/lessons`}
                className="mb-6 inline-flex items-center gap-1.5 text-sm text-[#5B6B62] hover:text-[#1F2A24]"
            >
                <ArrowLeft size={15} />
                Back to lessons — {course.title}
            </Link>

            <form onSubmit={submit} className="max-w-2xl space-y-6">
                <div className="rounded border border-[#D8DDD5] bg-white p-6">
                    <div className="space-y-5">
                        <Field label="Title" htmlFor="title" error={errors.title}>
                            <input
                                id="title"
                                type="text"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                className={inputClass}
                            />
                        </Field>

                        {/* Type toggle */}
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-[#1F2A24]">Lesson type</label>
                            <div className="inline-flex rounded border border-[#D8DDD5] bg-white p-1">
                                <button
                                    type="button"
                                    onClick={() => setData('type', 'video')}
                                    className={`inline-flex items-center gap-1.5 rounded px-3 py-1.5 text-sm transition-colors ${
                                        data.type === 'video' ? 'bg-[#2F6F5E] text-white' : 'text-[#5B6B62] hover:bg-[#EEF1EC]'
                                    }`}
                                >
                                    <PlayCircle size={14} />
                                    Video
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setData('type', 'text')}
                                    className={`inline-flex items-center gap-1.5 rounded px-3 py-1.5 text-sm transition-colors ${
                                        data.type === 'text' ? 'bg-[#2F6F5E] text-white' : 'text-[#5B6B62] hover:bg-[#EEF1EC]'
                                    }`}
                                >
                                    <FileText size={14} />
                                    Text
                                </button>
                            </div>
                        </div>

                        {data.type === 'video' ? (
                            <Field
                                label="Video URL"
                                htmlFor="video_url"
                                error={errors.video_url}
                                hint="A Vimeo or YouTube link. Unlisted/private links work as long as the embed isn't blocked."
                            >
                                <div className="flex items-center gap-2">
                                    <input
                                        id="video_url"
                                        type="url"
                                        value={data.video_url}
                                        onChange={(e) => setData('video_url', e.target.value)}
                                        placeholder="https://vimeo.com/…"
                                        className={`${inputClass} font-['IBM_Plex_Mono']`}
                                    />
                                    {data.video_url && (
                                        <a
                                            href={data.video_url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="shrink-0 rounded border border-[#D8DDD5] p-2 text-[#5B6B62] hover:bg-[#EEF1EC]"
                                            title="Open link"
                                        >
                                            <ExternalLink size={15} />
                                        </a>
                                    )}
                                </div>
                            </Field>
                        ) : (
                            <Field
                                label="Content"
                                htmlFor="content"
                                error={errors.content}
                                hint="Plain text or Markdown — rendered as formatted text for learners."
                            >
                                <textarea
                                    id="content"
                                    rows={10}
                                    value={data.content}
                                    onChange={(e) => setData('content', e.target.value)}
                                    className={`${inputClass} font-mono text-[13px] leading-relaxed`}
                                />
                            </Field>
                        )}

                        <Field
                            label="Duration (minutes)"
                            htmlFor="duration_minutes"
                            error={errors.duration_minutes}
                            hint={data.type === 'video' ? 'Runtime of the video.' : 'Estimated reading time.'}
                        >
                            <input
                                id="duration_minutes"
                                type="number"
                                min="1"
                                value={data.duration_minutes}
                                onChange={(e) => setData('duration_minutes', e.target.value)}
                                className={`${inputClass} w-32 font-['IBM_Plex_Mono']`}
                            />
                        </Field>

                        <label className="flex items-start gap-2.5">
                            <input
                                type="checkbox"
                                checked={data.is_free_preview}
                                onChange={(e) => setData('is_free_preview', e.target.checked)}
                                className="mt-0.5 h-4 w-4 rounded border-[#D8DDD5] text-[#2F6F5E] focus:ring-[#2F6F5E]/40"
                            />
                            <span className="text-sm text-[#1F2A24]">
                                Free preview
                                <span className="block text-xs text-[#5B6B62]">
                                    Visible to anyone on the course page, even without purchasing.
                                </span>
                            </span>
                        </label>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-3">
                    {isDirty && <span className="text-xs text-[#5B6B62]">Unsaved changes</span>}
                    <Link
                        href={`/admin/courses/${course.id}/lessons`}
                        className="rounded px-4 py-2 text-sm font-medium text-[#5B6B62] hover:bg-[#EEF1EC]"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={processing}
                        className="rounded bg-[#2F6F5E] px-5 py-2 text-sm font-medium text-white hover:bg-[#24564A] disabled:opacity-50"
                    >
                        {processing ? 'Saving…' : 'Save lesson'}
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}