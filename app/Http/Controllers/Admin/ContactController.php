<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    public function index(Request $request): Response
    {
        $messages = Contact::query()
            ->when($request->search, fn ($q, $s) => $q->where(function ($q) use ($s) {
                $q->where('name', 'like', "%{$s}%")
                  ->orWhere('email', 'like', "%{$s}%")
                  ->orWhere('message', 'like', "%{$s}%");
            }))
            ->when($request->status === 'unread', fn ($q) => $q->whereNull('read_at'))
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Admin/Contacts/Index', [
            'messages' => $messages,
            'filters'  => $request->only('search', 'status'),
            'unread'   => Contact::whereNull('read_at')->count(),
        ]);
    }

    public function show(Contact $contact): Response
    {
        if (is_null($contact->read_at)) {
            $contact->update(['read_at' => now()]);
        }

        return Inertia::render('Admin/Contacts/Show', [
            'message' => $contact,
        ]);
    }

    public function toggleRead(Contact $contact): RedirectResponse
    {
        $contact->update(['read_at' => $contact->read_at ? null : now()]);

        return back();
    }

    public function destroy(Contact $contact): RedirectResponse
    {
        $contact->delete();

        return redirect()
            ->route('admin.contacts.index')
            ->with('success', 'Message deleted.');
    }
}