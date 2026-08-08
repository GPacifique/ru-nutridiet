import React from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import StatCard from '@/Components/StatCard';
import WireStrip from '@/Components/WireStrip';

/**
 * props: { stats?: {}, users?: [], roleBreakdown?: [{ role, count }] }
 */
export default function SuperAdminDashboard({ stats = {}, users = [], roleBreakdown = [] }) {
    return (
        <AuthenticatedLayout
            header={
                <>
                    <WireStrip code="SYS-00" timestamp="SUPER ADMIN" tone="wire" className="mb-2" />
                    <h1 className="font-display font-bold text-3xl text-[#14171F]">System control</h1>
                </>
            }
        >
            <Head title="Super Admin Dashboard" />

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
                <StatCard label="Total users" value={stats.users ?? '—'} tone="wire" />
                <StatCard label="Total articles" value={stats.articles ?? '—'} tone="press" />
                <StatCard label="Categories" value={stats.categories ?? '—'} tone="gold" />
                <StatCard label="Comments" value={stats.comments ?? '—'} tone="ink" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white border border-[#D7DBDE] p-5">
                    <p className="font-mono text-xs uppercase tracking-wider text-[#3A4048]/60 mb-4">User accounts</p>
                    <table className="w-full text-left">
                        <thead>
                            <tr className="font-mono text-[10px] uppercase tracking-wider text-[#3A4048]/50 border-b border-[#D7DBDE]">
                                <th className="pb-2">Name</th>
                                <th className="pb-2">Role</th>
                                <th className="pb-2">Joined</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#D7DBDE]">
                            {users.map((u) => (
                                <tr key={u.id} className="font-body text-sm">
                                    <td className="py-2.5 text-[#14171F]">{u.name}</td>
                                    <td className="py-2.5">
                                        <span className="font-mono text-[10px] uppercase tracking-wider bg-[#EEF1F3] px-2 py-0.5">{u.role}</span>
                                    </td>
                                    <td className="py-2.5 font-mono text-xs text-[#3A4048]/60">{u.created_at}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {users.length === 0 && (
                        <p className="font-mono text-xs uppercase tracking-wider text-[#3A4048]/50 py-6">No users to display.</p>
                    )}
                </div>

                <div className="bg-white border border-[#D7DBDE] p-5">
                    <p className="font-mono text-xs uppercase tracking-wider text-[#3A4048]/60 mb-4">Role distribution</p>
                    <ul className="space-y-3">
                        {roleBreakdown.map((r) => (
                            <li key={r.role} className="flex items-center justify-between font-mono text-xs uppercase tracking-wider">
                                <span className="text-[#3A4048]">{r.role}</span>
                                <span className="text-[#14171F] font-semibold">{r.count}</span>
                            </li>
                        ))}
                        {roleBreakdown.length === 0 && (
                            <p className="font-mono text-xs uppercase tracking-wider text-[#3A4048]/50">No data yet.</p>
                        )}
                    </ul>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
