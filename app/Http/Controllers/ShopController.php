<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShopController extends Controller
{
    public function index(Request $request)
    {
        $category = $request->query('category');

        $products = Product::query()
            ->when($category, function ($query) use ($category) {
                $query->where('category', $category);
            })
            ->where('status', 'active')
            ->latest()
            ->paginate(12)
            ->withQueryString();

        return Inertia::render('Shop/Index', [
            'products' => $products,
            'category' => $category,
        ]);
    }
}