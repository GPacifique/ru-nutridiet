import React from 'react';
import { Link } from '@inertiajs/react';

export default function CategoryPill({ category, active = false }) {
    return (
        <Link
            href={route('categories.show', category.slug)}
            className={`inline-flex items-center font-mono text-[11px] uppercase tracking-wider px-2.5 py-1 border transition-colors
                ${active
                    ? 'bg-[#25406B] border-[#25406B] text-white'
                    : 'bg-transparent border-[#D7DBDE] text-[#3A4048] hover:border-[#25406B] hover:text-[#25406B]'}`}
        >
            {category.name}
        </Link>
    );
}
