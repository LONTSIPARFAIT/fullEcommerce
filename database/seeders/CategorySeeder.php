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
                'name' => 'Home Services',
                'subCategories' => [
                    'House Cleaning',
                    'Plumbing',
                    'Electrical work',
                ],
            ],
            [
                'name' => 'Beauty & Wellness',
                'subCategories' => [
                    'Hair Styling',
                    'Massage',
                    'Nail Care',
                ],
            ],
            [
                'name' => 'Auto Services',
                'subCategories' => [
                    'Car Repair',
                    'Car Wash',
                    'Oll Change',
                ],
            ],
            [
                'name' => 'Tech Support',
                'subCategories' => [
                    'Computer Repair',
                    'Phone Repair',
                    'Network Setup',
                ],
            ],
        ];

        foreach ($categories as $category) {
            $mainCategory = Category::create([
                'name' => $category['name'],
                'parent_id' => null,
            ]);

            foreach ($categories['subCategories'] as $subCategory) {
                Category::create([
                    'name' => $subCategory,
                    'parent_id' => $mainCategory->id,
                ]);
            }
        }
    }
}
