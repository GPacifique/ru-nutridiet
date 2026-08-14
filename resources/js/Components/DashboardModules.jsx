import React from 'react';

export default function DashboardModules({ modules = [] }) {
  if (!modules.length) return null;

  return (
    <section className="mt-6">
      <h2 className="font-display text-lg font-semibold text-[#14171F] mb-3">Quick modules</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {modules.map((m) => (
          <div key={m.key} className="bg-white border border-[#D7DBDE] p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-body text-sm font-semibold text-[#14171F]">{m.title}</p>
                {m.desc && <p className="mt-1 text-sm text-[#3A4048]/70">{m.desc}</p>}
              </div>
              {m.action && (
                <a href={m.action.href} className="ml-3 inline-flex items-center rounded px-3 py-1 text-xs bg-[#14171F] text-white">
                  {m.action.label}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
