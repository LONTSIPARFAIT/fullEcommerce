<?php

namespace App\Services;

use App\Models\Cart;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;

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
        ->where('variation_type_option_ids', $optionIds)
        ->first();

        if ($cartItem) {
            $cartItem->quantity = $cartItem->quantity + $quantity;
            // $cartItem->price = $cartItem->price + $price;
            $cartItem->save();
        } else {
            $cartItem = new Cart();
            $cartItem->user_id=$userId;
            $cartItem->product_id=$productId;
            $cartItem->quantity=$quantity;
            $cartItem->price=$price;
            $cartItem->variation_type_option_ids=json_encode($optionIds);
            $cartItem->save();
        }
    }
    protected function saveItemToCookies(int $productId, int $quantity, int $price, array $optionIds){
        $cartItems= $this->getCartItemsFromCookies();
        krsort($optionIds);
        $cartItemKey=$productId.'_'.json_encode($optionIds);
        if (!isset($cartItems[$cartItemKey])) {
            $cartItems[$cartItemKey] = [
                'id' => uniqid(),
                'product_id' => $productId,
                'quantity' => $quantity,
                'price' => $price,
                'option_ids' => $optionIds,
            ];
        } else {
            $cartItems[$cartItemKey]['quantity'] == $quantity;
        }

        Cookie::queue(self::COOKIE_NAME, json_encode($cartItems), self::COOKIE_LIFETIME);
    }

    public function getCartItemsFromDatabase() {
        $userId = Auth::id();
        $cartItems = Cart::where('user_id', $userId)->get()
        ->map(function($item){
            return [
                'id' => $item->id,
                'product_id' => $item->product_id,
                'quantity' => $item->quantity,
                'price' => $item->price,
                'option_ids' => $item->variation_type_option_ids,
            ];
        })->toArray();
        return $cartItems;
    }

    public function getCartItemsFromCookies(): array{
        $cartItems = json_decode(Cookie::get(self::COOKIE_NAME,'[]'),true);
        return $cartItems;
    }
 }
