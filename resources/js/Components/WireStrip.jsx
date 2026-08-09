import React from 'react';

/**
 * The signature element of the design system: a press-wire style dateline
 * strip. Renders a category code, a timestamp, and an optional read time in
 * uppercase monospace, separated by "//" the way wire-service copy is slugged.
 *
 *   <WireStrip code="SEC-04" timestamp="14:32 UTC" readTime="4 MIN READ" />
 */
export default function WireStrip({ code, timestamp, readTime, tone = 'press', className = '' }) {
    const toneColor = {
        press: 'text-[#25406B]',
        wire: 'text-[#C1401F]',
        gold: 'text-[#B8862E]',
        soft: 'text-[#3A4048]/70',
    }[tone];

    const parts = [code, timestamp, readTime].filter(Boolean);

    return (
        <div className={`font-mono text-[11px] tracking-wider uppercase flex items-center gap-2 ${toneColor} ${className}`}>
            {parts.map((part, i) => (
                <React.Fragment key={i}>
                    {i > 0 && <span className="text-[#D7DBDE]">//</span>}
                    <span>{part}</span>
                </React.Fragment>
            ))}
        </div>
    );
}
