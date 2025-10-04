<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\ImageUploader;
use App\Http\Controllers\Controller;
use App\Http\Requests\ProductStoreRequest;
use App\Http\Requests\ProductStoreUpdateRequest;
use App\Http\Requests\ProductUpdateRequest;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(Request $request): Response{

        $page = $request->input('page', 1);
        $perPage = $request->input('perPage', 10);
        $search = $request->input('search', '');
        $sort = $request->input('sort', 'id');
        $direction = $request->input('direction', 'asc');

        $products = Product::select('id', 'name', 'slug',)
        ->when($search, function ($query, $search) {
            $query->where('name', 'like', '%'.$search.'%');
        })
        ->orderBy($sort, $direction)
        ->paginate($perPage)->withQueryString();

        $products->getCollection()->transform(function ($product){
            $product->image= asset('storage/' . $product->image);
            
            return $product;
        });

        return Inertia::render('Admin/Products/Index', [
            'products' => $products,
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
        return Inertia::render('Admin/Products/Create',);
    }

    public function store(ProductStoreRequest $request) : RedirectResponse {
        $data = $request->only(['name',]);

        if($request->hasFile('image')){
            $data['image'] = ImageUploader::uploadImage($request->file('image'), 'Products');
        };

        Product::create($data);
        return redirect()->route('admin.products.index')->with('success', 'Product creer avec success');
    }

    public function edit($id): Response
    {
        $product = Product::findOrFail($id);
        $product->image= asset('storage/' . $product->image);

        return Inertia::render('Admin/Products/Edit', [
            'product' => $product,
        ]);
    }

    public function update(ProductUpdateRequest $request, Product $Product) : RedirectResponse
    {
        // $product = Product::findOrFail($id);
        $data = $request->only('name',);

        if($request->hasFile('image')){
            ImageUploader::deleteImage($Product->image);
            $data['image'] = ImageUploader::uploadImage($request->file('image'), 'Products');
        }

        $Product->update($data);
        // $data['status'] = 'active';

        return redirect()->route('admin.products.index')->with('success', 'Product modifier avec success');
    }

    public function destroy($id): RedirectResponse
    {
        $Product = Product::findOrFail($id);
        ImageUploader::deleteImage($Product->image);
        $Product->delete();
        return redirect()->route('admin.products.index')->with('success', 'Product Supprimer avec success');
    }

}
