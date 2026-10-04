import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ messages, filters, unread }) {
    const { flash } = usePage().props;
    const [search, setSearch] = useState(filters.search || '');

    const applyFilters = (extra = {}) =>
        router.get('/admin/contacts', { search, status: filters.status, ...extra }, {
            preserveState: true,
            replace: true,
        });

    return (
        <>
            <Head title="Contact messages" />
            <div className="max-w-5xl mx-auto p-6">
                {flash?.success && (
                    <div className="mb-4 rounded border border-green-300 bg-green-50 p-3 text-green-800">
                        {flash.success}
                    </div>
                )}

                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold">
                        Contact messages {unread > 0 && <span className="text-sm text-blue-600">({unread} unread)</span>}
                    </h1>
                    <div className="flex gap-2">
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && applyFilters()}
                            placeholder="Search..."
                            className="rounded border p-2"
                        />
                        <button
                            onClick={() => applyFilters({ status: filters.status === 'unread' ? '' : 'unread' })}
                            className="rounded border px-3"
                        >
                            {filters.status === 'unread' ? 'Show all' : 'Unread only'}
                        </button>
                    </div>
                </div>

                <table className="w-full text-left border">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2">From</th>
                            <th className="p-2">Message</th>
                            <th className="p-2">Date</th>
                            <th className="p-2"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {messages.data.map((m) => (
                            <tr key={m.id} className={m.read_at ? '' : 'font-semibold bg-blue-50'}>
                                <td className="p-2">
                                    {m.name}
                                    <div className="text-xs text-gray-500">{m.email}</div>
                                </td>
                                <td className="p-2">
                                    {m.message.slice(0, 80)}{m.message.length > 80 && '…'}
                                </td>
                                <td className="p-2 text-sm">{new Date(m.created_at).toLocaleString()}</td>
                                <td className="p-2 space-x-2 whitespace-nowrap">
                                    <Link href={`/admin/contacts/${m.id}`} className="text-blue-600">View</Link>
                                    <button
                                        onClick={() => router.patch(`/admin/contacts/${m.id}/toggle-read`, {}, { preserveScroll: true })}
                                        className="text-gray-600"
                                    >
                                        {m.read_at ? 'Mark unread' : 'Mark read'}
                                    </button>
                                    <button
                                        onClick={() => confirm('Delete this message?') && router.delete(`/admin/contacts/${m.id}`, { preserveScroll: true })}
                                        className="text-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {messages.data.length === 0 && (
                            <tr>
                                <td colSpan="4" className="p-4 text-center text-gray-500">No messages found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <div className="mt-4 flex gap-1">
                    {messages.links.map((l, i) => (
                        <Link
                            key={i}
                            href={l.url || '#'}
                            preserveScroll
                            className={`px-3 py-1 border rounded ${l.active ? 'bg-blue-600 text-white' : ''} ${!l.url ? 'opacity-40 pointer-events-none' : ''}`}
                            dangerouslySetInnerHTML={{ __html: l.label }}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}