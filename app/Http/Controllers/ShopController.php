<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Category;

class ShopController extends Controller
{
   public function index(Request $request)
{
    $category = $request->get('category');
    $search   = $request->get('search');

    $products = Product::query()
        ->with('category')
        ->when($category, function ($query) use ($category) {
            $query->whereHas('category', function ($q) use ($category) {
                $q->where('name', $category);
            });
        })
        ->when($search, function ($query) use ($search) {
            $query->where('name', 'like', "%{$search}%");
        })
        ->where('status', 'active')
        ->latest()
        ->paginate(12)
        ->withQueryString();

    return Inertia::render('Shop/Index', [
        'products'   => $products,
    'categories' => Category::orderBy('name')->get(['id', 'name']),
    'category'   => $category,
    'filters'    => [
        'search'   => $search,
        'category' => $category,
        ],
    ]);
}
}