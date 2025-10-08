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
        
        $product->getMedia('images')->each(function ($media) use (&$images){
            $images[] = [
                'id' => $media->id,
                'url' => $media->getUrl(),
            ];
        });

        return Inertia::render('Admin/Products/Images/Index',[
            'images' => $images,
            'product' => $product,
        ]);
    }

    public function store(Request $request,Product $product){
        $request->validate([
            'images' => 'require|array',
            'images.*' => 'image|max:2048',
        ]);

        foreach ($request->file('images', []) as $image) {
            $product->addMedia($image)
            ->toMediaCollection('images');
        }

        return redirect()->back()->with('sucess', 'Images uploaded sucessfully');
    }

    public function destroy(Request $request, $imageId){
        $media = Media::findOrFail($imageId);
    }
}
