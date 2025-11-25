import { Link } from "@inertiajs/react";
import { ChevronDown, Facebook, Instagram, Menu, Search, ShoppingCart, User, X, Youtube } from "lucide-react";
import { useState } from "react";


export default function Header() {
  const [open, setOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  return (
    <>
      {/*  Top Header with social links, currently, language */}
      <div className="bg-gray-800 text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex space-x-4">
            <Link prefetch href="#" className="hover:text-gray-300">
              <Facebook className="h-5 w-5" />
            </Link>
            <Link prefetch href="#" className="hover:text-gray-300">
              <X className="h-5 w-5" />
            </Link>
            <Link prefetch href="#" className="hover:text-gray-300">
              <Instagram className="h-5 w-5" />
            </Link>
            <Link prefetch href="#" className="hover:text-gray-300">
              <Youtube className="h-5 w-5" />
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            <div className="relative" x-data="{ open: false }">
              <button onClick={() => setIsCurrencyOpen(!isCurrencyOpen)} className="flex items-center space-x-1 hover:text-gray-300" >
                <span>FCFA</span>
                <ChevronDown size={16} />
              </button>
              {isCurrencyOpen && (
                <div x-show="open" className="absolute right-0 mt-2 w-40 bg-white text-gray-800 shadow-lg rounded-md overflow-hidden z-50" >
                  <Link href="#" className="block px-4 py-2 hover:bg-gray-100">FCFA - FR Dollar</Link>
                  <Link href="#" className="block px-4 py-2 hover:bg-gray-100">USD -US Dollar</Link>
                  <Link href="#" className="block px-4 py-2 hover:bg-gray-100">EUR - Euro</Link>
                </div>
              )}
            </div>
            <div className="relative" x-data="{ open: false }">
              <button onClick={() => setIsLanguageOpen(!isLanguageOpen)} className="flex items-center space-x-1 hover:text-gray-300" >
                <span>Francais</span>
                <ChevronDown size={16} />
              </button>
              {isLanguageOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 shadow-lg rounded-md overflow-hidden z-50" >
                  <Link href="#" className="block px-4 py-2 hover:bg-gray-100">Francais</Link>
                  <Link href="#" className="block px-4 py-2 hover:bg-gray-100">English</Link>
                  <Link href="#" className="block px-4 py-2 hover:bg-gray-100">Espanol</Link>
                </div>
              )}
            </div>
            <Link href="login" className="hover:text-gray-300 flex items-center space-x-1">
              <User className="h-5 w-5"/>
              <span>Login</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header with logo, search, and card */}
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="#" className="text-2xl font-bold text-indigo-600">ShopMart</Link>

          <div className="flex-1 max-w-xl mx-8">
            <div className="relative">
              <input type="text" placeholder="Rechercher un Produit..." className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              <button className="absolute right-0 top-0 h-full px-4 text-gray-500 hover:text-indigo-500">
                <Search className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="relative" x-data="{ open: false, count: 2 }">
              <button onClick={() => setIsCardOpen(!isCardOpen)} className="relative hover:text-indigo-600">
                <ShoppingCart className="h-6 w-6" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs" x-text="count">
                    2
                </span>
              </button>
              {isCardOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-md overflow-hidden z-50">
                  <div className="pb-4 border-b">
                    <h3 className="font-medium">Cart Summary (2 items)</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    <div className="flex p-4 border-b">
                      <img src="./images/p-1.jpg" alt="product" className="w-16 h-16 rounded" />
                      <div className="ml-4 flex-1">
                        <h4 className="font-medium">Wireless Headphones</h4>
                        <div className="flex justify-between mt-1">
                          <p className="text-gray-600">1 x 890Fcfa</p>
                          <button className="text-red-500 hover:text-red-700">
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex p-4">
                      <img src="./images/p-2.jpg" alt="product" className="w-16 h-16 rounded" />
                      <div className="ml-4 flex-1">
                        <h4 className="font-medium">Smart Watch</h4>
                        <div className="flex justify-between mt-1">
                          <p className="text-gray-600">1 x 1200Fcfa</p>
                          <button className="text-red-500 hover:text-red-700">
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex border-t">
                    <div className="flex justify-between mb-2">
                      <span>Subtotal</span>
                      <span className="font-medium">3500Fcfa</span>
                    </div>
                    <div className="flex space-x-2">
                      <Link href="#" className="flex-1 bg-gray-200 text-gray-800 text-center py-2 rounded-md hover:bg-gray-300">View Card</Link>
                      <Link href="#" className="flex-1 bg-indigo-600 text-white text-center py-2 rounded-md hover:bg-indigo-700">Checkout</Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex space-y-4">
              <Link href="login" className="text-gray-700 hover:text-indigo-600">Login</Link>
              <span className="text-gray-300">|</span>
              <Link href="register" className="text-gray-700 hover:text-indigo-600">Register</Link>
            </div>
          </div>
        </div>
      </header>

      {/* Categories Navigation */}
      <nav className="bg-white shadow">
        <div className="container mx-auto px-4">
          <div className="flex">
            {/* categories Dropdows */}
            <div className="relative group dropdown" x-data="{ open: false }">
              <button onClick={() => setIsCategoriesOpen(!isCategoriesOpen)} className="flex items-center px-4 py-3 text-gray-700 hover:text-indigo-600 focus:outline-none">
                <Menu className="h-5 w-5 mr-2" />
                <span>All Categories</span>
                <ChevronDown className="h-3 w-3 ml-1" />
              </button>
              {isCategoriesOpen && (
                <div className="dropdown-menu absolute left-0 w-64 bg-white shadow-lg rounded-b-md z-50">
                  {/* category with subcategories */}
                  <div className="relative nested-dropdown">
                    <Link href="#" className="flex items-center justify-between px-4 py-3 hover:bg-gray-100">
                      <div className="flex items-center">
                        <i className="fas fa-laptop mr-3 text-indigo-500"></i>
                        <span>Electronics</span>
                      </div>
                      <i className="fas fa-chevron-right text-xs"></i>
                    </Link>
                    <div className="nested-dropdown-menu absolute w-64 bg-white shadow-lg rounded-md">
                      {/* Subcategory with more nested categorie */}
                      <div className="relative nested-dropdown">
                        <Link href="#" className="flex items-center justify-between px-4 py-3 hover:bg-gray-100">
                          <div className="flex items-center">
                            <i className="fas fa-mobile-alt mr-3 text-indigo-500"></i>
                            <span>Smartphones</span>
                          </div>
                          <i className="fas fa-chevron-right text-xs"></i>
                        </Link>
                        <div className="nested-dropdown-menu absolute w-64 bg-white shadow-lg rounded-md">
                          <Link href="#" className="block px-4 py-3 hover:bg-gray-100">Android Phones</Link>
                          <Link href="#" className="block px-4 py-3 hover:bg-gray-100">IPhones</Link>
                          <Link href="#" className="block px-4 py-3 hover:bg-gray-100">Acessories</Link>
                          {/* <Link href="#" className="block px-4 py-3 hover:bg-gray-100">Laptops</Link>
                          <Link href="#" className="block px-4 py-3 hover:bg-gray-100">Camera</Link>
                          <Link href="#" className="block px-4 py-3 hover:bg-gray-100">Audio</Link> */}
                        </div>
                      </div>

                      {/* More categories */}
                      <Link href="#" className="flex items-center px-4 py-3 hover:bg-gray-100">
                        <i className="fas fa-tshirt mr-3 text-indigo-500"></i>
                        <span>Fashion</span>
                      </Link>
                      <Link href="#" className="flex items-center px-4 py-3 hover:bg-gray-100">
                        <i className="fas fa-home mr-3 text-indigo-500"></i>
                        <span>Home & Garden</span>
                      </Link>
                      <Link href="#" className="flex items-center px-4 py-3 hover:bg-gray-100">
                        <i className="fas fa-futbol mr-3 text-indigo-500"></i>
                        <span>Sport & Outdoors</span>
                      </Link>
                      <Link href="#" className="flex items-center px-4 py-3 hover:bg-gray-100">
                        <i className="fas fa-baby mr-3 text-indigo-500"></i>
                        <span>Baby & Kids</span>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* Main Menu */}
            <ul className="flex">
              <li>
                <Link href="#" className="flex items-center px-4 py-3 text-gray-700 hover:text-indigo-600">Home</Link>
              </li>
              <li>
                <Link href="#" className="flex items-center px-4 py-3 text-gray-700 hover:text-indigo-600">Shop</Link>
              </li>
              <li>
                <Link href="#" className="flex items-center px-4 py-3 text-gray-700 hover:text-indigo-600">New Arrival</Link>
              </li>
              <li>
                <Link href="#" className="flex items-center px-4 py-3 text-gray-700 hover:text-indigo-600">Deals</Link>
              </li>
              <li>
                <Link href="#" className="flex items-center px-4 py-3 text-gray-700 hover:text-indigo-600">Blog</Link>
              </li>
              <li>
                <Link href="#" className="flex items-center px-4 py-3 text-gray-700 hover:text-indigo-600">Contact</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
