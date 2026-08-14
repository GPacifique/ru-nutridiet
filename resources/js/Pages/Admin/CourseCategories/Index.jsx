import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Index({ categories = [] }) {
    // Support both plain arrays and paginated responses ({ data: [...] })
    const list = Array.isArray(categories) ? categories : Array.isArray(categories?.data) ? categories.data : [];

    return (
        <AdminLayout title="Course Categories">
            <Head title="Course Categories" />

            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Course categories</h2>
                <Link
                    href="/admin/course-categories/create"
                    className="inline-flex items-center gap-2 rounded bg-green-700 px-3 py-2 text-sm text-white hover:bg-green-800"
                >
                    New Category
                </Link>
            </div>

            <div className="rounded border bg-white p-4">
                {list.length === 0 ? (
                    <p className="text-sm text-gray-500">No categories yet.</p>
                ) : (
                    <ul className="divide-y">
                        {list.map((c) => (
                            <li key={c.id} className="py-3 flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-gray-900">{c.name}</p>
                                    {c.description && <p className="text-sm text-gray-500">{c.description}</p>}
                                </div>
                                <Link href={`/admin/course-categories/${c.id}/edit`} className="text-sm text-green-700">Edit</Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </AdminLayout>
    );
}
