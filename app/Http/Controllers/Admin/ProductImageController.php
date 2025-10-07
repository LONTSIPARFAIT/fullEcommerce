<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductImageController extends Controller
{
    public function index(Request $request, $id){
        $product= Product::findOrFail($id); 
        $images = [];
        // dd($product); 

        return Inertia::render('Admin/Products/Images/Index',[
            'images' => $images,
            'product' => $product,
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
