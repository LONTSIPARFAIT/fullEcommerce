<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Admin',
            'username' => 'admin',
            'avatar' => 'default.svg',
            'phone' => '679324517',
            'address' => '123 Admin St, City, Country',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('admin123'),
            'role' => 'admin',
            'status' => 'active',
        ]);
        User::create([
            'name' => 'Seller',
            'username' => 'seller',
            'avatar' => 'default.svg',
            'phone' => '679324517',
            'address' => '123 seller St, City, Country',
            'email' => 'seller@gmail.com',
            'password' => Hash::make('admin123'),
            'role' => 'seller',
            'status' => 'active',
        ]);
        User::create([
            'name' => 'User',
            'username' => 'user',
            'avatar' => 'default.svg',
            'phone' => '679324517',
            'address' => '123 User St, City, Country',
            'email' => 'user@gmail.com',
            'password' => Hash::make('admin123'),
            'role' => 'user',
            'status' => 'active',
        ]);
    }
}
