<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Favorite extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'property_id',
    ];

    /*
    |--------------------------------------------------------------------------
    | Relationships
    |--------------------------------------------------------------------------
    */

    // Favorite belongs to a user
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Favorite belongs to a property
    public function property()
    {
        return $this->belongsTo(Property::class);
    }
}