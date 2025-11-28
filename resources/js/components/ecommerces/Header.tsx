import { Link } from '@inertiajs/react';
import {
  ChevronDown,
  ChevronRight,
  Facebook,
  Instagram,
  Laptop,
  Menu,
  Search,
  ShoppingCart,
  Smartphone,
  User,
  X,
  Youtube,
} from 'lucide-react';
import { useState } from 'react';

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
      <div className="bg-gray-800 py-2 text-white">
        <div className="container mx-auto flex items-center justify-between px-4">
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
              <button
                onClick={() =>
                  setIsCurrencyOpen(!isCurrencyOpen)
                }
                className="flex items-center space-x-1 hover:text-gray-300"
              >
                <span>FCFA</span>
                <ChevronDown size={16} />
              </button>
              {isCurrencyOpen && (
                <div
                  x-show="open"
                  className="absolute right-0 z-50 mt-2 w-40 overflow-hidden rounded-md bg-white text-gray-800 shadow-lg"
                >
                  <Link
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    FCFA - FR Dollar
                  </Link>
                  <Link
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    USD -US Dollar
                  </Link>
                  <Link
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    EUR - Euro
                  </Link>
                </div>
              )}
            </div>
            <div className="relative" x-data="{ open: false }">
              <button
                onClick={() =>
                  setIsLanguageOpen(!isLanguageOpen)
                }
                className="flex items-center space-x-1 hover:text-gray-300"
              >
                <span>Francais</span>
                <ChevronDown size={16} />
              </button>
              {isLanguageOpen && (
                <div className="absolute right-0 z-50 mt-2 w-40 overflow-hidden rounded-md bg-white text-gray-800 shadow-lg">
                  <Link
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Francais
                  </Link>
                  <Link
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    English
                  </Link>
                  <Link
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Espanol
                  </Link>
                </div>
              )}
            </div>
            <Link
              href="login"
              className="flex items-center space-x-1 hover:text-gray-300"
            >
              <User className="h-5 w-5" />
              <span>Login</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header with logo, search, and card */}
      <header className="bg-white py-4 shadow-sm">
        <div className="container mx-auto flex items-center justify-between px-4">
          <Link
            href="#"
            className="text-2xl font-bold text-indigo-600"
          >
            ShopMart
          </Link>

          <div className="mx-8 max-w-xl flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher un Produit..."
                className="w-full rounded-full border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              <button className="absolute top-0 right-0 h-full px-4 text-gray-500 hover:text-indigo-500">
                <Search className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div
              className="relative"
              x-data="{ open: false, count: 2 }"
            >
              <button
                onClick={() => setIsCardOpen(!isCardOpen)}
                className="relative hover:text-indigo-600"
              >
                <ShoppingCart className="h-6 w-6" />
                <span
                  className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white"
                  x-text="count"
                >
                  2
                </span>
              </button>
              {isCardOpen && (
                <div className="absolute right-0 z-50 mt-2 w-80 overflow-hidden rounded-md bg-white shadow-lg">
                  <div className="border-b pb-4">
                    <h3 className="font-medium">
                      Cart Summary (2 items)
                    </h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    <div className="flex border-b p-4">
                      <img
                        src="./images/p-1.jpg"
                        alt="product"
                        className="h-16 w-16 rounded"
                      />
                      <div className="ml-4 flex-1">
                        <h4 className="font-medium">
                          Wireless Headphones
                        </h4>
                        <div className="mt-1 flex justify-between">
                          <p className="text-gray-600">
                            1 x 890Fcfa
                          </p>
                          <button className="text-red-500 hover:text-red-700">
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex p-4">
                      <img
                        src="./images/p-2.jpg"
                        alt="product"
                        className="h-16 w-16 rounded"
                      />
                      <div className="ml-4 flex-1">
                        <h4 className="font-medium">
                          Smart Watch
                        </h4>
                        <div className="mt-1 flex justify-between">
                          <p className="text-gray-600">
                            1 x 1200Fcfa
                          </p>
                          <button className="text-red-500 hover:text-red-700">
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex border-t">
                    <div className="mb-2 flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-medium">
                        3500Fcfa
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <Link
                        href="#"
                        className="flex-1 rounded-md bg-gray-200 py-2 text-center text-gray-800 hover:bg-gray-300"
                      >
                        View Card
                      </Link>
                      <Link
                        href="#"
                        className="flex-1 rounded-md bg-indigo-600 py-2 text-center text-white hover:bg-indigo-700"
                      >
                        Checkout
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex space-y-4">
              <Link
                href="login"
                className="text-gray-700 hover:text-indigo-600"
              >
                Login
              </Link>
              <span className="text-gray-300">|</span>
              <Link
                href="register"
                className="text-gray-700 hover:text-indigo-600"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Categories Navigation */}
      <nav className="bg-white shadow">
        <div className="container mx-auto px-4">
          <div className="flex">
            {/* categories Dropdows */}
            <div className="group dropdown relative">
              <button
                onClick={() =>
                  setIsCategoriesOpen(!isCategoriesOpen)
                }
                className="flex items-center px-4 py-3 text-gray-700 hover:text-indigo-600 focus:outline-none"
              >
                <Menu className="mr-2 h-5 w-5" />
                <span>All Categories</span>
                <ChevronDown className="ml-1 h-3 w-3" />
              </button>
              {isCategoriesOpen && (
                <div className="dropdown-menu absolute left-0 z-50 w-64 rounded-b-md bg-white shadow-lg">
                  {/* category with subcategories */}
                  <div className="nested-dropdown relative">
                    <Link
                      href="#"
                      className="flex items-center justify-between px-4 py-3 hover:bg-gray-100"
                    >
                      <div className="flex items-center">
                        <Laptop className="mr-3 text-indigo-500" />
                        <span>Electronics</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-xs" />
                    </Link>
                    <div className="nested-dropdown-menu absolute w-64 rounded-md bg-white shadow-lg">
                      {/* Subcategory with more nested categorie */}
                      <div className="nested-dropdown relative">
                        <Link
                          href="#"
                          className="flex items-center justify-between px-4 py-3 hover:bg-gray-100"
                        >
                          <div className="flex items-center">
                            <Smartphone className="mr-3 text-indigo-500" />
                            <span>Smartphones</span>
                          </div>
                          <ChevronRight className="h-4 w-4 text-xs" />
                        </Link>
                        <div className="nested-dropdown-menu absolute w-64 rounded-md bg-white shadow-lg">
                          <Link href="#" className="block px-4 py-3 hover:bg-gray-100">Android Phones</Link>
                          <Link href="#" className="block px-4 py-3 hover:bg-gray-100">IPhones</Link>
                          <Link href="#" className="block px-4 py-3 hover:bg-gray-100">Acessories</Link>
                          {/* <Link href="#" className="block px-4 py-3 hover:bg-gray-100">Laptops</Link>
                          <Link href="#" className="block px-4 py-3 hover:bg-gray-100">Camera</Link>
                          <Link href="#" className="block px-4 py-3 hover:bg-gray-100">Audio</Link> */}
                        </div>
                      </div>

                      {/* More categories */}
                      <Link
                        href="#"
                        className="flex items-center px-4 py-3 hover:bg-gray-100"
                      >
                        <i className="fas fa-tshirt mr-3 text-indigo-500"></i>
                        <span>Fashion</span>
                      </Link>
                      <Link href="#" className="flex items-center px-4 py-3 hover:bg-gray-100" >
                        <i className="fas fa-home mr-3 text-indigo-500"></i>
                        <span>Home & Garden</span>
                      </Link>
                      <Link
                        href="#"
                        className="flex items-center px-4 py-3 hover:bg-gray-100"
                      >
                        <i className="fas fa-futbol mr-3 text-indigo-500"></i>
                        <span>Sport & Outdoors</span>
                      </Link>
                      <Link
                        href="#"
                        className="flex items-center px-4 py-3 hover:bg-gray-100"
                      >
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
                <Link href="#" className="flex items-center px-4 py-3 text-gray-700 hover:text-indigo-600" >Shop</Link>
              </li>
              <li>
                <Link href="#" className="flex items-center px-4 py-3 text-gray-700 hover:text-indigo-600">New Arrival</Link>
              </li>
              <li>
                <Link href="#" className="flex items-center px-4 py-3 text-gray-700 hover:text-indigo-600" >Deals</Link>
              </li>
              <li>
                <Link href="#" className="flex items-center px-4 py-3 text-gray-700 hover:text-indigo-600"> Blog</Link>
              </li>
              <li>
                <Link href="#" className="flex items-center px-4 py-3 text-gray-700 hover:text-indigo-600" >Contact</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
