import { Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';

const defaultCourse = { id: 1, title: 'Clinical Nutrition Assessment' };

const defaultSettings = {
    passing_score: 80,
    time_limit_minutes: 45,
    max_attempts: 2,
    questions_per_attempt: null, // null = use full bank every attempt
    shuffle_questions: true,
    shuffle_options: true,
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

function Toggle({ checked, onChange, label, hint }) {
    return (
        <label className="flex items-start justify-between gap-4 rounded border border-[#D8DDD5] bg-white px-4 py-3">
            <span>
                <span className="block text-sm font-medium text-[#1F2A24]">{label}</span>
                {hint && <span className="block text-xs text-[#5B6B62]">{hint}</span>}
            </span>
            <button
                type="button"
                role="switch"
                aria-checked={checked}
                onClick={() => onChange(!checked)}
                className={`relative mt-0.5 h-5 w-9 shrink-0 rounded-full transition-colors ${
                    checked ? 'bg-[#2F6F5E]' : 'bg-[#D8DDD5]'
                }`}
            >
                <span
                    className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${
                        checked ? 'translate-x-4' : 'translate-x-0.5'
                    }`}
                />
            </button>
        </label>
    );
}

export default function Settings({
    course = defaultCourse,
    settings = defaultSettings,
    questionCount = 20,
}) {
    const { data, setData, put, processing, errors, isDirty, transform } = useForm({
        passing_score: settings.passing_score,
        time_limit_minutes: settings.time_limit_minutes,
        max_attempts: settings.max_attempts,
        questions_per_attempt: settings.questions_per_attempt ?? '',
        shuffle_questions: settings.shuffle_questions,
        shuffle_options: settings.shuffle_options,
    });

    function submit(e) {
        e.preventDefault();
        // Empty string means "use the full bank" — normalize to null before it hits the server.
        transform((formData) => ({
            ...formData,
            questions_per_attempt: formData.questions_per_attempt === '' ? null : formData.questions_per_attempt,
        }));
        put(`/admin/courses/${course.id}/exam/settings`);
    }

    return (
        <AdminLayout title="Exam settings">
            <div className="mb-6 flex items-center justify-between">
                <Link
                    href={`/admin/courses/${course.id}/exam`}
                    className="inline-flex items-center gap-1.5 text-sm text-[#5B6B62] hover:text-[#1F2A24]"
                >
                    <ArrowLeft size={15} />
                    Back to question bank
                </Link>
            </div>

            <form onSubmit={submit} className="max-w-xl space-y-6">
                <div className="rounded border border-[#D8DDD5] bg-white p-6">
                    <div className="space-y-5">
                        <Field
                            label="Passing score"
                            htmlFor="passing_score"
                            error={errors.passing_score}
                            hint="Minimum percentage correct required to pass and earn credit."
                        >
                            <div className="flex items-center gap-2">
                                <input
                                    id="passing_score"
                                    type="number"
                                    min="1"
                                    max="100"
                                    value={data.passing_score}
                                    onChange={(e) => setData('passing_score', e.target.value)}
                                    className={`${inputClass} w-24 font-['IBM_Plex_Mono']`}
                                />
                                <span className="text-sm text-[#5B6B62]">%</span>
                            </div>
                        </Field>

                        <Field
                            label="Time limit"
                            htmlFor="time_limit_minutes"
                            error={errors.time_limit_minutes}
                            hint="The exam auto-submits when time runs out."
                        >
                            <div className="flex items-center gap-2">
                                <input
                                    id="time_limit_minutes"
                                    type="number"
                                    min="1"
                                    value={data.time_limit_minutes}
                                    onChange={(e) => setData('time_limit_minutes', e.target.value)}
                                    className={`${inputClass} w-24 font-['IBM_Plex_Mono']`}
                                />
                                <span className="text-sm text-[#5B6B62]">minutes</span>
                            </div>
                        </Field>

                        <Field
                            label="Maximum attempts"
                            htmlFor="max_attempts"
                            error={errors.max_attempts}
                            hint="How many times a learner can retake this exam if they don't pass."
                        >
                            <input
                                id="max_attempts"
                                type="number"
                                min="1"
                                value={data.max_attempts}
                                onChange={(e) => setData('max_attempts', e.target.value)}
                                className={`${inputClass} w-24 font-['IBM_Plex_Mono']`}
                            />
                        </Field>

                        <Field
                            label="Questions per attempt"
                            htmlFor="questions_per_attempt"
                            error={errors.questions_per_attempt}
                            hint={`Leave blank to use all ${questionCount} questions in the bank every attempt. Set a lower number to draw a random subset.`}
                        >
                            <input
                                id="questions_per_attempt"
                                type="number"
                                min="1"
                                max={questionCount}
                                value={data.questions_per_attempt}
                                onChange={(e) => setData('questions_per_attempt', e.target.value)}
                                placeholder={`${questionCount} (all)`}
                                className={`${inputClass} w-24 font-['IBM_Plex_Mono']`}
                            />
                        </Field>
                    </div>
                </div>

                <div className="space-y-3">
                    <Toggle
                        checked={data.shuffle_questions}
                        onChange={(v) => setData('shuffle_questions', v)}
                        label="Shuffle question order"
                        hint="Each learner sees questions in a different order."
                    />
                    <Toggle
                        checked={data.shuffle_options}
                        onChange={(v) => setData('shuffle_options', v)}
                        label="Shuffle answer options"
                        hint="Reduces the value of learners sharing 'the answer is C'."
                    />
                </div>

                <div className="flex items-center justify-end gap-3">
                    {isDirty && <span className="text-xs text-[#5B6B62]">Unsaved changes</span>}
                    <button
                        type="submit"
                        disabled={processing}
                        className="rounded bg-[#2F6F5E] px-5 py-2 text-sm font-medium text-white hover:bg-[#24564A] disabled:opacity-50"
                    >
                        {processing ? 'Saving…' : 'Save settings'}
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}