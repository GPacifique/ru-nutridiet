import { Link } from '@inertiajs/react';
import Section from './Section';

export default function PractitionersSection({ practitioners = [] }) {
    return (
        <Section tone="dark" title="See a practitioner" intro="Book a one-to-one appointment with a qualified nutrition professional." href={route('book')} linkLabel="Book an appointment">
            {practitioners.length > 0 && (
                <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {practitioners.map((p) => (
                        <li key={p.id} className="flex items-center gap-4 rounded-2xl bg-white/10 p-4">
                            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full bg-[#2F9E5B]">
                                {p.image && <img src={p.image} alt="" loading="lazy" className="h-full w-full object-cover" />}
                            </div>
                            <div className="min-w-0">
                                <p className="truncate font-semibold">{p.name}</p>
                                {p.specialty && <p className="truncate text-sm text-white/70">{p.specialty}</p>}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            {practitioners.length === 0 && (
                <Link href={route('book')} className="inline-block rounded-full bg-[#F2B632] px-7 py-3 font-semibold text-[#0F3D2E]">Book an appointment</Link>
            )}
        </Section>
    );
}
