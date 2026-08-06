<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inquiry extends Model
{
    use HasFactory;

    protected $fillable = [
        'property_id',
        'user_id',
        'name',
        'email',
        'phone',
        'message',
        'status',
    ];

    /*
    |--------------------------------------------------------------------------
    | Relationships
    |--------------------------------------------------------------------------
    */

    // Inquiry belongs to a property
    public function property()
    {
        return $this->belongsTo(Property::class);
    }

    // Inquiry belongs to a user (optional guest inquiry)
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}