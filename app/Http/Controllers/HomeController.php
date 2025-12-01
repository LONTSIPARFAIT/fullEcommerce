<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index(){
        $bestSellingProducts = Product::query()->limit(4)->orderBy('sales', 'desc')->get();
        $specialOffers = Product::query()->where('is_special_offer', true)->limit(4)->get();
        return Inertia::render('Ecommerce/Home', [
            'title' => 'Welcome to our store',
            'description' => 'Explore our wide range of products and enjoy exclusive offers'
        ]);
    }
}
