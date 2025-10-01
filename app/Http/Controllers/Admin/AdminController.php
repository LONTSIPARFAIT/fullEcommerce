<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\AdminStoreRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminController extends Controller
{
    public function index(Request $request): Response{

        $page = $request->input('page', 1);
        $perPage = $request->input('perPage', 10);
        $search = $request->input('search', '');
        $sort = $request->input('sort', 'id');
        $direction = $request->input('direction', 'asc');

        $admins = User::select('id', 'name', 'email','image', 'phone', 'created_at')
        ->when($search, function ($query, $search) {
            $query->where('name', 'like', '%'.$search.'%')
            ->orWhere('email', 'like', '%'.$search.'%')
            ->orWhere('phone', 'like', '%'.$search.'%');
        })
        ->where('role', '=', 'admin')
        ->orderBy($sort, $direction)
        ->paginate($perPage)->withQueryString();

        return Inertia::render('Admin/Admins/Index', [
            'admins' => $admins,
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

    public function create(Request $request) : Response {
        return Inertia::render('Admin/Admins/Create');
    }

    public function store(AdminStoreRequest $request) : RedirectResponse {
        $data = $request->only(['name', 'email', 'phone', 'password']);

        if($request->hasFile('avatar')){
            $data['avatar'] = '';
        }

        $data['password'] = bcrypt($data['password']);
        $data['role'] = 'admin';
        // $data['status'] = 'active';

        User::create($data);
        return redirect()->route('admin.admins.index')->with('success', 'Admin creer avec success');
    }
}
