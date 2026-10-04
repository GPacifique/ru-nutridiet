<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    protected $fillable = [
        'user_id', 'category_id', 'title', 'description',
        'price', 'file', 'image', 'downloads_count', 'rating',
    ];

    protected $casts = [
        'price'  => 'decimal:2',
        'rating' => 'float',
    ];

    protected $appends = ['image_url', 'file_url'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    protected function imageUrl(): Attribute
{
    return Attribute::get(fn () => $this->image ? '/storage/' . $this->image : null);
}

protected function fileUrl(): Attribute
{
    return Attribute::get(fn () => $this->file ? '/storage/' . $this->file : null);
}
    

public function reviews(): HasMany
{
    return $this->hasMany(Review::class);
}
}