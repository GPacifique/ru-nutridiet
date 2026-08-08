<?php

namespace App\Http\Controllers;

use App\Models\Advertisement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AdvertisementController extends Controller
{
    /**
     * List all ads
     */
    public function index()
    {
        $advertisements = Advertisement::latest()->paginate(10);

        return view('advertisements.index', compact('advertisements'));
    }

    /**
     * Show create form
     */
    public function create()
    {
        return view('advertisements.create');
    }

    /**
     * Store new advertisement
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|max:255',
            'company_name' => 'required|max:255',
            'image' => 'required|image|max:2048',
            'link' => 'nullable|url',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);

        $imagePath = null;

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')
                ->store('advertisements', 'public');
        }

        Advertisement::create([
            'title' => $request->title,
            'company_name' => $request->company_name,
            'image' => $imagePath,
            'link' => $request->link,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'is_active' => true,
        ]);

        return redirect()
            ->route('advertisements.index')
            ->with('success', 'Advertisement created successfully');
    }

    /**
     * Display specific ad
     */
    public function show(Advertisement $advertisement)
    {
        return view('advertisements.show', compact('advertisement'));
    }

    /**
     * Edit ad form
     */
    public function edit(Advertisement $advertisement)
    {
        return view('advertisements.edit', compact('advertisement'));
    }

    /**
     * Update advertisement
     */
    public function update(Request $request, Advertisement $advertisement)
    {
        $request->validate([
            'title' => 'required|max:255',
            'company_name' => 'required|max:255',
            'link' => 'nullable|url',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);

        $imagePath = $advertisement->image;

        if ($request->hasFile('image')) {

            if ($advertisement->image) {
                Storage::disk('public')
                    ->delete($advertisement->image);
            }

            $imagePath = $request->file('image')
                ->store('advertisements', 'public');
        }

        $advertisement->update([
            'title' => $request->title,
            'company_name' => $request->company_name,
            'image' => $imagePath,
            'link' => $request->link,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'is_active' => $request->has('is_active'),
        ]);

        return redirect()
            ->route('advertisements.index')
            ->with('success', 'Advertisement updated successfully');
    }

    /**
     * Delete advertisement
     */
    public function destroy(Advertisement $advertisement)
    {
        if ($advertisement->image) {
            Storage::disk('public')
                ->delete($advertisement->image);
        }

        $advertisement->delete();

        return redirect()
            ->route('advertisements.index')
            ->with('success', 'Advertisement deleted successfully');
    }
}