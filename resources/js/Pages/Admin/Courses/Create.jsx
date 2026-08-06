import { Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';

const defaultCreditTypes = [
    { id: 1, name: 'CPEU' },
    { id: 2, name: 'State CE' },
];

function slugify(text) {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

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

export default function Create({ creditTypes = defaultCreditTypes }) {
    const { data, setData, post, processing, errors, transform } = useForm({
        title: '',
        slug: '',
        description: '',
        credit_type_id: creditTypes[0]?.id ?? '',
        credit_hours: '',
        price: '',
        status: 'draft',
    });

    // Slug follows the title until someone edits it directly.
    function handleTitleChange(value) {
        setData((prevData) => ({
            ...prevData,
            title: value,
            slug: prevData._slugEdited ? prevData.slug : slugify(value),
        }));
    }

    function submit(e) {
        e.preventDefault();
        transform((formData) => {
            const { _slugEdited, ...rest } = formData;
            return rest;
        });
        post('/admin/courses');
    }

    return (
        <AdminLayout title="New course">
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
                                onChange={(e) => handleTitleChange(e.target.value)}
                                placeholder="e.g. Clinical Nutrition Assessment"
                                className={inputClass}
                            />
                        </Field>

                        <Field
                            label="Slug"
                            htmlFor="slug"
                            error={errors.slug}
                            hint="Used in the public course URL — auto-filled from the title, editable if you want something shorter."
                        >
                            <input
                                id="slug"
                                type="text"
                                value={data.slug}
                                onChange={(e) => setData((d) => ({ ...d, slug: e.target.value, _slugEdited: true }))}
                                placeholder="clinical-nutrition-assessment"
                                className={`${inputClass} font-['IBM_Plex_Mono']`}
                            />
                        </Field>

                        <Field label="Description" htmlFor="description" error={errors.description}>
                            <textarea
                                id="description"
                                rows={4}
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                placeholder="What will learners be able to do after completing this course?"
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
                                    placeholder="3"
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
                                    placeholder="89"
                                    className={`${inputClass} font-['IBM_Plex_Mono']`}
                                />
                            </Field>

                            <Field label="Status" htmlFor="status" error={errors.status} hint="You can publish later once lessons and the exam are ready.">
                                <select
                                    id="status"
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className={inputClass}
                                >
                                    <option value="draft">Draft</option>
                                    <option value="published">Published</option>
                                </select>
                            </Field>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-3">
                    <Link
                        href="/admin/courses"
                        className="rounded px-4 py-2 text-sm font-medium text-[#5B6B62] hover:bg-[#EEF1EC]"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={processing}
                        className="rounded bg-[#2F6F5E] px-5 py-2 text-sm font-medium text-white hover:bg-[#24564A] disabled:opacity-50"
                    >
                        {processing ? 'Creating…' : 'Create course'}
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}