<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function index(Request $request): Response{
        
        $perPage = $request->input('perPage', 10);

        return Inertia::render('Admin/Users/Index', [

        ]);
    }
}
