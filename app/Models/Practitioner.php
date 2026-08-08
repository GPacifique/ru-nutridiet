<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Practitioner extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'qualification',
        'focus',
        'experience',
        'bio',
        'email',
        'phone',
        'photo',
        'thumbnail',
        'status',
        'sort_order',
    ];

    protected $casts = [
        'status' => 'boolean',
        'experience' => 'integer',
        'sort_order' => 'integer',
    ];

    /**
     * Scope: only active practitioners.
     */
    public function scopeActive(Builder $query): Builder
    {
        return $query->where('status', true);
    }

    /**
     * Scope: order practitioners for public display.
     */
    public function scopeOrdered(Builder $query): Builder
    {
        return $query
            ->orderBy('sort_order', 'asc')
            ->orderBy('name', 'asc');
    }

    /**
     * Formatted experience.
     *
     * Example: 14 yrs
     */
    public function getExperienceAttribute($value): string
    {
        return ((int) $value) . ' yrs';
    }
}