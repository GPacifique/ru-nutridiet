import { Link, useForm, router } from '@inertiajs/react';
import { ArrowLeft, Trash2 } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';

const defaultCourse = {
    id: 1,
    title: 'Clinical Nutrition Assessment',
    slug: 'clinical-nutrition-assessment',
    description:
        'A practical walkthrough of anthropometric, biochemical, clinical, and dietary assessment methods used in clinical practice.',
    credit_type_id: 1,
    credit_hours: 3,
    price: 89,
    status: 'published',
};

const defaultCreditTypes = [
    { id: 1, name: 'CPEU' },
    { id: 2, name: 'State CE' },
];

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

export default function Edit({ course = defaultCourse, creditTypes = defaultCreditTypes }) {
    const { data, setData, put, processing, errors, isDirty } = useForm({
        title: course.title,
        slug: course.slug,
        description: course.description,
        credit_type_id: course.credit_type_id,
        credit_hours: course.credit_hours,
        price: course.price,
        status: course.status,
    });

    function submit(e) {
        e.preventDefault();
        put(`/admin/courses/${course.id}`);
    }

    function destroy() {
        if (confirm(`Delete "${course.title}"? Learners who purchased it keep access, but it will no longer be sold.`)) {
            router.delete(`/admin/courses/${course.id}`);
        }
    }

    return (
        <AdminLayout title="Edit course">
            <Link
                href="/admin/courses"
                className="mb-6 inline-flex items-center gap-1.5 text-sm text-[#5B6B62] hover:text-[#1F2A24]"
            >
                <ArrowLeft size={15} />
                Back to courses
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

                        <Field
                            label="Slug"
                            htmlFor="slug"
                            error={errors.slug}
                            hint="Used in the public course URL. Changing this breaks existing links."
                        >
                            <input
                                id="slug"
                                type="text"
                                value={data.slug}
                                onChange={(e) => setData('slug', e.target.value)}
                                className={`${inputClass} font-['IBM_Plex_Mono']`}
                            />
                        </Field>

                        <Field label="Description" htmlFor="description" error={errors.description}>
                            <textarea
                                id="description"
                                rows={4}
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                className={inputClass}
                            />
                        </Field>

                        <div className="grid grid-cols-2 gap-4">
                            <Field label="Credit type" htmlFor="credit_type_id" error={errors.credit_type_id}>
                                <select
                                    id="credit_type_id"
                                    value={data.credit_type_id}
                                    onChange={(e) => setData('credit_type_id', Number(e.target.value))}
                                    className={inputClass}
                                >
                                    {creditTypes.map((ct) => (
                                        <option key={ct.id} value={ct.id}>
                                            {ct.name}
                                        </option>
                                    ))}
                                </select>
                            </Field>

                            <Field label="Credit hours" htmlFor="credit_hours" error={errors.credit_hours}>
                                <input
                                    id="credit_hours"
                                    type="number"
                                    step="0.5"
                                    min="0"
                                    value={data.credit_hours}
                                    onChange={(e) => setData('credit_hours', e.target.value)}
                                    className={`${inputClass} font-['IBM_Plex_Mono']`}
                                />
                            </Field>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Field label="Price (USD)" htmlFor="price" error={errors.price}>
                                <input
                                    id="price"
                                    type="number"
                                    step="1"
                                    min="0"
                                    value={data.price}
                                    onChange={(e) => setData('price', e.target.value)}
                                    className={`${inputClass} font-['IBM_Plex_Mono']`}
                                />
                            </Field>

                            <Field label="Status" htmlFor="status" error={errors.status}>
                                <select
                                    id="status"
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className={inputClass}
                                >
                                    <option value="draft">Draft</option>
                                    <option value="published">Published</option>
                                    <option value="archived">Archived</option>
                                </select>
                            </Field>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <button
                        type="button"
                        onClick={destroy}
                        className="inline-flex items-center gap-1.5 rounded px-3 py-2 text-sm text-[#B65C4A] hover:bg-[#F4E7E3]"
                    >
                        <Trash2 size={15} />
                        Delete course
                    </button>

                    <div className="flex items-center gap-3">
                        {isDirty && <span className="text-xs text-[#5B6B62]">Unsaved changes</span>}
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded bg-[#2F6F5E] px-5 py-2 text-sm font-medium text-white hover:bg-[#24564A] disabled:opacity-50"
                        >
                            {processing ? 'Saving…' : 'Save changes'}
                        </button>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}