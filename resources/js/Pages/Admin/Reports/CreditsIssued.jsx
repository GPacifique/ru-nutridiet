import { useState, useMemo } from 'react';
import { Download, Printer } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';

const defaultCreditTypes = ['All types', 'CPEU', 'State CE'];

const defaultRecords = [
    { code: 'NC-2026-08841', learner: 'Maria Owens', course: 'Clinical Nutrition Assessment', creditType: 'CPEU', hours: 3, examScore: 94, issuedAt: '2026-07-14' },
    { code: 'NC-2026-08839', learner: 'Priya Nair', course: 'Clinical Nutrition Assessment', creditType: 'CPEU', hours: 3, examScore: 91, issuedAt: '2026-07-13' },
    { code: 'NC-2026-07213', learner: 'David Kimani', course: 'Renal Diet Management', creditType: 'State CE', hours: 4, examScore: 88, issuedAt: '2026-06-09' },
    { code: 'NC-2026-06998', learner: 'Tomás Rivera', course: 'Pediatric Feeding Disorders', creditType: 'CPEU', hours: 2, examScore: 85, issuedAt: '2026-05-30' },
    { code: 'NC-2026-06544', learner: 'Priya Nair', course: 'Renal Diet Management', creditType: 'State CE', hours: 4, examScore: 96, issuedAt: '2026-05-12' },
];

