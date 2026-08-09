import React, { useState } from "react";
import { useForm, usePage } from "@inertiajs/react";
import { CheckCircle2, User as UserIcon } from "lucide-react";
import PublicNavigation from "@/Components/PublicNavigation";

/* ------------------------------------------------------------------ */
/*  Book.jsx — consultation booking page                               */
/*                                                                     */
/*  Props from AppointmentController@create:                          */
/*    practitioners: [{ id, user: { name }, qualification, specialty, */
/*                       photo }]                                     */
/*    prefill: { name, email } | null  (set when logged in)           */
/*    selectedPractitionerId: number | null (from ?practitioner=)     */
/* ------------------------------------------------------------------ */

const inputClass =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-800 shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-emerald-500";
const labelClass = "mb-1.5 block text-sm font-medium text-slate-700";
const errorClass = "mt-1 text-xs text-rose-600";

export default function Book({ practitioners = [], prefill, selectedPractitionerId }) {
  const { flash } = usePage().props;
  const { data, setData, post, processing, errors, reset } = useForm({
    practitioner_id: selectedPractitionerId ?? practitioners[0]?.id ?? "",
    name: prefill?.name ?? "",
    email: prefill?.email ?? "",
    phone: "",
    scheduled_at: "",
    notes: "",
  });

  function submit(e) {
    e.preventDefault();
    post("/book", {
      onSuccess: () => reset("phone", "scheduled_at", "notes"),
    });
  }

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 antialiased">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
        .font-display { font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif; }
        .font-sans { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
      `}</style>

      <PublicNavigation />

      <main className="mx-auto max-w-3xl px-5 py-14 lg:px-8 lg:py-20">
        <span className="text-xs font-semibold uppercase tracking-widest text-emerald-700">
          Book a consultation
        </span>
        <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Let's find you the right nutritionist.
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600">
          Pick a practitioner and a time that works for you. We'll confirm
          your appointment by email shortly after.
        </p>

        {flash?.success && (
          <div className="mt-8 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" aria-hidden="true" />
            <p className="text-sm text-emerald-800">{flash.success}</p>
          </div>
        )}

        <form onSubmit={submit} className="mt-8 space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-900/5 sm:p-8">
          <div>
            <label className={labelClass}>Practitioner</label>
            {practitioners.length === 0 ? (
              <p className="text-sm text-slate-500">No practitioners available right now.</p>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2">
                {practitioners.map((p) => {
                  const selected = Number(data.practitioner_id) === p.id;
                  return (
                    <button
                      type="button"
                      key={p.id}
                      onClick={() => setData("practitioner_id", p.id)}
                      className={`flex items-center gap-3 rounded-xl border p-3 text-left transition-colors ${
                        selected
                          ? "border-emerald-600 bg-emerald-50"
                          : "border-slate-200 hover:border-emerald-300"
                      }`}
                    >
                      <span className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full bg-slate-100 text-slate-400">
                        {p.photo ? (
                          <img src={p.photo} alt="" className="h-full w-full object-cover" />
                        ) : (
                          <UserIcon className="h-5 w-5" aria-hidden="true" />
                        )}
                      </span>
                      <span>
                        <span className="block text-sm font-semibold text-slate-900">
                          {p.user?.name ?? "Practitioner"}
                        </span>
                        <span className="block text-xs text-slate-500">
                          {p.specialty ?? p.qualification ?? ""}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
            {errors.practitioner_id && <p className={errorClass}>{errors.practitioner_id}</p>}
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className={labelClass}>Full name</label>
              <input
                id="name"
                type="text"
                value={data.name}
                onChange={(e) => setData("name", e.target.value)}
                className={inputClass}
                placeholder="Your name"
              />
              {errors.name && <p className={errorClass}>{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className={labelClass}>Email</label>
              <input
                id="email"
                type="email"
                value={data.email}
                onChange={(e) => setData("email", e.target.value)}
                className={inputClass}
                placeholder="you@example.com"
              />
              {errors.email && <p className={errorClass}>{errors.email}</p>}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="phone" className={labelClass}>Phone (optional)</label>
              <input
                id="phone"
                type="tel"
                value={data.phone}
                onChange={(e) => setData("phone", e.target.value)}
                className={inputClass}
                placeholder="+250 7xx xxx xxx"
              />
              {errors.phone && <p className={errorClass}>{errors.phone}</p>}
            </div>

            <div>
              <label htmlFor="scheduled_at" className={labelClass}>Preferred date &amp; time</label>
              <input
                id="scheduled_at"
                type="datetime-local"
                value={data.scheduled_at}
                onChange={(e) => setData("scheduled_at", e.target.value)}
                className={inputClass}
              />
              {errors.scheduled_at && <p className={errorClass}>{errors.scheduled_at}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="notes" className={labelClass}>What would you like to discuss? (optional)</label>
            <textarea
              id="notes"
              rows={4}
              value={data.notes}
              onChange={(e) => setData("notes", e.target.value)}
              className={inputClass}
              placeholder="A little context helps your practitioner prepare."
            />
            {errors.notes && <p className={errorClass}>{errors.notes}</p>}
          </div>

          <button
            type="submit"
            disabled={processing}
            className="w-full rounded-full bg-emerald-700 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-800/20 transition-transform hover:-translate-y-0.5 hover:bg-emerald-800 disabled:opacity-50"
          >
            {processing ? "Sending request…" : "Request appointment"}
          </button>
        </form>
      </main>
    </div>
  );
}