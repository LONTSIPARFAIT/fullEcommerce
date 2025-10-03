-<?php

namespace App\Http\Controllers\category;

use App\Helpers\ImageUploader;
use App\Http\Controllers\Controller;
use App\Http\Requests\CategoryStoreUpdateRequest;
use App\Http\Requests\categoryUpdateRequest;
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

        $categories = Category::select('id', 'name', 'slug','image',)
        ->when($search, function ($query, $search) {
            $query->where('name', 'like', '%'.$search.'%');
        })
        ->orderBy($sort, $direction)
        ->paginate($perPage)->withQueryString();

        $categories->getCollection()->transform(function ($category){
            $category->image= asset('storage/' . $category->image);
            return $category;
        });

        return Inertia::render('category/categories/Index', [
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
        $categories = Category::select('id','name')->with("descentents")->isParent()->get();
        $flattenedCategories = $this->flattenCategories($categories);

        return Inertia::render('category/categories/Create');
    }

    public function store(CategoryStoreUpdateRequest $request) : RedirectResponse {
        $data = $request->only(['name',]);

        if($request->hasFile('image')){
            $data['image'] = ImageUploader::uploadImage($request->file('image'), 'categories');
        };

        Category::create($data);
        return redirect()->route('category.categories.index')->with('success', 'category creer avec success');
    }

    public function edit($id): Response
    {
        $category = Category::findOrFail($id);
        $category->image= asset('storage/' . $category->image);
        return Inertia::render('category/categories/Edit', [
            'category' => $category
        ]);
    }

    public function update(CategoryStoreUpdateRequest $request, Category $category) : RedirectResponse
    {
        // $category = Category::findOrFail($id);
        $data = $request->only('name',);

        if($request->hasFile('image')){
            ImageUploader::deleteImage($category->image);
            $data['image'] = ImageUploader::uploadImage($request->file('image'), 'categories');
        }

        $category->update($data);
        // $data['status'] = 'active';

        Category::create($data);
        return redirect()->route('category.categories.index')->with('success', 'category modifier avec success');
    }

    public function destroy($id): RedirectResponse
    {
        $category = Category::findOrFail($id);
        ImageUploader::deleteImage($category->image);
        $category->delete();
        return redirect()->route('category.categories.index')->with('success', 'category Supprimer avec success');
    }
}
