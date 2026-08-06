<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FavoriteController extends Controller
{
    // Add to favorites
    public function store($propertyId)
    {
        Favorite::firstOrCreate([
            'user_id' => Auth::id(),
            'property_id' => $propertyId,
        ]);

        return back()->with('success', 'Added to favorites');
    }

    // Remove from favorites
    public function destroy($propertyId)
    {
        Favorite::where('user_id', Auth::id())
            ->where('property_id', $propertyId)
            ->delete();

        return back()->with('success', 'Removed from favorites');
    }
}