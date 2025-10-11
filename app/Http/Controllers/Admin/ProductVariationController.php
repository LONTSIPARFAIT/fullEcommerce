<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Services\ProductService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductVariationController extends Controller
{
    protected $productService;

    public function __construct(ProductService $productService){
        $this->productService = $productService;
    }
// mergeCartesianWithExisting
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

    /** update product variations
    * 
    * @param Request $request
    * @param Product $product
    * @return JsonResponse
    */

    public function update(VariationStoreUpdateRequest $request, Product $product){
        // Process the variation
        $data = $this->productService->mutateFormDataBeforeSave($request->all(), $product);
        $updatedProduct = $this->productService->handleRecordUpdate($product, $data);
        return redirect()->back()->with('success', 'Product variations updated successfully');
    }

    public function destroy(){
        //
    }
}
