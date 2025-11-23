import { Link } from "@inertiajs/react";

export default function Footer() {

  return (
    <footer className="bg-gray-800 pt-16 pb-6 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo & description */}
          <div className="">
            <Link href="/" className="mb-4 block text-2xl font-bold text-white">
              ShopMart
            </Link>
            <p className="mb-6 text-gray-400">
              ShopMart offert a wide range of high-quality products at competitive prices. We're commited to providing an exceptional
              shopping experiences with fast shipping and excelente customer services.
            </p>
            <div className="flex space-x-4">
                <Link href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 transition-colors hover:bg-indigo-600"><i className="fab fa-facebook-f"></i></Link>
                <Link href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 transition-colors hover:bg-indigo-600"><i className="fab fa-twitter"></i></Link>
                <Link href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 transition-colors hover:bg-indigo-600"><i className="fab fa-youtube"></i></Link>
            </div>
          </div>
          {/* quik links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
                <li>
                    <Link prefetch href="/" className="text-gray-400 transition-colors hover:text-white">
                        Home
                    </Link>
                </li>
                <li>
                    <Link prefetch href="/shop" className="text-gray-400 transition-colors hover:text-white">
                        Shop
                    </Link>
                </li>
                <li>
                    <Link prefetch href="/products" className="text-gray-400 transition-colors hover:text-white">
                        Products
                    </Link>
                </li>
                <li>
                    <Link prefetch href="/about" className="text-gray-400 transition-colors hover:text-white">
                        About Us
                    </Link>
                </li>
                <li>
                    <Link prefetch href="/contact" className="text-gray-400 transition-colors hover:text-white">
                        Contact
                    </Link>
                </li>
                <li>
                    <Link prefetch href="/blog" className="text-gray-400 transition-colors hover:text-white">
                        Blog
                    </Link>
                </li>
            </ul>
          </div>
          {/* Custumer Services */}
          <div className="">
            <h3 className="mb-4 text-lg font-semibold">Custumer Services</h3>
            <ul className="space-y-2">
                <li>
                    <Link prefetch href="/account" className="text-gray-400 transition-colors hover:text-white">
                        My Account
                    </Link>
                </li>
                <li>
                    <Link prefetch href="/orders" className="text-gray-400 transition-colors hover:text-white">
                        Order History
                    </Link>
                </li>
                <li>
                    <Link prefetch href="/wishlist" className="text-gray-400 transition-colors hover:text-white">
                        Wishlist
                    </Link>
                </li>
                <li>
                    <Link prefetch href="/returns" className="text-gray-400 transition-colors hover:text-white">
                        Returns
                    </Link>
                </li>
                <li>
                    <Link prefetch href="/faq" className="text-gray-400 transition-colors hover:text-white">
                        FAQs
                    </Link>
                </li>
                <li>
                    <Link prefetch href="/terms" className="text-gray-400 transition-colors hover:text-white">
                        Terms & Conditions
                    </Link>
                </li>
            </ul>
          </div>
          {/* contact information */}
         <div className="">
            <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-3">
                <li className="flex items-center">
                    <i className=""></i>
                    <span className=""></span>
                </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
