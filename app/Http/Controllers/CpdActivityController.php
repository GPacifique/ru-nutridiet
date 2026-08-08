<?php

namespace App\Http\Controllers;

use App\Models\CpdActivity;
use App\Models\Practitioner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CpdActivityController extends Controller
{
    /**
     * Display CPD activities.
     */
    public function index(Request $request)
    {
        $query = CpdActivity::with('practitioner')
            ->latest();

        // Search
        if ($request->filled('search')) {
            $search = $request->search;

            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('provider', 'like', "%{$search}%")
                    ->orWhere('activity_type', 'like', "%{$search}%")
                    ->orWhereHas('practitioner', function ($q) use ($search) {
                        $q->where('name', 'like', "%{$search}%");
                    });
            });
        }

        // Filter by status
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        // Filter by activity type
        if ($request->filled('activity_type')) {
            $query->where('activity_type', $request->activity_type);
        }

        $activities = $query
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Admin/CpdActivities/Index', [
            'activities' => $activities,
            'filters' => [
                'search' => $request->search,
                'status' => $request->status,
                'activity_type' => $request->activity_type,
            ],
        ]);
    }

    /**
     * Show create form.
     */
    public function create()
    {
        $practitioners = Practitioner::active()
            ->orderBy('name')
            ->get([
                'id',
                'name',
            ]);

        return Inertia::render('Admin/CpdActivities/Create', [
            'practitioners' => $practitioners,
        ]);
    }

    /**
     * Store CPD activity.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'practitioner_id' => [
                'required',
                'exists:practitioners,id',
            ],

            'title' => [
                'required',
                'string',
                'max:255',
            ],

            'description' => [
                'nullable',
                'string',
            ],

            'activity_type' => [
                'required',
                'in:course,workshop,conference,webinar,seminar,self_learning,research,presentation,other',
            ],

            'provider' => [
                'nullable',
                'string',
                'max:255',
            ],

            'start_date' => [
                'nullable',
                'date',
            ],

            'end_date' => [
                'nullable',
                'date',
                'after_or_equal:start_date',
            ],

            'hours' => [
                'required',
                'numeric',
                'min:0',
            ],

            'points' => [
                'required',
                'numeric',
                'min:0',
            ],

            'certificate' => [
                'nullable',
                'file',
                'mimes:pdf,jpg,jpeg,png',
                'max:5120',
            ],
        ]);

        // Upload certificate/evidence
        if ($request->hasFile('certificate')) {
            $validated['certificate'] = $request
                ->file('certificate')
                ->store('cpd-certificates', 'public');
        }

        // New activities require approval
        $validated['status'] = 'pending';

        CpdActivity::create($validated);

        return redirect()
            ->route('cpd-activities.index')
            ->with('success', 'CPD activity submitted successfully.');
    }

    /**
     * Display a CPD activity.
     */
    public function show(CpdActivity $cpdActivity)
    {
        $cpdActivity->load('practitioner');

        return Inertia::render('Admin/CpdActivities/Show', [
            'activity' => $cpdActivity,
        ]);
    }

    /**
     * Show edit form.
     */
    public function edit(CpdActivity $cpdActivity)
    {
        $practitioners = Practitioner::active()
            ->orderBy('name')
            ->get([
                'id',
                'name',
            ]);

        return Inertia::render('Admin/CpdActivities/Edit', [
            'activity' => $cpdActivity,
            'practitioners' => $practitioners,
        ]);
    }

    /**
     * Update CPD activity.
     */
    public function update(
        Request $request,
        CpdActivity $cpdActivity
    ) {
        $validated = $request->validate([
            'practitioner_id' => [
                'required',
                'exists:practitioners,id',
            ],

            'title' => [
                'required',
                'string',
                'max:255',
            ],

            'description' => [
                'nullable',
                'string',
            ],

            'activity_type' => [
                'required',
                'in:course,workshop,conference,webinar,seminar,self_learning,research,presentation,other',
            ],

            'provider' => [
                'nullable',
                'string',
                'max:255',
            ],

            'start_date' => [
                'nullable',
                'date',
            ],

            'end_date' => [
                'nullable',
                'date',
                'after_or_equal:start_date',
            ],

            'hours' => [
                'required',
                'numeric',
                'min:0',
            ],

            'points' => [
                'required',
                'numeric',
                'min:0',
            ],

            'certificate' => [
                'nullable',
                'file',
                'mimes:pdf,jpg,jpeg,png',
                'max:5120',
            ],
        ]);

        // Replace certificate
        if ($request->hasFile('certificate')) {

            if (
                $cpdActivity->certificate &&
                Storage::disk('public')->exists($cpdActivity->certificate)
            ) {
                Storage::disk('public')
                    ->delete($cpdActivity->certificate);
            }

            $validated['certificate'] = $request
                ->file('certificate')
                ->store('cpd-certificates', 'public');
        }

        $cpdActivity->update($validated);

        return redirect()
            ->route('cpd-activities.index')
            ->with('success', 'CPD activity updated successfully.');
    }

    /**
     * Delete CPD activity.
     */
    public function destroy(CpdActivity $cpdActivity)
    {
        if (
            $cpdActivity->certificate &&
            Storage::disk('public')->exists($cpdActivity->certificate)
        ) {
            Storage::disk('public')
                ->delete($cpdActivity->certificate);
        }

        $cpdActivity->delete();

        return redirect()
            ->route('cpd-activities.index')
            ->with('success', 'CPD activity deleted successfully.');
    }

    /**
     * Approve CPD activity.
     */
    public function approve(CpdActivity $cpdActivity)
    {
        $cpdActivity->update([
            'status' => 'approved',
            'admin_notes' => null,
        ]);

        return back()->with(
            'success',
            'CPD activity approved successfully.'
        );
    }

    /**
     * Reject CPD activity.
     */
    public function reject(Request $request, CpdActivity $cpdActivity)
    {
        $validated = $request->validate([
            'admin_notes' => [
                'required',
                'string',
                'max:2000',
            ],
        ]);

        $cpdActivity->update([
            'status' => 'rejected',
            'admin_notes' => $validated['admin_notes'],
        ]);

        return back()->with(
            'success',
            'CPD activity rejected.'
        );
    }
}