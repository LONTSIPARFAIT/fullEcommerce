<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function index(Request $request): Response{

        $page = $request->input('page', 1);
        $perPage = $request->input('perPage', 10);
        $search = $request->input('search', '');
        $sort = $request->input('sort', 'id');
        $direction = $request->input('direction', 'asc');

        $users = User::select('id', 'name', 'email', 'phone', 'created_at')
        ->when($search, function ($query, $search) {
            $query->where('name', 'like', '%'.$search.'%')
            ->orWhere('email', 'like', '%'.$search.'%')
            ->orWhere('phone', 'like', '%'.$search.'%');
        })
        ->orderBy($sort, $direction)
        ->paginate($perPage)->withQueryString();

        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
            'filters' => [
                'search' => $search,
                'sort' => $sort,
                'direction' => $direction,
                'perPage' => $perPage,
                'page' => $page,
            ],
            'can'=>[
                'create'=>true,
                'edit'=>true,
                'delete'=>true,
            ]
        ]);
    }
}
