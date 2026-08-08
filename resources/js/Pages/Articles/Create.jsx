import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import WireStrip from '@/Components/WireStrip';
import ArticleEditor from '@/Components/ArticleEditor';

/**
 * props: { categories: Category[] }
 */
export default function Create({ categories = [] }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        category_id: '',
        excerpt: '',
        content: '',
        cover_image: null,
        status: 'draft',
    });

    function submit(e) {
        e.preventDefault();
        post(route('articles.store'), { forceFormData: true });
    }

    return (
        <AuthenticatedLayout
            header={
                <>
                    <WireStrip code="NEW" timestamp="DRAFT" tone="press" className="mb-2" />
                    <h1 className="font-display font-bold text-3xl text-[#14171F]">Write an article</h1>
                </>
            }
        >
            <Head title="Write article" />

            <form onSubmit={submit} className="max-w-3xl bg-white border border-[#D7DBDE] p-6 space-y-5">
                <Field label="Title" error={errors.title}>
                    <input
                        type="text"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        placeholder="Headline for this story"
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
                        placeholder="One or two sentences for the article card"
                        className="w-full border border-[#D7DBDE] font-body text-sm p-3 focus:outline-none focus:border-[#25406B] resize-none"
                    />
                </Field>

                <Field label="Cover image" error={errors.cover_image}>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setData('cover_image', e.target.files[0])}
                        className="font-mono text-xs"
                    />
                </Field>

                <Field label="Content" error={errors.content}>
                    <ArticleEditor
                        content={data.content}
                        onChange={(html) => setData('content', html)}
                    />
                </Field>

                <Field label="Status" error={errors.status}>
                    <select
                        value={data.status}
                        onChange={(e) => setData('status', e.target.value)}
                        className="w-full border border-[#D7DBDE] font-body text-sm p-3 focus:outline-none focus:border-[#25406B] bg-white"
                    >
                        <option value="draft">Draft</option>
                        <option value="pending">Submit for review</option>
                        <option value="published">Publish</option>
                    </select>
                </Field>

                <div className="flex justify-end pt-2">
                    <button
                        type="submit"
                        disabled={processing}
                        className="font-mono text-xs uppercase tracking-wider bg-[#14171F] text-white px-6 py-3 hover:bg-[#25406B] disabled:opacity-50"
                    >
                        {processing ? 'Saving…' : 'Save article'}
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