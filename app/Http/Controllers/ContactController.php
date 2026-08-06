<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactController extends Controller
{
    // STORE CONTACT (public form)
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
            'message' => 'required|string',
        ]);

        Contact::create($request->only([
            'name',
            'email',
            'message'
        ]));

        return back()->with('success', 'Message sent successfully!');
    }

    // ADMIN INBOX (Inertia page)
    public function inbox()
    {
        return Inertia::render('Admin/Contacts/Index', [
            'contacts' => Contact::latest()->get()
        ]);
    }

    // MARK AS READ
    public function markAsRead($id)
    {
        $contact = Contact::findOrFail($id);
        $contact->update(['is_read' => true]);

        return back();
    }

    // DELETE MESSAGE
    public function destroy($id)
    {
        $contact = Contact::findOrFail($id);
        $contact->delete();

        return back();
    }
    public function index()
{
    return Inertia::render('Admin/Contacts/Inbox', [
        'contacts' => Contact::latest()->get()
    ]);
}
}