<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\BrandController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\ProductImageController;
use App\Http\Controllers\Admin\ProductVariationController;
use App\Http\Controllers\Admin\ProductVariationTypeController;
use App\Http\Middleware\AdminCheckMiddleware;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', AdminCheckMiddleware::class])->group(function () {
    Route::prefix('admin')->name('admin.')->group(function () {
        
        Route::group(['prefix' => 'products','as' => 'products.'], function (): void{
            Route::controller(ProductImageController::class)->group(function () {
                Route::group(['prefix' => 'images','as' => 'images.'], function (){
                    Route::get('/{product}', 'index')->name('index');
                    Route::post('/{product}/store', 'store')->name('store');
                    Route::delete('/{product}/delete/{destroy}', 'destroy')->name('image.delete');
                });
            });

            Route::controller(ProductVariationTypeController::class)->group(function () {
                Route::group(['prefix' => 'variation-type','as' => 'variation-type.'], function (){
                    Route::get('/{product}', 'index')->name('index');
                    Route::post('/{product}/store', 'store')->name('store');
                    Route::delete('/{product}/delete/{variationType}', 'destroy')->name('image.delete');
                });
            });

            Route::controller(ProductVariationController::class)->group(function () {
                Route::group(['prefix' => 'variation','as' => 'variation.'], function (){
                    Route::get('/{product}', 'index')->name('index');
                    Route::post('/{product}/store', 'store')->name('store');
                    Route::delete('/{product}/delete/{variation}', 'destroy')->name('image.delete');
                });
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
