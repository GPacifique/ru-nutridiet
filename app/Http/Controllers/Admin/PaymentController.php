<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PaymentController extends Controller
{
    /**
     * Display all payments.
     */
    public function index(Request $request): Response
    {
        $payments = Payment::query()
            ->with([
                'user:id,name,email',
                'course:id,title',
            ])
            ->when($request->search, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('transaction_id', 'like', "%{$search}%")
                        ->orWhereHas('user', function ($query) use ($search) {
                            $query->where('name', 'like', "%{$search}%")
                                ->orWhere('email', 'like', "%{$search}%");
                        })
                        ->orWhereHas('course', function ($query) use ($search) {
                            $query->where('title', 'like', "%{$search}%");
                        });
                });
            })
            ->when($request->status, function ($query, $status) {
                $query->where('status', $status);
            })
            ->when($request->payment_method, function ($query, $method) {
                $query->where('payment_method', $method);
            })
            ->latest()
            ->paginate(15)
            ->withQueryString();

        $summary = [
            'total' => Payment::count(),

            'paid' => Payment::query()
                ->whereIn('status', ['paid', 'completed'])
                ->count(),

            'pending' => Payment::query()
                ->where('status', 'pending')
                ->count(),

            'failed' => Payment::query()
                ->where('status', 'failed')
                ->count(),

            'total_revenue' => Payment::query()
                ->whereIn('status', ['paid', 'completed'])
                ->sum('amount'),

            'pending_amount' => Payment::query()
                ->where('status', 'pending')
                ->sum('amount'),
        ];

        return Inertia::render('Admin/Payments/Index', [
            'payments' => $payments,

            'summary' => $summary,

            'filters' => [
                'search' => $request->search,
                'status' => $request->status,
                'payment_method' => $request->payment_method,
            ],

            'statuses' => [
                'pending',
                'paid',
                'completed',
                'failed',
                'refunded',
            ],

            'paymentMethods' => [
                'cash',
                'card',
                'bank_transfer',
                'mobile_money',
            ],
        ]);
    }

    /**
     * Display a single payment.
     */
    public function show(
        Payment $payment
    ): Response {
        $payment->load([
            'user',
            'course',
        ]);

        return Inertia::render('Admin/Payments/Show', [
            'payment' => $payment,
        ]);
    }

    /**
     * Mark a payment as paid.
     */
    public function markPaid(
        Payment $payment
    ): RedirectResponse {
        $payment->update([
            'status' => 'paid',
        ]);

        return back()->with(
            'success',
            'Payment marked as paid successfully.'
        );
    }

    /**
     * Mark a payment as failed.
     */
    public function markFailed(
        Payment $payment
    ): RedirectResponse {
        $payment->update([
            'status' => 'failed',
        ]);

        return back()->with(
            'success',
            'Payment marked as failed.'
        );
    }

    /**
     * Refund a payment.
     */
    public function refund(
        Payment $payment
    ): RedirectResponse {
        if (! in_array($payment->status, ['paid', 'completed'])) {
            return back()->withErrors([
                'payment' =>
                    'Only paid payments can be refunded.',
            ]);
        }

        $payment->update([
            'status' => 'refunded',
        ]);

        return back()->with(
            'success',
            'Payment refunded successfully.'
        );
    }
}
