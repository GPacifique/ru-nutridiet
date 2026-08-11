<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CheckoutController extends Controller
{
    /**
     * Display checkout page.
     */
    public function index(Request $request)
    {
        $cart = $request->session()->get('cart', []);

        if (empty($cart)) {
            return redirect()
                ->route('marketplace')
                ->with('error', 'Your cart is empty.');
        }

        $items = collect($cart)
            ->map(function ($item, $productId) {

                $product = Product::with('category')
                    ->where('id', $productId)
                    ->where('status', 'active')
                    ->first();

                if (!$product) {
                    return null;
                }

                $quantity = max(1, (int) $item['quantity']);

                return [
                    'id' => $product->id,
                    'product' => $product,
                    'quantity' => $quantity,
                    'price' => (float) $product->price,
                    'total' => (float) $product->price * $quantity,
                ];
            })
            ->filter()
            ->values();

        if ($items->isEmpty()) {
            $request->session()->forget('cart');

            return redirect()
                ->route('marketplace')
                ->with('error', 'Your cart is empty.');
        }

        $subtotal = $items->sum('total');

        return Inertia::render('Checkout/Index', [
            'cart' => $items,
            'subtotal' => $subtotal,
        ]);
    }


    /**
     * Create order.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'first_name' => [
                'required',
                'string',
                'max:100',
            ],

            'last_name' => [
                'required',
                'string',
                'max:100',
            ],

            'email' => [
                'required',
                'email',
                'max:255',
            ],

            'phone' => [
                'required',
                'string',
                'max:30',
            ],

            'address' => [
                'required',
                'string',
                'max:500',
            ],

            'city' => [
                'required',
                'string',
                'max:100',
            ],

            'payment_method' => [
                'required',
                'in:momo,airtel_money,cash',
            ],

            'notes' => [
                'nullable',
                'string',
                'max:1000',
            ],
        ]);

        $cart = $request->session()->get('cart', []);

        if (empty($cart)) {
            return redirect()
                ->route('marketplace')
                ->with('error', 'Your cart is empty.');
        }

        try {

            $order = DB::transaction(function () use (
                $cart,
                $validated,
                $request
            ) {

                $subtotal = 0;

                /*
                |--------------------------------------------------------------------------
                | Calculate total from database prices
                |--------------------------------------------------------------------------
                |
                | Never trust prices sent by React/browser.
                |
                */

                $cartProducts = [];

                foreach ($cart as $productId => $item) {

                    $product = Product::where('id', $productId)
                        ->where('status', 'active')
                        ->lockForUpdate()
                        ->first();

                    if (!$product) {
                        continue;
                    }

                    $quantity = max(
                        1,
                        (int) ($item['quantity'] ?? 1)
                    );

                    $price = (float) $product->price;

                    $lineTotal = $price * $quantity;

                    $subtotal += $lineTotal;

                    $cartProducts[] = [
                        'product' => $product,
                        'quantity' => $quantity,
                        'price' => $price,
                        'total' => $lineTotal,
                    ];
                }

                if (empty($cartProducts)) {
                    throw new \Exception(
                        'No valid products found in cart.'
                    );
                }

                /*
                |--------------------------------------------------------------------------
                | Create order
                |--------------------------------------------------------------------------
                */

                $order = Order::create([
                    'user_id' => $request->user()?->getAuthIdentifier(),

                    'first_name' => $validated['first_name'],
                    'last_name' => $validated['last_name'],

                    'email' => $validated['email'],
                    'phone' => $validated['phone'],

                    'address' => $validated['address'],
                    'city' => $validated['city'],

                    'payment_method' =>
                        $validated['payment_method'],

                    'notes' =>
                        $validated['notes'] ?? null,

                    'subtotal' => $subtotal,

                    'total' => $subtotal,

                    'status' => 'pending',

                    'payment_status' => 'pending',
                ]);

                /*
                |--------------------------------------------------------------------------
                | Create order items
                |--------------------------------------------------------------------------
                */

                foreach ($cartProducts as $item) {

                    OrderItem::create([
                        'order_id' => $order->id,

                        'product_id' =>
                            $item['product']->id,

                        'quantity' =>
                            $item['quantity'],

                        'price' =>
                            $item['price'],

                        'total' =>
                            $item['total'],
                    ]);
                }

                return $order;
            });

            /*
            |--------------------------------------------------------------------------
            | Empty cart
            |--------------------------------------------------------------------------
            */

            $request->session()->forget('cart');

            /*
            |--------------------------------------------------------------------------
            | Redirect to order
            |--------------------------------------------------------------------------
            */

            return redirect()
                ->route('orders.show', $order)
                ->with(
                    'success',
                    'Your order has been placed successfully.'
                );

        } catch (\Throwable $e) {

            report($e);

            return back()
                ->withInput()
                ->with(
                    'error',
                    'We could not process your order. Please try again.'
                );
        }
    }
}