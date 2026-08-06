<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'password',
        'profile_image',
        'bio',
        'address',
        'role',
        'professional_registration_number',
        'license_number',
        'organization',
        'country',
        'status',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
    
public function courses(): HasMany
{
    return $this->hasMany(
        Course::class,
        'instructor_id'
    );
}
public function enrollments(): HasMany
{
    return $this->hasMany(
       CourseEnrollment::class
    );
}
public function examAttempts()
{
    return $this->hasMany(
        ExamAttempt::class,
        'user_id'
    );
}
public function creditRecords()
{
    return $this->hasMany(
        CreditRecord::class,
        'user_id'
    );
}
public function certificates()
{
    return $this->hasMany(
        Certificate::class,
        'user_id'
    );
}
}