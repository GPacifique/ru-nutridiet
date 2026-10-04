import { Link } from '@inertiajs/react';

export default function ContactCta() {
    return (
        <section className="bg-[#B8325A] text-white">
            <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-6 py-14 lg:px-8">
                <h2 className="font-display text-3xl font-bold">Not sure where to start?</h2>
                <Link href={route('contact')} className="rounded-full bg-white px-7 py-3 font-semibold text-[#B8325A] hover:bg-[#F2B632] hover:text-[#0F3D2E]">
                    Contact us
                </Link>
            </div>
        </section>
    );
}
