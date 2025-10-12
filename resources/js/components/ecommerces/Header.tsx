import { Link } from "@inertiajs/react";


export default function Head() {
  const {isCardOpen, setIsCardOpen };
  return (    
    // Top Header with social links, currently, language
    <div className="bg-gray-800 text-white py-2">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex space-x-4">
          <Link prefetch href="#" className="hover:text-gray-300">
            <i className="fab fa-facebook-f"></i>
          </Link>
          <Link prefetch href="#" className="hover:text-gray-300">
            <i className="fab fa-twitter"></i>
          </Link>
          <Link prefetch href="#" className="hover:text-gray-300">
            <i className="fab fa-intagram"></i>
          </Link>
          <Link prefetch href="#" className="hover:text-gray-300">
            <i className="fab fa-pinterest"></i>
          </Link>
        </div>
        <div className="flex items-center space-x-6">
          <div className="relative" x-data="{ open: false }"></div>
        </div>
      </div>
    </div>
  );
}