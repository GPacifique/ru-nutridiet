<?php

namespace App\Http\Controllers;

use App\Models\Property;
use App\Models\Recommendation;
use Illuminate\Support\Facades\Auth;

class RecommendationController extends Controller
{
   public function store(Property $property)
{
    $userId = auth()->id();

    $existing = Recommendation::where('user_id', $userId)
        ->where('property_id', $property->id)
        ->first();

    if ($existing) {
        $existing->delete();
        return back()->with('success', 'Recommendation removed');
    }

    Recommendation::create([
        'user_id' => $userId,
        'property_id' => $property->id,
    ]);

    return back()->with('success', 'Property recommended');
}
}