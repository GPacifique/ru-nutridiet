<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        return Product::with('user','category')->latest()->get();
    }

    public function store(Request $request)
    {
        $product = Product::create([
            'user_id' => auth()->id(),
            'category_id' => $request->category_id,
            'title' => $request->title,
            'description' => $request->description,
            'price' => $request->price,
            'file' => $request->file,
            'image' => $request->image
        ]);

        return response()->json($product);
    }

    public function show(Product $product)
    {
        return $product->load('reviews','user');
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return response()->json(['message' => 'Deleted']);
    }
}