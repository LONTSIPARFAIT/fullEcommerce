<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductVariationTypeRequest;
use App\Models\Product;
use App\Models\VariationType;
use App\Models\VariationTypeOption;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ProductVariationTypeController extends Controller
{
    public function index(Request $request, $id){
        $product= Product::findOrFail($id); 
        $variationTypes = $product->variationTypes()->with('options')->get();
        $variationTypesLists = $variationTypes->map(function ($variationType) {
            return [
                'id' => $variationType->id,
                'name' => $variationType->name,
                'type' => $variationType->type,
                'options' => $variationType->options->map(function ($option) {
                    return [
                        'id' => $option->id,
                        'name' => $option->name, 
                        'image' => $option->getMedia('images')->map(function ($image) {
                            return [
                                'id' => $image->id,
                                'url' => $image->getUrl(),
                            ];
                        })->toArray(),                     
                    ];
                }),
            ];
        });
        
        // dd($product); 

        return Inertia::render('Admin/Products/VariationTypes/Index',[
            'variationTypesLists' => $variationTypesLists,
            'product' => $product,
        ]);
    }

    public function store(ProductVariationTypeRequest $request, $product){
        $product = Product::findOrFail($product);

        try {
            $newVariationIds = [];
            $variationTypeOptions = [];
            DB::beginTransaction();

            foreach ($request->variationTypes as $vtIndex => $variationTypeData) {

                // create or update variation type
                $variationType = isset($variationTypeData['id'])
                ? VariationType::find($variationTypeData['id']) : null; 

                if ($variationType) {
                    $variationType->update([
                        'name' => $variationTypeData['name'],
                        'type' => $variationTypeData['type'],
                    ]);
                } else {
                    $variationType = VariationType::create([
                        'name' => $variationTypeData['name'],
                        'type' => $variationTypeData['type'],
                        'product_id' => $product->id,
                        'created_at' => now(),
                        'update_at' => now(),
                    ]);
                }

                $newVariantionIds[] = $variationType->id;

                // Process option
                foreach ($variationTypeData['options'] ?? [] as $opIndex => $optionData) {
                    $option = isset($optionData['id'])
                    ? VariationTypeOption::find($optionData['id']) 
                    : null;

                    if ($option) {
                        $option->update(['name'  => $optionData['name']]);
                    } else {
                        $option = VariationTypeOption::create([
                            'name' => $optionData['name'], 
                            'variation_type_id' => $variationType->id,                         
                            'created_at' => now(),
                            'update_at' => now(),
                        ]);
                    }

                    $variationTypeOptions[] = $option->id;
                    
                }
            }
        } catch (\Throwable $th) {
            //throw $th;
        }
    }

    public function update(Request $request){
        //
    }

    public function destroy(){
        //
    }
}
