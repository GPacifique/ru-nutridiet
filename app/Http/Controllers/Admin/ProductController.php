<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(Request $request): Response
    {
        $products = Product::with('category:id,name')
            ->when($request->search, fn ($q, $s) => $q->where('title', 'like', "%{$s}%"))
            ->when($request->category, fn ($q, $c) => $q->where('category_id', $c))
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Admin/Products/Index', [
            'products'   => $products,
            'categories' => Category::orderBy('name')->get(['id', 'name']),
            'filters'    => $request->only('search', 'category'),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Products/Create', [
            'categories' => Category::orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->handleUploads($request->validate($this->rules()), $request);
        $data['user_id'] = $request->user()->id;

        Product::create($data);

        return redirect()->route('admin.products.index')->with('success', 'Product created.');
    }

    public function show(Product $product): Response
    {
        return Inertia::render('Admin/Products/Show', [
            'product' => $product->load(['category:id,name', 'user:id,name']),
        ]);
    }

    public function edit(Product $product): Response
    {
        return Inertia::render('Admin/Products/Edit', [
            'product'    => $product,
            'categories' => Category::orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function update(Request $request, Product $product): RedirectResponse
    {
        $data = $this->handleUploads($request->validate($this->rules()), $request, $product);

        $product->update($data);

        return redirect()->route('admin.products.index')->with('success', 'Product updated.');
    }

    public function destroy(Product $product): RedirectResponse
    {
        foreach (['image', 'file'] as $key) {
            if ($product->$key) {
                Storage::disk('public')->delete($product->$key);
            }
        }

        $product->delete();

        return redirect()->route('admin.products.index')->with('success', 'Product deleted.');
    }

    private function rules(): array
    {
        return [
            'title'       => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:10000'],
            'category_id' => ['nullable', 'exists:categories,id'],
            'price'       => ['required', 'numeric', 'min:0', 'max:99999999.99'],
            'image'       => ['nullable', 'image', 'max:2048'],   // KB
            'file'        => ['nullable', 'file', 'max:51200'],   // KB (50 MB)
        ];
    }

    /** Store new uploads, delete replaced ones, and leave untouched fields alone. */
    private function handleUploads(array $data, Request $request, ?Product $product = null): array
    {
        foreach (['image' => 'products/images', 'file' => 'products/files'] as $key => $dir) {
            if ($request->hasFile($key)) {
                if ($product?->$key) {
                    Storage::disk('public')->delete($product->$key);
                }
                $data[$key] = $request->file($key)->store($dir, 'public');
            } else {
                unset($data[$key]);
            }
        }

        return $data;
    }
}