<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AnnouncementController extends Controller
{
    /**
     * List announcements
     */
    public function index()
    {
        $announcements = Announcement::latest()
            ->paginate(10);

        return view(
            'announcements.index',
            compact('announcements')
        );
    }

    /**
     * Show create form
     */
    public function create()
    {
        return view('announcements.create');
    }

    /**
     * Store announcement
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|max:255',
            'content' => 'required',
            'organization_name' => 'nullable|max:255',
            'type' => 'required',
            'expiry_date' => 'nullable|date',
            'document' => 'nullable|mimes:pdf,doc,docx|max:2048'
        ]);

        $documentPath = null;

        if ($request->hasFile('document')) {
            $documentPath = $request->file('document')
                ->store('announcements', 'public');
        }

        Announcement::create([
            'title' => $request->title,
            'content' => $request->content,
            'organization_name' => $request->organization_name,
            'type' => $request->type,
            'expiry_date' => $request->expiry_date,
            'document' => $documentPath,
            'status' => 'published'
        ]);

        return redirect()
            ->route('announcements.index')
            ->with(
                'success',
                'Announcement created successfully'
            );
    }

    /**
     * Show announcement details
     */
    public function show(Announcement $announcement)
    {
        return view(
            'announcements.show',
            compact('announcement')
        );
    }

    /**
     * Edit announcement form
     */
    public function edit(Announcement $announcement)
    {
        return view(
            'announcements.edit',
            compact('announcement')
        );
    }

    /**
     * Update announcement
     */
    public function update(
        Request $request,
        Announcement $announcement
    ) {
        $request->validate([
            'title' => 'required|max:255',
            'content' => 'required',
            'organization_name' => 'nullable|max:255',
            'type' => 'required',
            'expiry_date' => 'nullable|date',
            'document' => 'nullable|mimes:pdf,doc,docx|max:2048'
        ]);

        $documentPath = $announcement->document;

        if ($request->hasFile('document')) {

            if ($announcement->document) {
                Storage::disk('public')
                    ->delete($announcement->document);
            }

            $documentPath = $request->file('document')
                ->store('announcements', 'public');
        }

        $announcement->update([
            'title' => $request->title,
            'content' => $request->content,
            'organization_name' => $request->organization_name,
            'type' => $request->type,
            'expiry_date' => $request->expiry_date,
            'document' => $documentPath,
            'status' => $request->status ?? 'published'
        ]);

        return redirect()
            ->route('announcements.index')
            ->with(
                'success',
                'Announcement updated successfully'
            );
    }

    /**
     * Delete announcement
     */
    public function destroy(
        Announcement $announcement
    ) {
        if ($announcement->document) {
            Storage::disk('public')
                ->delete($announcement->document);
        }

        $announcement->delete();

        return redirect()
            ->route('announcements.index')
            ->with(
                'success',
                'Announcement deleted successfully'
            );
    }
}