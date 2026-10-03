import { useEffect, useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import RichTextEditor from '@/Components/RichTextEditor';

/* ------------------------------------------------------------------ */
/* Small form pieces                                                   */
/* ------------------------------------------------------------------ */

const inputClass =
    'w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-teal-700 focus:outline-none focus:ring-1 focus:ring-teal-700';

function Field({ label, htmlFor, hint, error, children }) {
    return (
        <div>
            <label htmlFor={htmlFor} className="block text-sm font-medium text-slate-800">
                {label}
            </label>
            <div className="mt-1.5">{children}</div>
            {hint && !error && <p className="mt-1.5 text-xs text-slate-500">{hint}</p>}
            {error && (
                <p role="alert" className="mt-1.5 text-xs font-medium text-rose-700">
                    {error}
                </p>
            )}
        </div>
    );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function Create({ statuses = ['draft', 'published'], categories = [] }) {
    const { data, setData, post, processing, errors, progress } = useForm({
        title: '',
        slug: '',
        category: '',
        excerpt: '',
        content: '',
        status: 'draft',
        published_at: '',
        thumbnail: null,
    });

    // Local preview for the chosen thumbnail.
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (!data.thumbnail) {
            setPreview(null);
            return;
        }
        const url = URL.createObjectURL(data.thumbnail);
        setPreview(url);
        return () => URL.revokeObjectURL(url);
    }, [data.thumbnail]);

    const submit = (e) => {
        e.preventDefault();
        post('/admin/articles', { forceFormData: true, preserveScroll: true });
    };

    return (
        <AdminLayout>
            <Head title="New article" />

            <div className="mx-auto max-w-4xl space-y-6 px-4 py-8 sm:px-6">
                <div>
                    <Link href="/admin/articles" className="text-sm text-slate-500 hover:text-slate-800">
                        Back to articles
                    </Link>
                    <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">New article</h1>
                </div>

                <form onSubmit={submit} className="space-y-6" noValidate>
                    <section className="space-y-5 rounded-lg border border-slate-200 bg-white p-6">
                        <Field label="Title" htmlFor="title" error={errors.title}>
                            <input
                                id="title"
                                type="text"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                className={inputClass}
                                autoFocus
                                required
                            />
                        </Field>

                        <Field
                            label="Excerpt"
                            htmlFor="excerpt"
                            hint="A short summary shown on article cards. Up to 500 characters."
                            error={errors.excerpt}
                        >
                            <textarea
                                id="excerpt"
                                rows={3}
                                maxLength={500}
                                value={data.excerpt}
                                onChange={(e) => setData('excerpt', e.target.value)}
                                className={inputClass}
                            />
                            <p className="mt-1 text-right text-xs text-slate-400">{data.excerpt.length}/500</p>
                        </Field>

                        <Field label="Content" htmlFor="content" error={errors.content}>
                            <RichTextEditor
                                value={data.content}
                                onChange={(html) => setData('content', html)}
                                error={errors.content}
                            />
                        </Field>
                    </section>

                    <div className="grid gap-6 lg:grid-cols-2">
                        <section className="space-y-5 rounded-lg border border-slate-200 bg-white p-6">
                            <h2 className="text-base font-semibold text-slate-900">Publishing</h2>

                            <Field label="Status" htmlFor="status" error={errors.status}>
                                <select
                                    id="status"
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className={inputClass}
                                >
                                    {statuses.map((s) => (
                                        <option key={s} value={s}>
                                            {s.charAt(0).toUpperCase() + s.slice(1)}
                                        </option>
                                    ))}
                                </select>
                            </Field>

                            <Field
                                label="Publish date"
                                htmlFor="published_at"
                                hint="Leave empty to publish now. A future date keeps the article hidden until then."
                                error={errors.published_at}
                            >
                                <input
                                    id="published_at"
                                    type="datetime-local"
                                    value={data.published_at}
                                    onChange={(e) => setData('published_at', e.target.value)}
                                    className={inputClass}
                                />
                            </Field>

                            <Field label="Category" htmlFor="category" error={errors.category}>
                                <input
                                    id="category"
                                    type="text"
                                    list="article-categories"
                                    value={data.category}
                                    onChange={(e) => setData('category', e.target.value)}
                                    className={inputClass}
                                    placeholder="Pick one or type a new category"
                                />
                                <datalist id="article-categories">
                                    {categories.map((c) => (
                                        <option key={c} value={c} />
                                    ))}
                                </datalist>
                            </Field>

                            <Field
                                label="URL slug"
                                htmlFor="slug"
                                hint="Leave empty to build it from the title. Letters, numbers, dashes and underscores only."
                                error={errors.slug}
                            >
                                <input
                                    id="slug"
                                    type="text"
                                    value={data.slug}
                                    onChange={(e) => setData('slug', e.target.value)}
                                    className={inputClass}
                                    placeholder="my-first-article"
                                />
                            </Field>
                        </section>

                        <section className="space-y-5 rounded-lg border border-slate-200 bg-white p-6">
                            <h2 className="text-base font-semibold text-slate-900">Thumbnail</h2>

                            <div className="flex aspect-video w-full items-center justify-center overflow-hidden rounded-md border border-dashed border-slate-300 bg-slate-50">
                                {preview ? (
                                    <img src={preview} alt="Thumbnail preview" className="h-full w-full object-cover" />
                                ) : (
                                    <p className="px-4 text-center text-sm text-slate-400">No image selected</p>
                                )}
                            </div>

                            <Field
                                label="Image"
                                htmlFor="thumbnail"
                                hint="JPG, PNG or WebP, up to 3 MB."
                                error={errors.thumbnail}
                            >
                                <input
                                    id="thumbnail"
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp"
                                    onChange={(e) => setData('thumbnail', e.target.files[0] ?? null)}
                                    className="block w-full text-sm text-slate-600 file:mr-3 file:rounded-md file:border-0 file:bg-slate-100 file:px-3 file:py-2 file:text-sm file:font-medium file:text-slate-700 hover:file:bg-slate-200"
                                />
                            </Field>

                            {data.thumbnail && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setData('thumbnail', null);
                                        document.getElementById('thumbnail').value = '';
                                    }}
                                    className="text-sm font-medium text-rose-700 hover:underline"
                                >
                                    Remove image
                                </button>
                            )}

                            {progress && (
                                <div className="h-2 rounded-full bg-slate-100" aria-label="Upload progress">
                                    <div
                                        className="h-2 rounded-full bg-teal-700"
                                        style={{ width: `${progress.percentage}%` }}
                                    />
                                </div>
                            )}
                        </section>
                    </div>

                    <div className="flex items-center justify-end gap-3">
                        <Link
                            href="/admin/articles"
                            className="rounded-md px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-md bg-teal-700 px-5 py-2 text-sm font-medium text-white hover:bg-teal-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {processing ? 'Saving…' : 'Create article'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}