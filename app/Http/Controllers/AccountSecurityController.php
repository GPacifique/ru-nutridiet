<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Inertia\Response;

class AccountSecurityController extends Controller
{
    /**
     * Display the account security page.
     */
    public function index(Request $request): Response
    {
        return Inertia::render('Account/Security', [
            'user' => [
                'id' => $request->user()->id,
                'name' => $request->user()->name,
                'email' => $request->user()->email,
            ],
        ]);
    }

    /**
     * Update the user's password.
     */
    public function updatePassword(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'current_password' => [
                'required',
                'current_password',
            ],

            'password' => [
                'required',
                'confirmed',
                Password::defaults(),
            ],
        ]);

        $request->user()->update([
            'password' => Hash::make($validated['password']),
        ]);

        return back()->with(
            'success',
            'Your password has been updated successfully.'
        );
    }

    /**
     * Revoke the current user's other sessions.
     *
     * This requires session/database configuration if you want
     * full multi-device session management.
     */
    public function logoutOtherSessions(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => [
                'required',
                'current_password',
            ],
        ]);

        // In a basic Breeze setup, simply regenerate the session.
        // Full multi-device session revocation requires additional
        // session management depending on your SESSION_DRIVER.

        $request->session()->regenerate();

        return back()->with(
            'success',
            'Your security session has been refreshed.'
        );
    }
}
