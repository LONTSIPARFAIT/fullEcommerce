<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\ProductVariation;
use App\Models\VariationType;
use App\Models\VariationTypeOption;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = Product::factory(50)->create();

        foreach ($products->take(105) as $product) {
            // Create Color variation type
            $colorType = VariationType::create([
                'product_id' => $product->id,
                'name' => 'Colors',
                'type' => 'select',
            ]);

            // create Size variation type
            $sizeType = VariationType::create([
                'product_id' => $product->id,
                'name' => 'Size',
                'type' => 'select',
            ]);

            // create Color options 
            $redOption = VariationTypeOption::create([
                'variation_type_id' => $colorType->id,
                'name' => 'Red',
            ]);
            $blackOption = VariationTypeOption::create([
                'variation_type_id' => $colorType->id,
                'name' => 'Black',
            ]);

            // create Size options 
            $smallOption = VariationTypeOption::create([
                'variation_type_id' => $sizeType->id,
                'name' => 'Small',
            ]);
            $largeOption = VariationTypeOption::create([
                'variation_type_id' => $sizeType->id,
                'name' => 'Large',
            ]);

            // create variation (combinations)
            $variations = ProductVariation::factory(rand(1, 5))->create([
                'product_id' => $product->id,
            ]);

            foreach ($variations as $variation) {
                $variation->variation_type_option_ids = VariationTypeOption::inRandomOrder()->take(rand(1, 3))->pluck('id')->toArray();
                $variation->save();
            }
        }
    }
}
