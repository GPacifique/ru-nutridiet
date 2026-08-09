import { Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';

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

// `categories` comes from Admin\CourseController@create,
// which passes CourseCategory::orderBy('name')->get(['id', 'name'])
export default function Create({ categories = [] }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        course_category_id: categories[0]?.id ?? '',
        description: '',
        price: '',
        thumbnail: null,
        is_published: false,
    });

    function submit(e) {
        e.preventDefault();
        post('/admin/courses', {
            forceFormData: true, // required so the thumbnail file uploads correctly
        });
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
                                onChange={(e) => setData('title', e.target.value)}
                                placeholder="e.g. Clinical Nutrition Assessment"
                                className={inputClass}
                            />
                        </Field>

                        <Field
                            label="Category"
                            htmlFor="course_category_id"
                            error={errors.course_category_id}
                            hint={categories.length === 0 ? 'No categories yet — create one first.' : undefined}
                        >
                            <select
                                id="course_category_id"
                                value={data.course_category_id}
                                onChange={(e) => setData('course_category_id', Number(e.target.value))}
                                className={inputClass}
                            >
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
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
                                placeholder="What will learners be able to do after completing this course?"
                                className={inputClass}
                            />
                        </Field>

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

                        <Field label="Thumbnail" htmlFor="thumbnail" error={errors.thumbnail} hint="JPG, PNG, or WEBP, up to 2MB.">
                            <input
                                id="thumbnail"
                                type="file"
                                accept="image/png,image/jpeg,image/webp"
                                onChange={(e) => setData('thumbnail', e.target.files[0] ?? null)}
                                className={inputClass}
                            />
                        </Field>

                        <label className="flex items-center gap-2 text-sm text-[#1F2A24]">
                            <input
                                type="checkbox"
                                checked={data.is_published}
                                onChange={(e) => setData('is_published', e.target.checked)}
                                className="h-4 w-4 rounded border-[#D8DDD5] text-[#2F6F5E] focus:ring-[#2F6F5E]/20"
                            />
                            Publish immediately
                        </label>
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