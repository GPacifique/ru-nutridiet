import Section from './Section';

export default function TestimonialsSection({ testimonials = [] }) {
    if (!testimonials.length) return null;
    return (
        <Section tone="mist" title="What our community says">
            <div className="grid gap-6 md:grid-cols-3">
                {testimonials.slice(0, 6).map((t) => (
                    <figure key={t.id} className="flex flex-col rounded-2xl bg-white p-6 ring-1 ring-slate-200">
                        {t.rating > 0 && <p className="mb-3 text-[#F2B632]" aria-label={`${t.rating} out of 5`}>{'★'.repeat(Math.round(t.rating))}</p>}
                        <blockquote className="text-slate-700">{t.body}</blockquote>
                        <figcaption className="mt-auto flex items-center gap-3 pt-5">
                            <span className="h-10 w-10 overflow-hidden rounded-full bg-[#DDE8D3]">
                                {t.image && <img src={t.image} alt="" className="h-full w-full object-cover" />}
                            </span>
                            <span>
                                <span className="block text-sm font-semibold text-[#0F3D2E]">{t.name}</span>
                                {t.role && <span className="block text-xs text-slate-500">{t.role}</span>}
                            </span>
                        </figcaption>
                    </figure>
                ))}
            </div>
        </Section>
    );
}
