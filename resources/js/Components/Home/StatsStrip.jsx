export default function StatsStrip({ stats }) {
    const items = [
        ['Products', stats.products],
        ['Courses', stats.courses],
        ['Articles', stats.articles],
        ['Practitioners', stats.practitioners],
    ].filter(([, n]) => n > 0);
    if (!items.length) return null;
    return (
        <div className="border-b border-slate-200 bg-white">
            <dl className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-8 sm:grid-cols-4 lg:px-8">
                {items.map(([label, n]) => (
                    <div key={label}>
                        <dt className="text-sm text-slate-500">{label}</dt>
                        <dd className="font-display text-3xl font-bold text-[#0F3D2E]">{n}</dd>
                    </div>
                ))}
            </dl>
        </div>
    );
}
