<?php

namespace App\Services;

use App\Models\Cart;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;

 class CartService {
    private ?array $cachedCartItems = null;
    private const COOKIE_NAME = 'cartItems';
    protected const COOKIE_LIFETIME=60*24*365;

    public function addItemCart(Product $product, int $quantity=1, array $optionIds=[]) {
        if(!$optionIds) {
            $optionIds = $product->getFirstOptionMap();
        }

        $price=$product->getPriceForOptions($optionIds);

        if (Auth::check()) {
            // save the database
            $this->saveItemToDatabase($product->id, $quantity, $price, $optionIds);
        } else {
            // save to the cookies
            $this->saveItemToCookies($product->id, $quantity, $price, $optionIds);
        }
    }

    protected function saveItemToDatabase(int $productId, int $quantity, int $price, array $optionIds){
        $userId=Auth::id();
        krsort($optionIds);

        $cartItem=Cart::where('product_id', $productId)
        ->where('user_id', $userId)
        ->where('variation_type_option_ids');
    }
    protected function saveItemToCookies(int $productId, int $quantity, int $price, array $optionIds){}
 }
