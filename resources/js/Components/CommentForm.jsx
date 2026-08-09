import React from 'react';
import { useForm } from '@inertiajs/react';

export default function CommentForm({ article }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        content: '',
    });

    function submit(e) {
        e.preventDefault();
        post(route('comments.store', article.id), {
            preserveScroll: true,
            onSuccess: () => reset('content'),
        });
    }

    return (
        <form onSubmit={submit} className="border border-[#D7DBDE] bg-white p-4 space-y-3">
            <div>
                <label className="font-mono text-[11px] uppercase tracking-wider text-[#3A4048]/70 mb-2 block">
                    Name
                </label>
                <input
                    type="text"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    placeholder="Your name"
                    className="w-full border border-[#D7DBDE] font-body text-sm p-3 focus:outline-none focus:border-[#25406B]"
                />
                {errors.name && <p className="text-[#C1401F] font-mono text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
                <label className="font-mono text-[11px] uppercase tracking-wider text-[#3A4048]/70 mb-2 block">
                    Email (optional, not published)
                </label>
                <input
                    type="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    placeholder="you@example.com"
                    className="w-full border border-[#D7DBDE] font-body text-sm p-3 focus:outline-none focus:border-[#25406B]"
                />
                {errors.email && <p className="text-[#C1401F] font-mono text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
                <label className="font-mono text-[11px] uppercase tracking-wider text-[#3A4048]/70 mb-2 block">
                    Add a comment
                </label>
                <textarea
                    value={data.content}
                    onChange={(e) => setData('content', e.target.value)}
                    rows={3}
                    placeholder="Share your take on this story…"
                    className="w-full border border-[#D7DBDE] font-body text-sm p-3 focus:outline-none focus:border-[#25406B] resize-none"
                />
                {errors.content && <p className="text-[#C1401F] font-mono text-xs mt-1">{errors.content}</p>}
            </div>

            <div className="flex justify-end mt-3">
                <button
                    type="submit"
                    disabled={processing}
                    className="font-mono text-xs uppercase tracking-wider bg-[#14171F] text-white px-4 py-2 hover:bg-[#25406B] transition-colors disabled:opacity-50"
                >
                    {processing ? 'Posting…' : 'Post comment'}
                </button>
            </div>
        </form>
    );
}
