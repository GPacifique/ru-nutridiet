import { Link } from '@inertiajs/react';

export default function Section({ title, intro, href, linkLabel, tone = 'light', children }) {
    const dark = tone === 'dark';
    return (
        <section className={dark ? 'bg-[#0F3D2E] text-white' : tone === 'mist' ? 'bg-[#F3F7F4]' : 'bg-white'}>
            <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
                <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
                    <div className="max-w-xl">
                        <h2 className={`font-display text-3xl font-bold sm:text-4xl ${dark ? 'text-white' : 'text-[#0F3D2E]'}`}>{title}</h2>
                        {intro && <p className={`mt-3 ${dark ? 'text-white/80' : 'text-slate-600'}`}>{intro}</p>}
                    </div>
                    {href && (
                        <Link href={href} className={`font-semibold underline-offset-4 hover:underline ${dark ? 'text-[#F2B632]' : 'text-[#B8325A]'}`}>
                            {linkLabel}
                        </Link>
                    )}
                </div>
                {children}
            </div>
        </section>
    );
}

export const money = (v, currency = '') =>
    v === null || v === undefined || v === '' ? null : `${currency} ${Number(v).toLocaleString()}`.trim();
