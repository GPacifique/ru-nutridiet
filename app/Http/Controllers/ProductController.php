<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;
class ProductController extends Controller
{
    /**
     * Marketplace
     */
    public function index(Request $request)
    {
        $products = Product::with('category')
            ->where('status', 'active')
            ->when($request->search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                      ->orWhere('description', 'like', "%{$search}%");
                });
            })
            ->when($request->category, function ($query, $category) {
                $query->where('category_id', $category);
            })
            ->latest()
            ->paginate(12)
            ->withQueryString();

        return Inertia::render('Shop/Index', [
            'products' => $products,
            'categories' => \App\Models\Category::orderBy('name')->get(),
            'filters' => [
                'search' => $request->search,
                'category' => $request->category,
            ],
        ]);
    }


    /**
     * Store a new product
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'file' => 'nullable|string',
            'image' => 'nullable|string',
        ]);

        $product = Product::create([
            'user_id' => Auth::id(),
            'category_id' => $validated['category_id'],
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'price' => $validated['price'],
            'file' => $validated['file'] ?? null,
            'image' => $validated['image'] ?? null,
            'status' => 'active',
        ]);

        return redirect()
            ->route('products.show', $product)
            ->with('success', 'Product created successfully.');
    }


    /**
     * Product details
     */
    public function show(Product $product)
    {
        abort_if($product->status !== 'active', 404);

        $product->load([
            'category',
            'reviews.user',
            'user',
        ]);

        $relatedProducts = Product::with('category')
            ->where('category_id', $product->category_id)
            ->where('id', '!=', $product->id)
            ->where('status', 'active')
            ->latest()
            ->take(4)
            ->get();

        return Inertia::render('Shop/Show', [
            'product' => $product,
            'relatedProducts' => $relatedProducts,
        ]);
    }


    /**
     * Delete product
     */
    public function destroy(Product $product)
    {
        $product->delete();

        return redirect()
            ->route('marketplace')
            ->with('success', 'Product deleted successfully.');
    }
}