<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Announcement extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'content',
        'featured_image',
        'status',
        'published_at',
    ];

    protected $casts = [
        'published_at' => 'datetime',
    ];

    /**
     * Get the full URL for the featured image
     */
    public function getImageUrlAttribute()
    {
        if (!$this->featured_image) {
            return null;
        }

        // If the path doesn't start with 'announcements/', prepend it
        if (!str_starts_with($this->featured_image, 'announcements/')) {
            return asset('storage/announcements/' . $this->featured_image);
        }

        return asset('storage/' . $this->featured_image);
    }
}
