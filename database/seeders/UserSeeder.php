<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'phone' => '0700000000',
            'password' => bcrypt('password'),
            'role' => 'admin',
            'is_verified' => true,
        ]);

        User::create([
            'name' => 'Owner User',
            'email' => 'owner@example.com',
            'phone' => '0711111111',
            'password' => bcrypt('password'),
            'role' => 'owner',
            'is_verified' => true,
        ]);

        User::create([
            'name' => 'Agent User',
            'email' => 'agent@example.com',
            'phone' => '0722222222',
            'password' => bcrypt('password'),
            'role' => 'agent',
            'is_verified' => true,
        ]);

        User::create([
            'name' => 'Manager User',
            'email' => 'manager@example.com',
            'phone' => '0733333333',
            'password' => bcrypt('password'),
            'role' => 'manager',
            'is_verified' => true,
        ]);

        User::create([
            'name' => 'Tenant User',
            'email' => 'tenant@example.com',
            'phone' => '0744444444',
            'password' => bcrypt('password'),
            'role' => 'tenant',
            'is_verified' => false,
        ]);

        User::create([
            'name' => 'Buyer User',
            'email' => 'buyer@example.com',
            'phone' => '0755555555',
            'password' => bcrypt('password'),
            'role' => 'buyer',
            'is_verified' => false,
        ]);
    }
}