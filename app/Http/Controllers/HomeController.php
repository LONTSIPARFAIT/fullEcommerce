<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index(){
        return Inertia::render('Ecommerce/Home', [
            'title' => 'Welcome to our store',
            'description' => 'Explore our wide range of products and enjoy exclusive offers'
        ]);
    }
}
