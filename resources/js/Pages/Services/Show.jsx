// resources/js/Pages/Services/Show.jsx
import React from "react";
import { Head, Link } from "@inertiajs/react";
import PublicNavigation from "@/Layouts/PublicNavigation";
import Icon3D, { TINTS } from "@/Components/Icon3D";
import { services } from "@/data/services";
import { ArrowLeft, ArrowRight, Check, CalendarCheck, SearchX } from "lucide-react";

export default function Show({ id }) {
    const index = services.findIndex((s) => s.id === Number(id));
    const service = services[index];

    const style = `
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');
        .svc-root{font-family:'Inter',ui-sans-serif,system-ui,sans-serif}
        .font-display{font-family:'Space Grotesk',ui-sans-serif,system-ui,sans-serif;letter-spacing:-.02em}
        .icon3d{transition:transform .35s cubic-bezier(.2,.8,.2,1)}
        .tilt:hover .icon3d{transform:perspective(300px) rotateX(10deg) rotateY(-12deg) translateY(-3px) scale(1.06)}
        @media (prefers-reduced-motion:reduce){.icon3d{transition:none}}
    `;

    /* Unknown id: friendly message instead of a crash */
    if (!service) {
        return (
            <>
                <Head title="Service not found | RU-NUTRIDIET" />
                <style>{style}</style>
                <div className="svc-root grid min-h-[60vh] place-items-center bg-white px-6 text-center">
                    <div>
                        <div className="mx-auto w-fit"><Icon3D icon={SearchX} tone="amber" size={72} /></div>
                        <h1 className="font-display mt-6 text-2xl font-semibold tracking-tight text-slate-900">We couldn't find that service</h1>
                        <p className="mt-2 text-slate-600">It may have been moved or renamed.</p>
                        <Link href="/services" className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-800">
                            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All services
                        </Link>
                    </div>
                </div>
            </>
        );
    }

    const prev = services[(index - 1 + services.length) % services.length];
    const next = services[(index + 1) % services.length];
    const related = [1, 2, 3].map((n) => services[(index + n) % services.length]);

    return (
        <>
            <Head>
                <title>{`${service.title} | RU-NUTRIDIET`}</title>
                <meta name="description" content={service.short} />
            </Head>
            <style>{style}</style>

            <div className="svc-root min-h-screen bg-white text-slate-800 antialiased">
                {/* HERO */}
                <section className="border-b border-slate-100 bg-slate-50/60">
                    <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
                        <Link href="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 transition-colors hover:text-emerald-900">
                            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All services
                        </Link>
                        <div className="mt-8 flex max-w-4xl flex-col gap-6 sm:flex-row sm:items-center">
                            <Icon3D icon={service.icon} tone={service.tone} size={88} />
                            <div>
                                <span className="text-xs font-semibold uppercase tracking-widest text-emerald-700">Nutrition &amp; Wellness</span>
                                <h1 className="font-display mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">{service.title}</h1>
                                <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">{service.short}</p>
                            </div>
                        </div>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <Link href="/book" className="inline-flex items-center gap-2 rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700">
                                <CalendarCheck className="h-4 w-4" aria-hidden="true" /> Book this service
                            </Link>
                            <Link href="/contact" className="inline-flex items-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-emerald-600 hover:text-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700">
                                Ask a question
                            </Link>
                        </div>
                    </div>
                </section>

                {/* DETAILS */}
                <section className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-16">
                    <div className="max-w-3xl">
                        <span className="text-xs font-semibold uppercase tracking-widest text-emerald-700">Your care, your goals</span>
                        <h2 className="font-display mt-3 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">About this service</h2>
                        <p className="mt-4 text-base leading-relaxed text-slate-600">{service.description}</p>
                    </div>

                    <h2 className="font-display mt-12 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">What's included</h2>
                    <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {service.features.map((f) => (
                            <li key={f} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-900/5">
                                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-emerald-50 text-emerald-700">
                                    <Check className="h-4 w-4" strokeWidth={3} aria-hidden="true" />
                                </span>
                                <span className="font-medium text-slate-800">{f}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-6">
                        <Link href={`/services/${prev.id}`} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-emerald-800">
                            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> {prev.title}
                        </Link>
                        <Link href={`/services/${next.id}`} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-emerald-800">
                            {next.title} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                    </div>
                </section>

                {/* RELATED */}
                <section className="border-t border-slate-100 bg-slate-50/60 py-14 lg:py-16">
                    <div className="mx-auto max-w-5xl px-6">
                        <span className="text-xs font-semibold uppercase tracking-widest text-emerald-700">Explore more</span>
                        <h2 className="font-display mt-3 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Other services you may need</h2>
                        <div className="mt-8 grid gap-6 md:grid-cols-3">
                            {related.map((s) => (
                                <Link
                                    key={s.id}
                                    href={`/services/${s.id}`}
                                    className={`tilt group rounded-2xl bg-white p-6 shadow-sm shadow-slate-900/5 ring-1 ring-slate-200/80 transition hover:-translate-y-1 hover:shadow-lg`}
                                >
                                    <Icon3D icon={s.icon} tone={s.tone} size={56} />
                                    <h3 className="font-display mt-4 text-lg font-semibold text-slate-900">{s.title}</h3>
                                    <p className="mt-2 text-sm leading-6 text-slate-600">{s.short}</p>
                                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-green-700">
                                        Learn more <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

Show.layout = (page) => <PublicNavigation>{page}</PublicNavigation>;