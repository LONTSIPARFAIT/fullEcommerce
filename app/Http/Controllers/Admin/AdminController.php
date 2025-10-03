<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\ImageUploader;
use App\Http\Controllers\Controller;
use App\Http\Requests\AdminStoreRequest;
use App\Http\Requests\AdminUpdateRequest;
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

        $admins = User::select('id', 'name', 'email','avatar', 'phone', 'created_at')
        ->when($search, function ($query, $search) {
            $query->where('name', 'like', '%'.$search.'%')
            ->orWhere('email', 'like', '%'.$search.'%')
            ->orWhere('phone', 'like', '%'.$search.'%');
        })
        ->where('role', '=', 'admin')
        ->orderBy($sort, $direction)
        ->paginate($perPage)->withQueryString();

        $admins->getCollection()->transform(function ($admin){
            $admin->avatar= asset('storage/' . $admin->avatar);
            return $admin;
        });

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
            $data['avatar'] = ImageUploader::uploadImage($request->file('avatar'), 'admins');
        }

        $data['password'] = bcrypt($data['password']);
        $data['role'] = 'admin';
        // $data['status'] = 'active';

        User::create($data);
        return redirect()->route('admin.admins.index')->with('success', 'Admin creer avec success');
    }

    public function edit($id): Response
    {
        $admin = User::findOrFail($id);
        return Inertia::render('Admin/Admins/Edit', [
            'admin' => $admin
        ]);
    }

    public function update(AdminUpdateRequest $request, $id) : RedirectResponse
    {
        $admin = User::findOrFail($id);
        $data = $request->only('name', 'email', 'phone');

        if($request->hasFile('avatar')){
            ImageUploader::deleteImage($admin->avatar);
            $data['avatar'] = ImageUploader::uploadImage($request->file('avatar'), 'admins');
        }

        $admin->update($data);
        // $data['status'] = 'active';

        User::create($data);
        return redirect()->route('admin.admins.index')->with('success', 'Admin modifier avec success');
    }

    public function destroy($id): RedirectResponse
    {
        $admin = User::findOrFail($id);
        ImageUploader::deleteImage($admin->avatar);
        $admin->delete();
        return redirect()->route('admin.admins.index')->with('success', 'Admin Supprimer avec success');
    }
}
