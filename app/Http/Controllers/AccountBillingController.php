<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AccountBillingController extends Controller
{
    /**
     * Display the user's billing dashboard.
     */
    public function index(Request $request): Response
    {
        $user = $request->user();

        $payments = Payment::query()
            ->where('user_id', $user->id)
            ->with([
                'course:id,title',
            ])
            ->latest('created_at')
            ->paginate(10)
            ->withQueryString();

        $totalPaid = Payment::query()
            ->where('user_id', $user->id)
            ->whereIn('status', ['paid', 'completed'])
            ->sum('amount');

        $pendingAmount = Payment::query()
            ->where('user_id', $user->id)
            ->where('status', 'pending')
            ->sum('amount');

        $lastPayment = Payment::query()
            ->where('user_id', $user->id)
            ->whereIn('status', ['paid', 'completed'])
            ->latest('created_at')
            ->first();

        return Inertia::render('Account/Billing', [
            'payments' => $payments,

            'summary' => [
                'total_paid' => $totalPaid,
                'pending_amount' => $pendingAmount,
                'last_payment' => $lastPayment,
            ],
        ]);
    }

    /**
     * Display a single payment.
     */
    public function show(
        Request $request,
        Payment $payment
    ): Response {
        abort_unless(
            $payment->user_id === $request->user()->id,
            403
        );

        $payment->load([
            'course:id,title',
        ]);

        return Inertia::render('Account/Billing/Show', [
            'payment' => $payment,
        ]);
    }
}

