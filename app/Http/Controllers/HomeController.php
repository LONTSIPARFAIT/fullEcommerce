<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductListResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index(){
        $bestSellingProducts = ProductListResource::collection(Product::query()->limit(4)->orderBy('sales', 'desc')->get());
        $specialOffers = ProductListResource::collection(Product::query()->where('is_special_offer', true)->limit(4)->get());
        return Inertia::render('Ecommerce/Home', [
            'title' => 'Welcome to our store',
            'description' => 'Explore our wide range of products and enjoy exclusive offers',
            'bestSellingProducts' => $bestSellingProducts,
            'specialOffers' => $specialOffers,
        ]);
    }
}
