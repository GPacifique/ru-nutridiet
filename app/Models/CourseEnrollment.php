<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CourseEnrollment extends Model
{
    use HasFactory;

    protected $table = 'course_enrollments';

    protected $fillable = [
        'user_id',
        'course_id',
        'order_id',
        'status',
        'progress_percent',
        'enrolled_at',
        'completed_at',
    ];

    protected $casts = [
        'progress_percent' => 'decimal:2',
        'enrolled_at' => 'datetime',
        'completed_at' => 'datetime',
    ];

    /**
     * The user enrolled in the course.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(
            User::class,
            'user_id'
        );
    }

    /**
     * The enrolled course.
     */
    public function course(): BelongsTo
    {
        return $this->belongsTo(
            Course::class,
            'course_id'
        );
    }

    /**
     * The order associated with this enrollment.
     */
    public function order(): BelongsTo
    {
        return $this->belongsTo(
            Order::class,
            'order_id'
        );
    }
}