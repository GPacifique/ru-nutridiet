import React from "react";
import { Head, Link } from "@inertiajs/react";
import PublicNavigation from "@/Components/PublicNavigation";
import {
    ClipboardCheck, Salad, GraduationCap, Sprout, Stethoscope, Baby, Dumbbell,
    TrendingUp, Users, Leaf, Check, ArrowRight, CalendarCheck, Sparkles,
    BadgeCheck, Lightbulb, RefreshCw, UserCheck, ShoppingBag,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  3D-style icon tile (same component as the shop page).              */
/*  Tip: move it to resources/js/Components/Icon3D.jsx and import it   */
/*  in both pages. Pass src="/images/3d/name.png" to use real 3D art.  */
/* ------------------------------------------------------------------ */
const TONES = {
    emerald: ["#86EFAC", "#16A34A", "#14532D"],
    teal: ["#5EEAD4", "#0D9488", "#134E4A"],
    sky: ["#7DD3FC", "#0284C7", "#0C4A6E"],
    violet: ["#C4B5FD", "#7C3AED", "#3B0764"],
    amber: ["#FDE68A", "#F59E0B", "#78350F"],
    rose: ["#FDA4AF", "#E11D48", "#881337"],
    orange: ["#FDBA74", "#EA580C", "#7C2D12"],
};

function Icon3D({ icon: Icon, tone = "emerald", size = 48, src, alt = "", className = "" }) {
    if (src) {
        return <img src={src} alt={alt} width={size} height={size} loading="lazy" className={`icon3d-img ${className}`} style={{ width: size, height: size }} />;
    }
    const [c1, c2, c3] = TONES[tone] || TONES.emerald;
    return (
        <span
            aria-hidden="true"
            className={`icon3d relative inline-grid shrink-0 place-items-center ${className}`}
            style={{
                width: size,
                height: size,
                borderRadius: size * 0.3,
                background: `linear-gradient(145deg, ${c1} 0%, ${c2} 58%, ${c3} 120%)`,
                boxShadow: `0 ${size * 0.22}px ${size * 0.4}px -${size * 0.12}px ${c2}aa, inset 0 2px 2px rgba(255,255,255,.75), inset 0 -${size * 0.1}px ${size * 0.14}px rgba(0,0,0,.28)`,
            }}
        >
            <span
                className="pointer-events-none absolute"
                style={{ left: "10%", top: "6%", width: "80%", height: "42%", borderRadius: "999px", background: "linear-gradient(180deg, rgba(255,255,255,.55), rgba(255,255,255,0))" }}
            />
            <Icon className="relative text-white" style={{ width: size * 0.5, height: size * 0.5, filter: "drop-shadow(0 2px 2px rgba(0,0,0,.35))" }} strokeWidth={2.2} />
        </span>
    );
}

const HERO_PHOTOS = [
    "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=700&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=700&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=700&q=80&auto=format&fit=crop",
];
const hideBroken = (e) => { e.currentTarget.onerror = null; e.currentTarget.style.display = "none"; };

/* Soft tinted backdrops for each card header, keyed by tone */
const TINTS = {
    emerald: "from-emerald-100 via-emerald-50 to-white",
    teal: "from-teal-100 via-teal-50 to-white",
    sky: "from-sky-100 via-sky-50 to-white",
    violet: "from-violet-100 via-violet-50 to-white",
    amber: "from-amber-100 via-amber-50 to-white",
    rose: "from-rose-100 via-rose-50 to-white",
    orange: "from-orange-100 via-orange-50 to-white",
};

export default function Index() {
    const services = [
        {
            id: 1, title: "Nutritional Assessment", icon: ClipboardCheck, tone: "sky",
            short: "Understand your nutritional status and identify areas that need attention.",
            description: "A comprehensive assessment of your nutritional status, dietary habits, lifestyle, body measurements, and individual nutrition needs.",
            features: ["Anthropometric assessment", "Dietary assessment", "Lifestyle assessment", "Nutrition risk identification", "Personalized recommendations"],
        },
        {
            id: 2, title: "Personalized Meal Planning", icon: Salad, tone: "emerald",
            short: "Receive a nutrition plan adapted to your individual needs and goals.",
            description: "Personalized meal planning based on your nutritional requirements, lifestyle, health goals, food preferences, and daily routine.",
            features: ["Personalized meal plan", "Portion guidance", "Food selection guidance", "Meal timing recommendations", "Progress-based adjustments"],
        },
        {
            id: 3, title: "Dietary Counseling & Education", icon: GraduationCap, tone: "violet",
            short: "Learn how to make healthier food choices with professional guidance.",
            description: "Practical nutrition education and counseling designed to help individuals understand food choices and develop healthier eating habits.",
            features: ["Nutrition education", "Healthy food choices", "Meal preparation guidance", "Food-label education", "Healthy eating strategies"],
        },
        {
            id: 4, title: "Behavior Change Support", icon: Sprout, tone: "teal",
            short: "Build sustainable habits that support long-term health.",
            description: "Personalized support to help you overcome unhealthy eating patterns and develop sustainable lifestyle and nutrition habits.",
            features: ["Goal setting", "Habit development", "Motivation support", "Progress monitoring", "Lifestyle adjustment"],
        },
        {
            id: 5, title: "Medical Nutrition Therapy", icon: Stethoscope, tone: "rose",
            short: "Nutrition support for individuals with nutrition-related health conditions.",
            description: "Professional nutrition intervention designed to support individuals whose health conditions require specialized dietary management.",
            features: ["Individual nutrition assessment", "Therapeutic nutrition planning", "Diet modification", "Nutrition monitoring", "Follow-up support"],
        },
        {
            id: 6, title: "Pediatric Nutrition", icon: Baby, tone: "amber",
            short: "Support healthy growth and nutrition for children.",
            description: "Nutrition guidance for children and families focused on healthy growth, development, appropriate food choices, and healthy eating habits.",
            features: ["Growth and nutrition assessment", "Child-friendly meal planning", "Healthy eating education", "Nutrient intake guidance", "Family nutrition support"],
        },
        {
            id: 7, title: "Sports Nutrition", icon: Dumbbell, tone: "orange",
            short: "Optimize nutrition for training, performance, recovery, and healthy body composition.",
            description: "Nutrition strategies designed for active individuals and athletes to support energy needs, training, recovery, and performance.",
            features: ["Energy assessment", "Performance nutrition", "Pre-workout nutrition", "Post-workout recovery", "Hydration guidance"],
        },
        {
            id: 8, title: "Follow-up & Support", icon: TrendingUp, tone: "sky",
            short: "Stay accountable and receive ongoing nutrition guidance.",
            description: "Regular follow-up sessions to evaluate progress, identify challenges, adjust recommendations, and maintain healthy lifestyle changes.",
            features: ["Progress monitoring", "Plan adjustments", "Nutrition review", "Goal tracking", "Continuous support"],
        },
        {
            id: 9, title: "Group Workshops & Seminars", icon: Users, tone: "violet",
            short: "Professional nutrition education for organizations, communities, and groups.",
            description: "Interactive nutrition and wellness workshops designed for organizations, schools, companies, communities, and other groups.",
            features: ["Nutrition presentations", "Interactive education", "Healthy lifestyle training", "Community education", "Corporate wellness sessions"],
        },
        {
            id: 10, title: "Lifestyle Coaching", icon: Leaf, tone: "emerald",
            short: "Develop a healthier lifestyle through practical and sustainable guidance.",
            description: "Holistic lifestyle coaching that supports nutrition, physical activity, rest, stress management, relationships, mindset, and healthy daily routines.",
            features: ["Nutrition guidance", "Physical activity support", "Rest and relaxation", "Stress management", "Healthy lifestyle habits"],
        },
    ];

    const whyUs = [
        { icon: UserCheck, tone: "emerald", title: "Personalized", text: "Recommendations adapted to individual needs." },
        { icon: BadgeCheck, tone: "sky", title: "Professional", text: "Nutrition guidance based on assessment." },
        { icon: Lightbulb, tone: "amber", title: "Practical", text: "Simple strategies that fit everyday life." },
        { icon: RefreshCw, tone: "violet", title: "Continuous", text: "Follow-up and support throughout your journey." },
    ];

    return (
        <>
            <PublicNavigation />
            <Head title="Our Services | RU-NUTRIDIET" />

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');
                .svc-root{font-family:'Inter',ui-sans-serif,system-ui,sans-serif}
                .font-display{font-family:'Space Grotesk',ui-sans-serif,system-ui,sans-serif;letter-spacing:-.02em}
                .icon3d{transition:transform .35s cubic-bezier(.2,.8,.2,1)}
                .tilt:hover .icon3d{transform:perspective(300px) rotateX(10deg) rotateY(-12deg) translateY(-3px) scale(1.06)}
                @keyframes floaty{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
                .float-a{animation:floaty 7s ease-in-out infinite}
                .float-b{animation:floaty 9s ease-in-out infinite reverse}
                @media (prefers-reduced-motion:reduce){.float-a,.float-b{animation:none}.icon3d{transition:none}}
            `}</style>

            <div className="svc-root min-h-screen bg-gradient-to-b from-emerald-50/60 via-slate-50 to-white text-slate-900">
                {/* ============================ HERO ============================ */}
                <section className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-green-800 to-emerald-600">
                    <div className="pointer-events-none absolute inset-0 opacity-20">
                        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-emerald-300 blur-3xl" />
                        <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-sky-400 blur-3xl" />
                    </div>

                    <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-24">
                        <div>
                            <span className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 py-1.5 pl-1.5 pr-4 text-sm font-semibold text-white backdrop-blur">
                                <Icon3D icon={Sparkles} tone="amber" size={28} />
                                RU-NUTRIDIET
                            </span>

                            <h1 className="font-display mt-6 text-4xl font-bold leading-[1.05] text-white sm:text-5xl lg:text-6xl">
                                Nutrition &amp;
                                <span className="block bg-gradient-to-r from-emerald-200 via-lime-200 to-amber-200 bg-clip-text text-transparent">
                                    Wellness Services
                                </span>
                            </h1>

                            <p className="mt-6 max-w-xl text-lg leading-8 text-green-50/90">
                                Professional nutrition and lifestyle services designed to help you make informed choices, improve your nutritional wellbeing, and build sustainable healthy habits.
                            </p>

                            <div className="mt-8 flex flex-wrap gap-4">
                                <a
                                    href="/services"
                                    className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-bold text-green-800 shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:bg-green-50"
                                >
                                    Explore Services
                                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                                </a>
                                <Link
                                    href="/contact"
                                    className="rounded-xl border border-white/40 bg-white/10 px-6 py-3.5 font-bold text-white backdrop-blur transition hover:bg-white/20"
                                >
                                    Contact Us
                                </Link>
                            </div>
                        </div>

                        <div className="relative hidden h-[400px] lg:block" aria-hidden="true">
                            <img src={HERO_PHOTOS[0]} alt="" onError={hideBroken} className="float-a absolute right-0 top-0 h-60 w-52 rotate-3 rounded-[2rem] object-cover shadow-2xl shadow-black/40 ring-4 ring-white/80" />
                            <img src={HERO_PHOTOS[1]} alt="" onError={hideBroken} className="float-b absolute left-2 top-24 h-56 w-48 -rotate-6 rounded-[2rem] object-cover shadow-2xl shadow-black/40 ring-4 ring-white/80" />
                            <img src={HERO_PHOTOS[2]} alt="" onError={hideBroken} className="float-a absolute bottom-0 right-20 h-40 w-40 rotate-2 rounded-[2rem] object-cover shadow-2xl shadow-black/40 ring-4 ring-white/80" />
                            <div className="float-b absolute left-0 top-2"><Icon3D icon={Stethoscope} tone="rose" size={62} /></div>
                            <div className="float-a absolute right-2 top-[52%]"><Icon3D icon={Salad} tone="emerald" size={56} /></div>
                            <div className="float-b absolute bottom-6 left-10"><Icon3D icon={Dumbbell} tone="orange" size={58} /></div>
                        </div>
                    </div>
                </section>

                {/* ============================ INTRO ============================ */}
                <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center">
                        <span className="text-sm font-semibold uppercase tracking-widest text-green-700">Our Approach</span>
                        <h2 className="font-display mt-3 text-3xl font-bold sm:text-4xl">Personalized nutrition for your journey</h2>
                        <p className="mt-5 text-lg leading-8 text-slate-600">
                            Every person has different nutritional needs. Our services are designed to provide practical, individualized guidance based on your goals, lifestyle, nutritional status, and circumstances.
                        </p>
                    </div>
                </section>

                {/* =========================== SERVICES =========================== */}
                <section id="services" className="mx-auto max-w-7xl scroll-mt-24 px-6 pb-20 lg:px-8">
                    <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
                        {services.map((service) => (
                            <article
                                key={service.id}
                                className="tilt group flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm shadow-slate-900/5 ring-1 ring-slate-200/80 transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-emerald-900/10"
                            >
                                <div className={`relative overflow-hidden bg-gradient-to-br ${TINTS[service.tone]} px-6 pb-6 pt-7`}>
                                    <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/60" />
                                    <div className="pointer-events-none absolute -bottom-10 right-10 h-24 w-24 rounded-full bg-white/50" />
                                    <Icon3D icon={service.icon} tone={service.tone} size={72} />
                                </div>

                                <div className="flex flex-1 flex-col p-6">
                                    <h3 className="font-display text-xl font-bold leading-snug text-slate-900">{service.title}</h3>
                                    <p className="mt-3 leading-7 text-slate-600">{service.short}</p>

                                    <ul className="mt-5 space-y-2.5">
                                        {service.features.slice(0, 3).map((feature) => (
                                            <li key={feature} className="flex items-start gap-2.5 text-sm text-slate-600">
                                                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                                                    <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                                                </span>
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="mt-auto flex flex-wrap gap-3 pt-7">
                                        <Link
                                            href={`/services/${service.id}`}
                                            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-green-600 to-green-800 px-4 py-3 text-sm font-bold text-white shadow-md shadow-green-900/25 transition hover:brightness-110 active:scale-95"
                                        >
                                            Learn More
                                            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                                        </Link>
                                        <Link
                                            href="/book"
                                            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-green-600 hover:text-green-700"
                                        >
                                            <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                                            Book
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                {/* ============================ WHY US ============================ */}
                <section className="bg-white py-20">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                            <div>
                                <span className="text-sm font-semibold uppercase tracking-widest text-green-700">Why RU-NUTRIDIET?</span>
                                <h2 className="font-display mt-3 text-3xl font-bold sm:text-4xl">More than a meal plan</h2>
                                <p className="mt-5 leading-8 text-slate-600">
                                    Our approach combines professional nutrition assessment, education, personalized planning, follow-up, and lifestyle support to help you make sustainable changes.
                                </p>
                                <div className="mt-8">
                                    <Link
                                        href="/contact"
                                        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-b from-green-600 to-green-800 px-6 py-3.5 font-bold text-white shadow-md shadow-green-900/25 transition hover:brightness-110"
                                    >
                                        Start Your Nutrition Journey
                                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                                    </Link>
                                </div>
                            </div>

                            <div className="grid gap-5 sm:grid-cols-2">
                                {whyUs.map((item) => (
                                    <div key={item.title} className="tilt rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-100 transition hover:-translate-y-1 hover:bg-white hover:shadow-lg">
                                        <Icon3D icon={item.icon} tone={item.tone} size={52} />
                                        <h3 className="font-display mt-4 text-lg font-bold">{item.title}</h3>
                                        <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* =============================== CTA =============================== */}
                <section className="relative overflow-hidden bg-gradient-to-br from-green-900 via-green-800 to-emerald-700 px-6 py-20 text-center text-white">
                    <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-emerald-400/30 blur-3xl" />
                    <div className="relative mx-auto max-w-3xl">
                        <div className="mx-auto w-fit"><Icon3D icon={CalendarCheck} tone="amber" size={64} /></div>
                        <h2 className="font-display mt-6 text-3xl font-bold sm:text-4xl">Ready to take the next step?</h2>
                        <p className="mt-5 text-lg leading-8 text-green-50">
                            Talk to our team about your nutrition and wellness goals and find the service that is right for you.
                        </p>
                        <div className="mt-8 flex flex-wrap justify-center gap-4">
                            <Link href="/contact" className="rounded-xl bg-white px-7 py-3.5 font-bold text-green-800 shadow-lg shadow-black/20 transition hover:bg-green-50">
                                Contact RU-NUTRIDIET
                            </Link>
                            <Link
                                href="/marketplace"
                                className="inline-flex items-center gap-2 rounded-xl border border-white/40 px-7 py-3.5 font-bold text-white transition hover:bg-white/10"
                            >
                                <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                                Visit Marketplace
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}