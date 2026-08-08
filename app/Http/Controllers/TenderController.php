<?php

namespace App\Http\Controllers;

use App\Models\Tender;
use Illuminate\Http\Request;

   class TenderController extends Controller
{
    public function index()
    {
        $tenders = Tender::latest()->paginate(10);
        return view('tenders.index', compact('tenders'));
    }

    public function create()
    {
        return view('tenders.create');
    }

   public function store(Request $request)
{
    $request->validate([
        'title' => 'required',
        'description' => 'required',
        'organization_name' => 'required',
        'deadline' => 'required|date',
        'logo_path' => 'nullable|image',
        'document' => 'nullable|mimes:pdf,doc,docx',
    ]);

    $logoPath = null;
    $documentPath = null;

    // Save logo
    if ($request->hasFile('logo_path')) {
        $logoPath = $request->file('logo_path')
                            ->store('tenders/logos', 'public');
    }

    // Save document
    if ($request->hasFile('document')) {
        $documentPath = $request->file('document')
                                ->store('tenders/documents', 'public');
    }

    Tender::create([
        'title' => $request->title,
        'description' => $request->description,
        'organization_name' => $request->organization_name,
        'deadline' => $request->deadline,
        'status' => $request->status,
        'logo_path' => $logoPath,
        'document' => $documentPath,
    ]);

    return redirect()->route('tenders.index')
        ->with('success', 'Tender created successfully');
}
    public function show(Tender $tender)
    {
        return view('tenders.show', compact('tender'));
    }
    public function search(Request $request)
    {
        $query = $request->input('q');

        $tenders = Tender::where('title', 'like', "%{$query}%")
            ->orWhere('organization_name', 'like', "%{$query}%")
            ->latest()
            ->get();

        return view('tenders.index', compact('tenders'));
    }
    public function getRouteKeyName()
{
    return 'slug';
}
}