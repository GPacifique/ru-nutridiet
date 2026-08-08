import React from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import WireStrip from '@/Components/WireStrip';

/**
 * props: { article: Article, categories: Category[] }
 */
export default function Edit({ article, categories = [] }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'put',
        title: article.title ?? '',
        category_id: article.category_id ?? '',
        excerpt: article.excerpt ?? '',
        content: article.content ?? '',
        cover_image: null,
        status: article.status ?? 'draft',
    });

    function submit(e) {
        e.preventDefault();
        post(route('articles.update', article.id), { forceFormData: true });
    }

    function destroy() {
        if (!confirm(`Delete "${article.title}"? This can't be undone.`)) return;
        router.delete(route('articles.destroy', article.id));
    }

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div>
                        <WireStrip code="EDIT" timestamp={data.status.toUpperCase()} tone="gold" className="mb-2" />
                        <h1 className="font-display font-bold text-3xl text-[#14171F]">{article.title}</h1>
                    </div>
                    <button
                        onClick={destroy}
                        className="font-mono text-xs uppercase tracking-wider border border-[#D7DBDE] px-4 py-2.5 text-[#C1401F] hover:border-[#C1401F]"
                    >
                        Delete article
                    </button>
                </div>
            }
        >
            <Head title={`Edit — ${article.title}`} />

            <form onSubmit={submit} className="max-w-3xl bg-white border border-[#D7DBDE] p-6 space-y-5">
                <Field label="Title" error={errors.title}>
                    <input
                        type="text"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        className="w-full border border-[#D7DBDE] font-body text-sm p-3 focus:outline-none focus:border-[#25406B]"
                    />
                </Field>

                <Field label="Category" error={errors.category_id}>
                    <select
                        value={data.category_id}
                        onChange={(e) => setData('category_id', e.target.value)}
                        className="w-full border border-[#D7DBDE] font-body text-sm p-3 focus:outline-none focus:border-[#25406B] bg-white"
                    >
                        <option value="">Select a category…</option>
                        {categories.map((c) => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                </Field>

                <Field label="Excerpt" error={errors.excerpt}>
                    <textarea
                        value={data.excerpt}
                        onChange={(e) => setData('excerpt', e.target.value)}
                        rows={2}
                        className="w-full border border-[#D7DBDE] font-body text-sm p-3 focus:outline-none focus:border-[#25406B] resize-none"
                    />
                </Field>

                {article.cover_image && (
                    <img src={article.cover_image} alt={article.title} className="w-full max-w-sm aspect-[16/9] object-cover border border-[#D7DBDE]" />
                )}
                <Field label="Replace cover image" error={errors.cover_image}>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setData('cover_image', e.target.files[0])}
                        className="font-mono text-xs"
                    />
                </Field>

                <Field label="Content" error={errors.content}>
                    <textarea
                        value={data.content}
                        onChange={(e) => setData('content', e.target.value)}
                        rows={14}
                        className="w-full border border-[#D7DBDE] font-body text-sm p-3 focus:outline-none focus:border-[#25406B]"
                    />
                </Field>

                <Field label="Status" error={errors.status}>
                    <select
                        value={data.status}
                        onChange={(e) => setData('status', e.target.value)}
                        className="w-full border border-[#D7DBDE] font-body text-sm p-3 focus:outline-none focus:border-[#25406B] bg-white"
                    >
                        <option value="draft">Draft</option>
                        <option value="pending">Pending review</option>
                        <option value="published">Published</option>
                    </select>
                </Field>

                <div className="flex justify-end pt-2">
                    <button
                        type="submit"
                        disabled={processing}
                        className="font-mono text-xs uppercase tracking-wider bg-[#14171F] text-white px-6 py-3 hover:bg-[#25406B] disabled:opacity-50"
                    >
                        {processing ? 'Saving…' : 'Save changes'}
                    </button>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}

function Field({ label, error, children }) {
    return (
        <div>
            <label className="font-mono text-[11px] uppercase tracking-wider text-[#3A4048]/70 mb-2 block">{label}</label>
            {children}
            {error && <p className="text-[#C1401F] font-mono text-xs mt-1">{error}</p>}
        </div>
    );
}
