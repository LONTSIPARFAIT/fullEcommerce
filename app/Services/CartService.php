 <?php

namespace App\Services;
use App\Models\Product;

 class CartService {
    private ?array $cachedCartItems = null;
    private const COOKIE_NAME = 'cartItems';
    protected const COOKIE_LIFETIME=60*24*365;

    public function addItemCart(Product $product, int $quantity=1, array $optionIds=[]) {
        
    }
 }
