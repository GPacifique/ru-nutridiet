import React from 'react';

const toneMap = {
    press: '#25406B',
    wire: '#C1401F',
    gold: '#B8862E',
    ink: '#14171F',
};

export default function StatCard({ label, value, meta, tone = 'press' }) {
    const color = toneMap[tone] ?? toneMap.press;
    return (
        <div className="bg-white border border-[#D7DBDE] p-5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: color }} />
            <p className="font-mono text-[11px] uppercase tracking-wider text-[#3A4048]/60 pl-2">{label}</p>
            <p className="font-display text-3xl font-semibold text-[#14171F] mt-1 pl-2">{value}</p>
            {meta && <p className="font-mono text-[11px] text-[#3A4048]/50 mt-1 pl-2">{meta}</p>}
        </div>
    );
}
