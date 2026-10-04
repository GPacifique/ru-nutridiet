import { Link } from '@inertiajs/react';
import Section, { money } from './Section';

export default function CoursesSection({ courses = [], currency }) {
    if (!courses.length) return null;
    return (
        <Section tone="mist" title="Learn nutrition your way" intro="Courses you can start today." href={route('courses.index')} linkLabel="Browse all courses">
            <div className="grid gap-6 md:grid-cols-3">
                {courses.slice(0, 6).map((c) => (
                    <Link key={c.id} href={c.url} className="flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200 transition hover:ring-[#2F9E5B]">
                        <div className="aspect-video bg-[#DDE8D3]">
                            {c.image && <img src={c.image} alt="" loading="lazy" className="h-full w-full object-cover" />}
                        </div>
                        <div className="flex flex-1 flex-col p-5">
                            <h3 className="font-semibold text-[#0F3D2E]">{c.title}</h3>
                            {c.summary && <p className="mt-2 text-sm text-slate-600">{c.summary}</p>}
                            {money(c.price, currency) && <p className="mt-auto pt-4 font-bold text-[#B8325A]">{money(c.price, currency)}</p>}
                        </div>
                    </Link>
                ))}
            </div>
        </Section>
    );
}
