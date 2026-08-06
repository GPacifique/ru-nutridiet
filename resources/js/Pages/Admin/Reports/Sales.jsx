import { useState, useMemo } from 'react';
import { Link } from '@inertiajs/react';
import { Download } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import AdminLayout from '@/Layouts/AdminLayout';

const RANGES = [
    { key: '7d', label: '7 days' },
    { key: '30d', label: '30 days' },
    { key: '90d', label: '90 days' },
];

const defaultTrend = {
    '7d': [
        { date: 'Jul 21', revenue: 356 },
        { date: 'Jul 22', revenue: 178 },
        { date: 'Jul 23', revenue: 623 },
        { date: 'Jul 24', revenue: 89 },
        { date: 'Jul 25', revenue: 445 },
        { date: 'Jul 26', revenue: 712 },
        { date: 'Jul 27', revenue: 267 },
    ],
    '30d': Array.from({ length: 30 }, (_, i) => ({
        date: `Jul ${i + 1}`,
        revenue: Math.round(120 + Math.random() * 600),
    })),
    '90d': Array.from({ length: 12 }, (_, i) => ({
        date: `Wk ${i + 1}`,
        revenue: Math.round(1200 + Math.random() * 3000),
    })),
};

const defaultOrders = [
    { id: 'ORD-10482', date: 'Jul 26', learner: 'Maria Owens', course: 'Clinical Nutrition Assessment', amount: 89, status: 'paid' },
    { id: 'ORD-10481', date: 'Jul 26', learner: 'James Okoro', course: 'Sports Nutrition Fundamentals', amount: 49, status: 'paid' },
    { id: 'ORD-10480', date: 'Jul 25', learner: 'David Kimani', course: 'Renal Diet Management', amount: 119, status: 'paid' },
    { id: 'ORD-10479', date: 'Jul 24', learner: 'Sofia Bianchi', course: 'Pediatric Feeding Disorders', amount: 59, status: 'refunded' },
    { id: 'ORD-10478', date: 'Jul 23', learner: 'Priya Nair', course: 'Clinical Nutrition Assessment', amount: 89, status: 'paid' },
];

function currency(n) {
    return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
}

function Stat({ label, value }) {
    return (
        <div className="px-6 py-4 first:pl-0 last:pr-0">
            <p className="text-[11px] uppercase tracking-[0.14em] text-[#5B6B62]">{label}</p>
            <p className="mt-1 font-['IBM_Plex_Mono'] text-xl tabular-nums text-[#1F2A24]">{value}</p>
        </div>
    );
}

function CustomTooltip({ active, payload, label }) {
    if (!active || !payload?.length) return null;
    return (
        <div className="rounded border border-[#D8DDD5] bg-white px-3 py-2 shadow-sm">
            <p className="text-[11px] uppercase tracking-[0.1em] text-[#5B6B62]">{label}</p>
            <p className="font-['IBM_Plex_Mono'] text-sm tabular-nums text-[#1F2A24]">{currency(payload[0].value)}</p>
        </div>
    );
}

export default function Sales({ trend = defaultTrend, orders = defaultOrders }) {
    const [range, setRange] = useState('30d');
    const data = trend[range] ?? [];

    const { totalRevenue, orderCount, avgOrder, refundCount } = useMemo(() => {
        const paid = orders.filter((o) => o.status === 'paid');
        const total = paid.reduce((sum, o) => sum + o.amount, 0);
        return {
            totalRevenue: total,
            orderCount: paid.length,
            avgOrder: paid.length ? Math.round(total / paid.length) : 0,
            refundCount: orders.filter((o) => o.status === 'refunded').length,
        };
    }, [orders]);

    return (
        <AdminLayout title="Sales">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <div className="inline-flex items-center gap-1 rounded border border-[#D8DDD5] bg-white p-1">
                    {RANGES.map((r) => (
                        <button
                            key={r.key}
                            onClick={() => setRange(r.key)}
                            className={`rounded px-3 py-1.5 text-sm transition-colors ${
                                range === r.key ? 'bg-[#2F6F5E] text-white' : 'text-[#5B6B62] hover:bg-[#EEF1EC]'
                            }`}
                        >
                            {r.label}
                        </button>
                    ))}
                </div>
                <a
                    href={`/admin/reports/sales/export?range=${range}`}
                    className="inline-flex items-center gap-1.5 rounded border border-[#D8DDD5] bg-white px-4 py-2 text-sm font-medium text-[#1F2A24] hover:bg-[#F7F8F5]"
                >
                    <Download size={14} />
                    Export CSV
                </a>
            </div>

            {/* Stats strip */}
            <div className="mb-8 flex flex-wrap divide-x divide-[#E7EBE3] rounded border border-[#D8DDD5] bg-white px-6">
                <Stat label={`Revenue — ${range}`} value={currency(totalRevenue)} />
                <Stat label="Orders" value={orderCount} />
                <Stat label="Avg. order value" value={currency(avgOrder)} />
                <Stat label="Refunds" value={refundCount} />
            </div>

            {/* Trend chart */}
            <div className="mb-8 rounded border border-[#D8DDD5] bg-white p-6">
                <p className="mb-4 text-sm font-medium text-[#1F2A24]">Revenue trend</p>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data} margin={{ left: -20, right: 8 }}>
                            <CartesianGrid vertical={false} stroke="#E7EBE3" />
                            <XAxis
                                dataKey="date"
                                tick={{ fontSize: 11, fill: '#5B6B62' }}
                                axisLine={{ stroke: '#D8DDD5' }}
                                tickLine={false}
                                interval="preserveStartEnd"
                            />
                            <YAxis
                                tick={{ fontSize: 11, fill: '#5B6B62' }}
                                axisLine={false}
                                tickLine={false}
                                tickFormatter={(v) => `$${v}`}
                            />
                            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#EEF1EC' }} />
                            <Bar dataKey="revenue" fill="#2F6F5E" radius={[2, 2, 0, 0]} maxBarSize={28} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Orders table */}
            <p className="mb-3 font-['Fraunces'] text-lg font-medium">Recent orders</p>
            <div className="overflow-hidden rounded border border-[#D8DDD5] bg-white">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="border-b border-[#D8DDD5] text-[11px] uppercase tracking-[0.1em] text-[#5B6B62]">
                            <th className="px-4 py-3 font-medium">Order</th>
                            <th className="px-4 py-3 font-medium">Date</th>
                            <th className="px-4 py-3 font-medium">Learner</th>
                            <th className="px-4 py-3 font-medium">Course</th>
                            <th className="px-4 py-3 font-medium">Amount</th>
                            <th className="px-4 py-3 font-medium">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id} className="border-b border-[#E7EBE3] last:border-0 hover:bg-[#F7F8F5]">
                                <td className="px-4 py-3 font-['IBM_Plex_Mono'] text-xs text-[#5B6B62]">{order.id}</td>
                                <td className="px-4 py-3 text-[#5B6B62]">{order.date}</td>
                                <td className="px-4 py-3 text-[#1F2A24]">{order.learner}</td>
                                <td className="px-4 py-3 text-[#5B6B62]">{order.course}</td>
                                <td className="px-4 py-3 font-['IBM_Plex_Mono'] tabular-nums">{currency(order.amount)}</td>
                                <td className="px-4 py-3">
                                    <span
                                        className={`rounded-full px-2 py-0.5 text-xs ${
                                            order.status === 'paid'
                                                ? 'bg-[#E4EFEB] text-[#2F6F5E]'
                                                : 'bg-[#F4E7E3] text-[#B65C4A]'
                                        }`}
                                    >
                                        {order.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}