<?php

namespace App\Support;

use App\Models\Product;

class Cart
{
    private const KEY = 'cart'; // [product_id => quantity]

    public static function add(int $id, int $qty = 1): void
    {
        $cart = session(self::KEY, []);
        $cart[$id] = min(99, ($cart[$id] ?? 0) + $qty);
        session([self::KEY => $cart]);
    }

    public static function set(int $id, int $qty): void
    {
        $cart = session(self::KEY, []);
        if (isset($cart[$id])) {
            $cart[$id] = max(1, min(99, $qty));
            session([self::KEY => $cart]);
        }
    }

    public static function remove(int $id): void
    {
        $cart = session(self::KEY, []);
        unset($cart[$id]);
        session([self::KEY => $cart]);
    }

    public static function clear(): void
    {
        session()->forget(self::KEY);
    }

    public static function count(): int
    {
        return array_sum(session(self::KEY, []));
    }

    /** Cart lines built from current database prices; inactive products are skipped. */
    public static function items(): array
    {
        $cart = session(self::KEY, []);
        if (! $cart) {
            return [];
        }

        return Product::whereIn('id', array_keys($cart))
            ->where('status', 'active')
            ->get()
            ->map(fn ($p) => [
                'id'         => $p->id,
                'title'      => $p->title,
                'price'      => (float) $p->price,
                'image_url'  => $p->image_url,
                'quantity'   => $cart[$p->id],
                'line_total' => (float) $p->price * $cart[$p->id],
            ])
            ->values()
            ->all();
    }

    public static function total(array $items): float
    {
        return array_sum(array_column($items, 'line_total'));
    }
}