<?php

namespace App\Services;

use App\Models\Cart;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use PhpParser\Node\Stmt\TryCatch;

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

    public function updateItemQuantity(int $productId, int $quantity, array $optionIds=[]){
        if (Auth::check()) {
            $this->updateItemQuantityToDatabase($productId, $quantity, $optionIds);
        } else {
            $this->updateItemQuantityToCookies($productId, $quantity, $optionIds);
        }
    }
    
    public function removeItemFromCart(int $productId, array $optionIds = []) {
        if (Auth::check()) {
            $this->removeItemFromDatabase($productId, $optionIds);
        } else {
            $this->removeItemFromCookies($productId, $optionIds);
        }
    }

    protected function updateItemQuantityToDatabase(int $productId, int $quantity, array $optionIds=[]){
        $userId = Auth::id();
        krsort($optionIds);
        $cartItems = Cart::where('product_id', $productId)->where('user_id', $userId)
        ->where('variation_type_option_ids', $optionIds)
        ->first();

        if ($cartItems) {
            $cartItems->quantity=$quantity;
            $cartItems->save();
        }
    }

    protected function updateItemQuantityToCookies(int $productId, int $quantity, array $optionIds=[]){
        $cartItems = $this->getCartItemsFromCookies();
        krsort($optionIds);
        $cartItemKey = $productId.'_'.json_encode($optionIds);
        if (isset($cartItems[$cartItemKey])) {
            $cartItems[$cartItemKey]['quantity']=$quantity;
        }

        Cookie::queue(self::COOKIE_NAME, json_encode($cartItems));
    }

    protected function removeItemFromDatabase(int $productId, array $optionIds=[]){
        $userId = Auth::id();
        krsort($optionIds);
        Cart::where('product_id', $productId)
        ->where('user_id', $userId)
        ->where('variation_type_option_ids', $optionIds)
        ->delete();
    }

    protected function removeItemFromCookies(int $productId, array $optionIds=[]){
        $cartItems = $this->getCartItemsFromCookies();
        krsort($optionIds);
        $cartItemKey = $productId.'_'.json_encode($optionIds);
        if (isset($cartItems[$cartItemKey])) {
            unset($cartItems[$cartItemKey]);
        }

        Cookie::queue(self::COOKIE_NAME, json_encode($cartItems), self::COOKIE_LIFETIME);
    }

    public function getCartItems() {
        try {
            if ($this->cachedCartItems === null) {
                if (Auth::check()) {
                   $cartItems = $this->cachedCartItems = $this->getCartItemsFromDatabase();
                } else {
                    $cartItems = $this->cachedCartItems = $this->getCartItemsFromCookies();
                }

                $productIds = collect($cartItems)->map(fn($item)=> $item['product_id']);
                $products = Product::whereIn('id', $productIds)->get()->keyBy('id');

                $cartItemData = [];
                foreach ($cartItems as $cartItem) {
                    $product = data_get($products, $cartItem['product_id']);

                    if (!$product) {
                        # code...
                    }
                }
            }
        } catch (\Throwable $th) {
            //throw $th;
        }

        return $this->cachedCartItems;
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

    public function clearCar() {
        if(Auth::check()) {
            Cart::where('user_id', Auth::id())->delete();
        } else {
            Cookie::queue(self::COOKIE_NAME, json_encode([]), self::COOKIE_LIFETIME);
        }
    }
 }
