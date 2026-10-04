<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Support\Cart;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'product_id' => ['required', 'exists:products,id'],
            'quantity'   => ['nullable', 'integer', 'between:1,99'],
        ]);

        $product = Product::findOrFail($data['product_id']);
        abort_if($product->status !== 'active', 404);

        Cart::add($product->id, $data['quantity'] ?? 1);

        return redirect('/checkout');
    }

    public function update(Request $request, Product $product): RedirectResponse
    {
        $data = $request->validate(['quantity' => ['required', 'integer', 'between:1,99']]);
        Cart::set($product->id, $data['quantity']);

        return back();
    }

    public function destroy(Product $product): RedirectResponse
    {
        Cart::remove($product->id);

        return back();
    }
}