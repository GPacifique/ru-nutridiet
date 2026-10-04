<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Support\Cart;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class CheckoutController extends Controller
{
    public function show(Request $request): Response
    {
        $items = Cart::items();

        return Inertia::render('Checkout', [
            'items' => $items,
            'total' => Cart::total($items),
            'user'  => $request->user()?->only('name', 'email'),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $items = Cart::items();

        if (empty($items)) {
            return redirect('/shop')->with('error', 'Your cart is empty.');
        }

        $data = $request->validate([
            'name'           => ['required', 'string', 'max:255'],
            'email'          => ['nullable', 'email', 'max:255'],
            'phone'          => ['required', 'string', 'max:30'],
            'address'        => ['nullable', 'string', 'max:500'],
            'notes'          => ['nullable', 'string', 'max:2000'],
            'payment_method' => ['required', 'in:momo,airtel,cash'],
        ]);

        $order = DB::transaction(function () use ($data, $items, $request) {
            $order = Order::create($data + [
                'user_id' => $request->user()?->id,
                'number'  => 'ORD-' . strtoupper(Str::random(8)),
                'status'  => 'pending',
                'total'   => Cart::total($items),
            ]);

            foreach ($items as $i) {
                $order->items()->create([
                    'product_id' => $i['id'],
                    'title'      => $i['title'],
                    'price'      => $i['price'],
                    'quantity'   => $i['quantity'],
                ]);
            }

            return $order;
        });

        Cart::clear();

        return redirect('/shop')->with(
            'success',
            "Order {$order->number} received. We will contact you on {$order->phone} to confirm payment."
        );
    }
}