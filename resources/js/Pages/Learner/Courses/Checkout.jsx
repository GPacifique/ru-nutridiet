import React, { useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Button, Input } from '@/Components/UI';

/**
 * Courses/Checkout.jsx
 * ------------------------
 * Props:
 *  - course: { id, slug, title, creditType, creditHours, price }
 *
 * Payment fields are presentational only — wire the form submit handler to
 * your payment processor (Stripe Elements, Paddle, etc.) rather than
 * posting card details directly to your own backend.
 */
export default function Checkout({ course = MOCK_COURSE }) {
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    // Hand off to your payment processor here, then redirect on success:
    // router.post(`/courses/${course.slug}/purchase`, formData)
  }

  return (
    <GuestLayout>
      <a
        href={`/courses/${course.slug}`}
        className="text-sm text-moss hover:underline underline-offset-4"
      >
        ← Back to course
      </a>

      <div className="grid grid-cols-3 gap-12 mt-6 max-w-4xl">
        <form onSubmit={handleSubmit} className="col-span-2 space-y-8">
          <div>
            <h1 className="font-display text-2xl mb-1">Checkout</h1>
            <p className="text-sm text-ink/50">Complete your purchase to get instant access.</p>
          </div>

          <section>
            <h2 className="font-display text-lg mb-4">Contact</h2>
            <div className="grid grid-cols-2 gap-4">
              <Input label="Full name" id="name" placeholder="Jane Doe" required />
              <Input label="Email" id="email" type="email" placeholder="jane@example.com" required />
            </div>
          </section>

          <section>
            <h2 className="font-display text-lg mb-4">Payment</h2>
            <div className="space-y-4">
              <Input label="Card number" id="cardNumber" placeholder="4242 4242 4242 4242" required />
              <div className="grid grid-cols-3 gap-4">
                <Input label="Expiry" id="expiry" placeholder="MM / YY" required />
                <Input label="CVC" id="cvc" placeholder="123" required />
                <Input label="ZIP / postal" id="zip" placeholder="94110" required />
              </div>
            </div>
          </section>

          <Button type="submit" disabled={submitting} className="w-full">
            {submitting ? 'Processing…' : `Pay $${course.price}`}
          </Button>
          <p className="text-xs text-ink/40 text-center">
            14-day refund window if you haven't started the exam.
          </p>
        </form>

        {/* Order summary */}
        <div className="col-span-1">
          <div className="sticky top-8 border border-line rounded-lg p-6 bg-white/50">
            <h2 className="font-display text-lg mb-5">Order summary</h2>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-ink/70 pr-4">{course.title}</span>
              <span className="font-data shrink-0">${course.price}</span>
            </div>
            <div className="text-xs text-ink/40 mb-6">
              {course.creditType} · {course.creditHours} credit hours
            </div>

            <div className="border-t border-line pt-4 flex justify-between">
              <span className="font-medium">Total</span>
              <span className="font-data text-lg">${course.price}</span>
            </div>
          </div>
        </div>
      </div>
    </GuestLayout>
  );
}

const MOCK_COURSE = {
  id: 1,
  slug: 'clinical-foundations-macronutrients',
  title: 'Clinical Foundations of Macronutrients',
  creditType: 'CPE',
  creditHours: 4,
  price: 149,
};
