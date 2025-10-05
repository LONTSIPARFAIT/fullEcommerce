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

        Route::controller(ProductImageController::class)->group(function () {
            Route::group(['prefix' => 'products','as' => 'products.'], function (){
                Route::post('image/uplaod', 'upload')->name('products.upload');
                Route::delete('image/delete', 'destroy')->name('products.delete');
            });
        });

        Route::controller(ProductController::class)->group(function () {
            Route::group(['prefix' => 'products','as' => 'products.'], function (){
                // Route::get('/', 'index')->name('products.index');
                // Route::get('/create', 'create')->name('products.create');
                // Route::post('/', 'store')->name('products.store');
                // Route::get('/{product}/edit', 'edit')->name('products.edit');
                // Route::put('/{product}', 'update')->name('products.update');
                // Route::delete('/{product}', 'destroy')->name('products.destroy');
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