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
                <Link href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 transition-colors"></Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
