<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
Use App\Models\ContactMessage;

class ContactMessageController extends Controller
{
    public function index()
    {
        return view('contact');
    }

public function send(Request $request)
{
    $request->validate([
        'name' => 'required',
        'email' => 'required|email',
        'message' => 'required',
    ]);

    ContactMessage::create([
        'name' => $request->name,
        'email' => $request->email,
        'message' => $request->message,
    ]);

    return back()->with('success', 'Message sent successfully!');
}
}