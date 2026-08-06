<?php

namespace App\Http\Controllers;

use App\Models\Inquiry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class InquiryController extends Controller
{
    // Send inquiry
    public function store(Request $request, $propertyId)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'message' => 'required',
        ]);

        Inquiry::create([
            'property_id' => $propertyId,
            'user_id' => Auth::id(),
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'message' => $request->message,
        ]);

        return back()->with('success', 'Inquiry sent successfully');
    }

    // Admin: view all inquiries
    public function index()
    {
        $inquiries = Inquiry::with('property')->latest()->get();

        return response()->json($inquiries);
    }

    // Mark as read
    public function updateStatus($id)
    {
        $inquiry = Inquiry::findOrFail($id);
        $inquiry->status = 'read';
        $inquiry->save();

        return back()->with('success', 'Marked as read');
    }
}