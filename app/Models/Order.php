<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    protected $fillable = [
        'user_id', 'number', 'name', 'email', 'phone', 'address',
        'notes', 'payment_method', 'status', 'total',
    ];

    protected $casts = ['total' => 'decimal:2'];

    public function items(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }
}