<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Exam extends Model
{
    use HasFactory;

    protected $fillable = [
        'course_id',
        'title',
        'passing_score',
        'time_limit',
        'max_attempts',
    ];

    protected $casts = [
        'passing_score' => 'decimal:2',
        'time_limit' => 'integer',
        'max_attempts' => 'integer',
    ];

    /**
     * The course this exam belongs to.
     */
    public function course(): BelongsTo
    {
        return $this->belongsTo(
            Course::class,
            'course_id'
        );
    }
    
public function questions(): HasMany
{
    return $this->hasMany(
        ExamQuestion::class,
        'exam_id'
    )->orderBy('position');
}
public function attempts()
{
    return $this->hasMany(
        ExamAttempt::class,
        'exam_id'
    );
}
}