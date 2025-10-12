<?php

namespace Database\Seeders;

use App\Models\Brand;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BandSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $brands = [
            [
                'name' => 'Samsung',
            ],
            [
                'name' => 'Apple',
            ],
            [
                'name' => 'Sony',
            ],
            [
                'name' => 'LG',
            ],
            [
                'name' => 'Dell',
            ],
            [
                'name' => 'HP',
            ],
            [
                'name' => 'Lenovo',
            ],
            [
                'name' => 'Asur',
            ],
            [
                'name' => 'Acer',
            ],
            [
                'name' => 'Microsoft',
            ],
        ];
        foreach ($brands as $brand) {
            Brand::create($brand);
        }
    }
}
