// resources/js/Pages/Services/Show.jsx
import React from "react";
import { Head, Link } from "@inertiajs/react";
import PublicNavigation from "@/Components/PublicNavigation";
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
                <PublicNavigation />
                <Head title="Service not found | RU-NUTRIDIET" />
                <style>{style}</style>
                <div className="svc-root grid min-h-[60vh] place-items-center bg-slate-50 px-6 text-center">
                    <div>
                        <div className="mx-auto w-fit"><Icon3D icon={SearchX} tone="amber" size={72} /></div>
                        <h1 className="font-display mt-6 text-2xl font-bold text-slate-900">We couldn't find that service</h1>
                        <p className="mt-2 text-slate-600">It may have been moved or renamed.</p>
                        <Link href="/services" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-green-700 px-5 py-3 font-bold text-white hover:bg-green-800">
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
            <PublicNavigation />
            <Head>
                <title>{`${service.title} | RU-NUTRIDIET`}</title>
                <meta name="description" content={service.short} />
            </Head>
            <style>{style}</style>

            <div className="svc-root min-h-screen bg-gradient-to-b from-emerald-50/60 via-slate-50 to-white text-slate-900">
                {/* HERO */}
                <section className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-green-800 to-emerald-600">
                    <div className="pointer-events-none absolute inset-0 opacity-20">
                        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-emerald-300 blur-3xl" />
                        <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-sky-400 blur-3xl" />
                    </div>
                    <div className="relative mx-auto max-w-5xl px-6 py-14 lg:py-20">
                        <Link href="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-green-50/90 hover:text-white">
                            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All services
                        </Link>
                        <div className="mt-8 flex flex-col gap-7 sm:flex-row sm:items-center">
                            <Icon3D icon={service.icon} tone={service.tone} size={104} />
                            <div>
                                <h1 className="font-display text-3xl font-bold leading-tight text-white sm:text-5xl">{service.title}</h1>
                                <p className="mt-4 max-w-2xl text-lg leading-8 text-green-50/90">{service.short}</p>
                            </div>
                        </div>
                        <div className="mt-8 flex flex-wrap gap-4">
                            <Link href="/contact" className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-bold text-green-800 shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:bg-green-50">
                                <CalendarCheck className="h-4 w-4" aria-hidden="true" /> Book this service
                            </Link>
                            <Link href="/contact" className="rounded-xl border border-white/40 bg-white/10 px-6 py-3.5 font-bold text-white backdrop-blur transition hover:bg-white/20">
                                Ask a question
                            </Link>
                        </div>
                    </div>
                </section>

                {/* DETAILS */}
                <section className="mx-auto max-w-5xl px-6 py-16">
                    <h2 className="font-display text-2xl font-bold sm:text-3xl">About this service</h2>
                    <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">{service.description}</p>

                    <h2 className="font-display mt-14 text-2xl font-bold sm:text-3xl">What's included</h2>
                    <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                        {service.features.map((f) => (
                            <li key={f} className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200/80">
                                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                                    <Check className="h-4 w-4" strokeWidth={3} aria-hidden="true" />
                                </span>
                                <span className="font-medium text-slate-800">{f}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-6">
                        <Link href={`/services/${prev.id}`} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-green-700">
                            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> {prev.title}
                        </Link>
                        <Link href={`/services/${next.id}`} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-green-700">
                            {next.title} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                    </div>
                </section>

                {/* RELATED */}
                <section className="bg-white py-16">
                    <div className="mx-auto max-w-5xl px-6">
                        <h2 className="font-display text-2xl font-bold sm:text-3xl">Other services you may need</h2>
                        <div className="mt-8 grid gap-6 md:grid-cols-3">
                            {related.map((s) => (
                                <Link
                                    key={s.id}
                                    href={`/services/${s.id}`}
                                    className={`tilt group rounded-3xl bg-gradient-to-br ${TINTS[s.tone]} p-6 ring-1 ring-slate-200/80 transition hover:-translate-y-1 hover:shadow-xl`}
                                >
                                    <Icon3D icon={s.icon} tone={s.tone} size={56} />
                                    <h3 className="font-display mt-4 text-lg font-bold">{s.title}</h3>
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