<?php
namespace App\Http\Controllers;

use App\Models\Rating;
use App\Models\Property;
use Illuminate\Http\Request;

class RatingController extends Controller
{
    public function store(Request $request, Property $property)
    {
        $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string',
        ]);

        Rating::updateOrCreate(
            [
                'user_id' => auth()->id(),
                'property_id' => $property->id,
            ],
            [
                'rating' => $request->rating,
                'comment' => $request->comment,
            ]
        );

        return back()->with('success', 'Rating submitted successfully');
    }
}