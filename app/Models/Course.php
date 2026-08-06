<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Course extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'thumbnail',
        'credit_type',
        'credit_hours',
        'price',
        'status',
        'instructor_id',
        'published_at',
    ];

    protected $casts = [
        'credit_hours' => 'decimal:2',
        'price' => 'decimal:2',
        'published_at' => 'datetime',
    ];

    /**
     * Course instructor.
     */
    public function instructor(): BelongsTo
    {
        return $this->belongsTo(
            User::class,
            'instructor_id'
        );
    }
    
public function lessons(): HasMany
{
    return $this->hasMany(
        CourseLesson::class
    )->orderBy('position');
}
 public function exams(): HasMany
{
    return $this->hasMany(
        Exam::class,
        'course_id'
    );
}
public function enrollments(): HasMany
{
    return $this->hasMany(
        CourseEnrollment::class
    );
}
public function creditRecords()
{
    return $this->hasMany(
        CreditRecord::class,
        'course_id'
    );
} 
public function certificates()
{
    return $this->hasMany(
        Certificate::class,
        'course_id'
    );
}
public function courselesson(): BelongsTo
    {
        return $this->belongsTo(
            CourseLesson::class,
            'courselesson_id'
        );
    }
}