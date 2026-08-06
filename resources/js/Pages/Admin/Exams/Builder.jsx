import { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import {
    ArrowLeft,
    Plus,
    Trash2,
    ChevronDown,
    GripVertical,
    CheckCircle2,
    Circle,
    Square,
    CheckSquare,
} from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';

const defaultCourse = { id: 1, title: 'Clinical Nutrition Assessment' };

const defaultQuestions = [
    {
        id: 1,
        type: 'single',
        text: 'Which measurement is most appropriate for assessing central adiposity?',
        points: 1,
        options: [
            { id: 1, text: 'Body mass index', is_correct: false },
            { id: 2, text: 'Waist circumference', is_correct: true },
            { id: 3, text: 'Triceps skinfold', is_correct: false },
            { id: 4, text: 'Mid-arm muscle circumference', is_correct: false },
        ],
    },
    {
        id: 2,
        type: 'multiple',
        text: 'Which of the following are components of the Subjective Global Assessment (select all that apply)?',
        points: 2,
        options: [
            { id: 5, text: 'Weight change history', is_correct: true },
            { id: 6, text: 'Dietary intake change', is_correct: true },
            { id: 7, text: 'Serum albumin level', is_correct: false },
            { id: 8, text: 'Physical exam findings', is_correct: true },
        ],
    },
    {
        id: 3,
        type: 'true_false',
        text: 'A prealbumin level is a reliable marker of long-term nutritional status.',
        points: 1,
        options: [
            { id: 9, text: 'True', is_correct: false },
            { id: 10, text: 'False', is_correct: true },
        ],
    },
];

const TYPE_LABELS = {
    single: 'Single choice',
    multiple: 'Multiple choice',
    true_false: 'True / False',
};

function emptyDraft(type = 'single') {
    return {
        id: null,
        type,
        text: '',
        points: 1,
        options:
            type === 'true_false'
                ? [
                      { id: 'tf-true', text: 'True', is_correct: false },
                      { id: 'tf-false', text: 'False', is_correct: false },
                  ]
                : [
                      { id: crypto.randomUUID(), text: '', is_correct: false },
                      { id: crypto.randomUUID(), text: '', is_correct: false },
                  ],
    };
}

function QuestionEditor({ draft, onChange, onSave, onCancel, saving }) {
    function setType(type) {
        onChange({ ...emptyDraft(type), id: draft.id, text: draft.text, points: draft.points });
    }

    function setOptionText(id, text) {
        onChange({ ...draft, options: draft.options.map((o) => (o.id === id ? { ...o, text } : o)) });
    }

    function toggleCorrect(id) {
        if (draft.type === 'multiple') {
            onChange({
                ...draft,
                options: draft.options.map((o) => (o.id === id ? { ...o, is_correct: !o.is_correct } : o)),
            });
        } else {
            onChange({
                ...draft,
                options: draft.options.map((o) => ({ ...o, is_correct: o.id === id })),
            });
        }
    }

    function addOption() {
        onChange({ ...draft, options: [...draft.options, { id: crypto.randomUUID(), text: '', is_correct: false }] });
    }

    function removeOption(id) {
        onChange({ ...draft, options: draft.options.filter((o) => o.id !== id) });
    }

    const canSave =
        draft.text.trim() &&
        draft.options.every((o) => o.text.trim()) &&
        draft.options.some((o) => o.is_correct) &&
        (draft.type !== 'multiple' || draft.options.filter((o) => o.is_correct).length >= 1);

    return (
        <div className="space-y-4 bg-[#F7F8F5] px-4 py-4">
            <div>
                <label className="mb-1.5 block text-sm font-medium text-[#1F2A24]">Question</label>
                <textarea
                    rows={2}
                    value={draft.text}
                    onChange={(e) => onChange({ ...draft, text: e.target.value })}
                    placeholder="Type the question as it will appear to learners"
                    className="w-full rounded border border-[#D8DDD5] bg-white px-3 py-2 text-sm placeholder:text-[#98A398] focus:border-[#2F6F5E] focus:outline-none focus:ring-2 focus:ring-[#2F6F5E]/20"
                />
            </div>

            <div className="flex items-end gap-4">
                <div>
                    <label className="mb-1.5 block text-sm font-medium text-[#1F2A24]">Type</label>
                    <div className="inline-flex rounded border border-[#D8DDD5] bg-white p-1">
                        {Object.entries(TYPE_LABELS).map(([value, label]) => (
                            <button
                                key={value}
                                type="button"
                                onClick={() => setType(value)}
                                className={`rounded px-2.5 py-1.5 text-xs transition-colors ${
                                    draft.type === value ? 'bg-[#2F6F5E] text-white' : 'text-[#5B6B62] hover:bg-[#EEF1EC]'
                                }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>
                <div>
                    <label className="mb-1.5 block text-sm font-medium text-[#1F2A24]">Points</label>
                    <input
                        type="number"
                        min="1"
                        value={draft.points}
                        onChange={(e) => onChange({ ...draft, points: e.target.value })}
                        className="w-20 rounded border border-[#D8DDD5] bg-white px-3 py-2 text-sm font-['IBM_Plex_Mono'] focus:border-[#2F6F5E] focus:outline-none focus:ring-2 focus:ring-[#2F6F5E]/20"
                    />
                </div>
            </div>

            <div>
                <label className="mb-1.5 block text-sm font-medium text-[#1F2A24]">
                    Options
                    <span className="ml-2 font-normal text-xs text-[#5B6B62]">
                        {draft.type === 'multiple' ? 'Check all correct answers' : 'Select the correct answer'}
                    </span>
                </label>
                <div className="space-y-2">
                    {draft.options.map((option) => {
                        const CorrectIcon =
                            draft.type === 'multiple'
                                ? option.is_correct
                                    ? CheckSquare
                                    : Square
                                : option.is_correct
                                  ? CheckCircle2
                                  : Circle;
                        return (
                            <div key={option.id} className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => toggleCorrect(option.id)}
                                    className={option.is_correct ? 'text-[#2F6F5E]' : 'text-[#98A398]'}
                                    title="Mark correct"
                                >
                                    <CorrectIcon size={18} />
                                </button>
                                <input
                                    type="text"
                                    value={option.text}
                                    disabled={draft.type === 'true_false'}
                                    onChange={(e) => setOptionText(option.id, e.target.value)}
                                    placeholder="Option text"
                                    className="flex-1 rounded border border-[#D8DDD5] bg-white px-3 py-1.5 text-sm placeholder:text-[#98A398] disabled:bg-[#F2F3EF] disabled:text-[#5B6B62] focus:border-[#2F6F5E] focus:outline-none focus:ring-2 focus:ring-[#2F6F5E]/20"
                                />
                                {draft.type !== 'true_false' && draft.options.length > 2 && (
                                    <button
                                        type="button"
                                        onClick={() => removeOption(option.id)}
                                        className="rounded p-1.5 text-[#5B6B62] hover:bg-[#F4E7E3] hover:text-[#B65C4A]"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>
                {draft.type !== 'true_false' && (
                    <button
                        type="button"
                        onClick={addOption}
                        className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-[#2F6F5E] hover:underline"
                    >
                        <Plus size={13} />
                        Add option
                    </button>
                )}
            </div>

            <div className="flex items-center justify-end gap-3 pt-1">
                <button type="button" onClick={onCancel} className="rounded px-3 py-2 text-sm text-[#5B6B62] hover:bg-[#EEF1EC]">
                    Cancel
                </button>
                <button
                    type="button"
                    onClick={onSave}
                    disabled={!canSave || saving}
                    className="rounded bg-[#2F6F5E] px-4 py-2 text-sm font-medium text-white hover:bg-[#24564A] disabled:opacity-50"
                >
                    {saving ? 'Saving…' : 'Save question'}
                </button>
            </div>
        </div>
    );
}

export default function Builder({ course = defaultCourse, questions: initialQuestions = defaultQuestions }) {
    const [questions, setQuestions] = useState(initialQuestions);
    const [openId, setOpenId] = useState(null); // question id, 'new', or null
    const [draft, setDraft] = useState(null);
    const [saving, setSaving] = useState(false);

    const totalPoints = questions.reduce((sum, q) => sum + Number(q.points), 0);

    function openNew() {
        setDraft(emptyDraft());
        setOpenId('new');
    }

    function openEdit(question) {
        setDraft(question);
        setOpenId(question.id);
    }

    function closeEditor() {
        setOpenId(null);
        setDraft(null);
    }

    function save() {
        setSaving(true);
        const isNew = openId === 'new';
        const url = isNew
            ? `/admin/courses/${course.id}/exam/questions`
            : `/admin/courses/${course.id}/exam/questions/${draft.id}`;

        router[isNew ? 'post' : 'put'](url, draft, {
            preserveScroll: true,
            onSuccess: () => {
                setQuestions((prev) =>
                    isNew ? [...prev, { ...draft, id: draft.id ?? Date.now() }] : prev.map((q) => (q.id === draft.id ? draft : q)),
                );
                closeEditor();
                setSaving(false);
            },
            onError: () => setSaving(false),
        });
    }

    function deleteQuestion(question) {
        if (confirm('Delete this question? It will be removed from all future exam attempts.')) {
            router.delete(`/admin/courses/${course.id}/exam/questions/${question.id}`, {
                preserveScroll: true,
                onSuccess: () => setQuestions((prev) => prev.filter((q) => q.id !== question.id)),
            });
        }
    }

    return (
        <AdminLayout title="Exam builder">
            <div className="mb-2 flex items-center justify-between">
                <Link
                    href={`/admin/courses/${course.id}`}
                    className="inline-flex items-center gap-1.5 text-sm text-[#5B6B62] hover:text-[#1F2A24]"
                >
                    <ArrowLeft size={15} />
                    Back to {course.title}
                </Link>
                <Link href={`/admin/courses/${course.id}/exam/settings`} className="text-sm text-[#2F6F5E] hover:underline">
                    Exam settings
                </Link>
            </div>
            <p className="mb-6 text-sm text-[#5B6B62]">
                {questions.length} question{questions.length === 1 ? '' : 's'} · {totalPoints} point{totalPoints === 1 ? '' : 's'} total
            </p>

            <div className="overflow-hidden rounded border border-[#D8DDD5]">
                {questions.length === 0 && openId !== 'new' ? (
                    <div className="bg-white px-6 py-14 text-center">
                        <p className="mb-4 text-sm text-[#5B6B62]">
                            No questions yet — add the first one to build this exam.
                        </p>
                        <button
                            onClick={openNew}
                            className="inline-flex items-center gap-1.5 rounded bg-[#2F6F5E] px-4 py-2 text-sm font-medium text-white hover:bg-[#24564A]"
                        >
                            <Plus size={15} strokeWidth={2.5} />
                            Add question
                        </button>
                    </div>
                ) : (
                    <>
                        {questions.map((question, index) => (
                            <div key={question.id} className="border-b border-[#E7EBE3] bg-white last:border-0">
                                <div className="flex items-center gap-3 px-4 py-3">
                                    <GripVertical size={16} className="shrink-0 text-[#98A398]" />
                                    <span className="font-['IBM_Plex_Mono'] text-xs tabular-nums text-[#5B6B62]">
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                    <button
                                        onClick={() => (openId === question.id ? closeEditor() : openEdit(question))}
                                        className="flex flex-1 items-center gap-2 truncate text-left text-sm text-[#1F2A24] hover:text-[#2F6F5E]"
                                    >
                                        <span className="truncate">{question.text}</span>
                                    </button>
                                    <span className="shrink-0 rounded-full bg-[#EEF1EC] px-2 py-0.5 text-xs text-[#5B6B62]">
                                        {TYPE_LABELS[question.type]}
                                    </span>
                                    <span className="shrink-0 font-['IBM_Plex_Mono'] text-xs tabular-nums text-[#5B6B62]">
                                        {question.points} pt{question.points === '1' || question.points === 1 ? '' : 's'}
                                    </span>
                                    <button
                                        onClick={() => deleteQuestion(question)}
                                        className="shrink-0 rounded p-1.5 text-[#5B6B62] hover:bg-[#F4E7E3] hover:text-[#B65C4A]"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                    <button
                                        onClick={() => (openId === question.id ? closeEditor() : openEdit(question))}
                                        className="shrink-0 text-[#5B6B62]"
                                    >
                                        <ChevronDown
                                            size={16}
                                            className={`transition-transform ${openId === question.id ? 'rotate-180' : ''}`}
                                        />
                                    </button>
                                </div>
                                {openId === question.id && draft && (
                                    <QuestionEditor draft={draft} onChange={setDraft} onSave={save} onCancel={closeEditor} saving={saving} />
                                )}
                            </div>
                        ))}

                        {openId === 'new' && draft ? (
                            <div className="border-t border-[#E7EBE3]">
                                <QuestionEditor draft={draft} onChange={setDraft} onSave={save} onCancel={closeEditor} saving={saving} />
                            </div>
                        ) : (
                            <button
                                onClick={openNew}
                                className="flex w-full items-center justify-center gap-1.5 border-t border-[#E7EBE3] bg-[#F7F8F5] px-4 py-3 text-sm font-medium text-[#2F6F5E] hover:bg-[#EEF1EC]"
                            >
                                <Plus size={15} strokeWidth={2.5} />
                                Add question
                            </button>
                        )}
                    </>
                )}
            </div>
        </AdminLayout>
    );
}