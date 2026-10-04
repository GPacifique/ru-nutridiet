import { Head, Link, router } from '@inertiajs/react';

export default function Show({ message }) {
    const replySubject = encodeURIComponent('Re: your message');
    const replyBody = encodeURIComponent(
        `\n\n---\nOn ${new Date(message.created_at).toLocaleString()}, ${message.name} wrote:\n${message.message}`
    );

    return (
        <>
            <Head title={`Message from ${message.name}`} />

            <div className="max-w-3xl mx-auto p-6">
                <Link href="/admin/contacts" className="text-sm text-blue-600">
                    &larr; Back to messages
                </Link>

                <div className="mt-4 rounded border bg-white p-6 shadow-sm">
                    <div className="flex items-start justify-between gap-4 border-b pb-4">
                        <div>
                            <h1 className="text-xl font-bold">{message.name}</h1>
                            <a href={`mailto:${message.email}`} className="text-sm text-blue-600">
                                {message.email}
                            </a>
                        </div>
                        <div className="text-right text-sm text-gray-500">
                            <div>{new Date(message.created_at).toLocaleString()}</div>
                            <div>
                                {message.read_at
                                    ? `Read ${new Date(message.read_at).toLocaleString()}`
                                    : 'Unread'}
                            </div>
                        </div>
                    </div>

                    <p className="whitespace-pre-line py-6 leading-relaxed">{message.message}</p>

                    <div className="flex flex-wrap gap-2 border-t pt-4">
                        <a
                            href={`mailto:${message.email}?subject=${replySubject}&body=${replyBody}`}
                            className="rounded bg-blue-600 px-4 py-2 text-white"
                        >
                            Reply by email
                        </a>

                        <button
                            onClick={() =>
                                router.patch(`/admin/contacts/${message.id}/toggle-read`, {}, { preserveScroll: true })
                            }
                            className="rounded border px-4 py-2"
                        >
                            {message.read_at ? 'Mark as unread' : 'Mark as read'}
                        </button>

                        <button
                            onClick={() =>
                                confirm('Delete this message?') &&
                                router.delete(`/admin/contacts/${message.id}`)
                            }
                            className="rounded border border-red-300 px-4 py-2 text-red-600"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}