<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LessonProgress extends Model
{
    use HasFactory;

    protected $table = 'lesson_progress';

    protected $fillable = [
        'user_id',
        'lesson_id',
        'is_completed',
        'progress_percentage',
        'last_watched_at',
        'completed_at',
    ];

    /*
    |--------------------------------------------------------------------------
    | Relationships
    |--------------------------------------------------------------------------
    */

    // Student
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Lesson
    public function lesson()
    {
        return $this->belongsTo(CourseLesson::class, 'course_lesson_id');
    }

    /*
    |--------------------------------------------------------------------------
    | Helpers
    |--------------------------------------------------------------------------
    */

    public function markCompleted()
    {
        $this->is_completed = true;
        $this->progress_percentage = 100;
        $this->completed_at = now();
        $this->save();
    }

    public function updateProgress(int $percentage)
    {
        $this->progress_percentage = max(0, min(100, $percentage));
        $this->last_watched_at = now();
        $this->save();
    }

    public function isCompleted(): bool
    {
        return (bool) $this->is_completed;
    }
}