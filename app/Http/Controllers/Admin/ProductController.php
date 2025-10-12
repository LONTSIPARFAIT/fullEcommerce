<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\ImageUploader;
use App\Http\Controllers\Controller;
use App\Http\Requests\ProductStoreRequest;
use App\Http\Requests\ProductStoreUpdateRequest;
use App\Http\Requests\ProductUpdateRequest;
use App\Models\Brand;
use App\Models\Category;
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
            $product->image= $product->getFirstImageUrl('images', 'thumb');

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
        $brands = Brand::select('id', 'name')->get();
        $categories = Category::select('id','name')->with("descendants")->isParent()->get();
        $flattenedCategories = $this->flattenCategories($categories);
        return Inertia::render('Admin/Products/Create',[
            'brands' => $brands,
            'categories' => $flattenedCategories,
        ]);
    }

    public function store(ProductStoreRequest $request) : RedirectResponse {
        $data = $request->only(['name','description','status', 'brand_id', 'category_id', 'price', 'quantity', 'barcode' , 'sku' ]);
        $product = Product::create($data);

        return redirect()->route('admin.products.index', $product->id)->with('success', 'Product creer avec success');
    }

    public function edit($id): Response
    {
        $product = Product::findOrFail($id);
        $product->image= asset('storage/' . $product->image);
        $brands = Brand::select('id', 'name')->get();
        $categories = Category::select('id','name')->with("descendants")->isParent()->get();
        $flattenedCategories = $this->flattenCategories($categories);

        return Inertia::render('Admin/Products/Edit', [
            'product' => $product,
            'brands' => $brands,
            'categories' => $flattenedCategories,
        ]);
    }

    public function update(ProductUpdateRequest $request, Product $product) : RedirectResponse
    {
        // $product = Product::findOrFail($id);
        $data = $request->only('name', 'description', 'status', 'brand_id', 'category_id', 'price', 'quantity', 'barcode', 'sku');

        $product->update($data);

        return redirect()->route('admin.products.index')->with('success', 'Product modifier avec success');
    }

    public function destroy($id): RedirectResponse
    {
        $Product = Product::findOrFail($id);
        ImageUploader::deleteImage($Product->image);
        $Product->delete();
        return redirect()->route('admin.products.index')->with('success', 'Product Supprimer avec success');
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
