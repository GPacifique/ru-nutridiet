import React from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ArticleCard from '@/Components/ArticleCard';
import WireStrip from '@/Components/WireStrip';

/**
 * props: { exclusives?: Article[], plan?: { name, renews_at } }
 */
export default function PremiumDashboard({ exclusives = [], plan = null }) {
    return (
        <AuthenticatedLayout
            header={
                <>
                    <WireStrip code="PREM-00" timestamp="MEMBER ACCESS" tone="gold" className="mb-2" />
                    <h1 className="font-display font-bold text-3xl text-[#14171F]">Premium desk</h1>
                </>
            }
        >
            <Head title="Premium Dashboard" />

            {plan && (
                <div className="bg-[#14171F] text-white p-5 mb-8 flex items-center justify-between">
                    <div>
                        <p className="font-mono text-[10px] uppercase tracking-wider text-white/50">Current plan</p>
                        <p className="font-display text-xl font-semibold mt-1">{plan.name}</p>
                    </div>
                    <div className="text-right">
                        <p className="font-mono text-[10px] uppercase tracking-wider text-white/50">Renews</p>
                        <p className="font-mono text-sm mt-1">{plan.renews_at}</p>
                    </div>
                </div>
            )}

            <p className="font-mono text-xs uppercase tracking-wider text-[#3A4048]/60 mb-4">Exclusive to members</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {exclusives.map((a) => <ArticleCard key={a.id} article={a} />)}
            </div>
            {exclusives.length === 0 && (
                <p className="font-mono text-xs uppercase tracking-wider text-[#3A4048]/50 py-6">
                    No exclusive stories published yet.
                </p>
            )}
        </AuthenticatedLayout>
    );
}
