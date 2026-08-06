<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CourseLesson extends Model
{
    use HasFactory;

    protected $fillable = [
        'course_id',
        'title',
        'slug',
        'type',
        'content',
        'video_url',
        'position',
        'duration_minutes',
        'is_preview',
    ];

    protected $casts = [
        'position' => 'integer',
        'duration_minutes' => 'integer',
        'is_preview' => 'boolean',
    ];

    /**
     * The course this lesson belongs to.
     */
    public function course(): BelongsTo
    {
        return $this->belongsTo(
            Course::class,
            'course_id'
        );
    }
}