function formatDate(iso) {
    return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function toCSV(records) {
    const header = ['Certificate code', 'Learner', 'Course', 'Credit type', 'Hours', 'Exam score', 'Issued date'];
    const rows = records.map((r) => [r.code, r.learner, r.course, r.creditType, r.hours, `${r.examScore}%`, r.issuedAt]);
    return [header, ...rows].map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n');
}

function downloadCSV(records) {
    const blob = new Blob([toCSV(records)], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `credits-issued-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
}

function Stat({ label, value }) {
    return (
        <div className="px-6 py-4 first:pl-0 last:pr-0">
            <p className="text-[11px] uppercase tracking-[0.14em] text-[#5B6B62]">{label}</p>
            <p className="mt-1 font-['IBM_Plex_Mono'] text-xl tabular-nums text-[#1F2A24]">{value}</p>
        </div>
    );
}

export default function CreditsIssued({ records = defaultRecords, creditTypes = defaultCreditTypes }) {
    const [creditType, setCreditType] = useState('All types');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    const filtered = useMemo(() => {
        return records.filter((r) => {
            if (creditType !== 'All types' && r.creditType !== creditType) return false;
            if (fromDate && r.issuedAt < fromDate) return false;
            if (toDate && r.issuedAt > toDate) return false;
            return true;
        });
    }, [records, creditType, fromDate, toDate]);

    const totalHours = filtered.reduce((sum, r) => sum + r.hours, 0);

    return (
        <AdminLayout title="Credits issued">
            <p className="mb-6 max-w-2xl text-sm text-[#5B6B62]">
                A complete ledger of every credit certificate issued through the platform — filter by credit type or
                date range for an accreditation review, then export or print for your records.
            </p>

            {/* Filters — kept out of the print view */}
            <div className="mb-6 flex flex-wrap items-end gap-4 print:hidden">
                <div>
                    <label className="mb-1.5 block text-xs uppercase tracking-[0.1em] text-[#5B6B62]">Credit type</label>
                    <select
                        value={creditType}
                        onChange={(e) => setCreditType(e.target.value)}
                        className="rounded border border-[#D8DDD5] bg-white px-3 py-2 text-sm focus:border-[#2F6F5E] focus:outline-none focus:ring-2 focus:ring-[#2F6F5E]/20"
                    >
                        {creditTypes.map((ct) => (
                            <option key={ct} value={ct}>
                                {ct}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="mb-1.5 block text-xs uppercase tracking-[0.1em] text-[#5B6B62]">From</label>
                    <input
                        type="date"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        className="rounded border border-[#D8DDD5] bg-white px-3 py-2 text-sm font-['IBM_Plex_Mono'] focus:border-[#2F6F5E] focus:outline-none focus:ring-2 focus:ring-[#2F6F5E]/20"
                    />
                </div>
                <div>
                    <label className="mb-1.5 block text-xs uppercase tracking-[0.1em] text-[#5B6B62]">To</label>
                    <input
                        type="date"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        className="rounded border border-[#D8DDD5] bg-white px-3 py-2 text-sm font-['IBM_Plex_Mono'] focus:border-[#2F6F5E] focus:outline-none focus:ring-2 focus:ring-[#2F6F5E]/20"
                    />
                </div>

                <div className="ml-auto flex gap-2">
                    <button
                        onClick={() => downloadCSV(filtered)}
                        className="inline-flex items-center gap-1.5 rounded border border-[#D8DDD5] bg-white px-4 py-2 text-sm font-medium text-[#1F2A24] hover:bg-[#F7F8F5]"
                    >
                        <Download size={14} />
                        Export CSV
                    </button>
                    <button
                        onClick={() => window.print()}
                        className="inline-flex items-center gap-1.5 rounded border border-[#D8DDD5] bg-white px-4 py-2 text-sm font-medium text-[#1F2A24] hover:bg-[#F7F8F5]"
                    >
                        <Printer size={14} />
                        Print
                    </button>
                </div>
            </div>

            {/* Summary — requisition-style ledger strip, consistent with the dashboard */}
            <div className="relative mb-8 rounded border border-[#D8DDD5] bg-white px-6">
                <span className="pointer-events-none absolute -left-px -top-px h-3 w-3 border-l-2 border-t-2 border-[#2F6F5E] print:hidden" />
                <span className="pointer-events-none absolute -bottom-px -right-px h-3 w-3 border-b-2 border-r-2 border-[#2F6F5E] print:hidden" />
                <div className="flex flex-wrap divide-x divide-[#E7EBE3]">
                    <Stat label="Certificates" value={filtered.length} />
                    <Stat label="Total credit hours" value={`${totalHours}h`} />
                    <Stat label="Filtered range" value={fromDate || toDate ? `${fromDate || '…'} – ${toDate || '…'}` : 'All time'} />
                </div>
            </div>

            {filtered.length === 0 ? (
                <div className="rounded border border-dashed border-[#D8DDD5] bg-white px-6 py-14 text-center">
                    <p className="text-sm text-[#5B6B62]">No certificates match these filters.</p>
                </div>
            ) : (
                <div className="overflow-hidden rounded border border-[#D8DDD5] bg-white">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-[#D8DDD5] text-[11px] uppercase tracking-[0.1em] text-[#5B6B62]">
                                <th className="px-4 py-3 font-medium">Certificate code</th>
                                <th className="px-4 py-3 font-medium">Learner</th>
                                <th className="px-4 py-3 font-medium">Course</th>
                                <th className="px-4 py-3 font-medium">Credit type</th>
                                <th className="px-4 py-3 font-medium">Hours</th>
                                <th className="px-4 py-3 font-medium">Exam score</th>
                                <th className="px-4 py-3 font-medium">Issued</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((r) => (
                                <tr key={r.code} className="border-b border-[#E7EBE3] last:border-0">
                                    <td className="px-4 py-3 font-['IBM_Plex_Mono'] text-xs text-[#5B6B62]">{r.code}</td>
                                    <td className="px-4 py-3 text-[#1F2A24]">{r.learner}</td>
                                    <td className="px-4 py-3 text-[#5B6B62]">{r.course}</td>
                                    <td className="px-4 py-3 text-[#5B6B62]">{r.creditType}</td>
                                    <td className="px-4 py-3 font-['IBM_Plex_Mono'] tabular-nums">{r.hours}h</td>
                                    <td className="px-4 py-3 font-['IBM_Plex_Mono'] tabular-nums">{r.examScore}%</td>
                                    <td className="px-4 py-3 font-['IBM_Plex_Mono'] text-xs tabular-nums text-[#5B6B62]">
                                        {formatDate(r.issuedAt)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </AdminLayout>
    );
}