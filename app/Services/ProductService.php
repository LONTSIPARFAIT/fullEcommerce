<?php 
namespace App\Services;

class ProductService
{
 public function mergeCartesianWithExisting($variationTypes, $existingData, $product){
    $defaultQuantity = $product->quantity;
    $defaultPrice = $product->price;
    $cartesianProduct = $this->cartesianProduct($variationTypes, $defaultQuantity, $defaultPrice);
    $mergedResult = [];

    foreach ($cartesianProduct as $product) {
        $optionIds = collect($product)->filter(fn($value, $key) => str_starts_with($key, 'variation_type_'))->map(fn($option)=>$option['id'])->values()->toArray();

        $match = array_filter($existingData, function ($existingOption) use ($optionIds) {
            return $existingOption['variation_type_option_ids'] === $optionIds;
        });

        if (!empty($match)) {
            $existingEntry = reset($match);
            $product['id'] = $existingEntry['id'];
            $product['quantity'] = $existingEntry['quantity'];
            $product['price'] = $existingEntry['price'];
        }else {
            $product['quantity'] = $defaultQuantity;
            $product['price'] = $defaultPrice;
        }

        $mergedResult[] = $product;
    }
    return $mergedResult;
 }

 public function cartesianProduct($variationTypes, $defaultQuantity, $defaultPrice){
    $result = [[]];

    foreach ($variationTypes as $index => $variationType) {
        $temp = [];
        foreach ($variationType->options as $option) {
            foreach ($result as $combination) {
                $newCombination = $combination + [
                    'variation_type_' . ($variationType->id) => [
                        'id' => $option->id,
                        'name' => $option->name,
                        'label' => $variationType->name,
                    ],
                ];
                $temp[] = $newCombination;
            }
        }
        $result = $temp;
    }
    foreach ($result as $combination) {
        if (count($combination) === count($variationTypes)) {
            $combination['quantity'] = $defaultQuantity;
            $combination['price'] = $defaultPrice;
        }
    }
    return $result ;
 }
}