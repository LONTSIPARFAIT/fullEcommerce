<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductVariationController extends Controller
{
    protected $productService;

    public function __construct(ProductService $productService){
        $this->productService = $productService;
    }

    public function index(Request $request, $product){
        $product= Product::findOrFail($product); 
        $variations = $product->variations->toArray();
        $variations = $this->productService->mergeCartesianWithExisting($product->variationTypes, $variations, $product);
        // dd($product); 

        return Inertia::render('Admin/Products/Variations/Index',[
            'product' => $product,
            'variationsLists' => $variations,
        ]);
    }

    public function store(){
        //
    }

    public function update(Request $request){
        //
    }

    public function destroy(){
        //
    }
}
