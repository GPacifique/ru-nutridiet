<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Advertisement extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'company_name',
        'image',
        'link',
        'start_date',
        'end_date',
        'is_active'
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'is_active' => 'boolean',
    ];

    /**
     * Check if advertisement is currently running
     */
    public function isRunning()
    {
        return $this->is_active &&
               now()->between($this->start_date, $this->end_date);
    }

    /**
     * Get the full URL for the advertisement image
     */
    public function getImageUrlAttribute()
    {
        if (!$this->image) {
            return null;
        }

        // If the path doesn't start with 'advertisements/', prepend it
        if (!str_starts_with($this->image, 'advertisements/')) {
            return asset('storage/advertisements/' . $this->image);
        }

        return asset('storage/' . $this->image);
    }
}