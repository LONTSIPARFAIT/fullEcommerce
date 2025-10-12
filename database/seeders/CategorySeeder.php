<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Tech Support',
                'subCategories' => [
                    'Computer Repair',
                    'Phone Repair',
                    'Network Repair',
                ],
            ],
        ];

        foreach ($categories as $category) {
            $mainCategory = Category::create([
                'name' => $category['name'],
                'parent_id' => null,
            ]);

            foreach ($categories as $category) {
                $mainCategory = Category::create([
                    'name' => $category['name'],
                    'parent_id' => null,
                ]);
            }
        }
    }
}
