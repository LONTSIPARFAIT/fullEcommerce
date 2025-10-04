<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\BrandController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Middleware\AdminCheckMiddleware;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', AdminCheckMiddleware::class])->group(function () {
    Route::prefix('admin')->name('admin.')->group(function () {

        Route::controller(ProductController::class)->group(function () {
            Route::group(['prefix' => 'products'], function (){
                Route::get('products', 'index')->name('products.index');
                Route::get('products/create', 'create')->name('products.create');
                Route::post('products', 'store')->name('products.store');
                Route::get('products/{product}', 'edit')->name('products.edit');
                Route::put('products/{product}', 'update')->name('products.update');
                Route::delete('products/{product}', 'destroy')->name('products.destroy');
            });
        });

        Route::resources([
            'users' => UserController::class,
            'admins' => AdminController::class,
            'categories' => CategoryController::class,
            'brands' => BrandController::class,
            'products' => ProductController::class,
        ]);
    });
});