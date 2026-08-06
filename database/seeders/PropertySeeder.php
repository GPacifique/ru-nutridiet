<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Property;
use App\Models\User;
use App\Models\Category;

class PropertySeeder extends Seeder
{
    public function run(): void
    {
        $owner = User::where('role', 'owner')->first();
        $category = Category::first();

        Property::create([
            'user_id' => $owner->id,
            'category_id' => $category->id,
            'title' => 'Luxury Villa in Kigali',
            'description' => 'Beautiful modern villa with city view',
            'price' => 250000,
            'location' => 'Kigali',
            'address' => 'Nyarutarama',
            'bedrooms' => 4,
            'bathrooms' => 3,
            'size' => 350,
            'listing_type' => 'sale',
            'status' => 'available',
            'featured' => true,
        ]);

        Property::create([
            'user_id' => $owner->id,
            'category_id' => $category->id,
            'title' => 'Modern Apartment',
            'description' => 'City center apartment',
            'price' => 1200,
            'location' => 'Kigali Heights',
            'address' => 'CBD',
            'bedrooms' => 2,
            'bathrooms' => 2,
            'size' => 120,
            'listing_type' => 'rent',
            'status' => 'available',
            'featured' => false,
        ]);
    }
}