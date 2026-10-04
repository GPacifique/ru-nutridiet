import { useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

export default function HeroSlider({ slogan, products = [], interval = 5000 }) {
    const slides = products.filter((p) => p.image);
    const [i, setI] = useState(0);
    const reduce = useReducedMotion();
    const [first, tail] = slogan.split(',').map((s) => s.trim());

    useEffect(() => {
        if (slides.length < 2) return;
        const t = setInterval(() => setI((n) => (n + 1) % slides.length), interval);
        return () => clearInterval(t);
    }, [slides.length, interval]);

    const current = slides[i];

    return (
        <section className="relative isolate flex min-h-[88vh] items-end overflow-hidden bg-[#0F3D2E]">
            <AnimatePresence>
                {current && (
                    <motion.img
                        key={current.id}
                        src={current.image}
                        alt=""
                        initial={{ opacity: 0, scale: 1 }}
                        animate={{ opacity: 1, scale: reduce ? 1 : 1.08 }}
                        exit={{ opacity: 0 }}
                        transition={{ opacity: { duration: 1.2 }, scale: { duration: interval / 1000 + 1.2, ease: 'linear' } }}
                        className="absolute inset-0 -z-20 h-full w-full object-cover"
                    />
                )}
            </AnimatePresence>
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#0F3D2E] via-[#0F3D2E]/60 to-[#0F3D2E]/10" />

            <div className="mx-auto w-full max-w-7xl px-6 pb-14 pt-32 lg:px-8">
                <h1 className="font-display text-5xl font-extrabold leading-[1.02] text-white sm:text-7xl lg:text-8xl">
                    {first},
                    <span className="block text-[#F2B632]">{tail}</span>
                </h1>
                <div className="mt-8 flex flex-wrap gap-3">
                    <Link href={route('shop')} className="rounded-full bg-[#F2B632] px-7 py-3 font-semibold text-[#0F3D2E] transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                        Shop products
                    </Link>
                    <Link href={route('book')} className="rounded-full border border-white/60 px-7 py-3 font-semibold text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                        Book a consultation
                    </Link>
                </div>

                {current && (
                    <div className="mt-12 flex items-center justify-between gap-6 border-t border-white/20 pt-5 text-white">
                        <Link href={current.url} className="min-w-0 truncate text-sm hover:underline">
                            Now showing: <span className="font-semibold">{current.name}</span>
                        </Link>
                        <div className="flex gap-2" role="tablist" aria-label="Product slides">
                            {slides.map((s, n) => (
                                <button key={s.id} role="tab" aria-selected={n === i} aria-label={`Show ${s.name}`}
                                    onClick={() => setI(n)}
                                    className={`h-2 rounded-full transition-all ${n === i ? 'w-8 bg-[#F2B632]' : 'w-2 bg-white/50'}`} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
