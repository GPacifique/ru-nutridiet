<?php

namespace App\Http\Controllers;

use App\Models\Property;
use App\Models\Comment;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;


class CommentController extends Controller
{
    /**
     * Store a new comment
     */
    public function store(Request $request, Property $property)
{
    $request->validate([
        'comment' => 'required|string'
    ]);

    $comment = $property->comments()->create([
        'user_id' => auth()->id(),
        'comment' => $request->comment,
        'parent_id' => $request->parent_id ?? null
    ]);

    return back();
}

    /**
     * Delete a comment (optional)
     */
    public function destroy(Comment $comment)
    {
        // Only owner or admin can delete (basic rule)
        if ($comment->user_id !== auth()->id()) {
            abort(403, 'Unauthorized');
        }

        $comment->delete();

        return back()->with('success', 'Comment deleted successfully');
    }
}