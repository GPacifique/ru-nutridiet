<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class TestimonialController extends Controller
{
    /**
     * Display all testimonials.
     */
    public function index(Request $request)
    {
        $query = Testimonial::query();

        // Search
        if ($request->filled('search')) {
            $search = $request->string('search');

            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('role', 'like', "%{$search}%")
                    ->orWhere('title', 'like', "%{$search}%")
                    ->orWhere('content', 'like', "%{$search}%");
            });
        }

        // Filter by type
        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }

        // Filter by approval
        if ($request->filled('status')) {
            if ($request->status === 'approved') {
                $query->where('is_approved', true);
            }

            if ($request->status === 'pending') {
                $query->where('is_approved', false);
            }
        }

        $testimonials = $query
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Admin/Testimonials/Index', [
            'testimonials' => $testimonials,
            'filters' => [
                'search' => $request->search,
                'type' => $request->type,
                'status' => $request->status,
            ],
        ]);
    }

    /**
     * Show create form.
     */
    public function create()
    {
        return Inertia::render('Admin/Testimonials/Create', [
            'types' => [
                'patient',
                'professional',
                'cpd',
                'corporate',
            ],
        ]);
    }

    /**
     * Store a new testimonial.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => [
                'nullable',
                'exists:users,id',
            ],

            'name' => [
                'required',
                'string',
                'max:255',
            ],

            'role' => [
                'nullable',
                'string',
                'max:255',
            ],

            'title' => [
                'nullable',
                'string',
                'max:255',
            ],

            'content' => [
                'required',
                'string',
                'max:5000',
            ],

            'rating' => [
                'required',
                'integer',
                'min:1',
                'max:5',
            ],

            'image' => [
                'nullable',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:2048',
            ],

            'type' => [
                'required',
                'in:patient,professional,cpd,corporate',
            ],

            'is_featured' => [
                'nullable',
                'boolean',
            ],

            'is_approved' => [
                'nullable',
                'boolean',
            ],
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request
                ->file('image')
                ->store('testimonials', 'public');
        }

        if (!empty($validated['is_approved'])) {
            $validated['approved_at'] = now();
        }

        Testimonial::create($validated);

        return redirect()
            ->route('admin.testimonials.index')
            ->with('success', 'Testimonial created successfully.');
    }

    /**
     * Display a single testimonial.
     */
    public function show(Testimonial $testimonial)
    {
        return Inertia::render('Admin/Testimonials/Show', [
            'testimonial' => $testimonial->load('user'),
        ]);
    }

    /**
     * Show edit form.
     */
    public function edit(Testimonial $testimonial)
    {
        return Inertia::render('Admin/Testimonials/Edit', [
            'testimonial' => $testimonial,
            'types' => [
                'patient',
                'professional',
                'cpd',
                'corporate',
            ],
        ]);
    }

    /**
     * Update testimonial.
     */
    public function update(Request $request, Testimonial $testimonial)
    {
        $validated = $request->validate([
            'user_id' => [
                'nullable',
                'exists:users,id',
            ],

            'name' => [
                'required',
                'string',
                'max:255',
            ],

            'role' => [
                'nullable',
                'string',
                'max:255',
            ],

            'title' => [
                'nullable',
                'string',
                'max:255',
            ],

            'content' => [
                'required',
                'string',
                'max:5000',
            ],

            'rating' => [
                'required',
                'integer',
                'min:1',
                'max:5',
            ],

            'image' => [
                'nullable',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:2048',
            ],

            'type' => [
                'required',
                'in:patient,professional,cpd,corporate',
            ],

            'is_featured' => [
                'nullable',
                'boolean',
            ],

            'is_approved' => [
                'nullable',
                'boolean',
            ],
        ]);

        if ($request->hasFile('image')) {
            if ($testimonial->image) {
                Storage::disk('public')->delete($testimonial->image);
            }

            $validated['image'] = $request
                ->file('image')
                ->store('testimonials', 'public');
        }

        if (
            !empty($validated['is_approved'])
            && !$testimonial->is_approved
        ) {
            $validated['approved_at'] = now();
        }

        if (empty($validated['is_approved'])) {
            $validated['approved_at'] = null;
        }

        $testimonial->update($validated);

        return redirect()
            ->route('admin.testimonials.index')
            ->with('success', 'Testimonial updated successfully.');
    }

    /**
     * Delete testimonial.
     */
    public function destroy(Testimonial $testimonial)
    {
        if ($testimonial->image) {
            Storage::disk('public')->delete($testimonial->image);
        }

        $testimonial->delete();

        return redirect()
            ->route('admin.testimonials.index')
            ->with('success', 'Testimonial deleted successfully.');
    }

    /**
     * Approve testimonial.
     */
    public function approve(Testimonial $testimonial)
    {
        $testimonial->approve();

        return back()->with(
            'success',
            'Testimonial approved successfully.'
        );
    }

    /**
     * Reject testimonial.
     */
    public function reject(Testimonial $testimonial)
    {
        $testimonial->reject();

        return back()->with(
            'success',
            'Testimonial rejected successfully.'
        );
    }

    /**
     * Toggle featured status.
     */
    public function toggleFeatured(Testimonial $testimonial)
    {
        $testimonial->update([
            'is_featured' => !$testimonial->is_featured,
        ]);

        return back()->with(
            'success',
            $testimonial->is_featured
                ? 'Testimonial added to featured testimonials.'
                : 'Testimonial removed from featured testimonials.'
        );
    }
}