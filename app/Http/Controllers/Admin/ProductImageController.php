<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductImageController extends Controller
{
    public function index(){
        $images = [];

        return Inertia::render('Admin/Products/Images/index',[
            'images' => $images,
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
