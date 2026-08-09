<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\Practitioner;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AppointmentController extends Controller
{
    /**
     * Show the booking form.
     */
    public function create(Request $request): Response
    {
        $practitioners = Practitioner::with('user:id,name')
            ->get(['id', 'user_id', 'qualification', 'specialty', 'photo']);

        $user = $request->user();

        return Inertia::render('Book', [
            'practitioners' => $practitioners,
            'prefill' => $user ? [
                'name' => $user->name,
                'email' => $user->email,
            ] : null,
            'selectedPractitionerId' => $request->integer('practitioner') ?: null,
        ]);
    }

    /**
     * Store a new booking request.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'practitioner_id' => ['required', 'exists:practitioners,id'],
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'scheduled_at' => ['required', 'date', 'after:now'],
            'notes' => ['nullable', 'string', 'max:1000'],
        ]);

        $validated['user_id'] = $request->user()?->id;
        $validated['status'] = 'pending';

        Appointment::create($validated);

        return redirect()
            ->route('book')
            ->with('success', "Thanks — we've received your request and will confirm shortly.");
    }
}