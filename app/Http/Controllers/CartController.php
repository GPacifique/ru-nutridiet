<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    /**
     * Display the shopping cart.
     */
    public function index(Request $request)
    {
        $cart = $request->session()->get('cart', []);

        $products = collect($cart)
            ->map(function ($item, $productId) {
                $product = Product::with('category')->find($productId);

                if (!$product || $product->status !== 'active') {
                    return null;
                }

                return [
                    'id' => $product->id,
                    'product' => $product,
                    'quantity' => (int) $item['quantity'],
                    'price' => (float) $product->price,
                    'total' => (float) $product->price * (int) $item['quantity'],
                ];
            })
            ->filter()
            ->values();

        $subtotal = $products->sum('total');

        $cartCount = $products->sum('quantity');

        return Inertia::render('Cart/Index', [
            'cart' => $products,
            'subtotal' => $subtotal,
            'cartCount' => $cartCount,
        ]);
    }


    /**
     * Add a product to the cart.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'nullable|integer|min:1',
            'buy_now' => 'nullable|boolean',
        ]);

        $product = Product::findOrFail($validated['product_id']);

        if ($product->status !== 'active') {
            return back()->with('error', 'This product is no longer available.');
        }

        $quantity = $validated['quantity'] ?? 1;

        $cart = $request->session()->get('cart', []);

        $productId = (string) $product->id;

        if (isset($cart[$productId])) {
            $cart[$productId]['quantity'] += $quantity;
        } else {
            $cart[$productId] = [
                'quantity' => $quantity,
            ];
        }

        $request->session()->put('cart', $cart);

        /*
        |--------------------------------------------------------------------------
        | Buy Now
        |--------------------------------------------------------------------------
        */

        if ($request->boolean('buy_now')) {
            return redirect()->route('checkout');
        }

        return back()->with(
            'success',
            "{$product->title} has been added to your cart."
        );
    }


    /**
     * Update cart quantity.
     */
    public function update(Request $request, $cart)
    {
        $validated = $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $sessionCart = $request->session()->get('cart', []);

        $productId = (string) $cart;

        if (!isset($sessionCart[$productId])) {
            return back()->with('error', 'Product is not in your cart.');
        }

        $product = Product::find($productId);

        if (!$product || $product->status !== 'active') {
            unset($sessionCart[$productId]);

            $request->session()->put('cart', $sessionCart);

            return back()->with(
                'error',
                'This product is no longer available.'
            );
        }

        $sessionCart[$productId]['quantity'] =
            $validated['quantity'];

        $request->session()->put('cart', $sessionCart);

        return back()->with('success', 'Cart updated.');
    }


    /**
     * Remove product from cart.
     */
    public function destroy(Request $request, $cart)
    {
        $sessionCart = $request->session()->get('cart', []);

        $productId = (string) $cart;

        if (isset($sessionCart[$productId])) {
            unset($sessionCart[$productId]);
        }

        $request->session()->put('cart', $sessionCart);

        return back()->with('success', 'Product removed from cart.');
    }


    /**
     * Empty the entire cart.
     */
    public function clear(Request $request)
    {
        $request->session()->forget('cart');

        return redirect()
            ->route('cart')
            ->with('success', 'Your cart has been emptied.');
    }
}