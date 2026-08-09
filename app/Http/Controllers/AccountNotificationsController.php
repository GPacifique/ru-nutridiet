<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AccountNotificationsController extends Controller
{
    /**
     * Display notification settings and recent notifications.
     */
    public function index(Request $request): Response
    {
        $user = $request->user();

        $notifications = $user->notifications()
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Account/Notifications', [
            'notifications' => $notifications,

            'preferences' => [
                'email_notifications' => (bool) ($user->email_notifications ?? true),
                'course_notifications' => (bool) ($user->course_notifications ?? true),
                'enrollment_notifications' => (bool) ($user->enrollment_notifications ?? true),
                'certificate_notifications' => (bool) ($user->certificate_notifications ?? true),
                'payment_notifications' => (bool) ($user->payment_notifications ?? true),
                'marketing_notifications' => (bool) ($user->marketing_notifications ?? false),
            ],
        ]);
    }

    /**
     * Update notification preferences.
     */
    public function updatePreferences(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'email_notifications' => ['boolean'],
            'course_notifications' => ['boolean'],
            'enrollment_notifications' => ['boolean'],
            'certificate_notifications' => ['boolean'],
            'payment_notifications' => ['boolean'],
            'marketing_notifications' => ['boolean'],
        ]);

        $user = $request->user();

        $user->update([
            'email_notifications' => $validated['email_notifications'] ?? false,
            'course_notifications' => $validated['course_notifications'] ?? false,
            'enrollment_notifications' => $validated['enrollment_notifications'] ?? false,
            'certificate_notifications' => $validated['certificate_notifications'] ?? false,
            'payment_notifications' => $validated['payment_notifications'] ?? false,
            'marketing_notifications' => $validated['marketing_notifications'] ?? false,
        ]);

        return back()->with(
            'success',
            'Notification preferences updated successfully.'
        );
    }

    /**
     * Mark one notification as read.
     */
    public function markAsRead(
        Request $request,
        string $notification
    ): RedirectResponse {
        $user = $request->user();

        $item = $user->notifications()
            ->where('id', $notification)
            ->firstOrFail();

        $item->markAsRead();

        return back()->with(
            'success',
            'Notification marked as read.'
        );
    }

    /**
     * Mark all notifications as read.
     */
    public function markAllAsRead(Request $request): RedirectResponse
    {
        $request->user()
            ->unreadNotifications
            ->markAsRead();

        return back()->with(
            'success',
            'All notifications marked as read.'
        );
    }

    /**
     * Delete one notification.
     */
    public function destroy(
        Request $request,
        string $notification
    ): RedirectResponse {
        $user = $request->user();

        $item = $user->notifications()
            ->where('id', $notification)
            ->firstOrFail();

        $item->delete();

        return back()->with(
            'success',
            'Notification deleted successfully.'
        );
    }
}
