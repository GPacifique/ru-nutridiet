<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with([
            'product',
            'buyer'
        ])
        ->latest()
        ->paginate(15);

        return Inertia::render('Orders/Index', [
            'orders' => $orders
        ]);
    }

    public function show(Order $order)
    {
        $order->load([
            'product',
            'buyer'
        ]);

        return Inertia::render('Orders/Show', [
            'order' => $order
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'product_id' => ['required', 'exists:products,id']
        ]);

        $product = Product::findOrFail(
            $request->product_id
        );

        $order = Order::create([
            'buyer_id' => auth()->id(),
            'product_id' => $product->id,
            'order_number' => 'WM-' . strtoupper(Str::random(10)),
            'subtotal' => $product->price,
            'tax' => 0,
            'discount' => 0,
            'total_amount' => $product->price,
            'payment_status' => 'pending',
            'status' => 'pending'
        ]);

        return redirect()
            ->route('orders.show', $order)
            ->with('success', 'Order created successfully.');
    }

    public function markAsPaid(Order $order)
    {
        $order->update([
            'payment_status' => 'paid',
            'status' => 'completed',
            'paid_at' => now()
        ]);

        return back()->with(
            'success',
            'Order marked as paid.'
        );
    }

    public function destroy(Order $order)
    {
        $order->delete();

        return back()->with(
            'success',
            'Order deleted successfully.'
        );
    }
}