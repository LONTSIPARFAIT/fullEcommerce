<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductVariationTypeRequest;
use App\Models\Product;
use Illuminate\Http\Request;
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
            //code...
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
