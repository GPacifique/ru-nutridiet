import React from 'react';
import { router, usePage } from '@inertiajs/react';

const MODERATOR_ROLES = ['super_admin', 'admin', 'editor', 'moderator'];

export default function CommentList({ comments = [] }) {
    const { auth } = usePage().props;
    const canModerate = auth?.user && MODERATOR_ROLES.includes(auth.user.role);

    function destroy(comment) {
        if (!confirm('Remove this comment?')) return;
        router.delete(route('comments.destroy', comment.id), { preserveScroll: true });
    }

    if (comments.length === 0) {
        return (
            <p className="font-mono text-xs uppercase tracking-wider text-[#3A4048]/60 py-6">
                No comments yet — be the first to weigh in.
            </p>
        );
    }

    return (
        <ul className="divide-y divide-[#D7DBDE]">
            {comments.map((comment) => (
                <li key={comment.id} className="py-4">
                    <div className="flex items-center justify-between">
                        <p className="font-mono text-[11px] uppercase tracking-wider text-[#3A4048]/70">
                            {comment.name} <span className="text-[#D7DBDE] mx-1">//</span> {comment.created_at}
                        </p>
                        {canModerate && (
                            <button
                                onClick={() => destroy(comment)}
                                className="font-mono text-[10px] uppercase tracking-wider text-[#C1401F] hover:underline"
                            >
                                Remove
                            </button>
                        )}
                    </div>
                    <p className="font-body text-sm text-[#14171F] mt-1.5">{comment.content}</p>
                </li>
            ))}
        </ul>
    );
}