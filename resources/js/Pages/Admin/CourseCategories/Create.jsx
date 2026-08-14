import { Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';

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

export default function Create({ parents = [] }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        parent_id: parents[0]?.id ?? '',
    });

    function submit(e) {
        e.preventDefault();
        post('/admin/course-categories');
    }

    return (
        <AdminLayout title="New category">
            <Link
                href="/admin/course-categories"
                className="mb-6 inline-flex items-center gap-1.5 text-sm text-[#5B6B62] hover:text-[#1F2A24]"
            >
                <ArrowLeft size={15} />
                Back to categories
            </Link>

            <form onSubmit={submit} className="max-w-2xl space-y-6">
                <div className="rounded border border-[#D8DDD5] bg-white p-6">
                    <div className="space-y-5">
                        <Field label="Name" htmlFor="name" error={errors.name}>
                            <input
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="e.g. Clinical Nutrition"
                                className={inputClass}
                            />
                        </Field>

                        <Field label="Parent category" htmlFor="parent_id" error={errors.parent_id}>
                            <select
                                id="parent_id"
                                value={data.parent_id}
                                onChange={(e) => setData('parent_id', e.target.value)}
                                className={inputClass}
                            >
                                <option value="">None</option>
                                {parents.map((p) => (
                                    <option key={p.id} value={p.id}>
                                        {p.name}
                                    </option>
                                ))}
                            </select>
                        </Field>

                        <Field label="Description" htmlFor="description" error={errors.description}>
                            <textarea
                                id="description"
                                rows={4}
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                placeholder="Optional description"
                                className={inputClass}
                            />
                        </Field>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-3">
                    <Link
                        href="/admin/course-categories"
                        className="rounded px-4 py-2 text-sm font-medium text-[#5B6B62] hover:bg-[#EEF1EC]"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={processing}
                        className="rounded bg-[#2F6F5E] px-5 py-2 text-sm font-medium text-white hover:bg-[#24564A] disabled:opacity-50"
                    >
                        {processing ? 'Creating…' : 'Create category'}
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}
