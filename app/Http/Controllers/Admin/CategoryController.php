<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\ImageUploader;
use App\Http\Controllers\Controller;
use App\Http\Requests\CategoryStoreUpdateRequest;
use App\Models\Category;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    public function index(Request $request): Response{

        $page = $request->input('page', 1);
        $perPage = $request->input('perPage', 10);
        $search = $request->input('search', '');
        $sort = $request->input('sort', 'id');
        $direction = $request->input('direction', 'asc');

        $categories = Category::select('id', 'name', 'parent_id', 'slug','image',)
        ->when($search, function ($query, $search) {
            $query->where('name', 'like', '%'.$search.'%');
        })
        ->orderBy($sort, $direction)
        ->paginate($perPage)->withQueryString();

        $categories->getCollection()->transform(function ($category){
            $category->image= asset('storage/' . $category->image);
            if($category->parent_id){
                // $parent = Category::find($category->parent_id);
                $category->parent_name = $category->parent->name;
            } else {
                $category->parent_name = null;
            }
            return $category;
        });

        return Inertia::render('Admin/Categories/Index', [
            'categories' => $categories,
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
        $categories = Category::select('id','name')->with("descendants")->isParent()->get();
        $flattenedCategories = $this->flattenCategories($categories);

        return Inertia::render('Admin/Categories/Create',[
            'categories' => $flattenedCategories,
        ]);
    }

    public function store(CategoryStoreUpdateRequest $request) : RedirectResponse {
        $data = $request->only(['name', 'description', 'parent_id']);

        if($request->hasFile('image')){
            $data['image'] = ImageUploader::uploadImage($request->file('image'), 'categories');
        };

        Category::create($data);
        return redirect()->route('admin.categories.index')->with('success', 'category creer avec success');
    }

    public function edit($id): Response
    {
        $category = Category::findOrFail($id);
        $category->image= asset('storage/' . $category->image);
        $categories = Category::select('id','name')->with("descendants")->isParent()->get();
        $flattenedCategories = $this->flattenCategories($categories);

        return Inertia::render('Admin/Categories/Edit', [
            'category' => $category,
            'categories' => $flattenedCategories,
        ]);
    }

    public function update(CategoryStoreUpdateRequest $request, Category $category) : RedirectResponse
    {
        // $category = Category::findOrFail($id);
        $data = $request->only('name', 'description', 'parent_id');

        if($request->hasFile('image')){
            ImageUploader::deleteImage($category->image);
            $data['image'] = ImageUploader::uploadImage($request->file('image'), 'categories');
        }

        $category->update($data);
        // $data['status'] = 'active';

        // Category::create($data);
        return redirect()->route('admin.categories.index')->with('success', 'category modifier avec success');
    }

    public function destroy($id): RedirectResponse
    {
        $category = Category::findOrFail($id);
        ImageUploader::deleteImage($category->image);
        $category->delete();
        return redirect()->route('admin.categories.index')->with('success', 'category Supprimer avec success');
    }

    public function flattenCategories($categories, $prefix = '', $result = [] ){
        foreach ($categories as $category) {
            $path = $prefix ? "$prefix > $category->name" : $category->name;

            $result[] = [
                'id' => $category->id,
                'name' => $category->name,
                'path' => $path,
                'level' => substr_count($path, ">"),
            ]; 

            if ($category->descendants && $category->descendants->count() > 0) {
                $result = $this->flattenCategories($category->descendants, $path, $result);
            }
        }

        return $result;
    }
}
