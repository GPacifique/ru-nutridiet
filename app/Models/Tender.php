<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\SoftDeletes;

class Tender extends Model
{
    use HasFactory;

    /**
     * Mass assignable fields
     */
    protected $fillable = [
        'title',
        'description',
        'organization_name',
        'deadline',
        'status',
        'logo_path',
        'document',
        'slug',
    ];

    /**
     * OPTIONAL: Auto-generate slug from title
     * (remove if you are not using slug)
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($tender) {
            if (empty($tender->slug)) {
                $tender->slug = Str::slug($tender->title);
            }
        });

        static::updating(function ($tender) {
            if ($tender->isDirty('title')) {
                $tender->slug = Str::slug($tender->title);
            }
        });
    }

    

}