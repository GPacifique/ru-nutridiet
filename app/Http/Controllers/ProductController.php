<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    /** Marketplace */
    public function index(Request $request): Response
    {
        $products = Product::with('category')
            ->where('status', 'active')
            ->when($request->search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                      ->orWhere('description', 'like', "%{$search}%");
                });
            })
            ->when($request->category, fn ($q, $c) => $q->where('category_id', $c))
            ->when($request->sort, fn ($q, $sort) => match ($sort) {
                'price_asc'  => $q->orderBy('price'),
                'price_desc' => $q->orderByDesc('price'),
                'rating'     => $q->orderByDesc('rating'),
                default      => $q->latest(),
            }, fn ($q) => $q->latest())
            ->paginate(12)
            ->withQueryString();

        return Inertia::render('Shop/Index', [
            'products'   => $products,
            'categories' => Category::orderBy('name')->get(),
            'filters'    => [
                'search'   => $request->search,
                'category' => $request->category,
                'sort'     => $request->sort,
            ],
        ]);
    }

    /** Store a new product (unchanged from your original) */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'price'       => 'required|numeric|min:0',
            'file'        => 'nullable|string',
            'image'       => 'nullable|string',
        ]);

        $product = Product::create([
            'user_id'     => Auth::id(),
            'category_id' => $validated['category_id'],
            'title'       => $validated['title'],
            'description' => $validated['description'] ?? null,
            'price'       => $validated['price'],
            'file'        => $validated['file'] ?? null,
            'image'       => $validated['image'] ?? null,
            'status'      => 'active',
        ]);

        return redirect()
            ->route('products.show', $product)
            ->with('success', 'Product created successfully.');
    }

    /** Product details */
    public function show(Product $product): Response
    {
        abort_if($product->status !== 'active', 404);

        $product->load(['category', 'reviews.user', 'user']);

        $relatedProducts = Product::with('category')
            ->where('category_id', $product->category_id)
            ->where('id', '!=', $product->id)
            ->where('status', 'active')
            ->latest()
            ->take(4)
            ->get();

        return Inertia::render('Shop/Show', [
            'product'         => $product,
            'relatedProducts' => $relatedProducts,
            'myReview'        => Auth::check()
                ? $product->reviews->firstWhere('user_id', Auth::id())
                : null,
        ]);
    }

    /** Create or update the current user's review */
    public function review(Request $request, Product $product): RedirectResponse
    {
        abort_if($product->status !== 'active', 404);

        $data = $request->validate([
            'rating'  => ['required', 'integer', 'between:1,5'],
            'comment' => ['nullable', 'string', 'max:2000'],
        ]);

        $product->reviews()->updateOrCreate(['user_id' => $request->user()->id], $data);
        $product->update(['rating' => round($product->reviews()->avg('rating'), 1)]);

        return back()->with('success', 'Thanks for your review.');
    }

    /** Delete product */
    public function destroy(Product $product): RedirectResponse
    {
        $user = Auth::user();
        abort_unless($user && ($user->role === 'admin' || $user->id === $product->user_id), 403);

        $product->delete();

        return redirect()
            ->route('marketplace')
            ->with('success', 'Product deleted successfully.');
    }
}